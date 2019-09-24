import NoteManager from "../AudioManagers/Note.js";
import {
    makeSelectInput,
    makeNumberInput,
    makeRangeInput,
    makeCheckbox
} from "../DomUtilities/inputMakers.js";
import { labelEach } from "../DomUtilities/misc.js";
import { Oscilloscope } from "../AudioUtilities/Oscilloscope.js";
import Slider from "../SubComponents/Slider.js";
import { Toggle } from "../SubComponents/Toggle.js";

export default class NoteComponent extends HTMLElement {
    constructor(context, name) {
        super();
        this.note = new NoteManager(
            context, name
        );

        this.shadow = this.attachShadow({ mode: "open" });
        this.container = document.createElement('div');

        let title = document.createElement('h1');
        title.innerText = name;

        this.toggle = new Toggle("toggle");
        this.volume = new Slider("volume", {
            min: 0, max: 1, step: 0.01
        });

        this.frequency = makeNumberInput("frequency", {
            min: 20, max: 20000
        });

        this.waveform = makeSelectInput("waveform", {
            sine: "Sine",
            sawtooth: "Sawtooth",
            square: "Square",
            triangle: "triangle",
        });

        this.canvas = document.createElement('canvas');
        this.canvas.height = 100;
        this.canvas.width = 150;

        this.analyser = new Oscilloscope(
            this.canvas,
            this.note.analyser
        );

        this.analyser.draw();

        this.container.appendChild(title);
        this.container.appendChild(this.toggle);
        this.container.appendChild(this.volume);
        this.container.appendChild(this.frequency);
        this.container.appendChild(this.waveform);
        this.container.appendChild(this.canvas);

        let inputs = [
            this.volume,
            this.frequency,
            this.waveform
        ];

        labelEach(inputs);

        let scopedStyle = document.createElement('style');

        scopedStyle.innerHTML = `
            div {
                display: grid;
                padding: 10px;
                margin: 5px;
                width: max-content;
                height: max-content;
                border: 1px solid black;
                border-radius: 3px;
                grid-template-columns: repeat(2, 125px);
            }

            h1 {
                justify-self: start;
            }

            sb-toggle {
                place-self: center end;
            }

            sb-range {
                place-self: center end;
            }

            input {
                place-self: center end;
                outline: none;
            }

            label {
                place-self: center start;
                text-align: middle;
            }

            canvas {
                border: 0.5px solid gray;
                justify-self: center;
                grid-column: span 2;
            }
        `;

        this.shadow.appendChild(scopedStyle);

        this.shadow.appendChild(this.container);
    }

    connectedCallback() {
        this.volume.addEventListener("change", () => {
            this.note.volume = this.volume.value;
        });

        this.frequency.addEventListener("change", () => {
            this.note.frequency = this.frequency.value;
        });

        this.waveform.addEventListener("change", () => {
            this.note.waveform = this.waveform.value;
        });

        this.toggle.addEventListener("change", () => {
            this.note.toggle = this.toggle.checked;
        });
    }

    setupFrequency(val) {
        this.note.frequency = val;
    }
}

window.customElements.define("sb-note", NoteComponent);