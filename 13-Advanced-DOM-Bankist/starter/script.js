'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav__links');
const operationTabContainer = document.querySelector('.operations__tab-container');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener('click', openModal);
});


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Add cookies alert
const cookie = document.createElement('div');
cookie.classList.add('cookie-message');
cookie.innerHTML = `We use cookies to improve our service quality <button class="btn btn--close-cookie">Got It</button>`;
cookie.style.backgroundColor = "#37383d";
header.append(cookie);

const cookieCloseBtn = cookie.querySelector('.btn--close-cookie');

cookieCloseBtn.addEventListener('click', () => {
  cookie.remove();
});

const logo = document.querySelector('#logo');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sections = document.querySelectorAll('.section');

btnScrollTo.addEventListener('click', (e) => {
  sections[0].scrollIntoView({
    behavior: 'smooth'
  });
});

/*
==========================================Event Propagation===============================================


const randomInt = (min=0, max=255) => {
  return Math.floor(Math.random()*(max - min + 1) + min)
}

const randomColor = () =>{
  return `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`;
}
const changeBGColor = (element)=>{
  console.log(element);
  element.style.backgroundColor = randomColor();
  console.log( element.style.backgroundColor);
};

const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
navLink.addEventListener('click', changeBGColor.bind(this, navLink));
navLinks.addEventListener('click', changeBGColor.bind(this, navLinks));
header.addEventListener('click', changeBGColor.bind(this, header), true);

*/


//Navigation links smooth transition 
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});

//Operations Content tabbed component
const tabs = document.querySelectorAll('.operations__tab');
operationTabContainer.addEventListener('click', (e) => {
  const closest = e.target.closest('operations__tab');
  if (e.target.classList.contains('operations__tab')) {
    console.log(e.target.parentElement.children);
    tabs.forEach((ele) => {
      ele.classList.remove('operations__tab--active');
    })
    e.target.classList.add('operations__tab--active');
    const dataNumber = e.target.getAttribute('data-tab');
    const operationContents = document.querySelectorAll('.operations__content');
    console.log(operationContents);
    operationContents.forEach((ele) => {
      ele.classList.remove('operations__content--active');
    });
    operationContents[dataNumber - 1].classList.add('operations__content--active');
  }
});

//Opacity of the navbar
const links = document.querySelectorAll('.nav__link');
const nav = document.querySelector('nav');

nav.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('nav__link') || e.target.classList.contains('nav__logo')) {
    links.forEach((ele) => {
      if (e.target != ele) {
        ele.style.opacity = 0.5;
      }
      else {
        ele.style.opacity = 1;
      }
    });
    return;
  }
  else {
    links.forEach((ele) => {
      ele.style.opacity = 1;
      return;
    });
  }
})