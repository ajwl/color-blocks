import {getPixelData} from "./colourGetter.js"
import {canvasSetUp, drawerOutput} from "./colorDrawer.js"
import {scale, findBlockNumber} from "./utils.js"
import './styles.css'

// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
const maxHeight = 400;
const maxWidth = 400;
const standardBlock = 25;

const mainBox = document.querySelector('main');
const uploadLabel = document.querySelector('label.photo');
const windowWidth = window.outerWidth;

const fileSelector = () => {
  const fileInput = document.getElementById('photo-submitter');
  fileInput.addEventListener(
    'change',
    checkFiles,
    false
  )
}

const checkFiles = (e) => {
  let submitted = Array.from(e.target.files);
  console.log("submitted", submitted.length);
  let isMultiple = submitted.length > 1;
  submitted.forEach(file => {
    console.log(file);
    mountFile(file, isMultiple)
  });
}

const mountFile = (file, lineOnly) => {
  let filename = file.name;
  let reader  = new FileReader();
  let ctx = canvasSetUp('image-holder', maxHeight, maxWidth);
  let img = new Image();
  img.crossorigin = 'anonymous';
  img.correctOrientation = true;

  img.onload = () => {
    let [w, h] = scale(img.width, img.height, maxWidth, maxHeight)
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(img.src)
    drawer(ctx, filename, {w, h, lineOnly})
    mainBox.classList.add('photo-uploaded');
  }
  img.src = URL.createObjectURL(file);
}

const drawer = (ctx, filename, conf) => {
  const button = document.getElementById("run-analysis")
  button.addEventListener(
    'click',
    () => {
        if(conf.lineOnly) {
          drawerAll(ctx, filename, conf)
        } else {
          drawerLineOnly(ctx, filename, conf)
        }
    },
    false
  );
}

const drawerAll = (ctx, filename, conf) => {
  const origColorsL = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "l", filename);
  const origColorsB = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "v", filename); // v is the v in hsv aka brightness
  conf.origColorsL = origColorsL;
  conf.origColorsB = origColorsB;
  createNewCanvases(conf);
  showColourOptions();
}

const drawerLineOnly = (ctx, filename, conf) => {
  const origColorsL = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "l", filename);
  conf.origColorsL = origColorsL;
  conf.origColorsB = [];
  createNewCanvases(conf);
  showColourOptions();
}

const showColourOptions = () => {
  mainBox.classList.add('get-colours');
  uploadLabel.textContent = '1. Upload another photo';
  if (windowWidth < 400) {
    mainBox.scrollTo(0, 600);
  }
}

const createNewCanvases = (conf) => {
  let wLine = findBlockNumber(conf.w, conf.h, standardBlock) * standardBlock;

  if(conf.lineOnly){
      drawerOutput(conf.origColorsL, standardBlock, wLine, 'lineLightness', standardBlock, standardBlock);
  } else {
    // block canvases
    drawerOutput(conf.origColorsL, conf.h, conf.w, 'blockLightness', standardBlock, standardBlock);
    drawerOutput(conf.origColorsB, conf.h, conf.w, 'blockBrightness', standardBlock, standardBlock);

    // line canvases
    drawerOutput(conf.origColorsL, standardBlock, wLine, 'lineLightness', standardBlock, standardBlock);
    drawerOutput(conf.origColorsB, standardBlock, wLine, 'lineBrightness', standardBlock, standardBlock);
  }
}

export const init = () => {
  fileSelector();
}
