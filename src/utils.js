

export const findBlockNumber = (w, h, standardBlock) => {
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

export const scale = (w, h, maxWidth, maxHeight) => {
  const whratio = h / w;
  if(whratio < 1){
    let w1 = maxWidth;
    let h1 = w1 * whratio;
    return [w1, h1]
  }
  else {
    let h1 = maxHeight;
    let w1 = h1 / whratio;
    return [w1, h1];
  }
}
