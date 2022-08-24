import LodashThrottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', LodashThrottle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

getStorageOutput();

// function onInput(e) {
//   const key = e.target.name;
//   const value = e.target.value;
//   formData[key] = value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

function onInput(e) {
  const key = e.target.name;
  const value = e.target.value;
  if (key === 'email' || key === 'message') {
    formData.email = refs.email.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    formData.message = refs.textarea.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

// function onInput(e) {
//   const key = e.target.name;
//   const value = e.target.value;

//   if (!formData.hasOwnProperty([key])) {
//     formData[key] = value;
//     return;
//   }
//   formData[key] = { ...formData[key], ...value };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

function getStorageOutput() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parseData = JSON.parse(savedData);
    if (parseData.hasOwnProperty('email')) {
      refs.email.value = parseData.email;
    }
    if (parseData.hasOwnProperty('message')) {
      refs.textarea.value = parseData.message;
    }
  }
}
function onFormSubmit(e) {
  e.preventDefault();
  const storedData = localStorage.getItem(STORAGE_KEY);
  const printData = JSON.parse(storedData);
  console.log(printData);
  localStorage.removeItem(STORAGE_KEY);
  e.target.reset();
}
