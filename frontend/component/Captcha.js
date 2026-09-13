"use client";

import React, { useEffect, useRef } from "react";

export function generateCaptchaCode(length = 6) {
  // Exclude easily confused characters (0, O, o, 1, I, l)
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function Captcha({
  captchaCode,
  onRefresh,
  userInput,
  onUserInputChange,
  error,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !captchaCode) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background color: clean light slate
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    // Draw random curved disturbance lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = ["#cbd5e1", "#94a3b8", "#86efac", "#93c5fd"][i % 4];
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Draw random noise dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw characters with varied colors and slight rotation
    const charSpacing = width / (captchaCode.length + 1);
    const colors = ["#0f172a", "#15803d", "#1e40af", "#b91c1c", "#4338ca", "#0369a1"];

    ctx.font = "bold 24px monospace";
    ctx.textBaseline = "middle";

    for (let i = 0; i < captchaCode.length; i++) {
      const char = captchaCode[i];
      const x = (i + 1) * charSpacing;
      const y = height / 2 + (Math.random() * 4 - 2);
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(char, -8, 0);
      ctx.restore();
    }
  }, [captchaCode]);

  return (
    <div className="space-y-2">
      <label
        htmlFor="captchaInput"
        className="block text-sm font-medium text-slate-700 sm:text-base"
      >
        Security Verification
      </label>

      <div className="flex items-center gap-3">
        {/* Captcha Canvas Image */}
        <div className="overflow-hidden rounded-lg border border-slate-300 bg-slate-50 shadow-inner">
          <canvas
            ref={canvasRef}
            width={160}
            height={44}
            className="block cursor-pointer select-none"
            onClick={onRefresh}
            title="Click image to refresh code"
          />
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          title="Refresh CAPTCHA"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Input Field */}
      <input
        id="captchaInput"
        type="text"
        placeholder="Enter the 6-character code"
        value={userInput}
        onChange={onUserInputChange}
        autoComplete="off"
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 sm:px-4 sm:text-base"
      />

      {error && (
        <p className="text-xs font-medium text-red-600 sm:text-sm">{error}</p>
      )}
    </div>
  );
}
