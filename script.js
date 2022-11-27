const apiUrl = ' https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL';

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

const inpultValue = document.getElementById('value-real');
const selectedCurrency = document.getElementById('currency');
const result = document.getElementById('result');

const moedas = {
  eur: null,
  usd: null,
  lib: null
};

getValues();
// Recuperar cotações atuais das moedas.
async function getValues() {
  const dados = await getData(apiUrl);

  moedas.eur = dados.EURBRL.bid;
  moedas.usd = dados.USDBRL.bid;
  moedas.lib = dados.GBPBRL.bid;
}

function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(qualquerCoisa => qualquerCoisa.json())
      .then(response => resolve(response));
  })
}

let valueConverted = 0;

function handleSubmit(e) {
  e.preventDefault();

  if (!inpultValue.value || inpultValue.value < 0) {

    alert('Informe o valor correto! ');
    return;

  } else if (!selectedCurrency.value) {
    alert('Escolha uma Moeda');
    return;
  }

  converter();

}

function converter() {
  console.log(moedas)
  if (selectedCurrency.value === 'eur') {
    valueConverted = inpultValue.value / moedas.eur;
    result.innerHTML = valueFormatter('pt-BR', 'EUR');
    animateResult();
  } else if (selectedCurrency.value === 'dol') {
    valueConverted = inpultValue.value / moedas.usd;
    result.innerHTML = valueFormatter('en-US', 'USD');
    animateResult();
  } else if (selectedCurrency.value === 'lib') {
    valueConverted = inpultValue.value / moedas.lib;
    result.innerHTML = valueFormatter('pt-BR', 'GBP');
    animateResult();
  }

  inpultValue.value = '';
  selectedCurrency.value = '';

}

function valueFormatter(locale, currency) {
  const value = valueConverted.toLocaleString(`${locale}`, { style: 'currency', currency: `${currency}` })
  return `<span>🤑</span> ${value} <span>🤑</span>`;

}

function animateResult() {
  return result.animate([
    { transform: 'translateY(-150px)' },
    { transform: 'translateY(0px)' },

  ], { duration: 500 });
};