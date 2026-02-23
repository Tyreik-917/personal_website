// Starfield Configuration
const STARFIELD_CONFIG = {
    starCount: 600,                 // Total number of stars
    clusterRatio: 0.3,              // Percentage of stars in clusters
    minSize: 0.5,                   // Minimum star size (px)
    maxSize: 2,                     // Maximum star size (px)
    twinkleMin: 0.8,                // Brighter minimum opacity for twinkling
    twinkleMax: 1,                  // Maximum opacity (stays at 1 for full brightness)
    animationDurationMin: 3,        // Minimum animation duration (seconds)
    animationDurationMax: 10,       // Maximum animation duration (seconds)
    shootingStarInterval: 225,      // Time between shooting stars (ms) - reduced by 55% from 500
    shootingStarChance: 1.0,        // Always show shooting stars when possible
    starColors: [                   // All stars are 100% white and bright
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)'
    ]
};

// Initialize starfield when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    // Create stars container
    const container = document.createElement('div');
    container.className = 'stars-container';
    particles.prepend(container);
    
    // Calculate cluster count
    const clusterCount = Math.floor(STARFIELD_CONFIG.starCount * STARFIELD_CONFIG.clusterRatio);
    const randomStars = STARFIELD_CONFIG.starCount - clusterCount;
    
    // Create clustered stars
    for (let i = 0; i < clusterCount; i++) {
        createStarCluster(container, i, clusterCount);
    }
    
    // Create random stars
    for (let i = 0; i < randomStars; i++) {
        createRandomStar(container);
    }
    
    // Start shooting stars
    initShootingStars(container);
});

// Create a cluster of stars
function createStarCluster(container, index, totalClusters) {
    const clusterSize = 3 + Math.floor(Math.random() * 5); // 3-7 stars per cluster
    const clusterX = (index / totalClusters) * 100;
    const clusterY = 10 + Math.random() * 80; // Keep away from top/bottom edges
    const spread = 5 + Math.random() * 10; // Cluster spread
    
    for (let i = 0; i < clusterSize; i++) {
        const star = createStar();
        
        // Position stars in a cluster
        const left = Math.max(1, Math.min(99, clusterX + (Math.random() * spread - spread/2)));
        const top = Math.max(1, Math.min(99, clusterY + (Math.random() * spread - spread/2)));
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        container.appendChild(star);
    }
}

// Create a single random star
function createRandomStar(container) {
    const star = createStar();
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    container.appendChild(star);
    return star;
}

// Create a star element with random properties
function createStar() {
    const star = document.createElement('div');
    const size = STARFIELD_CONFIG.minSize + Math.random() * (STARFIELD_CONFIG.maxSize - STARFIELD_CONFIG.minSize);
    
    // Set size class based on size
    let sizeClass = 'small';
    if (size > STARFIELD_CONFIG.maxSize * 0.75) sizeClass = 'large';
    else if (size > STARFIELD_CONFIG.maxSize * 0.5) sizeClass = 'medium';
    
    star.className = `star ${sizeClass}`;
    
    // Random animation
    const delay = Math.random() * 10;
    const duration = STARFIELD_CONFIG.animationDurationMin + 
                    Math.random() * (STARFIELD_CONFIG.animationDurationMax - STARFIELD_CONFIG.animationDurationMin);
    
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;
    
    // Random color from the palette
    const color = STARFIELD_CONFIG.starColors[
        Math.floor(Math.random() * STARFIELD_CONFIG.starColors.length)
    ];
    
    // Enhanced glow effect for brighter stars
    const glowSize = size * 3; 
    star.style.boxShadow = `0 0 ${size * 8}px ${size * 2}px rgba(255, 255, 255, 1)`;
    
    return star;
}

// Initialize shooting stars
function initShootingStars(container) {
    // Create shooting star
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Increased size and trail length by 55%
        const size = (2 + Math.random() * 2) * 1.55; // 3.1-6.2px
        const trailLength = (50 + Math.random() * 100) * 1.55; // 77.5-232.5px
        
        // Random start position from edges
        const startFrom = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY, endX, endY;
        
        switch(startFrom) {
            case 0: // Top
                startX = Math.random() * 100;
                startY = -10;
                endX = startX + (Math.random() * 40 - 20);
                endY = 110;
                break;
            case 1: // Right
                startX = 110;
                startY = Math.random() * 100;
                endX = -10;
                endY = startY + (Math.random() * 40 - 20);
                break;
            case 2: // Bottom
                startX = Math.random() * 100;
                startY = 110;
                endX = startX + (Math.random() * 40 - 20);
                endY = -10;
                break;
            case 3: // Left
            default:
                startX = -10;
                startY = Math.random() * 100;
                endX = 110;
                endY = startY + (Math.random() * 40 - 20);
        }
        
        // Set initial position and size
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Enhanced shooting star glow (55% larger)
        star.style.boxShadow = `0 0 ${size * 9.3}px ${size * 2.33}px rgba(255, 255, 255, 1)`;
        
        // Enhanced trail for shooting stars (55% larger)
        const trail = document.createElement('div');
        trail.className = 'shooting-star-trail';
        trail.style.width = `${trailLength * 2.33}px`;  // 55% longer trail
        trail.style.height = `${size * 2.33}px`;        // 55% thicker trail
        trail.style.background = `linear-gradient(90deg, transparent, rgba(255, 255, 255, 1))`;
        
        star.appendChild(trail);
        container.appendChild(star);
        
        // Animate with 55% faster speed
        const duration = (1 + Math.random() * 2) * 0.45; // 0.45-1.35 seconds (55% faster)
        
        star.animate([
            { transform: `translate(${0}px, ${0}px) rotate(45deg)`, opacity: 0 },
            { transform: `translate(${endX - startX}%, ${endY - startY}%) rotate(45deg)`, opacity: 1 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });
        
        // Clean up after animation
        setTimeout(() => {
            if (star.parentNode === container) {
                container.removeChild(star);
            }
        }, duration * 1000);
    }
    
    // Start shooting star interval
    setInterval(() => {
        if (Math.random() < STARFIELD_CONFIG.shootingStarChance) {
            createShootingStar();
        }
    }, STARFIELD_CONFIG.shootingStarInterval);
    
    // Initial shooting stars
    for (let i = 0; i < 2; i++) {
        setTimeout(createShootingStar, i * 1000);
    }
}
