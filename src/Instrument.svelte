<script>
  import Note from "./Note.svelte";
  import Button from "./SubComponents/Button.svelte";
  import { faToggleOn } from "@fortawesome/free-solid-svg-icons/faToggleOn";
  import { faToggleOff } from "@fortawesome/free-solid-svg-icons/faToggleOff";
  import Icon from "./SubComponents/Icon.svelte";

  export let audio = {};
  let { context, destination } = audio;
  export let instrumentName = "";
  let notes = [];
  let name = "";

  // Channel Merger Node
  let mergerNode = context.createChannelMerger(10);

  // Gain Node
  let instGain = context.createGain();
  let instToggle = false;
  let instVolume = 0;

  $: instGain.gain.value = instToggle ? instVolume : 0;

  instGain.connect(destination);

  // Event handlers and dispatchers
  function makeNewNote() {
    mergerNode.disconnect();
    notes = [
      ...notes,
      {
        name,
        audio: {
          context: context,
          finish: mergerNode
        },
        settings: {
          frequency: 100,
          waveform: "sawtooth",
          volume: 0
        }
      }
    ];
    name = "";
    mergerNode.connect(instGain);
  }

  function removeNote(event) {
    notes.splice(event.detail.id, 1);
    notes = notes;
  }

  // Event handlers and dispatchers
  function toggleClick() {
    instToggle = !instToggle;
  }
</script>

<style>
  button {
    color: purple;
    background-color: white;
    width: max-content;
    border: none;
    cursor: pointer;
  }

  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(4, 350px);
    grid-gap: 0.5em;
  }
</style>

<div class="container">
  <h2>{instrumentName}</h2>
  <input type="text" bind:value={name} />
  <Button on:click={makeNewNote}>+ Note</Button>

  <button on:click={toggleClick}>
    {#if instToggle}
      <Icon icon={faToggleOn} />
    {:else}
      <Icon icon={faToggleOff} />
    {/if}
  </button>

  <label for="volume">Volume: {parseInt(instVolume * 100)}</label>
  <input
    type="range"
    name="volume"
    bind:value={instVolume}
    min="0"
    max="1"
    step="0.01" />

  <div class={notes.length ? 'notes' : ''}>
    {#each notes as note, id}
      <Note
        index={id}
        audio={note.audio}
        bind:settings={note.settings}
        name={note.name}
        on:remove={removeNote} />
    {:else}
      <br />
      No Notes Yet!
    {/each}
  </div>
</div>
