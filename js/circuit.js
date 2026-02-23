document.addEventListener('DOMContentLoaded', function() {
    // Create circuit board container
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-container';
    document.body.appendChild(circuitContainer);

    // Add circuit grid
    const grid = document.createElement('div');
    grid.className = 'circuit-grid';
    circuitContainer.appendChild(grid);

    // Add circuit background
    const circuitBg = document.createElement('div');
    circuitBg.className = 'circuit-background';
    circuitContainer.appendChild(circuitBg);

    // Create circuit nodes
    function createCircuitNodes() {
        const nodeCount = 20;
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'circuit-node';
            
            // Random position
            const size = 2 + Math.random() * 3; // 2-5px
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            node.style.width = `${size}px`;
            node.style.height = `${size}px`;
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.animationDelay = `${Math.random() * 5}s`;
            
            circuitContainer.appendChild(node);
        }
    }

    // Create circuit lines
    function createCircuitLines() {
        const lineCount = 15;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'circuit-line';
            
            // Random position and size
            const isVertical = Math.random() > 0.5;
            const length = 10 + Math.random() * 20; // 10-30px
            const thickness = 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            if (isVertical) {
                line.style.width = `${thickness}px`;
                line.style.height = `${length}px`;
            } else {
                line.style.width = `${length}px`;
                line.style.height = `${thickness}px`;
            }
            
            line.style.left = `${x}%`;
            line.style.top = `${y}%`;
            line.style.animationDelay = `${Math.random() * 5}s`;
            
            circuitContainer.appendChild(line);
        }
    }

    // Initialize circuit elements
    createCircuitNodes();
    createCircuitLines();

    // Update circuit elements on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Remove existing nodes and lines
            const nodes = document.querySelectorAll('.circuit-node, .circuit-line');
            nodes.forEach(node => node.remove());
            
            // Create new nodes and lines
            createCircuitNodes();
            createCircuitLines();
        }, 250);
    });
});
