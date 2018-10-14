import {setupDownloadButton} from "./filehandler.js"

export const drawerOutput = (origColors, height, width, id, blockSide, filename) => {
  let {ctx, dlButton} = canvasSetUp(id, height, width);
  let x = 0;
  let y = 0;

  let xStartPoints = []
  let yStartPoints = []

  for(let i = 0; i < height; i += blockSide){
    yStartPoints.push(i)
  }

  for(let i = 0; i < width; i += blockSide){
    xStartPoints.push(i)
  }

  const allStartPoints = xStartPoints.reduce((acc,curr) => {
    let row = yStartPoints.map(yPoint => {
      return [curr, yPoint]
    })
    return acc.concat(row)
  },[])

  allStartPoints.forEach((coord, i) => {
      ctx.fillRect(coord[0], coord[1], blockSide, blockSide)
      if(origColors[i]){
        ctx.fillStyle = `rgb(${origColors[i].r}, ${origColors[i].g}, ${origColors[i].b})`
      } else {
        ctx.fillStyle = 'white';
      }
  })
  if(dlButton){
    setupDownloadButton(dlButton, id, filename);
  }
}

export const canvasSetUp = (id, h, w) => {
  const container = document.getElementById(id);
  const cvs = document.createElement('canvas');
  cvs.height = h;
  cvs.width = w;
  container.appendChild(cvs);

  if(container.classList.contains('canvas-holder')){
    const dlButton = document.createElement('a');
    dlButton.id = `download-${id}`
    dlButton.textContent = `Download - ${id}`
    container.appendChild(dlButton);
    return {ctx: cvs.getContext('2d'), dlButton }
  }
  else {
    return {ctx: cvs.getContext('2d'), dlButton: null}
  }
}
