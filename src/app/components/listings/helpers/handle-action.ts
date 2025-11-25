import { setPendingAction } from "./get-set-pending";
import { renderTaskRow } from "./render-task-row";
import { tasks } from "./tasks";

// Update the handleAction function to work with the new structure
const handleAction = (task, actionType) => {
  setPendingAction({ id: task.id, type: actionType });

  // Find and update the specific table that contains this task
  const tables = document.querySelectorAll(".rounded-lg.border.bg-card");
  tables.forEach((tableContainer) => {
    const rows = tableContainer.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      if (tasks[index] && tasks[index].id === task.id) {
        // Replace the row with updated version
        const newRow = renderTaskRow(task);
        row.parentNode.replaceChild(newRow, row);
      }
    });
  });

  setTimeout(() => {
    setPendingAction(null);
    console.log(`Action "${actionType}" completed for task:`, task.title);

    // Update all tables again to remove loading state
    const updatedTables = document.querySelectorAll(
      ".rounded-lg.border.bg-card",
    );
    updatedTables.forEach((tableContainer) => {
      const rows = tableContainer.querySelectorAll("tbody tr");
      rows.forEach((row, index) => {
        if (tasks[index] && tasks[index].id === task.id) {
          const newRow = renderTaskRow(task);
          row.parentNode.replaceChild(newRow, row);
        }
      });
    });
  }, 1000);
};

export { handleAction };
