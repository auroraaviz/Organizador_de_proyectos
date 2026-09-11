type ProjectStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

const statusStyles: Record<ProjectStatus, string> = {
    PLANNED: "bg-secondary/20 text-primary-dark",
    IN_PROGRESS: "bg-primary/15 text-primary-dark",
    COMPLETED: "bg-accent/25 text-primary-dark",
    DELAYED: "bg-[#591A2A]/20 text-[#2E0F16]",
};

const statusLabels: Record<ProjectStatus, string> = {
    PLANNED: "Planificado",
    IN_PROGRESS: "En curso",
    COMPLETED: "Completado",
    DELAYED: "Retrasado",
};

export default function StatusBadge({ status }: { status?: string }) {
    if (!status || !(status in statusLabels)) return null;

    const s = status as ProjectStatus;

    return (
        <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[s]}`}>
                {statusLabels[s]}
            </span>
    );
}