const sliderElement = document.querySelector('#slider')
const btnElement = document.querySelector('#btn')

const sizePassword = document.querySelector('#value')
const password = document.querySelector('#password')
const containerPassword = document.querySelector('#container-password')

const containerHistory = document.querySelector('#passHistory')

const error = document.querySelector('#error')

let charset = ''
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const upAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '123456789'
const espChar = '!@#$%^&*()-=_+[]{}|;:",.<>?/';

const selectUppercase = document.querySelector('#uppercase')
const selectLowercase = document.querySelector('#lowercase')
const selectNumbers = document.querySelector('#numbers')
const selectSymbols = document.querySelector('#symbols')

function handleCheckboxChange(checkbox, types) {
  //Rimuovi il messaggio di errore quando viene selezionata una casella di controllo
  error.classList.add("hide");
  if (checkbox.checked) { // Agg il tipo di carattere selezionato
    charset += types
  } else {// Rimuovi il tipo di carattere se la casella di controllo è deselezionata
    charset = charset.replace(types, '');
  }
}

selectUppercase.addEventListener('change', function () {
  handleCheckboxChange(selectUppercase, upAlphabet);
});

selectLowercase.addEventListener('change', function () {
  handleCheckboxChange(selectLowercase, alphabet);
});

selectNumbers.addEventListener('change', function () {
  handleCheckboxChange(selectNumbers, numbers);
});

selectSymbols.addEventListener('change', function () {
  handleCheckboxChange(selectSymbols, espChar);
});

let newPassword = '';

sizePassword.innerHTML = sliderElement.value;
sliderElement.oninput = function () {
  sizePassword.innerHTML = this.value
}

function generatePassword() {
  //Se l'utente non aggiunge alcun tipo di carattere
  if (!charset) {
    error.classList.remove("hide");
    error.innerHTML = 'Select at least one character type';
    return
  }

  let pass = ''
  for (let i = 0, n = charset.length; i < sliderElement.value; i++) {
    pass += charset.charAt(Math.floor(Math.random() * n))
  }

  containerPassword.classList.remove('hide');
  password.innerHTML = pass
  newPassword = pass

  // Adicionar cada senha ao histórico
  const historyCard = document.createElement('span');
  historyCard.className = 'historyCard';
  historyCard.innerHTML = `${pass} <i class="fa-solid fa-copy"></i>`;

  historyCard.addEventListener('click', function () {
    copy(pass);
  });

  containerHistory.appendChild(historyCard);
}

function copy(pass) {
  navigator.clipboard.writeText(newPassword)
}
function copyPassword() {
  navigator.clipboard.writeText(newPassword)
}
