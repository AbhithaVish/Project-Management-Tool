const columns = document.querySelectorAll(".column");
const addTaskBtn = document.getElementById("addTaskBtn");
const modal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskIdInput = document.getElementById("taskIdInput");
const assigneeInput = document.getElementById("assigneeInput");
const statusInput = document.getElementById("statusInput");
const modalTitle = document.getElementById("modalTitle");

let editingTask = null;

// Show modal
addTaskBtn.onclick = () => {
  modal.style.display = "block";
  modalTitle.innerText = "Add Task";
  taskIdInput.value = "";
  assigneeInput.value = "";
  statusInput.value = "Pending";
  editingTask = null;
};

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Save Task
saveTaskBtn.onclick = () => {
  const jobId = taskIdInput.value.trim();
  const assignee = assigneeInput.value.trim();
  const status = statusInput.value;

  if (!jobId || !assignee) return alert("Please fill all fields");

  if (editingTask) {
    editingTask.querySelector(".task-text").innerText = `${jobId}: ${assignee}`;
    editingTask = null;
  } else {
    const task = createTaskElement(`${jobId}: ${assignee}`);
    document.getElementById(status).appendChild(task);
  }

  modal.style.display = "none";
};

// Create Task
function createTaskElement(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerHTML = `<span class="task-text">${text}</span>
                    <div>
                      <button class="edit">✏</button>
                      <button class="delete">🗑</button>
                    </div>`;

  addTaskEvents(task);
  return task;
}

// Add Edit/Delete Events
function addTaskEvents(task) {
  task.querySelector(".delete").onclick = () => task.remove();
  task.querySelector(".edit").onclick = () => {
    modal.style.display = "block";
    modalTitle.innerText = "Edit Task";
    const [jobId, assignee] = task.querySelector(".task-text").innerText.split(": ");
    taskIdInput.value = jobId;
    assigneeInput.value = assignee;
    statusInput.value = task.parentElement.id;
    editingTask = task;
  };

  // Drag events
  task.addEventListener("dragstart", () => task.classList.add("dragging"));
  task.addEventListener("dragend", () => task.classList.remove("dragging"));
}

// Drag and Drop
columns.forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    column.appendChild(draggingTask);
  });
});
