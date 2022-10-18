/*
 * Video Pixels
 * Load webcam, manipulate its pixels and draw to canvas.
 */

let cam;
let stepSize;
let h, w;

let fgIndex = 0;
let bgIndex = 0;
let colors = [
  // fg, [bg, bg, bg]
  ["fg0", ['0bg0', '0bg1', '0bg2', '0bg3']],
  ["fg1", ['1bg0', '1bg1', '1bg2', '1bg3']],
  ["fg2", ['2bg0', '2bg1', '2bg2', '2bg3']]
];

function setup() {
   createCanvas(windowWidth, windowHeight);
   cam = createCapture(VIDEO);
   cam.size(windowWidth, windowHeight); 
   cam.hide(); 
   background(255);
   noStroke();
}


function draw() {
  foregroundMidi(midiVal(KNOB1));
  backgroundMidi(midiVal(KNOB2));
  radiusdMidi(midiVal(KNOB3));
  cam.loadPixels();

  background('pink');
  fill('green');

  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      // const darkness = (cam.pixels[i * 4]) / 255;
      const darkness = (255 - cam.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}

function foregroundMidi(sliderVal){
  fgIndex = round(map(sliderVal, 0, 127, 0, colors.length-1))
  // console.log(colors[fgIndex][0]);
}

function backgroundMidi(sliderVal){
  bgIndex = round(map(sliderVal, 0, 127, 0, colors[fgIndex][1].length-1))
  // console.log(colors[fgIndex][1][bgIndex]);
}

function radiusdMidi(sliderVal){
  stepSize = round(map(sliderVal, 0, 127, 25, 80));
  console.log(stepSize);
  // console.log(colors[fgIndex][1][bgIndex]);
}