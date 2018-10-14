import {getPixelData} from "./colourGetter.js"
import {canvasSetUp, drawerOutput} from "./colorDrawer.js"
import {scale, findBlockNumber} from "./utils.js"
import './styles.css'

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

  //clear mounted files
  const imageHolder = document.getElementById('image-holder');
  imageHolder.innerHTML = "";
  const blocks = document.querySelectorAll('.canvas-holder');
  blocks.forEach(b => b.innerHTML = "");

  let submitted = Array.from(e.target.files);

  let isMultiple = submitted.length > 1;
  submitted.forEach(file => {
    mountFile(file, isMultiple)
  });

}

const mountFile = (file, lineOnly) => {
  let filename = file.name;
  let reader  = new FileReader();
  let {ctx, dlButton} = canvasSetUp('image-holder', maxHeight, maxWidth);
  let img = new Image();
  img.crossorigin = 'anonymous';
  img.correctOrientation = true;

  //clear file input
  const fileInput = document.getElementById('photo-submitter');
  fileInput.files = null;

  img.onload = () => {
    let [w, h] = scale(img.width, img.height, maxWidth, maxHeight)
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(img.src)
    onGetColours(ctx, filename, {w, h, lineOnly})
    mainBox.classList.add('photo-uploaded');
  }
  img.src = URL.createObjectURL(file);
}

const onGetColours = (ctx, filename, conf) => {
  if(conf.lineOnly) {
    drawerLineOnly(ctx, filename, conf)
    mainBox.classList.add('is-multiple');
  } else {
    drawerAll(ctx, filename, conf)
    mainBox.classList.remove('is-multiple');
  }
}

const drawerAll = (ctx, filename, conf) => {
  const origColorsL = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "l");
  const origColorsB = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "v"); // v is the v in hsv aka brightness
  conf.origColorsL = origColorsL;
  conf.origColorsB = origColorsB;
  conf.filename = filename.replace(/\.[^/.]+$/, "");
  createNewCanvases(conf, origColorsL, origColorsB);
  showColourOptions();
}

const drawerLineOnly = (ctx, filename, conf) => {
  const origColorsL = getPixelData(ctx, standardBlock, standardBlock, conf.h, conf.w, "l");
  conf.filename = filename.replace(/\.[^/.]+$/, "");
  createNewCanvases(conf, origColorsL, []);
  showColourOptions();
}

const showColourOptions = () => {
  mainBox.classList.add('get-colours');
  uploadLabel.textContent = 'Upload another photo';
  if (windowWidth < 400) {
    mainBox.scrollTo(0, 600);
  }
}

const createNewCanvases = (conf, origColorsL, origColorsB) => {
  const wLine = findBlockNumber(conf.w, conf.h, standardBlock) * standardBlock;

  if(conf.lineOnly){
      drawerOutput(origColorsL, standardBlock, wLine, 'lineLightness', standardBlock, conf.filename);
  } else {
    // block canvases
    drawerOutput(origColorsL, conf.h, conf.w, 'blockLightness', standardBlock, conf.filename);
    drawerOutput(origColorsB, conf.h, conf.w, 'blockBrightness', standardBlock, conf.filename);

    // line canvases
    drawerOutput(conf.origColorsL, standardBlock, wLine, 'lineLightness', standardBlock, conf.filename);
    drawerOutput(conf.origColorsB, standardBlock, wLine, 'lineBrightness', standardBlock, conf.filename);
  }
}

const init = () => {
  fileSelector();
}

init();
