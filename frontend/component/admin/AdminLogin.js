"use client"

import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.refresh();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-[#1b1b18] border border-white/10 rounded-2xl p-8"
    >
    
        <h2 className="text-2xl font-bold text-center">
            Admin Login
        </h2>
    
        <p className="text-white/60 text-center mt-2">
            Enter the admin password to continue.
        </p>
    
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mt-8 bg-[#232320] border border-white/10 rounded-lg px-4 py-3 outline-none"
        />
    
        <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#F5F3ED] text-black py-3 rounded-xl font-semibold disabled:opacity-60"
        >
            {loading ? "Checking..." : "Login"}
        </button>
    
    </form>
    
      )
    }
    
export default AdminLogin
