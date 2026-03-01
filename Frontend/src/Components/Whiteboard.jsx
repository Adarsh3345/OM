import React, { useRef, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

function Whiteboard({ roomKey, username }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");
    socketRef.current = socket;

    // Join the room when component mounts
    socket.emit("join", { username, room: roomKey });

    // Handle incoming draw events
    const handleDraw = ({ drawData }) => {
      drawLine(drawData, false);
    };

    socket.on("draw", handleDraw);

    return () => {
      socket.off("draw", handleDraw);
      socket.disconnect();
    };
  }, [roomKey, username]);

  // Draw a line on the canvas
  const drawLine = useCallback(({ x0, y0, x1, y1, color = "#000", thickness = 2 }, isLocal = true) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    // Only emit if it's a local drawing action
    if (isLocal && socketRef.current) {
      socketRef.current.emit("draw", { 
        room: roomKey, 
        drawData: { x0, y0, x1, y1, color, thickness } 
      });
    }
  }, [roomKey]);

  // Mouse down handler
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    lastPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setIsDrawing(true);
  };

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    drawLine({
      x0: lastPosRef.current.x,
      y0: lastPosRef.current.y,
      x1: currentPos.x,
      y1: currentPos.y
    });

    lastPosRef.current = currentPos;
  };

  // Mouse up/leave handler
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Clear canvas handler (optional)
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="bg-gray-100 p-2 rounded shadow-md">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-400 rounded bg-white"
        style={{ cursor: "crosshair" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <button 
        onClick={handleClear}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear Canvas
      </button>
    </div>
  );
}

export default Whiteboard;