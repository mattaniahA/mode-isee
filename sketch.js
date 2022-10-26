/*
 * Video Pixels
 * Load webcam, manipulate its pixels and draw to canvas.
 */

let cam;
let h, w;

let stepSize;
let stepMin = 12;
let stepMax = 65;

let baseColorIndex = 0;
let secColorIndex = 0;

let blackPalette = {
  primary: "#000", 
  secondary: ['#52C636', '#50B0DB', '#F61C54', '#8673BD']
};
let pinkPalette = {
  primary: "#FF69B4", 
  secondary: ['#120E98', '#3D1202', '#033B24', '#400D8C']
};
let greenPalette = {
  primary: "#00FF7F", 
  secondary: ['#162F19', '#190882', '#755D09', '#A52A6E']
};

let midiCheckbox;
let radiusSlider, fgSlider, bgSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight); 
  cam.hide(); 
  background(255);
  noStroke();

  midiCheckbox = createCheckbox('use midi controller', true);
  // midiCheckbox.changed(() => {useMidiController = midiCheckbox.checked();});
  radiusSlider = createSlider(stepMin, stepMax, stepMin);
  fgSlider = createSlider(0, 2, 0, 1);
  bgSlider = createSlider(0, 3, 0, 1);
}

function draw() {
  switchControls(); 
  cam.loadPixels();

  let curColorPalette, bg, fg;
  if(baseColorIndex === 0) {
    curColorPalette = blackPalette;
    background(curColorPalette.primary);
    fill(curColorPalette.secondary[secColorIndex]);
  } else if(baseColorIndex === 1) {
    curColorPalette = pinkPalette;
    background(curColorPalette.secondary[secColorIndex]);
    fill(curColorPalette.primary);
  } else {
    curColorPalette = greenPalette;
    background(curColorPalette.secondary[secColorIndex]);
    fill(curColorPalette.primary);
  }


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

function primaryColorMidi(sliderVal){
  if (midiCheckbox.checked()){
    baseColorIndex = round(map(sliderVal, 0, 127, 0, 2))
  } else {
    baseColorIndex = sliderVal;
  }
}

function secondaryColorMidi(sliderVal){
  if (midiCheckbox.checked()){
    secColorIndex = round(map(sliderVal, 0, 127, 0, 3))
  } else {
    secColorIndex = sliderVal;
  }
}

function radiusdMidi(sliderVal){
  if (midiCheckbox.checked()){
    stepSize = round(map(sliderVal, 0, 127, stepMin, stepMax));
  } else {
    stepSize = sliderVal;
  }
}

function switchControls(){
  if (midiCheckbox.checked()){
    radiusdMidi(midiVal(KNOB1));
    primaryColorMidi(midiVal(KNOB2));
    secondaryColorMidi(midiVal(KNOB3));
  } else {
    radiusdMidi(radiusSlider.value());
    primaryColorMidi(fgSlider.value());
    secondaryColorMidi(bgSlider.value());
  }
}