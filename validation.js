const patterns = {
  username: {
    pattern: '^[A-Za-z0-9]{3,}$',
    message: 'Username must be at least 3 characters and contain only letters and numbers.'
  },
  password: {
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
    message: 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter and one number.'
  },
  phone: {
    pattern: '^\\+?[0-9]{10,14}$',
    message: 'Please enter a valid phone number (ex: +901234567890).'
  }
  // You can add more patterns here
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[validate]');
  const submitButton = form.querySelector('[validate] button[type="submit"]');

  // Apply patterns
  Array.from(form.elements).forEach(element => {
    const patternName = element.getAttribute('data-pattern');
    if (patternName && patterns[patternName]) {
      element.pattern = patterns[patternName].pattern;
    }
  });

  // Check submit button status on first load
  checkFormValidity();

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      Array.from(form.elements).forEach((element) => {
        if (!element.checkValidity()) {
          showError(element);
        } else {
          clearError(element);
        }
      });
    }
  });

  // Validate every time the input changes or loses focus
  form.addEventListener('input', handleInput);
  form.addEventListener('blur', handleInput, true);

  function handleInput(event) {
    const element = event.target;
    if (element.checkValidity()) {
      clearError(element);
    } else {
      showError(element);
    }
    checkFormValidity();
  }

  function showError(element) {
    clearError(element);
    const errorMessage = getCustomErrorMessage(element) || element.validationMessage;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    element.insertAdjacentElement('afterend', errorElement);
  }

  function clearError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.className === 'error-message') {
      errorElement.remove();
    }
  }

  function getCustomErrorMessage(element) {
    const patternName = element.getAttribute('data-pattern');
    return patterns[patternName] ? patterns[patternName].message : null;
  }

  function checkFormValidity() {
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
  }
});