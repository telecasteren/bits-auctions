import { createBadge } from "./create-badge";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return createBadge(
        "Active",
        "bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0",
      );
    case "ended":
      return createBadge(
        "Ended",
        "bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0",
      );
    default:
      return createBadge(
        status,
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      );
  }
};
export { getStatusBadge };
