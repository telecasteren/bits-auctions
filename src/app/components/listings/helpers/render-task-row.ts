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

  const row = document.createElement("tr");
  row.className =
    "border-b group transition-colors hover:bg-[#1e293b0f] inner-shadow-md data-[state=selected]:bg-muted cursor-pointer";

  const titleTd = document.createElement("td");
  titleTd.className = "pl-10 align-middle px-4 py-4 font-medium";
  titleTd.textContent = task.title;
  row.appendChild(titleTd);

  const sellerTd = document.createElement("td");
  sellerTd.className =
    "text-center align-middle px-4 py-4 text-sm text-muted-foreground";
  sellerTd.textContent = task.seller;
  row.appendChild(sellerTd);

  const statusTd = document.createElement("td");
  statusTd.className = "text-center align-middle px-4 py-4";
  statusTd.appendChild(getStatusBadge(task.status));
  row.appendChild(statusTd);

  const createdDate = document.createElement("td");
  createdDate.className =
    "text-center align-middle px-4 py-4 text-sm text-muted-foreground";
  createdDate.textContent = task.created;
  row.appendChild(createdDate);

  const descriptionTd = document.createElement("td");
  descriptionTd.className =
    "text-center align-middle px-4 py-4 max-w-[300px] text-sm text-muted-foreground";
  const descriptionSpan = document.createElement("span");
  descriptionSpan.className = "block cursor-help truncate";
  descriptionSpan.textContent = task.description;
  descriptionSpan.title = task.description;
  descriptionTd.appendChild(descriptionSpan);
  row.appendChild(descriptionTd);

  const actionsTd = document.createElement("td");
  actionsTd.className = "text-center align-middle px-6 py-4";
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex items-center gap-1";

  // Start button (for pending/blocked tasks)
  if (task.status === "pending" || task.status === "blocked") {
    const startButton = createButton(
      startPending ? icons.loader : icons.play,
      "Start",
      () => handleAction(task, "start"),
      busy,
    );
    actionsDiv.appendChild(startButton);
  }

  // Pause and Complete buttons (for in-progress tasks)
  if (task.status === "in-progress") {
    const pauseButton = createButton(
      pausePending ? icons.loader : icons.pause,
      "Pause",
      () => handleAction(task, "pause"),
      busy,
    );
    actionsDiv.appendChild(pauseButton);

    const completeButton = createButton(
      completePending ? icons.loader : icons.check,
      "Complete",
      () => handleAction(task, "complete"),
      busy,
    );
    actionsDiv.appendChild(completeButton);
  }

  const viewButton = createButton(
    icons.file,
    "View Details",
    () => handleAction(task, "view"),
    busy,
  );

  actionsDiv.appendChild(viewButton);
  actionsTd.appendChild(actionsDiv);
  row.appendChild(actionsTd);

  return row;
};

export { renderTaskRow };
