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
 spaceBetween: 30,
 initialSlide: 1,
 slidesPerView: 1.81,
 centeredSlides: true,
 
 navigation: {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
 },

 // Брейкпоинты
		
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				678: {
					slidesPerView: 1.4,
					spaceBetween: 20,
				},
				1150: {
					slidesPerView: 1.5,
					spaceBetween: 30,
				},
    1700: {
     initialSlide: 1,
     slidesPerView: 1.956,
				},
			},
			
});

// Burger
$('.header__btn').on('click', function() {
 $('.menu').toggleClass('menu_active'),
 $('.header__btn').toggleClass('header__btn_active');
});

// Form
const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

function formCheck(e) {
  e.preventDefault();
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert("Заполните поля правильно!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код ошибки: " + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("send_mail.php", {
    method: "POST",
    body: data,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute("is-valid", 0);
    el.style.border = "none";
  });
}