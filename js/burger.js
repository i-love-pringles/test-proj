const bodyElement = document.querySelector('.body')

bodyElement.addEventListener('click', event => {
  if (event.target && event.target.closest('.burger-icon') || event.target.closest('.nav__link') && bodyElement.closest('.nav__menu-open')) {

    bodyElement.classList.toggle('nav__menu-open');

  }
})