import {getPixelData} from "./colourGetter.js"
import {canvasSetUp, drawerOutput} from "./colorDrawer.js"
import './styles.css'

//image - 16 blocks high, 9 wide - each block 31.25 high,
// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
const height = 400;
const width = 400;
const verticalBlocks = 16;
const horizontalBlocks = 9;

const blockWidth = 33.33333;
const blockHeight = 31.25;

const hLine = blockHeight;
const wLine = blockWidth * 144; // number of blocks

const init = () => {
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
  let filename = file.name;
  let reader  = new FileReader();
  let ctx = canvasSetUp('canvas', height, width);
  let img = new Image();
  img.crossorigin = 'anonymous';

  img.onload = () => {
    let [w, h] = scale(img.width, img.height)
    // ctx.height = h;
    // ctx.width = w;
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(img.src)
    drawer(ctx, filename)
  }
  img.src = URL.createObjectURL(file);

}

const scale = (w, h) => {
  const whratio = h / w;
  if(whratio < 1){
    let w1 = width;
    let h1 = w1 * whratio;
    return [w1, h1]
  }
  else {
    let h1 = height;
    let w1 = h1 / whratio;
    return [w1, h1];
  }
}

const drawer = (ctx, filename) => {
  const button = document.getElementById("run-analysis")
  button.addEventListener('click', () => {
    const origColorsL = getPixelData(ctx, blockHeight, blockWidth, height, width, "l", filename);
    const origColorsB = getPixelData(ctx, blockHeight, blockWidth, height, width, "v", filename);
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
