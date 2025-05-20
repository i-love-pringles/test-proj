// chatGPT code for work with localstorage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.list__item').forEach(item => {
    const text = item.querySelector('.list__text')?.textContent.trim();
    const done = item.classList.contains('done');
    if (text) {
      tasks.push({ text, done });
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// chatGPT code for upload on start
function loadTasksFromLocalStorage() {
  const saved = localStorage.getItem('tasks');
  if (!saved) return;

  const todoList = document.querySelector('.to-do-list');
  todoList.innerHTML = ''; // ❗ Очистка списка перед загрузкой

  const tasks = JSON.parse(saved);
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list__item';
    if (task.done) li.classList.add('done');
    li.innerHTML = `
      <div class="list__item-checkbox">
        <div class="completed__button ${task.done ? 'done-btn' : ''}"></div>
      </div>
      <div class="space-filler"></div>
      <div class="list__text">${task.text}</div>
    `;
    todoList.appendChild(li);
  });
}


// TO-DO LIST FUNCTIONALITY
document.addEventListener('click', event => {
  const modal = document.querySelector('.modal')
  const eTarget = event.target
  const modalInput = document.querySelector('.modal__input')
  const listItems = document.querySelectorAll('.list__item')
  const todoList = document.querySelector('.to-do-list');


  // DONE BUTTON FUNCTIONALITY
  if (eTarget.classList.contains('completed__button') && !eTarget.classList.contains('delete-btn')) {
    eTarget.classList.toggle('done-btn');
    eTarget.parentElement.parentElement.classList.toggle('done');
    saveTasksToLocalStorage();
  }

  // OPEN NEW TASK MODAL
  else if (eTarget.closest('.list__controls-plus')) {
    listItems.forEach((item) => {
      item.classList.remove('want-delete')
      const itemChild = item.querySelector('.list__item-checkbox .completed__button')
      itemChild.classList.remove('delete-btn')
    })
    document.querySelector('.list__controls-minus').classList.remove('list__controls-minus--active')
    modal.classList.add('modal-open')
  }

  // CLOSE NEW TASK MODAL
  else if (eTarget.closest('.modal__close-btn') || eTarget.classList.contains('modal__inner')) {
    modalInput.value = '';
    modal.classList.remove('modal-open')
  }

  // SAVE NEW TASK TEXT
  else if (eTarget.closest('.modal__save-btn')) {
    const taskText = modalInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.className = 'list__item';
    li.innerHTML = `
      <div class="list__item-checkbox">
        <div class="completed__button"></div>
      </div>
      <div class="space-filler"></div>
      <div class="list__text">
        ${taskText}
      </div>
    `;
    todoList.appendChild(li);
    modalInput.value = '';
    modal.classList.remove('modal-open');
    saveTasksToLocalStorage();
  }

  // "DELETE MODE" FUNCTIONALITY
  else if (eTarget.closest('.list__controls-minus')) {
    eTarget.closest('.list__controls-minus').classList.toggle('list__controls-minus--active')
    listItems.forEach((item) => {
      item.classList.toggle('want-delete')
      const itemChild = item.querySelector('.list__item-checkbox .completed__button')
      itemChild.classList.toggle('delete-btn')
        ;
    })
  }

  // "DELETE TASK" FUNCTIONALITY
  else if (eTarget.classList.contains('delete-btn')) {
    const item = event.target.closest('.list__item');
    item.remove();
    saveTasksToLocalStorage();
  }

});

document.addEventListener('dblclick', event => {
  event.target.classList.toggle('list__text--expanded')
if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    // Для старых IE
    document.selection.empty();
  }
  console.log(event.target);
});


// chatGPT code for adding temporary class by right swipe
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (e) {
  if (e.target.classList.contains('list__text')) {
    touchStartX = e.changedTouches[0].screenX;
  }
});

document.addEventListener('touchend', function (e) {
  if (e.target.classList.contains('list__text')) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(e.target);
  }
});

function handleSwipe(target) {
  const deltaX = touchEndX - touchStartX;

  // Свайп вправо более 50px
  if (deltaX > 50) {
    const parentItem = target.closest('.list__item');
    if (parentItem) {
      parentItem.classList.add('list__item--swiped');
      setTimeout(() => {
        parentItem.classList.remove('list__item--swiped');
      }, 1000);
    }
  }
}


// chatGPT code for task uploading on page opening
loadTasksFromLocalStorage();