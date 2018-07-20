import {sortLightness, sortBrightness} from './sorter.js'

export const getPixelData = (ctx, blockHeight, blockWidth, height, width, colorProp) => {
  let vcBlock = blockHeight / 2
  let hcBlock = blockWidth / 2

  let vPoints = []
  let hPoints = []

  for(let i=vcBlock; i < height; i += blockHeight){
    vPoints.push(i)
  }

  for(let i=hcBlock; i < width; i+= blockWidth){
    hPoints.push(i)
  }

  const allPoints = vPoints.reduce((acc,curr) => {
    let row = hPoints.map(hpoint => {
        return [hpoint, curr];
    })
    return acc.concat(row);
  }, []);

  const colorData = allPoints.map((point) => {
      let pixelData = ctx.getImageData(point[0], point[1], 1, 1).data;
      return pixelData;
  });

  if(colorProp === "l") {
    return sortLightness(colorData)
  } else if(colorProp === "v") {
    return sortBrightness(colorData);
  }
}
