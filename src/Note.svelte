<script>
  import { createEventDispatcher } from "svelte";
  import { faToggleOn } from "@fortawesome/free-solid-svg-icons/faToggleOn";
  import { faToggleOff } from "@fortawesome/free-solid-svg-icons/faToggleOff";
  import Button from "./SubComponents/Button.svelte";
  import Icon from "./SubComponents/Icon.svelte";
  import Analyser from "./SubComponents/Analyser.svelte";

  // Component inputs and setups
  export let audio = {};
  export let settings = {};
  export let name = "Hello!";
  export let index = 0;
  let { waveform, frequency, volume } = settings;
  let toggle = false;
  let { context, finish } = audio;

  // Oscillator node setup and bindings
  const oscillatorNode = context.createOscillator();

  $: oscillatorNode.frequency.value = inBound(frequency) ? frequency : 100;
  $: oscillatorNode.type = waveform;

  function inBound(n) {
    return n > 20 && n < 20000;
  }

  // Gain node setup and bindings;
  const gainNode = context.createGain();
  $: gainNode.gain.value = toggle ? volume : 0;

  // Analyser setup;
  const analyserNode = context.createAnalyser();

  // Linking all nodes;
  oscillatorNode.start();
  oscillatorNode.connect(gainNode);
  gainNode.connect(analyserNode);
  analyserNode.connect(finish);

  // Event handlers and dispatchers
  function toggleClick() {
    toggle = !toggle;
  }

  let dispatch = createEventDispatcher();
  function remove() {
    analyserNode.disconnect();
    gainNode.disconnect();
    oscillatorNode.disconnect();
    dispatch("remove", {
      index
    });
  }
</script>

<style>
  * {
    color: purple;
    font-style: bold;
    font-family: Arial, Helvetica, sans-serif;
  }

  .title {
    font-size: 20px;
    display: inline-block;
  }

  .container {
    width: max-content;
    height: max-content;
    padding: 20px;
    border: 1px solid black;
    border-radius: 3px;
  }

  button {
    color: purple;
    background-color: white;
    width: max-content;
    border: none;
    cursor: pointer;
    float: right;
  }

  .close {
    float: right;
  }
</style>

<div class="container">
  <div class="title">{name}</div>
  <div class="close">
    <Button on:click={remove}>&times;</Button>
  </div>
  <button on:click={toggleClick}>
    {#if toggle}
      <Icon icon={faToggleOn} />
    {:else}
      <Icon icon={faToggleOff} />
    {/if}
  </button>
  <br />

  <label for="frequency">Frequency:</label>
  <input
    type="number"
    id="frequency"
    bind:value={frequency}
    step="1"
    min="20"
    max="20000" />

  <label for="volume">Volume: {parseInt(volume * 100)}</label>
  <input
    type="range"
    name="volume"
    bind:value={volume}
    min="0"
    max="1"
    step="0.01" />

  <label for="waveform">WaveForm</label>
  <select id="waveform" bind:value={waveform}>
    <option value="sine">Sine</option>
    <option value="sawtooth">Sawtooth</option>
    <option value="square">Square</option>
    <option value="triangle">Triangle</option>
  </select>

  <Analyser analyser={analyserNode} />

</div>
