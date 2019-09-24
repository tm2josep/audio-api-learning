export class Oscilloscope {
    constructor(canvas, analyserNode) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.analyser = analyserNode;
        this.analyser.fftSize = 2048;
        this.color = window
            .getComputedStyle(canvas)
            .getPropertyValue("color");
    }

    draw() {
        // Queue it for the next frame;
        requestAnimationFrame(this.draw.bind(this));

        // Gather the data from the node
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(dataArray);

        // Clear the canvas;
        this.context.clearRect(0, 0, this.width, this.height);

        // Set line properties;
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.color || 'black';
        this.context.beginPath();

        // Connect the points;
        const dx = this.width * 1.0 / bufferLength;
        dataArray.forEach((v, i) => {
            let y = (v / 128) * (this.height / 2);
            if (i === 0) {
                this.context.moveTo(0, y);
            } else {
                this.context.lineTo(i * dx, y);
            }
        });

        // Back to baseline then stroke;
        this.context.lineTo(this.width, this.height / 2);
        this.context.stroke();
    };
}