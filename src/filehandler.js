

export const setupDownloadButton = (dlButton, containerId, filename) => {

  console.log("id in setupDB is", containerId)
  dlButton.addEventListener(
    'click',
    () => {
      const canvasId = dlButton.id.replace('download', 'cvs');
      const canvas = document.getElementById(`${canvasId}`);
      dlButton.href = canvas.toDataURL('image/png');
      dlButton.download = `${filename}-${containerId}.png`;
    },
    false
  );
  dlButton.classList.add('available');
}
