import {getPixelData} from "./colourGetter.js"
import {setupDownloadButton} from "./filehandler.js"
import {canvasSetUp, drawerOutput} from "./colorDrawer.js"
import './styles.css'
import img from  "./blocks1.png"

//image - 16 blocks high, 9 wide - each block 31.25 high,
// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
const height = 500;
const width = 300;
const verticalBlocks = 16;
const horizontalBlocks = 9;

const blockWidth = 33.33333;
const blockHeight = 31.25;

const hLine = blockHeight;
const wLine = blockWidth * 144; // number of blocks

let filename = "sunset-1"
let sourceImg = img;

const init = () => {
  setUpFirstCanvas();
  fileSelector();
}

const fileSelector = () => {
  const fileInput = document.getElementById('photo-submitter');
  fileInput.addEventListener(
    'change',
    mountFile,
    false
  )
}

const mountFile = (e) => {
  let file = e.target.files[0];
  var reader  = new FileReader();
  let testimage = document.getElementById('testimage')

  reader.addEventListener('load',() => {
    testimage.src = reader.result;
  },false);
  if (file) {
    reader.readAsDataURL(file);
  }
  drawer()
}

const setUpFirstCanvas = () => {
  let ctx = canvasSetUp('canvas', height, width);
}

const drawer = () => {
  let img = new Image();
  img.crossorigin = 'anonymous';

  img.addEventListener('load', () => {
    makeImage();
  }, false);

  function makeImage(){
    ctx.drawImage(img, 0, 0, width, height);
    localStorage.setItem( "savedImageData", canvas.toDataURL("blocks1/png") );
  }

  const button = document.getElementById("run-analysis")
  button.addEventListener('click', () => {
    const origColorsL = getPixelData(ctx, blockHeight, blockWidth, height, width, "l");
    const origColorsB = getPixelData(ctx, blockHeight, blockWidth, height, width, "v");
    createNewCanvases(origColorsL, origColorsB);
  }, false);
}

const createNewCanvases = (origColorsL, origColorsB) => {
  // block canvases
  drawerOutput(origColorsL, height, width, 'blockLightness', blockHeight, blockWidth);
  drawerOutput(origColorsB, height, width, 'blockBrightness', blockHeight, blockWidth); // v is the v in hsv aka brightness

  // line canvases
  drawerOutput(origColorsL, hLine, wLine, 'lineLightness', blockHeight, blockWidth);
  drawerOutput(origColorsB, hLine, wLine, 'lineBrightness', blockHeight, blockWidth);
}

window.onload = () => {
  init();
}
