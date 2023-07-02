const inputText = document.querySelector('input[type="text"]');
const inputCheckbox = document.querySelector('form input[type="checkbox"]');
const tasklist = document.getElementById('tasklist');
const clearComplete = document.getElementById('task_clearer');
const taskCheckedCounter = document.getElementById('task_count');
const filterButtons = document.querySelectorAll('button');
const lightModeButton = document.getElementById('light_mode_icon');
const darkModeButton = document.getElementById('dark_mode_icon');

/* Functions */

function updateTaskCheckedCounter() {
    const checkboxesArray = Array.from(document.querySelectorAll('ul input[type="checkbox"]'));
    let counter = checkboxesArray.reduce(function (count, checkbox) {
        if (checkbox.checked)
            return (count);
        return (count + 1);
    }, 0);
    if (!counter)
        taskCheckedCounter.textContent = 'No item left';
    else if (counter === 1)
        taskCheckedCounter.textContent = counter + ' item left';
    else
        taskCheckedCounter.textContent = counter + ' items left';
}

/* Dark/light mode event */

darkModeButton.addEventListener('click', function () {
    document.querySelector('body').classList.add('dark_color');
    darkModeButton.classList.add('hide');
    lightModeButton.classList.remove('hide');
})

lightModeButton.addEventListener('click', function () {
    document.querySelector('body').classList.remove('dark_color');
    darkModeButton.classList.remove('hide');
    lightModeButton.classList.add('hide');
})

/* Clear complete event */

clearComplete.addEventListener('click', function () {
    const tasks = document.querySelectorAll('ul .task_li');
    tasks.forEach(task => {
        if (task.querySelector('input').checked)
            task.remove();
    })
    updateTaskCheckedCounter();
})

/* Selector Buttons */

filterButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const filter = button.getAttribute('data-filter');
        button.parentNode.querySelector('.selected').classList.remove('selected');
        button.classList.add('selected');
        if (filter === 'active') {
            tasklist.classList.add('hide_completed');
            tasklist.classList.remove('hide_active');
        }
        else if (filter === 'completed') {
            tasklist.classList.add('hide_active');
            tasklist.classList.remove('hide_completed');
        }
        else {
            tasklist.classList.remove('hide_active');
            tasklist.classList.remove('hide_completed');
        }
    })
})

/* Text input event */

inputText.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        newTask = new Task(inputText.value, inputCheckbox.checked);
        newTask.appendTo(tasklist);
        inputText.value = '';
    }
});

/* Class */

class Task {
    #element

    constructor(inputText, isChecked) {
        const newTask = document.createElement('li');
        newTask.classList.add('task_li');
        this.#element = newTask;

        const label = document.createElement('label');
        label.classList.add('checkbox');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const p = document.createElement('p');
        p.textContent = inputText;

        const cross = document.createElement('b');
        cross.classList.add('cross_button');
        cross.innerHTML = '&#215';

        label.appendChild(checkbox);
        newTask.appendChild(label);
        newTask.appendChild(p);
        newTask.appendChild(cross);

        if (isChecked) {
            checkbox.checked = true;
            newTask.classList.add('is_completed');
            p.classList.add('p_checked');
        }

        checkbox.addEventListener('click', function () {
            updateTaskCheckedCounter();
            if (checkbox.checked) {
                newTask.classList.add('is_completed');
                p.classList.add('p_checked');
            }
            else {
                newTask.classList.remove('is_completed');
                p.classList.remove('p_checked');
            }
        })

        cross.addEventListener('click', function () {
            newTask.remove();
            updateTaskCheckedCounter();
        })
    }

    appendTo(element) {
        element.appendChild(this.#element);
        updateTaskCheckedCounter();
    }
}