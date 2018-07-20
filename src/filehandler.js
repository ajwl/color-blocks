

export const setupDownloadButton = (id, filename) => {
  const link = document.getElementById(`${id}-download`);

  link.addEventListener(
    'click',
    () => {
      const canvas = document.getElementById(`${id}`);
      link.href = canvas.toDataURL();
      link.download = `${filename}-${id}`;
    },
    false
  );

  link.classList.add('available');
}
