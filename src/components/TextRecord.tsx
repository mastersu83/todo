"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
}

export function VoiceInput({
  onSaveAction,
  title,
}: {
  onSaveAction: (text: string) => void;
  title: string;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [volume, setVolume] = useState(0);
  const [recordText, setRecordText] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Инициализация анализатора звука
  const initAudioAnalyzer = async (stream: MediaStream) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 32;

    microphoneRef.current =
      audioContextRef.current.createMediaStreamSource(stream);
    microphoneRef.current.connect(analyserRef.current);

    const updateVolume = () => {
      if (!analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
      setVolume(Math.min((average / 255) * 100, 100));

      animationRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await initAudioAnalyzer(stream);

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Ваш браузер не поддерживает голосовой ввод");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "ru-RU";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = event.results;
        const latest = results[results.length - 1];
        const text = latest[0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Ошибка распознавания:", event.error);
        stopRecording();
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (err) {
      console.error("Ошибка доступа к микрофону:", err);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (audioContextRef.current?.state !== "closed") {
      audioContextRef.current?.close();
    }

    setIsRecording(false);
    setVolume(0);

    if (transcript) {
      onSaveAction(transcript);
      // setTranscript("");
    }
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  // Генерация волн разной высоты
  const renderWaveBars = () => {
    const bars = [];
    const barCount = 8;

    for (let i = 0; i < barCount; i++) {
      // Каждая волна реагирует с небольшой задержкой
      const delayFactor = i / barCount;
      const height =
        4 +
        (volume / 100) *
          16 *
          (0.5 + Math.sin(Date.now() / 200 + delayFactor * 2) / 2);

      bars.push(
        <div
          key={i}
          className="bg-blue-500 rounded-full transition-all duration-75"
          style={{
            width: "4px",
            height: `${height}px`,
            opacity: 0.6 + (volume / 100) * 0.4,
          }}
        />
      );
    }

    return bars;
  };

  console.log(recordText);

  return (
    <Flex align="center" className="w-full">
      {/*<Mic onClick={() => setIsRecording(!isRecording)} />*/}

      <div className="rounded-lg w-full max-w-md">
        {/*<p className="text-gray-800 dark:text-gray-200">{transcript}</p>*/}
        {isRecording ? (
          <input
            type="text"
            placeholder="Новая задача"
            autoFocus
            value={transcript}
            onChange={(e) => setRecordText(transcript)}
            className="text-xl font-semibold border-b border-gray-300 focus:outline-none focus:border-indigo-400 text-center w-full mb-4 p-2 pb-0"
          />
        ) : (
          <input
            type="text"
            placeholder="Новая задача"
            autoFocus
            value={title}
            onChange={(e) => onSaveAction(e.target.value)}
            className="text-xl font-semibold border-b border-gray-300 focus:outline-none focus:border-indigo-400 text-center w-full mb-4 p-2 pb-0"
          />
        )}
      </div>
      <Mic
        onClick={isRecording ? stopRecording : startRecording}
        className={cn(isRecording ? "bg-red-300 rounded-full" : "rounded-full")}
      />

      {/*{transcript && (*/}
      {/*  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-md">*/}
      {/*    /!*<p className="text-gray-800 dark:text-gray-200">{transcript}</p>*!/*/}
      {/*    <input*/}
      {/*      onChange={(e) => setRecordText(transcript)}*/}
      {/*      className="text-gray-800 dark:text-gray-200"*/}
      {/*      value={transcript}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
    </Flex>
  );
}
