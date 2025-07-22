// Get the canvas element
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Create an array of characters (hexadecimal digits)
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

// Calculate number of columns based on character width (20px)
const columns = Math.floor(canvasWidth / 20);

// Initialize the y positions of the columns randomly
const yPositions = [];
for (let i = 0; i < columns; i++) {
  yPositions[i] = Math.random() * canvasHeight;
}

// Update the matrix animation frame
function updateMatrix() {
  // Set the background color with slight transparency for the "rain" trail effect
  // Increased transparency (0.08) for a softer, more subtle trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Set the text color and font
  ctx.fillStyle = "green";
  // Changed font to a monospace font for an authentic matrix feel
  // Fallbacks included in case 'Cascadia Code' is not available
  ctx.font = "14px 'Cascadia Code', 'Consolas', 'Monaco', monospace";

  // Loop through each column to draw characters
  for (let i = 0; i < columns; i++) {
    // Select a random character from the array
    const character = characters[Math.floor(Math.random() * characters.length)];

    // Get the current y position of the column
    const y = yPositions[i];

    // Draw the character at the current position
    ctx.fillText(character, i * 20, y);

    // Move the column down by 20 units (character height)
    yPositions[i] += 20;

    // Reset the position if it reaches the bottom of the canvas, with a probability
    // Adjusted probability (0.95) for more frequent resets, creating a denser rain effect
    if (yPositions[i] > canvasHeight && Math.random() > 0.95) {
      yPositions[i] = 0; // Reset to the top
    }
  }
}

// Render the matrix animation using requestAnimationFrame for smooth animation
function renderMatrix() {
  requestAnimationFrame(renderMatrix);
  updateMatrix();
}

// Start the animation when the window loads
window.onload = function() {
    renderMatrix();
};
