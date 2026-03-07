import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineDraw } from "react-icons/md";
import Whiteboard from "./Whiteboard";

function InteractionBox({ title, problem }) {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const socketRef = useRef(null);

    const formattedTitle = title
        ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
        : '';

    const [roomKey, setRoomKey] = useState(roomId || "");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [roomJoined, setRoomJoined] = useState(!!roomId);
    const [showWhiteboard, setShowWhiteboard] = useState(false);

    // Initialize socket connection and event listeners
    useEffect(() => {
        const socket = io("https://om-mh8v.onrender.com");
        socketRef.current = socket;

        // Chat message listener
        const chatListener = (msg) => {
            setMessages((prev) => [...prev, `${msg.username}: ${msg.message}`]);
        };

        socket.on("chat", chatListener);

        return () => {
            socket.off("chat", chatListener);
            socket.disconnect();
        };
    }, []);

    // Decode JWT and extract username
    const checkLoginStatus = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const name = decoded?.name || decoded?.sub?.name || "User";
                setUserName(name);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("accessToken");
                setIsLoggedIn(false);
            }
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Auto-join on load if roomId and userName are available
    useEffect(() => {
        if (userName && roomId && socketRef.current) {
            socketRef.current.emit("join", { username: userName, room: roomId });
            setRoomKey(roomId);
            setRoomJoined(true);
        }
    }, [userName, roomId]);

    const createRoom = async () => {
        const response = await fetch("http://127.0.0.1:5000/create-room", {
            method: "POST",
        });
        const data = await response.json();
        const newRoom = data.room_key;

        setRoomKey(newRoom);
        setRoomJoined(true);
        socketRef.current.emit("join", { username: userName, room: newRoom });
        navigate(`/questions/${formattedTitle}/${newRoom}`, { state: { problem } });
    };

    const joinRoom = () => {
        if (!roomKey.trim() || !socketRef.current) return;
        socketRef.current.emit("join", { username: userName, room: roomKey });
        setRoomJoined(true);
        navigate(`/questions/${formattedTitle}/${roomKey}`, { state: { problem } });
    };

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit("message", {
                username: userName,
                message,
                room: roomKey,
            });
            setMessage("");
        }
    };

    const shareOnWhatsApp = () => {
        const url = `${window.location.origin}/questions/${formattedTitle}/${roomKey}`;
        const whatsappUrl = `https://wa.me/?text=Join my coding room: ${url}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="w-full md:w-[38vw] h-auto flex flex-col bg-gray-200 p-2 rounded-lg shadow-md">
            <div className="bg-white shadow-lg rounded-lg p-3 w-full h-full">
                <div className="text-center bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] text-white py-2 rounded-md text-lg font-bold">
                    Welcome, {userName.trim()}
                </div>

                {!roomJoined ? (
                    <div className="flex flex-col justify-center items-center gap-4 mt-4 h-full w-full">
                        <button
                            onClick={createRoom}
                            className="w-3/4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                        >
                            Create Room
                        </button>

                        <input
                            type="text"
                            value={roomKey}
                            onChange={(e) => setRoomKey(e.target.value)}
                            className="w-3/4 p-2 border rounded-md text-center"
                            placeholder="Enter Room Key to Join..."
                        />

                        <button
                            onClick={joinRoom}
                            className="w-3/4 bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600"
                        >
                            Join Room
                        </button>
                    </div>
                ) : (
                    <div className="mt-3 flex flex-col gap-2 h-full w-full">
                        <div className="bg-gray-50 border rounded-md shadow-inner flex flex-col w-full h-[70%] relative">
                            <div className="flex items-center justify-end bg-gray-100 border-b rounded-t-md px-2 py-1 mb-0">
                                <button
                                    className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-semibold shadow hover:bg-gray-200 transition flex items-center gap-2"
                                    onClick={() => setShowWhiteboard(!showWhiteboard)}
                                >
                                    <MdOutlineDraw className="w-5 h-5" />
                                    {showWhiteboard ? "Hide Whiteboard" : "Whiteboard"}
                                </button>
                            </div>

                            {showWhiteboard ? (
                                <div className="h-full p-2 overflow-y-auto">
                                    <Whiteboard roomKey={roomKey} username={userName} />
                                </div>
                            ) : (
                                <div className="p-2 overflow-y-auto h-[60%]">
                                    {messages.map((msg, index) => (
                                        <div key={index} className="p-1">
                                            {msg.split('\n').map((line, i) => (
                                                <div key={i}>{line}</div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center h-[6vh] gap-2 w-full">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-4/5 border rounded-md resize-y"
                                placeholder="Type your message or paste code..."
                                rows={2}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                className="w-1/5 bg-[#5318EB] text-white py-3 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>

                        <div className="p-2 bg-gray-200 rounded-lg flex justify-between items-center mt-2">
                            <h2 className="text-lg font-bold">Room Key: {roomKey}</h2>
                            <button onClick={shareOnWhatsApp} className="mt-1 bg-green-500 text-white py-1 px-1 rounded-md">
                                <FaWhatsapp size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InteractionBox;