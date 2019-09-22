//Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e) {

    //Hide Results
  document.querySelector('#results').style.display = 'none';

  //Show Loader
  document.querySelector('#loading').style.display = 'block';

  // setTimeout(function() {
  //   document.querySelector('#loading').style.display = 'none';
  //   document.querySelector('#results').style.display = 'block';
  // }, 2000);

  // calculateResults();

  setTimeout(calculateResults, 2000);

  e.preventDefault()
});


//Calculate Results

function calculateResults() {
  

  //Grab all the UI variables

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //Calculations

  const princpal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments 

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (princpal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - princpal).toFixed(2);
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'block';
  } else {
    showError('Please check your numbers');
  }
}

//Show the Error
function showError(msg) {

  document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'none';
  const errorDiv = document.createElement('div');
  
  
  //Get Elements

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  //Add classes

  errorDiv.className = 'alert alert-danger';
  
  //Create text node + append to div
  errorDiv.appendChild(document.createTextNode(msg));

  //Insert error above the heading

  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds

  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}