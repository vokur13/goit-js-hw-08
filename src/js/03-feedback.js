import LodashThrottle from 'lodash.throttle';
import { save, load, remove } from './storage';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', LodashThrottle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

initPage();

function onFormInput(e) {
  const { name, value } = e.target;
  let formData = load(STORAGE_KEY);
  formData = formData ? formData : {};
  formData[name] = value;
  save(STORAGE_KEY, formData);
}

function initPage() {
  const parseData = load(STORAGE_KEY);
  if (parseData) {
    const savedData = Object.entries(parseData);
    savedData.forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  remove(STORAGE_KEY);
  e.currentTarget.reset();
}
