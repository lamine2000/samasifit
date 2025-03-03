const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-prev');
const form = document.getElementById('multiStepForm');
const confirmationMessage = document.getElementsByClassName('confirmationMessage')[0];
const keepInTouch = document.getElementsByClassName('keepInTouch')[0];
const wannaKnowMore = document.getElementsByClassName('wannaKnowMore')[0];
let currentStep = 0;

confirmationMessage.id = 'hidden';
wannaKnowMore.id = 'hidden';

// Show the current form step
function showStep(step) {
  formSteps.forEach((formStep, index) => {
    formStep.classList.remove('form-step-active');
    if (index === step) {
      formStep.classList.add('form-step-active');
    }
  });
}

// Move to the next step
nextBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (validateForm(index)) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

// Move to the previous step
prevBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
  });
});

// Validate the form fields before moving to the next step
function validateForm(step) {
  const inputs = formSteps[step].querySelectorAll('input');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value) {
      input.style.border = '2px solid red';
      valid = false;
    } else {
      input.style.border = '';
    }
  });

  return valid;
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  confirmationMessage.id = '';
  wannaKnowMore.id = '';

  keepInTouch.id = 'hidden';

  form.style.display = 'none';  // Hide the form

  const name = document.querySelector('input[id="name"]').value;
  const age = document.querySelector('input[id="age"]').value;
  const email = document.querySelector('input[id="email"]').value;
  const phoneNumber = document.querySelector('input[id="phoneNumber"]').value;
  const address = document.querySelector('input[id="address"]').value;

  // Define template parameters
  const templateParams = {
    name: name,
    age: age,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    message: `New user submission: Name: ${name}, Age: ${age}, Email: ${email}, Phone: ${phoneNumber}, Address: ${address}`
  };

  console.log(templateParams);
  //send email
  emailjs.send('service_ye195wg', 'template_ikkl8ld', templateParams)
    .then(function() {
      console.log('SUCCESS!');
      // Optionally show a success message or redirect
    }, function(error) {
      console.error('FAILED...', error);
      // Optionally handle the error
    });
});
