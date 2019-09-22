<script>
  let className = "";

  function addColor(event) {
    className = "color-change";
  }

  function removeColor(event) {
    className = "";
  }
</script>

<style>
  button {
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
  }

  .color-change {
    -webkit-animation: color-change 0.2s ease-in-out alternate both;
    animation: color-change 0.2s ease-in-out alternate both;
  }

  @-webkit-keyframes color-change {
    0% {
      background: white;
      color: purple;
    }
    100% {
      background: purple;
      color: white;
    }
  }

  @keyframes color-change {
    0% {
      background: white;
      color: purple;
    }
    100% {
      background: purple;
      color: white;
    }
  }
</style>

<button
  class={className}
  on:click
  on:mouseenter={addColor}
  on:mouseleave={removeColor}>
  <slot />
</button>
