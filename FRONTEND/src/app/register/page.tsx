"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            throw new Error("No se ha podido crear el usuario");
        }

        //registro correcto se redirige al login
        router.push("/login");
    } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
        setLoading(false);
    }
        }

        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="w-2 h-2 rounded-full bg-primary-dark" />
                            <span className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <h1 className="text-3xl font-display font-semibold text-ink"> Crear cuenta </h1>
                        <p className="text-sm text-ink/60 mt-1"> Sigue el progreso de tu proyecto </p>
                    </div>

                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white/60 border border-border rounded-2x1 p-6 flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-ink/70"> Usuario </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="px-3 py-2.5 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-ink/70"> Contraseña </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="px-3 py-2.5 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                            </div>

                            {error && (
                                <p className="text-xs text-primary-dark bg-primary/10 rounded-lg px-3 py-2">
                                    {error}
                                </p>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="mt-2 py-2.5 rounded-lg bg-primary text-paper text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
                                    {loading ? "Creando..." : "Registrarse"}
                                </button>
                        </form>

                        <p className="mt-5 text-center text-sm text-ink/60">
                            ¿Ya tienes cuenta? {" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Iniciar sesión
                        </Link>
                        </p>
                </div>
            </div>
        );
    }

