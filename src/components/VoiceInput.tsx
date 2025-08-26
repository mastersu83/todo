"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { motion } from "motion/react";

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
  onend: (() => void) | null;
}

export function VoiceInput({
  onSaveAction,
  title,
}: {
  onSaveAction: (text: string) => void;
  title: string;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(title);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const fullTranscriptRef = useRef(""); // Храним полный текст

  useEffect(() => {
    setTranscript(title);
    fullTranscriptRef.current = title;
  }, [title]);

  const startRecording = async () => {
    try {
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
        let fullText = title + " ";

        // Собираем все результаты, а не только последний
        for (let i = 0; i < results.length; i++) {
          if (results[i].isFinal) {
            fullText += results[i][0].transcript + " ";
          } else {
            // Для промежуточных результатов
            fullText += results[i][0].transcript;
          }
        }

        fullTranscriptRef.current = fullText.trim();
        setTranscript(fullText.trim());
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Ошибка распознавания:", event.error);
        stopRecording();
      };

      recognition.onend = () => {
        // Автоматически перезапускаем распознавание после паузы
        if (isRecording) {
          recognition.start();
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      // fullTranscriptRef.current = ""; // Сбрасываем при новом запуске
      // setTranscript("");
    } catch (err) {
      console.error("Ошибка доступа к микрофону:", err);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Отключаем auto-restart
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

    const finalText = fullTranscriptRef.current;
    if (finalText) {
      onSaveAction(finalText);
      setTranscript("");
      fullTranscriptRef.current = "";
    }
  };
  const scrollToBottom = useCallback(() => {
    if (transcriptContainerRef.current) {
      const container = transcriptContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Скроллим при изменении transcript
  useEffect(() => {
    scrollToBottom();
  }, [transcript, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  return (
    <Flex align="center" className="w-full">
      <div className="rounded-lg w-full max-w-md">
        {isRecording ? (
          <div
            ref={transcriptContainerRef}
            className="text-xl font-semibold border-b border-gray-300 focus:outline-none focus:border-indigo-400 text-center w-full mb-4 p-2 pb-0 max-w-md max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
          >
            <p className="text-gray-800 h-[28px] dark:text-gray-200 whitespace-pre-wrap break-words">
              {transcript}
            </p>
          </div>
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
      <motion.div
        onClick={isRecording ? stopRecording : startRecording}
        animate={
          isRecording
            ? {
                backgroundColor: [
                  "rgba(255,255,255,0)",
                  "#ff6d6d",
                  "rgba(255,255,255,0)",
                ],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {
                backgroundColor: "rgba(255,255,255,0)",
                transition: { duration: 0.2, ease: "easeInOut" },
              }
        }
        className={cn("rounded-full p-1 cursor-pointer")}
      >
        <Mic />
      </motion.div>
    </Flex>
  );
}
