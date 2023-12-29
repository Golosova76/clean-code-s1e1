//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".input-task_add");  //Add a new task.
const addButton = document.querySelector(".button_add");  //first button
const incompleteTaskHolder = document.getElementById("section-todo");
const completedTasksHolder = document.getElementById("section-completed");

//New task list item
const createNewTaskElement = function(taskString) {
  const listItem = document.createElement("li");
  //input (checkbox)
  const checkBox = document.createElement("input");  //checkbx
  //label
  const label = document.createElement("label");  //label
  //input (text)
  const editInput = document.createElement("input");  //text
  //button.edit
  const editButton = document.createElement("button");  //edit button
  //button.delete
  const deleteButton = document.createElement("button");  //delete button
  const deleteButtonImg = document.createElement("img");  //delete button image

  label.innerText = taskString;
  label.className = 'input__label';
  listItem.className = 'item-li';
  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = 'input-checkbox';
  editInput.type = "text";
  editInput.className = "input-task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "button button_edit";

  deleteButton.className = "button button_remove";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Remove button icon';
  deleteButtonImg.className = 'button__delete';
  deleteButton.appendChild(deleteButtonImg);
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.input-task');
  const label = listItem.querySelector(".input__label");
  const editBtn = listItem.querySelector(".button_edit");
  const containsClass = listItem.classList.contains("item-li_edit");
  //If class of the parent is .editmode
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("item-li_edit");
};


//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = function() {
  console.log("AJAX Request");
}
//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  // console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".input-checkbox");
  const editButton = taskListItem.querySelector(".button_edit");
  const deleteButton = taskListItem.querySelector(".button_remove");
  if (checkBox) {
    checkBox.removeEventListener("change", taskCompleted);
    checkBox.removeEventListener("change", taskIncomplete);
    checkBox.addEventListener("change", checkBoxEventHandler);
  }
  if (editButton) {
    editButton.addEventListener("click", editTask);
  }
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteTask);
  }
}
//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.