/* To do list:
    -/ add optional functionality from TOP
    -/ add CSS to create an Etch-a-Sketch frame (https://learnsometing.github.io/etchASketch/)
    - add toggle buttons to the frame for additional functionality (https://www.w3schools.com/howto/howto_css_switch.asp)
    -/ add a slider bar to the frame for selecting the number of grid boxes (https://tommyisr.github.io/EtchASketch/)
*/

const container = document.querySelector("#container");
const button = document.querySelector('button');

var slider = document.getElementById("pixelSlider");

function createBoard(numSquares) {
    let squareDims = 400 / numSquares;
    container.style.gridTemplate = `repeat(${numSquares}, ${squareDims}px) / repeat(${numSquares}, ${squareDims}px)`

    for (let i=1; i < numSquares; i++) {
        for (let j=1; j < numSquares; j++) {
            let square = document.createElement("div");
            square.className = "square";
            square.style.gridArea = `${i} / ${j} / span 1 / span 1`;
            container.appendChild(square);
        }
    }
}

// Function to change grid squares to navy
function draw(e) {
    if (e.target.id !== "container") {
        e.target.style.backgroundColor = "#000066"
    }
}

// Function to change grid squares to a random color
function drawColorful(e) {
    if (e.target.id !== "container") {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

// Function to increase the opacity by 10% on each mouseover
function drawOpacity(e) {
    if (e.target.id !== "container") {
        console.log('Start :' + e.target.style.backgroundColor);
        let alphaStart = e.target.style.backgroundColor.slice(-4,-1);
        if (alphaStart === 1) {
            let alphaEnd = 1;
        } else {
            alphaEnd = Number(alphaStart) + 0.1;
        }
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${alphaEnd})`;
        console.log(alphaStart);
        console.log(alphaEnd);
        console.log('End: ' + e.target.style.backgroundColor);
    }
}

// Set up a starting board
createBoard(40);

// Set up the drawing functionality
container.addEventListener("mousemove", draw);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    let pixels = slider.value;
    createBoard(pixels);
} 

// Change drawing function for toggle switches
let colorSwitch = document.getElementById("random-color");

colorSwitch.addEventListener('change', (e) => {
    if(this.checked) {
        container.removeEventListener("mousemove", draw);
        container.addEventListener("mousemove", drawColorful);
    } else {
        container.removeEventListener("mousemove", drawColorful);
        container.addEventListener("mousemove", draw);
    }
});


// Reload the page by clicking the button
button.addEventListener("click", e => {
    location.reload();
});