<script>
  import Instrument from "./Instrument.svelte";
  import Button from "./SubComponents/Button.svelte";
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  let audioSettings = {
    context: audioCtx,
    destination: audioCtx.destination
  };

  let instruments = [];
  let name = "";

  function makeNewInstrument() {
    instruments = [
      ...instruments,
      {
        audio: audioSettings,
        name: name
      }
    ];
  }
</script>

<input type="text" bind:value={name} />
<Button on:click={makeNewInstrument}>+Instrument</Button>

{#each instruments as instrument, id}
  <Instrument audio={instrument.audio} instrumentName={instrument.name} />
{:else}
  <br />
  No Instruments Yet!
{/each}
