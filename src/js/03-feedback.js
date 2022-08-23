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

function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

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
