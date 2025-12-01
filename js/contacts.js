document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const closeNotification = document.getElementById('closeNotification');
    
    // Элементы формы
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Элементы ошибок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    function showNotification(message, type = 'success') {
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
    
    function hideNotification() {
        notification.classList.add('hidden');
    }
    
    function validateName(name) {
        if (!name.trim()) {
            return 'Имя обязательно для заполнения';
        }
        if (name.trim().length < 2) {
            return 'Имя должно содержать минимум 2 символа';
        }
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name)) {
            return 'Имя может содержать только буквы, пробелы и дефисы';
        }
        return '';
    }
    
    function validateEmail(email) {
        if (!email.trim()) {
            return 'Email обязателен для заполнения';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Введите корректный email адрес';
        }
        return '';
    }
    
    function validateMessage(message) {
        if (!message.trim()) {
            return 'Сообщение обязательно для заполнения';
        }
        if (message.trim().length < 10) {
            return 'Сообщение должно содержать минимум 10 символов';
        }
        if (message.trim().length > 1000) {
            return 'Сообщение не должно превышать 1000 символов';
        }
        return '';
    }
    
    function validateField(input, errorElement, validator) {
        const error = validator(input.value);
        errorElement.textContent = error;
        
        if (error) {
            input.style.borderColor = '#e74c3c';
            return false;
        } else {
            input.style.borderColor = '#27ae60';
            return true;
        }
    }
    
    // Валидация при вводе
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, nameError, validateName);
    });
    
    emailInput.addEventListener('blur', () => {
        validateField(emailInput, emailError, validateEmail);
    });
    
    messageInput.addEventListener('blur', () => {
        validateField(messageInput, messageError, validateMessage);
    });
    
    // Обработка отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, nameError, validateName);
        const isEmailValid = validateField(emailInput, emailError, validateEmail);
        const isMessageValid = validateField(messageInput, messageError, validateMessage);
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Имитация отправки формы
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                contactForm.reset();
                
                // Сброс стилей полей
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.style.borderColor = '#e1e8ed';
                });
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showNotification('Пожалуйста, исправьте ошибки в форме.', 'error');
        }
    });
    
    // Закрытие уведомления
    closeNotification.addEventListener('click', hideNotification);
    
    // Закрытие уведомления при клике вне его
    document.addEventListener('click', function(e) {
        if (notification.contains(e.target) && !notification.classList.contains('hidden')) {
            hideNotification();
        }
    });
});