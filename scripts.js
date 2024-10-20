// Define the grid data
const data = [
    "GGGGGG",
    "GGGGGR",
    "GGGGRG",
    "GGGGRR",
    "GGGRGG",
    "GGGRGR",
    "GGGRRG",
    "GGGRRR",
    "GGRGGG",
    "GGRGGR",
    "GGRGRG",
    "GGRGRR",
    "GGRRGG",
    "GGRRGR",
    "GGRRRG",
    "GGRRRR",
    "GRGGGG",
    "GRGGGR",
    "GRGGRG",
    "GRGGRR",
    "GRGRGG",
    "GRGRGR",
    "GRGRRG",
    "GRGRRR",
    "GRRGGG",
    "GRRGGR",
    "GRRGRG",
    "GRRGRR",
    "GRRRGG",
    "GRRRGR",
    "GRRRRG",
    "GRRRRR",
    "RGGGGG",
    "RGGGGR",
    "RGGGRG",
    "RGGGRR",
    "RGGRGG",
    "RGGRGR",
    "RGGRRG",
    "RGGRRR",
    "RGRGGG",
    "RGRGGR",
    "RGRGRG",
    "RGRGRR",
    "RGRRGG",
    "RGRRGR",
    "RGRRRG",
    "RGRRRR",
    "RRGGGG",
    "RRGGGR",
    "RRGGRG",
    "RRGGRR",
    "RRGRGG",
    "RRGRGR",
    "RRGRRG",
    "RRGRRR",
    "RRRGGG",
    "RRRGGR",
    "RRRGRG",
    "RRRGRR",
    "RRRRGG",
    "RRRRGR",
    "RRRRRG",
    "RRRRRR"
];

// Define the color mapping
const colorMap = {
    'G': 'green',
    'R': 'red'
};

// Get the grid element
const gridElement = document.getElementById('grid');

// Create the grid with serial numbers for the first cell in each row
let rowNumber = 1;

// Loop through the grid data
data.forEach(row => {
    row.split('').forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.style.backgroundColor = colorMap[cell]; // Set background color based on the data

        // Add serial number only to the first cell in each row
        if (index === 0) {
            div.textContent = rowNumber; // Set the row number in the first cell
            rowNumber++; // Increment the row number for the next row
        }

        gridElement.appendChild(div); // Append cell to the grid
    });
});
