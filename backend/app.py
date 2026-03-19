from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from datetime import timedelta
from flask_socketio import SocketIO, join_room, leave_room, emit
import random
import string
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://om-rho-rose.vercel.app"], supports_credentials=True)

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["user_database"]
users_collection = db["users"]

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_secret_key_here")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

CLIENT_ID = os.getenv("CLIENT_ID") 
PISTON_API_URL = "https://emkc.org/api/v2/piston/execute"


rooms = {}  
connected_users = {}  

def generate_room_key(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Routes

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Both email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity={"email": email, "name": user["name"]})
    return jsonify({"message": "Login successful", "access_token": access_token}), 200

@app.route("/api/google-signin", methods=["POST"])
def google_signin():
    token = request.json.get("token")
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)
        email = idinfo['email']
        name = idinfo.get('name')
        user_id = idinfo['sub']

        user = users_collection.find_one({"email": email})
        if not user:
            users_collection.insert_one({"name": name, "email": email, "google_id": user_id})

        access_token = create_access_token(identity={"email": email, "name": name})
        return jsonify({
            "message": "User authenticated",
            "access_token": access_token,
            "user": {"id": user_id, "email": email, "name": name}
        })
    except Exception as e:
        return jsonify({"error": "Invalid token", "details": str(e)}), 400

@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = users_collection.find_one({"email": current_user["email"]}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"profile": user}), 200

@app.route("/execute", methods=["POST"])
def execute_code():
    try:
        data = request.json
        language = data.get("language")
        version = data.get("version")
        code = data.get("code")

        if not all([language, version, code]):
            return jsonify({"error": "Missing language, version, or code"}), 400

        response = requests.post(
            PISTON_API_URL,
            json={
                "language": language,
                "version": version,
                "files": [{"content": code}]
            },
            timeout=5
        )

        if response.status_code != 200:
            return jsonify({"error": "Execution API failed"}), 500

        result = response.json()

        output = result.get("run", {}).get("output", "")
        stderr = result.get("run", {}).get("stderr", "")

        return jsonify({
            "output": output if output else stderr if stderr else "No output"
        })

    except requests.exceptions.Timeout:
        return jsonify({"error": "Execution timeout"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/create-room", methods=["POST"])
def create_room():
    room_key = generate_room_key()
    while room_key in rooms:
        room_key = generate_room_key()
    rooms[room_key] = {"users": []}
    return jsonify({"room_key": room_key})

# Socket.IO event handlers

@socketio.on('connect')
def handle_connect():
    print(f"[SocketIO] Client connected: {request.sid}")

@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['room']
    join_room(room)

    if room not in rooms:
        rooms[room] = {"users": []}

    if username not in rooms[room]["users"]:
        rooms[room]["users"].append(username)

    connected_users[request.sid] = {"username": username, "room": room}

    emit("user_event", {"message": f"{username} has joined the room!", "type": "join"}, room=room)

@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)

    if room in rooms and username in rooms[room]["users"]:
        rooms[room]["users"].remove(username)

    emit("user_event", {"message": f"{username} has left the room!", "type": "leave"}, room=room)

@socketio.on('message')
def handle_message(data):
    emit("chat", {"username": data["username"], "message": data["message"]}, room=data["room"])

@socketio.on('draw')
def handle_draw(data):
    room = data.get('room')
    draw_data = data.get('drawData')
    if room and draw_data:
        emit('draw', {'drawData': draw_data}, room=room, include_self=False)

@socketio.on('disconnect')
def handle_disconnect():
    user_info = connected_users.pop(request.sid, None)
    if user_info:
        username = user_info["username"]
        room = user_info["room"]

        if room in rooms and username in rooms[room]["users"]:
            rooms[room]["users"].remove(username)

        emit("user_event", {"message": f"{username} has left the room!", "type": "leave"}, room=room)

    print(f"[SocketIO] Client disconnected: {request.sid}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    socketio.run(app, host="0.0.0.0", port=port)
