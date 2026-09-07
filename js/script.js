document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });
  }

  const form = document.querySelector('#project-form');
  if (!form) return;

  const steps = [...form.querySelectorAll('.form-step')];
  const currentStepLabel = document.querySelector('#current-step');
  const progressFill = document.querySelector('#progress-fill');
  const previousButton = document.querySelector('#previous-step');
  const nextButton = document.querySelector('#next-step');
  const submitButton = document.querySelector('#submit-form');
  const successMessage = document.querySelector('#success-message');
  const photoInput = document.querySelector('#photos');
  const photoPreview = document.querySelector('#photo-preview');
  let stepIndex = 0;

  const showStep = (index) => {
    steps.forEach((step, stepNumber) => step.classList.toggle('is-active', stepNumber === index));
    currentStepLabel.textContent = index + 1;
    progressFill.style.width = `${((index + 1) / steps.length) * 100}%`;
    previousButton.hidden = index === 0;
    nextButton.hidden = index === steps.length - 1;
    submitButton.hidden = index !== steps.length - 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setError = (field, message) => {
    const error = field.closest('label, .choice-field')?.querySelector('.error-message');
    field.classList.add('has-error');
    if (error) error.textContent = message;
  };

  const clearErrors = (step) => {
    step.querySelectorAll('.has-error').forEach((field) => field.classList.remove('has-error'));
    step.querySelectorAll('.error-message').forEach((error) => { error.textContent = ''; });
  };

  const validateStep = (step) => {
    clearErrors(step);
    let valid = true;
    step.querySelectorAll('[required]').forEach((field) => {
      if (field.type === 'radio') return;
      if (!field.value.trim()) {
        setError(field, 'Ce champ est obligatoire.');
        valid = false;
      }
    });

    const email = step.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, 'Saisissez une adresse email valide.');
      valid = false;
    }

    const phone = step.querySelector('input[type="tel"]');
    if (phone && phone.value && !/^[+]?[0-9\s()-]{8,}$/.test(phone.value)) {
      setError(phone, 'Saisissez un numéro de téléphone valide.');
      valid = false;
    }

    const requiredRadio = step.querySelector('input[type="radio"][required]');
    if (requiredRadio && !step.querySelector('input[type="radio"]:checked')) {
      const error = step.querySelector('.choice-field .error-message');
      if (error) error.textContent = 'Choisissez une réponse.';
      valid = false;
    }

    return valid;
  };

  nextButton.addEventListener('click', () => {
    if (validateStep(steps[stepIndex])) {
      stepIndex += 1;
      showStep(stepIndex);
    }
  });

  previousButton.addEventListener('click', () => {
    if (stepIndex > 0) {
      stepIndex -= 1;
      showStep(stepIndex);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStep(steps[stepIndex])) return;
    form.hidden = true;
    document.querySelector('.form-panel-head').hidden = true;
    document.querySelector('.progress-bar').hidden = true;
    successMessage.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  photoInput?.addEventListener('change', () => {
    photoPreview.innerHTML = '';
    [...photoInput.files].forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.alt = `Aperçu de ${file.name}`;
        photoPreview.appendChild(image);
      });
      reader.readAsDataURL(file);
    });
  });

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.classList.remove('has-error');
      const error = field.closest('label, .choice-field')?.querySelector('.error-message');
      if (error) error.textContent = '';
    });
  });
});
