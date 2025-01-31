let tasks = [
    { id: 1, description: 'Implementar tela de listagem de tarefas', etiqueta: 'frontend', checked: false },
    { id: 2, description: 'Criar endpoint para cadastro de tarefas', etiqueta: 'backend', checked: false },
    { id: 3, description: 'Implementar protótipo da listagem de tarefas', etiqueta: 'ux', checked: true },
];

const criarElementoTarefa = ({ id, description, etiqueta, checked }) => {
    const tarefa = document.createElement('li');
    tarefa.className = `todo-item ${checked ? 'concluida' : ''}`;

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const descricao = document.createElement('text');
    descricao.textContent = description;
    if (checked) descricao.classList.add('tarefa-concluida');

    const etiquetaBadge = document.createElement('span');
    etiquetaBadge.className = 'etiqueta';
    etiquetaBadge.textContent = etiqueta;

    const dataCriacao = document.createElement('span');
    /*dataCriacao.className = 'data-criacao';
    dataCriacao.textContent = 'Criado em: 21/08/2024';*/

    taskInfo.appendChild(descricao);

    const extraInfo = document.createElement('div');
    extraInfo.className = 'extra-info';
    extraInfo.appendChild(etiquetaBadge);
    extraInfo.appendChild(dataCriacao);

    tarefa.appendChild(taskInfo);
    tarefa.appendChild(extraInfo);

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
        concluirBtn.onclick = () => concluirTarefa(id, descricao, concluirBtn);
        actionContainer.appendChild(concluirBtn);
    }

    tarefa.appendChild(actionContainer);

    return tarefa;
};

const concluirTarefa = (id, descricao, btn) => {
    descricao.classList.add('tarefa-concluida');
    
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icone';
    checkIcon.innerHTML = '✔';

    btn.replaceWith(checkIcon);
};

window.onload = function () {
    const list = document.getElementById('todo-list');
    tasks.forEach((task) => {
        const elementoTarefa = criarElementoTarefa(task);
        list.appendChild(elementoTarefa);
    });
};