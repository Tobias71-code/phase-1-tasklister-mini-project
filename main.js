let addToDoButton = document.getElementById('addToDo');
let sortTasksButton = document.getElementById('sortTasks');
let inputField = document.getElementById('inputField');
let userField = document.getElementById('userField');
let durationField = document.getElementById('durationField');
let dateField = document.getElementById('dateField');
let taskPriority = document.getElementById('taskPriority');
let toDoContainer = document.getElementById('toDoContainer');

let tasks = []; // Array to hold tasks

// Event listener to add tasks
addToDoButton.addEventListener('click', function() {
    // Check if all fields are filled
    if (inputField.value.trim() !== '' && userField.value.trim() !== '' && durationField.value.trim() !== '' && dateField.value.trim() !== '') {
        let task = {
            description: inputField.value,
            user: userField.value,
            duration: durationField.value,
            dueDate: dateField.value,
            priority: taskPriority.value,
            isDone: false // Track completion status
        };

        tasks.push(task); // Add task to the tasks array
        displayTasks(); // Update the displayed tasks
        clearInputs(); // Clear input fields
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to display tasks
function displayTasks() {
    toDoContainer.innerHTML = ''; // Clear the container before displaying tasks

    tasks.forEach((task, index) => {
        let paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-styling');

        // Set task description
        paragraph.innerText = `${task.description} - [Assigned to: ${task.user}, Duration: ${task.duration} hrs, Due: ${task.dueDate}]`; // Corrected template literal syntax

        // Apply priority class
        if (task.priority === 'high') {
            paragraph.classList.add('high-priority');
        } else if (task.priority === 'medium') {
            paragraph.classList.add('medium-priority');
        } else if (task.priority === 'low') {
            paragraph.classList.add('low-priority');
        }

        // Strike through the task when clicked (mark as done)
        paragraph.addEventListener('click', function() {
            task.isDone = !task.isDone; // Toggle completion status
            paragraph.style.textDecoration = task.isDone ? "line-through" : "none";
        });

        // Remove the task when double-clicked
        paragraph.addEventListener('dblclick', function() {
            tasks.splice(index, 1); // Remove task from the array
            displayTasks(); // Update the displayed tasks
        });

        toDoContainer.appendChild(paragraph); // Append the paragraph to the container
    });
}

// Function to clear input fields
function clearInputs() {
    inputField.value = '';
    userField.value = '';
    durationField.value = '';
    dateField.value = '';
    taskPriority.value = 'low'; // Reset priority to default
}

// Function to sort tasks based on priority
function sortTasks() {
    tasks.sort((a, b) => {
        const priorityOrder = {
            'high': 3,
            'medium': 2,
            'low': 1
        };
        return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort in descending order
    });
    displayTasks(); // Update the displayed tasks after sorting
}

// Event listener for the sort button
sortTasksButton.addEventListener('click', sortTasks);
