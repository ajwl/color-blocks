import {getPixelData} from "./colourGetter.js"
import {setupDownloadButton} from "./filehandler.js"
import './styles.css'
import blocks from  "./blocks1.png"

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

const filename = "sunset-1"


const drawer = () => {
  let ctx = canvasSetUp('canvas', height, width);
  let img = new Image();
  img.src = blocks;
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
  drawerOutput(origColorsL, height, width, 'blockLightness')
  drawerOutput(origColorsB, height, width, 'blockBrightness') // v is the v in hsv aka brightness

  // line canvases
  drawerOutput(origColorsL, hLine, wLine, 'lineLightness');
  drawerOutput(origColorsB, hLine, wLine, 'lineBrightness');

}

const drawerOutput = (origColors, height, width, id) => {
  let ctx = canvasSetUp(id, height, width);
  let x = 0;
  let y = 0;

  let xStartPoints = []
  let yStartPoints = []

  for(let i = 0; i < height; i += blockHeight){
    yStartPoints.push(i)
  }

  for(let i = 0; i < width; i += blockWidth){
    xStartPoints.push(i)
  }

  const allStartPoints = xStartPoints.reduce((acc,curr) => {
    let row = yStartPoints.map(yPoint => {
      return [curr, yPoint]
    })
    return acc.concat(row)
  },[])

  allStartPoints.forEach((coord, i) => {
      ctx.fillRect(coord[0], coord[1], blockWidth, blockHeight)
      if(origColors[i]){
        ctx.fillStyle = `rgb(${origColors[i].r}, ${origColors[i].g}, ${origColors[i].b})`
      } else {
        ctx.fillStyle = 'green'
      }
  })
  setupDownloadButton(id, filename);
}

const canvasSetUp = (id, h, w) => {
  const cvs = document.getElementById(id)
  cvs.height = h;
  cvs.width = w;
  return cvs.getContext('2d');
}

window.onload = () => {
  drawer();
}
