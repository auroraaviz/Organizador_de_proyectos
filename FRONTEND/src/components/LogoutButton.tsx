"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.push("/login");
        router.refresh();
    }

    return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg border border-border text-ink/70 text-sm font-medium hover:bg-white/60 hover:text-ink transition-colors"
    >
      Cerrar sesión
    </button>
  );
}