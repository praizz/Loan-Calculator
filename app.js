const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPay = document.getElementById('monthly-payment');
const totalPay = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const calculateBtn = document.getElementById('loan-form');

// load event lusteners

loadEventListeners();

function loadEventListeners(){
    // calculateBtn.addEventListener('submit', calculateResults); previous
    calculateBtn.addEventListener('submit', function(e){
        //manipulate this
        document.getElementById('results').style.display = 'none';
        document.getElementById('loader').style.display = 'block';
        //set timeout so it calculates once it timeouts
        setTimeout(calculateResults, 2000);
        e.preventDefault();
    });
}

function calculateResults(e){
    //convert the values to decimal and calculate...this is an online formula for amortized loans
    const principal = parseFloat(amount.value);
    const n = years.value * 12;
    const int = parseFloat(interest.value)/100 /12;
    const x = Math.pow((1 + int), n); // this raises to the power of;
    //const d = (((1 + i)^n)-1)/(((1+i)^n)*i);
    monthly = ((principal * int * x)/(x - 1)); //this is the montly amount

    if(isFinite(monthly)){ //this checks if its a finite loop
        monthlyPay.value = monthly.toFixed(2); //this puts it at 2dp
        totalPay.value = (monthly * n).toFixed(2);
        totalInterest.value = ((totalPay.value)- principal).toFixed(2);
        //display
        document.getElementById('loader').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }else{
        Showerror('check your numbers biko');
    }

//e.preventDefault(); //you always have to do this cos its a form but it changes when you want to display the loader
}
function Showerror(error){
    //display
    document.getElementById('loader').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    const errorBlock = document.createElement('div');
    errorBlock.className = 'alert alert-danger';
    errorBlock.appendChild(document.createTextNode(error));
    //we want to position the error between the card and the heading, hence..
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorBlock, heading); //you define where you want it to be...insert what you want to replace it with and before what..

    setTimeout(function(){ //this is also setTimeout(errRemove, 3000), then errRemove is a function
        document.querySelector('.alert').remove();
    } , 3000);
}