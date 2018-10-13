import {setupDownloadButton} from "./filehandler.js"

export const drawerOutput = (origColors, height, width, id, blockSide, filename) => {
  let ctx = canvasSetUp(id, height, width);
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
  setupDownloadButton(id, filename);
}

export const canvasSetUp = (id, h, w) => {
  const container = document.getElementById(id);
  const cvs = document.createElement('canvas');
  console.log(container);
  if(container.querySelector("a")) {
    const dlButton = container.querySelector("a")
    dlButton.textContent = `Download sorted by ${id}`;
  }
  container.appendChild(cvs);
  cvs.height = h;
  cvs.width = w;
  return cvs.getContext('2d');
}
