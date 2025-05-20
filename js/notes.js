
document.addEventListener('click', (event) => {
  const notesContent = document.querySelector('.notes__content');
  const windowsBtn3 = document.querySelector('.notes__windows-3');
  const windowsBtn2 = document.querySelector('.notes__windows-2');
  const windowsBtn1 = document.querySelector('.notes__windows-1');
  const target = event.target
  const targetParent = event.target.parentElement
  const targetGrandParent = event.target.parentElement.parentElement



  if (targetGrandParent.classList.contains('notes__windows-style-item--active')) {
    return
  } else if (targetGrandParent.classList.contains('notes__windows-1') || targetParent.classList.contains('notes__windows-1')) {
    notesContent.classList.remove('notes__content--3-windows');
    notesContent.classList.remove('notes__content--2-windows');
    notesContent.classList.add('notes__content--1-windows');
    windowsBtn3.classList.remove('notes__windows-style-item--active');
    windowsBtn2.classList.remove('notes__windows-style-item--active');
    windowsBtn1.classList.add('notes__windows-style-item--active')
  }
  else if (targetGrandParent.classList.contains('notes__windows-2') || targetParent.classList.contains('notes__windows-2')) {
    notesContent.classList.remove('notes__content--3-windows');
    notesContent.classList.remove('notes__content--1-windows');
    notesContent.classList.add('notes__content--2-windows');
    windowsBtn3.classList.remove('notes__windows-style-item--active');
    windowsBtn1.classList.remove('notes__windows-style-item--active');
    windowsBtn2.classList.add('notes__windows-style-item--active')
  }
    else if (targetGrandParent.classList.contains('notes__windows-3')  || targetParent.classList.contains('notes__windows-3')) {
    notesContent.classList.remove('notes__content--2-windows');
    notesContent.classList.remove('notes__content--1-windows');
    notesContent.classList.add('notes__content--3-windows');
    windowsBtn2.classList.remove('notes__windows-style-item--active');
    windowsBtn1.classList.remove('notes__windows-style-item--active');
    windowsBtn3.classList.add('notes__windows-style-item--active')
  }else{
    // console.log(target);
    
  }

})