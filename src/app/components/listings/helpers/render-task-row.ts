import { isTaskActionPending, isTaskBusy } from "./state-action";
import { getStatusBadge } from "./get-status-badge";
import { icons } from "./icons";
import createButton from "./create-button";
import { handleAction } from "./handle-action";

const renderTaskRow = (task) => {
  const busy = isTaskBusy(task.id);
  const startPending = isTaskActionPending("start", task.id);
  const pausePending = isTaskActionPending("pause", task.id);
  const completePending = isTaskActionPending("complete", task.id);
  const deletePending = isTaskActionPending("delete", task.id);

  const row = document.createElement("tr");
  row.className =
    "border-b group transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer";

  const wrapper = document.createElement("div");
  wrapper.className = "relative w-full flex items-stretch min-h-[64px]";

  const overlay = document.createElement("div");
  overlay.className =
    "absolute inset-0 pointer-events-none bg-[#1e293b0f] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg";
  wrapper.appendChild(overlay);

  const titleCell = document.createElement("div");
  titleCell.className = "h-16 px-4 flex-1 flex items-center font-medium";
  titleCell.textContent = task.title;

  const ownerCell = document.createElement("div");
  ownerCell.className =
    "h-16 px-4 flex-1 flex items-center text-sm text-muted-foreground";
  ownerCell.textContent = task.owner;

  const statusCell = document.createElement("div");
  statusCell.className = "h-16 px-4 flex-1 flex items-center";
  statusCell.appendChild(getStatusBadge(task.status));

  const dueDateCell = document.createElement("div");
  dueDateCell.className =
    "h-16 px-4 flex-1 flex items-center text-sm text-muted-foreground";
  dueDateCell.textContent = task.dueDate;

  const descriptionCell = document.createElement("div");
  descriptionCell.className =
    "h-16 px-4 flex-1 flex items-center max-w-[300px] text-sm text-muted-foreground";
  const descriptionSpan = document.createElement("span");
  descriptionSpan.className = "block cursor-help truncate";
  descriptionSpan.textContent = task.description;
  descriptionSpan.title = task.description;
  descriptionCell.appendChild(descriptionSpan);

  const actionsCell = document.createElement("div");
  actionsCell.className = "h-16 px-4 flex items-center";

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex items-center gap-1";

  // Start button (for pending/blocked tasks)
  if (task.status === "pending" || task.status === "blocked") {
    const startButton = createButton(
      startPending ? icons.loader : icons.play,
      "Start",
      () => handleAction(task, "start"),
      busy
    );
    actionsDiv.appendChild(startButton);
  }

  // Pause and Complete buttons (for in-progress tasks)
  if (task.status === "in-progress") {
    const pauseButton = createButton(
      pausePending ? icons.loader : icons.pause,
      "Pause",
      () => handleAction(task, "pause"),
      busy
    );
    actionsDiv.appendChild(pauseButton);

    const completeButton = createButton(
      completePending ? icons.loader : icons.check,
      "Complete",
      () => handleAction(task, "complete"),
      busy
    );
    actionsDiv.appendChild(completeButton);
  }

  // Delete button (always present)
  const deleteButton = createButton(
    deletePending ? icons.loader : icons.trash,
    "Delete",
    () => handleAction(task, "delete"),
    busy,
    "destructive"
  );
  actionsDiv.appendChild(deleteButton);

  // View button (always present)
  const viewButton = createButton(
    icons.file,
    "View Details",
    () => handleAction(task, "view"),
    busy
  );

  actionsDiv.appendChild(viewButton);
  actionsCell.appendChild(actionsDiv);

  wrapper.appendChild(titleCell);
  wrapper.appendChild(ownerCell);
  wrapper.appendChild(statusCell);
  wrapper.appendChild(dueDateCell);
  wrapper.appendChild(descriptionCell);
  wrapper.appendChild(actionsCell);

  const cell = document.createElement("td");
  cell.colSpan = 6;
  cell.className = "p-0 border-0 bg-transparent";
  cell.appendChild(wrapper);
  row.appendChild(cell);

  return row;
};

export { renderTaskRow };
