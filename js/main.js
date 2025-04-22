document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
    
    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 100) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Form validation for contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const subject = document.querySelector('#subject').value.trim();
            const message = document.querySelector('#message').value.trim();
            
            if (!name) {
                showError('name', 'Please enter your name');
                valid = false;
            } else {
                removeError('name');
            }
            
            if (!email) {
                showError('email', 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email');
                valid = false;
            } else {
                removeError('email');
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                valid = false;
            } else {
                removeError('subject');
            }
            
            if (!message) {
                showError('message', 'Please enter your message');
                valid = false;
            } else {
                removeError('message');
            }
            
            if (valid) {
                // Show success message (in a real application, this would send the form data)
                const formContainer = document.querySelector('.contact-form');
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                formContainer.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Resume download button
    const downloadBtn = document.querySelector('#downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'assets/resume/AbhinavAlok_Resume.pdf';
            link.download = 'AbhinavAlok_Resume.pdf';
            link.click();
        });
    }
    
    // Project filter (for future enhancement)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(filterBtn => {
                    filterBtn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Helper functions
function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.classList.add('is-invalid');
    
    // Remove any existing error message
    const existingError = input.nextElementSibling;
    if (existingError && existingError.className === 'invalid-feedback') {
        existingError.remove();
    }
    
    input.parentNode.insertBefore(errorDiv, input.nextElementSibling);
}

function removeError(inputId) {
    const input = document.querySelector(`#${inputId}`);
    input.classList.remove('is-invalid');
    
    // Remove error message if it exists
    const existingError = input.nextElementSibling;
    if (existingError && existingError.className === 'invalid-feedback') {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// typewriter
document.addEventListener('DOMContentLoaded', function() {
    // Text strings to be typed
    const textArray = [
        "Android Developer",
        "Java Programmer",
        "Kotlin Enthusiast",
        "Tech Innovator",
        "Software Engineer",
        "App Developer",
        "Problem Solver",
        "UI/UX Explorer"
    ];
    
    let textPosition = 0;
    let speed = 100; // Typing speed in milliseconds
    let textArrayIndex = 0;
    let textElement = document.getElementById("typewriter-text");
    
    function typeWriter() {
        if (textPosition < textArray[textArrayIndex].length) {
            textElement.innerHTML += textArray[textArrayIndex].charAt(textPosition);
            textPosition++;
            setTimeout(typeWriter, speed);
        } else {
            // Pause at the end of a sentence
            setTimeout(eraseText, 2000);
        }
    }
    
    function eraseText() {
        if (textPosition > 0) {
            textElement.innerHTML = textArray[textArrayIndex].substring(0, textPosition - 1);
            textPosition--;
            setTimeout(eraseText, speed/2);
        } else {
            // Move to next text in array
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Start the typewriter effect if element exists
    if (textElement) {
        setTimeout(typeWriter, 1000);
    }
});