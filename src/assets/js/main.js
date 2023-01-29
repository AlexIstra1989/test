// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
 for (let index = 0; index < popupLinks.length; index++) {
  const popupLink = popupLinks[index];
  popupLink.addEventListener("click", function(e) {
   const popupName = popupLink.getAttribute('href').replace('#', '');
   const curentPopup = document.getElementById(popupName);
   popupOpen(curentPopup);
   e.preventDefault();
  });
 }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
 if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
   const el = popupCloseIcon[index];
   el.addEventListener('click', function(e) {
    popupClose(el.closest('.popup'));
    e.preventDefault();
   }); 
  }
 } 

function popupOpen(curentPopup) {
 if (curentPopup && unlock) {
  const popupActive = document.querySelector('.popup.open');
  if (popupActive) {
   popupClose(popupActive, false);
  } else {
   bodyLock();
  }
  curentPopup.classList.add('open');
  curentPopup.addEventListener("click", function(e) {
   if (!e.target.closest('.popup__content')) {
    popupClose(e.target.closest('.popup'));
   }
  });
 }
}

function popupClose(popupActive, doUnclock = true) {
 if (unlock) {
  popupActive.classList.remove('open');
  if (doUnclock) {
   bodyUnlock();
  }
 }
};

function bodyLock() {
 const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

 if (lockPadding.length > 0) {
  for (let index = 0; index < lockPadding.length; index++) {
   const el = lockPadding[index];
   el.style.paddingRight = lockPaddingValue;
  }
 }
 body.style.paddingRight = lockPaddingValue;
 body.classList.add('lock');
 
 unlock = false;
 setTimeout(function() {
  unlock = true;
 }, timeout);
}

function bodyUnlock() {
 setTimeout(function() {
  for (let index = 0; index < lockPadding.length; index++) {
   const el = lockPadding[index];
   el.style.paddingRight = '0px';
  }
  body.style.paddingRight = '0px';
  body.classList.remove('lock');
 }, timeout);

 unlock = false;
 setTimeout(function() {
  unlock = true;
 }, timeout);
};

document.addEventListener('keydown', function(e) {
 if (e.which === 27) {
  const popupActive = document.querySelector('.popup.open');
  popupClose(popupActive);
 }
});

//Swiper
new Swiper ('.reviews__slider', {
 slidesPerView: 1,
 autoHeight: true,
 spaceBetween: 100,
 navigation: {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
 },
 pagination: {
  el: '.swiper-pagination',
  clickable: true,
 },
});

new Swiper ('.photos__slider', {
 slidesPerView: 3,
 autoHeight: true,
 //spaceBetween: 30,
 initialSlide: 1,
 slidesPerView: 1.87,
 centeredSlides: true,
 
 navigation: {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
 },
});

// Burger
$('.header__btn').on('click', function() {
 $('.menu').toggleClass('menu_active'),
 $('.header__btn').toggleClass('header__btn_active');
});

// Form
"use strict"

document.addEventListener('DOMContentLoaded', function() {
 const form = document.getElementById('form');
 form.addEventListener('submit', formSend);

 async function formSend(e) {
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);
  // formData.append('image', formImage.files[0]); 

  if (error === 0) {
   form.classList.add('_sending');
   let response = await fetch('sendmail.php', {
    method: 'POST',
    body: formData
   });
   if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formPreview.innerHTML = '';
    form.reset();
    form.classList.remove('_sending')
   } else {
    alert('Ошибка');
    form.classList.remove('_sending')
   }
  } else {
   alert('Заполните обязательно поля');
  }

 }


 function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll('._req');
  
  for (let index = 0; index < formReq.length; index++) {
   const input = formReq[index];
   formRemoveError(input);

   if(input.classList.contains('_email')) {
    if(emailTest(input)) {
     formAddError(input);
     error++;
    }
   } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
    formAddError(input);
    error++;
   } else {
    if (input.value === '') {
     formAddError(input);
     error++;
    }
   }
  }
  return error;
 }

 function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
 }
 function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
 }
 function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
 }

});