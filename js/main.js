import i18Obj from './translate.js';

const Languages = {
  RU: "ru",
  EN: "en"
};

const Themes = {
  Dark: 'dark-theme',
  Ligth: 'ligth-theme',
};

const LANGUAGE_KEY_LOCALSTORE = "language";
const THEME_KEY_LOCALSTORE = 'Theme';

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.header__list');
const navLink = document.querySelectorAll('.header__link');
const body = document.querySelector('body');


function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  body.style.position === 'fixed' ? body.style.position = '' : body.style.position = 'fixed';
}

hamburger.addEventListener('click', toggleMenu);

navLink.forEach((el) => el.addEventListener('click', closeMenu));

function closeMenu(event) {
  if (event.target.classList.contains('header__link')) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    body.style.position = '';
  }
}

// Image caching 
function preloadSummerImages() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  seasons.forEach(item => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `../assets/img/${item}/${i}.jpg`;
    }
  });

}

preloadSummerImages();


//Changing Images in the Portfolio Section
const portfolioBtn = document.querySelectorAll('.btn-season');
const portfolioImages = document.querySelectorAll('.portfolio-image');


portfolioBtn.forEach((item) => item.addEventListener('click', changeImagesAndBtn));

function changeImagesAndBtn(event) {

  portfolioBtn.forEach((item) => {
    if(item.classList.contains('active')){
      item.classList.remove('active');
    }
  });
  event.target.classList.toggle('active');
  portfolioImages.forEach((img, index) => img.src = `../assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
}


// Translation of the page into two languages
const allDataI18 = document.querySelectorAll('[data-i18]');
const ruLang = document.querySelector('.lang__switcher_ru');
const enLang = document.querySelector('.lang__switcher_en');


let localStoreLanguage = localStorage.getItem(LANGUAGE_KEY_LOCALSTORE);

if(localStoreLanguage){
  let language = localStoreLanguage;
  getTranslate(language);
}


function getTranslate(lang) {
  localStorage.setItem(LANGUAGE_KEY_LOCALSTORE, lang);
  if (lang === Languages.RU){
    ruLang.classList.add('active');
    enLang.classList.remove('active');
  } else {
    ruLang.classList.remove('active');
    enLang.classList.add('active');
  }
  allDataI18.forEach((elem) => {
    if (elem.placeholder) {
      elem.placeholder = i18Obj[lang][elem.dataset.i18];
    }
    elem.textContent = i18Obj[lang][elem.dataset.i18];
  });
}

ruLang.addEventListener('click', () => getTranslate(Languages.RU));
enLang.addEventListener('click', () => getTranslate(Languages.EN));


// Switching between light and dark theme
let localStoreTheme = localStorage.getItem(THEME_KEY_LOCALSTORE);
if (localStoreTheme){
  let theme = localStoreTheme;
  changeThemes(theme);
}



const switcherThemes = document.querySelector('.sun-icon');
switcherThemes.addEventListener('click', changeThemes);

function changeThemes(theme) {
  localStorage.setItem(THEME_KEY_LOCALSTORE, theme);
  let elemChangedThemes = document.querySelectorAll('.changeColor');
  if (elemChangedThemes[0].classList.contains('ligth-theme')) {
    
    elemChangedThemes.forEach((item) => item.classList.remove('ligth-theme'));
  } else {
    elemChangedThemes.forEach((item) => item.classList.add('ligth-theme'));
  }
}

// custom video player
