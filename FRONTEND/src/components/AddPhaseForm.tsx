"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AddPhaseForm({ projectId}: { projectId: number }) {
    const [name, setName] = useState("");
    const [orderNumber, setOrderNumber] = useState(1);
    const [weight, setWeight] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        await api.post(`/projects/${projectId}/phases`, {
            name,
            orderNumber,
            progress: 0,
            weight,
            dueDate: dueDate || null,
        });
        setName("");
        router.refresh();
    } catch (err) {
        setError("No se ha creado la fase correctamente.")
    } finally {
        setLoading(false);
    }
}

return (
    <form
    onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-ink"> Añadir nueva fase </h3>
    
        <input
            type="text"
            placeholder="Nombre de la fase"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"/>
           
        <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
                <label className="text-xs text-ink/60"> Orden </label>
                <input
                    type="number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(Number(e.target.value))}
                    min={1}
                    className="px-3 py-2 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"/>
            </div>

        <div className="flex flex-col gap-1">
            <label className="text-xs text-ink/60"> Peso </label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={1}
                className="px-3 py-2 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"/>
        </div>
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-xs text-ink/60"> Fecha límite </label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-paper text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"/>
        </div>

            {error && (
                <p className="text-xs text-primary-dark bg-primary/10 rounded-lg px-3 py-2"> {error} </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-1 py-2.5 rounded-lg bg-primary text-paper text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
                    {loading ? "Añadiendo..." : "Añadir fase"}
                </button>
            </form>
        );
    }