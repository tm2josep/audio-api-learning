<script>
  import { onMount } from "svelte";
  export let analyser = {};
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame;

    (function loop() {
      frame = requestAnimationFrame(loop);

      analyser.fftSize = 2048;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.beginPath();
      let sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    })();

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  canvas {
    border: 1px solid black;
    display: block;
  }
</style>

<canvas bind:this={canvas} width="200" height="100" />
