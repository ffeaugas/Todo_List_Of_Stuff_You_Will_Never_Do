
/*  Cross Button    */

const crossButtons = document.querySelectorAll('.cross_button');

crossButtons.forEach(crossButton => {
    crossButton.addEventListener('click', function () {
        const task_li = crossButton.parentNode;
        task_li.remove();
        updateTastCheckedCounter();
    })
})

/* Task checked counter */

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function () {
        updateTastCheckedCounter();
    })
})

function updateTastCheckedCounter() {
    const taskCheckedCounter = document.getElementById('task_count');
    const checkboxesArray = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    let counter = checkboxesArray.reduce(function (count, checkbox) {
        if (checkbox.checked)
            return (count + 1);
        return (count);
    }, 0);
    console.log(counter);
    let res = counter + ' items left';
    taskCheckedCounter.textContent = res;
}

/* Text input */

const tasklist = document.getElementById('tasklist');

const input = document.querySelector('input[type="text"]');

input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let enteredText = input.value;
        newTask = createTask(enteredText);
        tasklist.appendChild(newTask);
    }
});

function createTask(enteredText) {

    const newTask = document.createElement('li');
    newTask.classList.add('task_li');
    const label = document.createElement('label');
    label.classList.add('checkbox');
    const inputt = document.createElement('input');
    inputt.type = 'checkbox';
    label.appendChild(inputt);
    newTask.appendChild(label);
    const p = document.createElement('p');
    p.textContent = enteredText;
    newTask.appendChild(p);
    const cross = document.createElement('b');
    cross.classList.add('cross_button');
    cross.innerHTML = '&#215';
    newTask.appendChild(cross);
    return newTask;
}