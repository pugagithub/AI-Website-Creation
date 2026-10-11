const form = document.querySelector('#calculator-form');
const resultsEmpty = document.querySelector('#results-empty');
const resultsFilled = document.querySelector('#results-filled');
const errorMessage = document.querySelector('#error-message');

const formatCalories = value => Math.round(value).toLocaleString('en-US');

form.addEventListener('submit', event => {
  event.preventDefault();
  const age = Number(document.querySelector('#age').value);
  const height = Number(document.querySelector('#height').value);
  const weight = Number(document.querySelector('#weight').value);
  const activity = Number(document.querySelector('#activity').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  if (!age || !height || !weight || !activity || age < 15 || age > 100 || height < 100 || height > 250 || weight < 30 || weight > 300) {
    errorMessage.textContent = 'Please enter realistic values in all fields to continue.';
    return;
  }
  errorMessage.textContent = '';
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
  const maintenance = bmr * activity;
  document.querySelector('#maintenance-value').textContent = formatCalories(maintenance);
  document.querySelector('#lose-value').textContent = formatCalories(maintenance - 400);
  document.querySelector('#gain-value').textContent = formatCalories(maintenance + 300);
  resultsEmpty.hidden = true;
  resultsFilled.hidden = false;
  document.querySelector('#results').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelector('#recalculate').addEventListener('click', () => {
  resultsFilled.hidden = true;
  resultsEmpty.hidden = false;
  document.querySelector('#age').focus();
});
