const colorsys = require('colorsys')

//Sort on brightness - the V in hsv
export const sortBrightness = (colorData) => {
  const cPlusHsv = addToColor(colorData, colorsys.rgb_to_hsv, "v");
  return cPlusHsv.sort((a,b) => {
    return a.v - b.v
  })
}

//Sort on lightness - the L in hsl
export const sortLightness = (colorData) => {
 const cPlusHsl = addToColor(colorData, colorsys.rgb_to_hsl, "l");
  return cPlusHsl.sort((a, b) => {
    return a.l - b.l
  })
}

const addToColor = (data, func, prop) => {
  return data.map( d => {
    let [r, g, b] = d;
    let newColor = func(r, g, b);
    return { r, g, b, [prop]: newColor[prop] } // {r g b l} or {r g b v}
  })
}
