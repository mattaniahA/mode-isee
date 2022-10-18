/*
 * Video Pixels
 * Load webcam, manipulate its pixels and draw to canvas.
 */

let cam;
let h, w;

let pink = '#000';
let green = 'lime';


function setup() {
   // get window width
   w = window.innerWidth;
   // calculate canvas height
   h = (w * 9) / 16;
   // create canvas
   createCanvas(w, h);
   background(255);
   cam = createCapture(VIDEO);
   // get video scaling ratio
   let ratio = h / cam.height;
   // recalculate video width
   let cam_w = cam.width * ratio;
   cam.size(cam_w, h); 
   cam.hide(); 
}

function draw() {
  background(pink);
  cam.loadPixels();
  const stepSize = 12;
  // const stepSize = round(constrain(mouseX / 8, 6, 600));
  // console.log(stepSize)
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
