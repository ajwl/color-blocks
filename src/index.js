import {getPixelData} from "./colourGetter.js"
import {canvasSetUp, drawerOutput} from "./colorDrawer.js"
import './styles.css'

// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript

const height = 400;
const width = 400;
const standardBlock = 25;

const mainBox = document.querySelector('main');
const uploadLabel = document.querySelector('label.photo');
const windowWidth = window.outerWidth;

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
  img.correctOrientation = true;

  img.onload = () => {
    let [w, h] = scale(img.width, img.height)
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(img.src)
    drawer(ctx, filename, {w, h})
    mainBox.classList.add('photo-uploaded');
  }
  img.src = URL.createObjectURL(file);
}

const drawer = (ctx, filename, conf) => {
  const button = document.getElementById("run-analysis")
  button.addEventListener(
    'click',
    () => {
      const origColorsL = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "l", filename);
      const origColorsB = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "v", filename); // v is the v in hsv aka brightness
      createNewCanvases(origColorsL, origColorsB, conf);
      showColourOptions();
    },
    false
  );
}

const showColourOptions = () => {
  mainBox.classList.add('get-colours');
  uploadLabel.textContent = '1. Upload another photo';
  console.log("windowwidth", windowWidth);
  if (windowWidth < 400) {
    mainBox.scrollTo(0, 600);
  }
}

const createNewCanvases = (origColorsL, origColorsB, conf) => {

  let wLine = findBlockNumber(conf.w, conf.h) * standardBlock;

  // block canvases
  drawerOutput(origColorsL, conf.h, conf.w, 'blockLightness', standardBlock, standardBlock);
  drawerOutput(origColorsB, conf.h, conf.w, 'blockBrightness', standardBlock, standardBlock);

  // line canvases
  drawerOutput(origColorsL, standardBlock, wLine, 'lineLightness', standardBlock, standardBlock);
  drawerOutput(origColorsB, standardBlock, wLine, 'lineBrightness', standardBlock, standardBlock);
}

const findBlockNumber = (w, h) => {
  let horizontalBlocks;
  let verticalBlocks;
  if(w > h) {
    horizontalBlocks = 15;
    verticalBlocks = h / standardBlock;
  } else {
    horizontalBlocks = w / standardBlock;
    verticalBlocks = 15;
  }
  let numBlocks = verticalBlocks * horizontalBlocks;
  return (numBlocks);
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

window.onload = () => {
  init();
}
