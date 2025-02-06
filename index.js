const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
};

let tasks = getTasksFromLocalStorage();

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
};

function getNextTaskId() {
    return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

function getCurrentDate() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `Criado em: ${dia}/${mes}/${ano}`;
}

function elementTask({ id, description, etiqueta, checked, date }) {
    const tarefa = document.createElement('li');
    tarefa.className = `todo-item ${checked ? 'concluida' : ''}`;

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const descricao = document.createElement('span');
    descricao.className = 'descricao';
    descricao.textContent = description;
    if (checked) descricao.classList.add('tarefa-concluida');

    const extraInfo = document.createElement('div');
    extraInfo.className = 'extra-info';

    const etiquetaBadge = document.createElement('span');
    etiquetaBadge.className = 'etiqueta';
    etiquetaBadge.textContent = etiqueta;

    const dataCriacao = document.createElement('span');
    dataCriacao.className = 'data-criacao';
    dataCriacao.textContent = date;

    extraInfo.appendChild(etiquetaBadge);
    extraInfo.appendChild(dataCriacao);

    taskInfo.appendChild(descricao);
    taskInfo.appendChild(extraInfo);
    tarefa.appendChild(taskInfo);

    const actionContainer = document.createElement('div');
    actionContainer.className = 'action-container';

    if (checked) {
        const checkIcon = document.createElement('span');
        checkIcon.className = 'check-icone';
        checkIcon.innerHTML = '✔';
        actionContainer.appendChild(checkIcon);
    } else {
        const concluirBtn = document.createElement('button');
        concluirBtn.className = 'concluir-tarefa-btn';
        concluirBtn.textContent = 'Concluir';
        concluirBtn.onclick = () => completeTask(id, descricao, concluirBtn);
        actionContainer.appendChild(concluirBtn);
    }

    tarefa.appendChild(actionContainer);
    return tarefa;
}
function addTaskToList() {
    document.getElementById("create-todo-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const descriptionInput = document.getElementById("description");
        const etiquetaInput = document.getElementById("etiqueta");
        
        const description = descriptionInput.value.trim();
        const etiqueta = etiquetaInput.value.trim();

        if (!description || !etiqueta) {
            alert("Preencha todos os campos!");
            return;
        }

        const newTask = { id: getNextTaskId(), description, etiqueta, checked: false, date: getCurrentDate() };
        tasks.push(newTask);
        setTasksInLocalStorage(tasks);
        document.getElementById("todo-list").appendChild(elementTask(newTask));
        
        descriptionInput.value = "";
        etiquetaInput.value = "";
    });
}

function completeTask(id, descricao, btn) {
    descricao.classList.add('tarefa-concluida');
    
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icone';
    checkIcon.innerHTML = '✔';
    btn.replaceWith(checkIcon);
    
    tasks = tasks.map(task => task.id === id ? { ...task, checked: true } : task);
    setTasksInLocalStorage(tasks);

    completeTasksCount(tasks);
}

function loadTasks() {
    const list = document.getElementById('todo-list');
    tasks.forEach(task => list.appendChild(elementTask(task)));
}

const completeTasksCount = (tasks) => {
    const footer = document.getElementById("todo-footer");
    footer.innerHTML = ""; 

    const totalConcluidas = tasks.filter(task => task.checked).length;

    const mensagem = document.createElement("p");
    mensagem.textContent = `${totalConcluidas} Tarefas concluídas: `;
    footer.appendChild(mensagem);
}


window.onload = function () {
    loadTasks();
    addTaskToList();
    completeTasksCount(tasks);
}