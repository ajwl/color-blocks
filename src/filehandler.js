

export const setupDownloadButton = (dlButton, id, filename) => {
  dlButton.addEventListener(
    'click',
    () => {
      const canvas = document.getElementById(`${id}`).querySelector('canvas');
      dlButton.href = canvas.toDataURL();
      dlButton.download = `${filename}-${id}`;
    },
    false
  );
  dlButton.classList.add('available');
}
