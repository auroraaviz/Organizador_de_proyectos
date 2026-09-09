"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface Phase {
    id: number;
    name: string;
    orderNumber: number;
    progress: number;
    weight: number;
    dueDate: string | null;
}

export default function PhaseProgressControl({
    projectId,
    phase,
}: {
    projectId: number;
    phase: Phase;
}) {
    const [progress, setProgress] = useState(phase.progress);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    async function handleSave() {
        setSaving(true);
        try {
            await api.put(`/projects/${projectId}/phases/${phase.id}`, {
                name: phase.name,
                orderNumber: phase.orderNumber,
                progress,
                weight: phase.weight,
                dueDate: phase.dueDate,
            });
            router.refresh();
        } catch (err) {
            //si falla el valor visual se revierte al recargar
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="flex items-center gap-2 mt-2">
            <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 accent-primary"
                />

            <span className="text-xs font-mono text-ink/60 w-9 text-right">{progress}%</span>
            {progress !== phase.progress && (
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="text-xs px-2 py-1 rounded-md bg-primary text-paper hover:bg-primary-dark transition-colors disabled:opacity-60">
                {saving ? "..." : "Guardar"}
                </button>
            )}
        </div>
    );
}