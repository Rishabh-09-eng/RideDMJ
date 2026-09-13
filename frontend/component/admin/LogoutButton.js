"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {

    const router = useRouter();

    const handleLogout = async () => {

        await fetch("/api/admin/logout", {
            method: "POST",
        });

        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl hover:bg-white/10 transition"
        >
            <LogOut size={18} />
            Logout
        </button>
    );
};

export default LogoutButton;