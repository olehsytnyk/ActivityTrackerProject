let taskInput = document.getElementById("new-activity");

let addButton = document.getElementsByTagName("button")[0];

let incompleteTaskHolder = document.getElementById("incomplete-activity");

let completedTasksHolder = document.getElementById("completed-activity");


let createNewTaskElement = function (taskString) {

	let listItem = document.createElement("li");


	let checkBox = document.createElement("input"); //checkbox

	let label = document.createElement("label"); //label

	let editInput = document.createElement("input"); //text

	let editButton = document.createElement("button"); //edit button

	let deleteButton = document.createElement("button"); //delete button

	label.innerText = taskString;

	//each elements needs appending
	checkBox.type = "checkbox";
	editInput.type = "text";


	//innerText encodes special characters HTML does not
	editButton.innerText = "Edit";	
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	//and appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

let addTask = function () {
	console.log("Add Activity...");

	let listItem = createNewTaskElement(taskInput.value);

	if (taskInput.value == "") {
		return;
	}

	//eppend listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}

let editTask = function () {
	console.log("Edit Activity...");
	console.log("Change 'edit' to 'save'");

	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
	//if class of the parent is editmode
	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
	listItem.classList.toggle("editMode");
}

let deleteTask = function () {
	console.log("Delete Activity...");

	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	//remove the parent list item from the ul
	ul.removeChild(listItem);

}

let taskCompleted = function () {
	console.log("Complete Activity...");

	//append the task list item to the #completed-activity
	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete = function () {
	console.log("Incomplete Activity...");
	//mark task as incomplete
	let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}


addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log("bind list item events");
	//select ListItems children
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");



	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
