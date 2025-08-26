"use client";
import { useState, useRef, useEffect } from "react";

export const MyCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user", // или 'environment' для задней камеры
        },
        audio: false, // или true, если нужен звук
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Не удалось получить доступ к камере");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="p-4 absolute top-5 right-5 z-50">
      <div className="mb-4">
        <button
          onClick={startCamera}
          disabled={!!stream}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-400"
        >
          Включить камеру
        </button>
        <button
          onClick={stopCamera}
          disabled={!stream}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Выключить камеру
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-md border rounded"
        />
        {!stream && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            Камера отключена
          </div>
        )}
      </div>
    </div>
  );
};
