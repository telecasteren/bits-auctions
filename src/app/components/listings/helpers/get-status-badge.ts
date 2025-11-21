import { createBadge } from "./create-badge.ts";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return createBadge(
        "Pending",
        "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0"
      );
    case "in-progress":
      return createBadge(
        "In Progress",
        "bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0"
      );
    case "completed":
      return createBadge(
        "Completed",
        "bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
      );
    case "blocked":
      return createBadge(
        "Blocked",
        "bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
      );
    default:
      return createBadge(
        status,
        "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      );
  }
};
export { getStatusBadge };
