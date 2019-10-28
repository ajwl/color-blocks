import { setupDownloadButton } from "./filehandler.js"
import { canvasSetUp } from './canvasSetup'

export const drawerOutput = (origColors, height, width, id, blockSide, filename) => {
  let { ctx, dlButton } = canvasSetUp(id, height, width);
  let x = 0;
  let y = 0;

  let xStartPoints = []
  let yStartPoints = []

  for (let i = 0; i < height; i += blockSide) {
    yStartPoints.push(i)
  }

  for (let i = 0; i < width; i += blockSide) {
    xStartPoints.push(i)
  }

  const allStartPoints = xStartPoints.reduce((acc, curr) => {
    let row = yStartPoints.map(yPoint => {
      return [curr, yPoint]
    })
    return acc.concat(row)
  }, [])

  allStartPoints.forEach((coord, i) => {
    ctx.fillRect(coord[0], coord[1], blockSide, blockSide)
    if (origColors[i]) {
      ctx.fillStyle = `rgb(${origColors[i].r}, ${origColors[i].g}, ${origColors[i].b})`
    } else {
      ctx.fillStyle = 'white';
    }
  })
  if (dlButton) {
    setupDownloadButton(dlButton, id, filename);
  }
}


