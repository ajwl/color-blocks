import {init} from "./main.js";
import {batchInit} from "./batch.js";

window.onload = () => {
  const batchContainer = document.querySelector('#batch-container');
    if(batchContainer){
      console.log("batch option ran");
      batchInit();
    } else {
      init();
    }
};
