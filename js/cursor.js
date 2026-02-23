document.addEventListener('DOMContentLoaded', function() {
    // Create cursor element if it doesn't exist
    if (!document.querySelector('.cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }

    const cursor = document.querySelector('.cursor');
    
    // Elements that should trigger the hover effect
    const hoverElements = [
        'a',
        'button',
        '.menu a',
        '.social-icons a',
        '.card',
        '.project-card',
        'input[type="submit"]',
        'input[type="button"]',
        '.button',
        'label[for]',
        'select',
        'textarea'
    ];

    // Move cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add hover effect to all interactive elements
    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.cursor = 'none'; // Hide default cursor
            
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
            
            // Add active state for clickable elements
            if (selector === 'button' || 
                selector === 'a' || 
                selector.includes('input') || 
                selector.includes('button')) {
                
                element.addEventListener('mousedown', () => {
                    cursor.classList.add('cursor-active');
                });
                
                element.addEventListener('mouseup', () => {
                    cursor.classList.remove('cursor-active');
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-active');
                });
            }
        });
    });

    // Handle touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});
