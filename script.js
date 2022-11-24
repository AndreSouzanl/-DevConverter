
const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit)

const inpultValue = document.getElementById('value-real');

const selectedCurrency = document.getElementById('currency');

const result = document.getElementById('result');
let valueConverted = 0;

function handleSubmit(e){
    e.preventDefault();
    
  if (!inpultValue.value || inpultValue.value < 0) {

    alert('Informe o valor correto! ');
    return;
  
  }else if(!selectedCurrency.value){
    alert('Escolha uma Moeda');
    return;
  }

  converter();

}

function converter(){
    if (selectedCurrency.value === 'eur') {
     valueConverted = inpultValue.value * 5.59;
     result.innerHTML = valueFormatter('pt-BR', 'EUR');
     animateResult();
        
    }else if(selectedCurrency.value === 'dol'){
        valueConverted = inpultValue.value * 5.36;
        result.innerHTML = valueFormatter('en-US', 'USD');
        animateResult();
    }

    inpultValue.value ='';
    selectedCurrency.value ='';

}

function valueFormatter(locale, currency ){
    const value = valueConverted.toLocaleString(`${locale}`, {style: 'currency', currency:`${currency}`})
    return `<span>🤑</span> ${value} <span>🤑</span>`;

}

function animateResult(){
    return result.animate([
        {transform: 'translateY(-150px)'},
        {transform: 'translateY(0px)'},

    ], {duration: 500});
};