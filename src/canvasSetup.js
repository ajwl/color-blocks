export const canvasSetUp = (id, h, w) => {
    const container = document.getElementById(id);

    //how many canvases already in this container?
    const numCanvas = container.querySelectorAll('canvas').length;
    const indexNewCanvas = numCanvas + 1;

    const cvs = document.createElement('canvas');
    cvs.id = `cvs-${id}-${indexNewCanvas}`;
    cvs.height = h;
    cvs.width = w;
    container.appendChild(cvs);

    if (container.classList.contains('canvas-holder')) {
        const dlButton = createDownloadButton(id, indexNewCanvas);
        container.appendChild(dlButton);
        return { ctx: cvs.getContext('2d'), dlButton }
    }
    else {
        return { ctx: cvs.getContext('2d'), dlButton: null }
    }

}

const createDownloadButton = (containerId, indexNewCanvas) => {
    const dlButton = document.createElement('a');
    dlButton.id = `download-${containerId}-${indexNewCanvas}`
    dlButton.textContent = `Download - ${containerId} - ${indexNewCanvas}`
    return dlButton;
}