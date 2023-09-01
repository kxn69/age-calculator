/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

const inputContainers = document.querySelectorAll('.input-container');
const button = document.querySelector('.svg-btn');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const daysDisplay = document.querySelector('.days-display');
const monthsDisplay = document.querySelector('.months-display');
const yearsDisplay = document.querySelector('.years-display');

function handleInput(e) {
  const container = e.currentTarget;
  const year = new Date().getFullYear();
  const errText = container.querySelector('.err-text');
  const inputValue = parseInt(e.target.value);

  if (isNaN(inputValue)) return;

  if (e.target.id === 'day') {
    if (inputValue > 31) {
      container.classList.add('error');
      errText.hidden = false;
      button.disabled = true;
    } else {
      container.classList.remove('error');
      errText.hidden = true;
      button.disabled = false;
    }
  }

  if (e.target.id === 'month') {
    if (inputValue > 12) {
      container.classList.add('error');
      errText.hidden = false;
      button.disabled = true;
    } else {
      container.classList.remove('error')
      errText.hidden = true;
      button.disabled = false;
    }
  }

  if (e.target.id === 'year') {
    if (inputValue > year) {
      container.classList.add('error');
      errText.hidden = false;
      button.disabled = true;
    } else {
      container.classList.remove('error');
      errText.hidden = true;
      button.disabled = false;
    }
  }

  // To catch invalid date / month error
  const month = parseInt(inputContainers[1].querySelector('input').value);
  const day = parseInt(inputContainers[0].querySelector('input').value);

  if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
    container.classList.add('error');
    errText.hidden = false;
  } else {
    container.classList.remove('error');
    errText.hidden = true;
  }

  if (month === 2 && day > 29) {
    container.classList.add('error');
    errText.hidden = false;
  } else {
    container.classList.remove('error');
    errText.hidden = true;
  }

  if (container.classList.contains('error')) {
    inputContainers.forEach(cont => cont.classList.add('error'));
    button.disabled = true;
  }
}

function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day); // Adjust month index
  const currentDate = new Date();
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth(); // Calculate months
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--; // Adjust months if days are negative
    const daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    days = daysInLastMonth + days;
  }

  if (months < 0) {
    years--; // Adjust years if months are negative
    months = 12 + months;
  }

  daysDisplay.textContent = days;
  monthsDisplay.textContent = months;
  yearsDisplay.textContent = years;
}

function handleBtn() {
  const birthDay = dayInput.value;
  const birthMonth = monthInput.value;
  const birthYear = yearInput.value;

  if (!birthDay || !birthMonth || !birthYear) {
    daysDisplay.textContent = '- -';
    monthsDisplay.textContent = '- -';
    yearsDisplay.textContent = '- -';
  } else {
    calculateAge(birthDay, birthMonth, birthYear);
  }
}

// Event Listeners
inputContainers.forEach(input => input.addEventListener('keyup', handleInput));
button.addEventListener('click', handleBtn);
