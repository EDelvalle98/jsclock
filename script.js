// Select the clock element
const clock = document.getElementById('clock');

// Screen dimensions
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

// Initial position and speed
let x = Math.random() * screenWidth;
let y = Math.random() * screenHeight;
let dx = 2; // Horizontal speed
let dy = 2; // Vertical speed

// Update clock time
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const date = now.toDateString();
    clock.textContent = `${date} | ${hours}:${minutes}:${seconds}`;
}

// Animate the clock
function animateClock() {
    // Update position
    x += dx;
    y += dy;

    // Check for collisions with the edges
    if (x + clock.offsetWidth >= screenWidth || x <= 0) {
        dx = -dx; // Reverse horizontal direction
        changeColor(); // Change color on bounce
    }

    if (y + clock.offsetHeight >= screenHeight || y <= 0) {
        dy = -dy; // Reverse vertical direction
        changeColor(); // Change color on bounce
    }

    // Apply new position
    clock.style.left = `${x}px`;
    clock.style.top = `${y}px`;

    // Request the next frame
    requestAnimationFrame(animateClock);
}

// Change clock color on bounce with a slower interval
let lastColorChange = Date.now();
function changeColor() {
    const now = Date.now();
    // Change color only if more than 500ms has passed since the last change
    if (now - lastColorChange > 500) {
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        clock.style.color = randomColor;
        clock.style.borderColor = randomColor;
        lastColorChange = now;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});

// Initialize
updateClock();
setInterval(updateClock, 1000);
animateClock();