
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLink.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-item, .cert-item, .activity-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for animations
    document.querySelectorAll('.project-card, .skill-item, .cert-item, .activity-item, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run it once on load
    animateOnScroll();

    // Trigger skill bar animations when skills section comes into view
    const skillsSection = document.querySelector('.skills-section');
    
    const animateSkillBars = () => {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (skillsPosition < screenPosition - 100) {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.width = bar.style.width;
            });
            window.removeEventListener('scroll', animateSkillBars);
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);
});
