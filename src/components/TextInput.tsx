"use client";
import { useState } from "react";

export function TextInput({
  onSaveAction,
}: {
  onSaveAction: (text: string) => void;
}) {
  const [dreamText, setDreamText] = useState("");

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Опиши сон</label>
      <textarea
        value={dreamText}
        onChange={(e) => setDreamText(e.target.value)}
        placeholder="Сегодня мне снилось..."
        className="w-full p-4 bg-gray-800 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 text-white"
        rows={5}
      />
      <button
        onClick={() => onSaveAction(dreamText)}
        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
    </div>
  );
}
