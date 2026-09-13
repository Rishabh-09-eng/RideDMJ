"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { createClient } from "@/utils/supabase/client";

export default function AdminScannerPage() {
  const router = useRouter();
  const supabase = createClient();
  const scannerRef = useRef(null);

  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  // 1. Verify Admin Session on mount
  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user || user.app_metadata?.role !== "admin") {
        alert("Access Denied: Admin privileges required.");
        router.push("/login?redirect=/admin/scan");
        return;
      }

      setAdminToken(session.access_token);
    }

    checkAdmin();
  }, [router, supabase]);

  // 2. Initialize and start camera
  useEffect(() => {
    if (!adminToken) return;

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode
      .start(
        { facingMode: "environment" }, // Uses rear camera
        config,
        onScanSuccess
      )
      .then(() => setIsScanning(true))
      .catch((err) => console.error("Camera start error:", err));

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [adminToken]);

  // 3. Handle QR Code Detection
  async function onScanSuccess(decodedText) {
    if (isProcessing) return; // Prevent duplicate triggers

    setIsProcessing(true);

    // Extract ticket_code whether the QR contains a full URL or just the code
    let ticketCode = decodedText;
    if (decodedText.includes("code=")) {
      const url = new URL(decodedText);
      ticketCode = url.searchParams.get("code");
    } else if (decodedText.includes("/verify/")) {
      ticketCode = decodedText.split("/verify/").pop();
    }

    try {
      // Call backend with Admin Bearer token
      const res = await fetch(`http://localhost:8000/api/admin/verify-ticket/${ticketCode}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setScanResult(data);

      // Haptic feedback (Vibrate phone)
      if (navigator.vibrate) {
        if (data.status === "SUCCESS") navigator.vibrate(200); // Quick pulse
        else navigator.vibrate([100, 100, 100]); // Triple pulse error
      }
    } catch (err) {
      setScanResult({ status: "ERROR", message: "Network / Verification failed" });
    } finally {
      // Allow scanning next ticket after 2.5 seconds
      setTimeout(() => {
        setIsProcessing(false);
        setScanResult(null);
      }, 2500);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Bus Conductor Scanner</h1>
        <button
          onClick={() => router.push("/my-booking")}
          className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300"
        >
          Exit
        </button>
      </div>

      {/* Camera Viewfinder */}
      <div className="w-full max-w-md relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-black aspect-square">
        <div id="reader" className="w-full h-full"></div>

        {/* Floating Scan Overlay Result Banner */}
        {scanResult && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md transition-all ${
              scanResult.status === "SUCCESS"
                ? "bg-green-600/90 text-white"
                : "bg-red-600/90 text-white"
            }`}
          >
            <span className="text-5xl mb-2">
              {scanResult.status === "SUCCESS" ? "✅" : "❌"}
            </span>
            <h2 className="text-2xl font-bold">{scanResult.message}</h2>

            {scanResult.trip && (
              <div className="mt-3 bg-black/30 px-4 py-2 rounded-xl text-sm space-y-1">
                <p><strong>Bus:</strong> Bus {scanResult.trip.bus_id}</p>
                <p><strong>Time:</strong> {scanResult.trip.time}</p>
                <p><strong>Route:</strong> {scanResult.trip.direction?.replace(/_/g, " ")}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-slate-400 text-center max-w-xs">
        Point camera at passenger&apos;s ticket QR code. The scanner will automatically approve valid tickets.
      </p>
    </main>
  );
}