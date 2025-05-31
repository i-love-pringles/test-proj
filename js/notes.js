// work with local storage
function saveNotesToLocalStorage() {
  const notes = [];
  document.querySelectorAll('.notes__item').forEach(item => {
    const noteHTML = item.querySelector('.notes__text').innerHTML;
    notes.push(noteHTML);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function saveLayoutToLocalStorage(layout) {
  localStorage.setItem('notesLayout', layout);
}

function loadNotesFromLocalStorage() {
  const notesContent = document.querySelector('.notes__content');
  const savedNotes = JSON.parse(localStorage.getItem('notes'));

  // resetting data before loading to avoid duplicate notes
  notesContent.innerHTML = '';

  if (savedNotes && Array.isArray(savedNotes)) {
    savedNotes.forEach(noteHTML => {
      const li = document.createElement('li');
      li.className = 'notes__item';
      li.innerHTML = `
        <div class="notes__text">${noteHTML}</div>
        <div class="notes__copy-btn">
          <img src="../img/icons/copy.svg" alt="" class="notes-copy-icon">
        </div>
      `;
      notesContent.appendChild(li);
    });
  }
}

// window layout switcher
function loadLayoutFromLocalStorage() {
  const layout = localStorage.getItem('notesLayout') || '3';
  const notesContent = document.querySelector('.notes__content');
  const windowsBtn1 = document.querySelector('.notes__windows-1');
  const windowsBtn2 = document.querySelector('.notes__windows-2');
  const windowsBtn3 = document.querySelector('.notes__windows-3');

  notesContent.classList.remove('notes__content--1-windows', 'notes__content--2-windows', 'notes__content--3-windows');
  windowsBtn1.classList.remove('notes__windows-style-item--active');
  windowsBtn2.classList.remove('notes__windows-style-item--active');
  windowsBtn3.classList.remove('notes__windows-style-item--active');

  if (layout === '1') {
    notesContent.classList.add('notes__content--1-windows');
    windowsBtn1.classList.add('notes__windows-style-item--active');
  } else if (layout === '2') {
    notesContent.classList.add('notes__content--2-windows');
    windowsBtn2.classList.add('notes__windows-style-item--active');
  } else {
    notesContent.classList.add('notes__content--3-windows');
    windowsBtn3.classList.add('notes__windows-style-item--active');
  }
}

// notes and layout uploading
loadNotesFromLocalStorage();
loadLayoutFromLocalStorage();

document.addEventListener('click', (event) => {
  const target = event.target;
  const targetParent = target.parentElement;
  const targetGrandParent = targetParent?.parentElement;
  const notesContent = document.querySelector('.notes__content');
  const modal = document.querySelector('.modal');
  const modalInput = document.querySelector('.modal__input');

  // window layouts
  const windowsMap = {
    'notes__windows-1': '1',
    'notes__windows-2': '2',
    'notes__windows-3': '3',
  };

  for (const className in windowsMap) {
    if (targetParent?.classList.contains(className) || targetGrandParent?.classList.contains(className)) {
      saveLayoutToLocalStorage(windowsMap[className]);
      loadLayoutFromLocalStorage();
      return;
    }
  }

  // new note adding
  if (target.classList.contains('notes__controls-plus')) {
    document.querySelectorAll('.notes__copy-btn').forEach(btn => btn.classList.remove('want-delete'));
    document.querySelector('.notes__controls-minus')?.classList.remove('notes__controls-minus--active');
    modal.classList.add('modal-open');
    return;
  }

  // delete mode
  if (target.closest('.notes__controls-minus')) {
    target.closest('.notes__controls-minus').classList.toggle('notes__controls-minus--active');
    document.querySelectorAll('.notes__copy-btn').forEach(btn => btn.classList.toggle('want-delete'));
    return;
  }

  // note delete functionality
  if (target.classList.contains('want-delete')) {
    const item = target.closest('.notes__item');
    if (item) {
      item.remove();
      saveNotesToLocalStorage();
    }
    return;
  }

  // close modal
  if (target.closest('.modal__close-btn') || target.classList.contains('modal__inner')) {
    modalInput.value = '';
    modal.classList.remove('modal-open');
    return;
  }

  // save new note
  if (target.closest('.modal__save-btn')) {
    const taskText = modalInput.value.trim();
    if (!taskText) return;

    const formattedText = taskText.replace(/\n/g, '<br>');
    const li = document.createElement('li');
    li.className = 'notes__item';
    li.innerHTML = `
      <div class="notes__text">${formattedText}</div>
      <div class="notes__copy-btn">
        <img src="../img/icons/copy.svg" alt="" class="notes-copy-icon">
      </div>
    `;
    notesContent.appendChild(li);
    modalInput.value = '';
    modal.classList.remove('modal-open');
    saveNotesToLocalStorage();
    return;
  }

  // note text copy
  if (target.closest('.notes__copy-btn') && !target.classList.contains('want-delete')) {
    const noteDiv = target.closest('.notes__item')?.querySelector('.notes__text');
    const targetBtn = target.closest('.notes__copy-btn');
    if (!noteDiv) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = noteDiv.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    const plainText = tempDiv.textContent || '';

    navigator.clipboard.writeText(plainText).then(() => {
      // target.closest('.notes__copy-btn').classList.add('copied');
      targetBtn.classList.add('copied');
      
      setTimeout(() => targetBtn.classList.remove('copied'), 200);

    });
  }
});
