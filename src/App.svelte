<script>
  import Note from "./Note.svelte";
  import Button from "./SubComponents/Button.svelte";
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  let notes = [];
  let name = "";

  function makeNewNote() {
    notes = [
      ...notes,
      {
        name,
        audio: {
          context: audioCtx,
          finish: audioCtx.destination
        },
        settings: {
          frequency: 100,
          waveform: "sawtooth",
          volume: 0
        }
      }
    ];
    name = "";
  }

  function removeNote(event) {
    notes.splice(event.detail.id, 1);
    notes = notes;
  }
</script>

<input type="text" bind:value={name} />
<Button on:click={makeNewNote}>+ Note</Button>
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
