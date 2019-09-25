import { makeRangeInput } from "../DomUtilities/inputMakers.js";

export default class Slider extends HTMLElement {
    constructor(id, { min = 0, max = 100, step = 0.01 }) {
        super();
        this.id = id;
        this.input = makeRangeInput(id, { min, max, step });

        this.shadow = this.attachShadow({ mode: 'open' });

        let containingDiv = document.createElement('div');
        containingDiv.classList.add("range-slider");
        this.input.classList.add("range-slider__range");
        containingDiv.appendChild(this.input);

        this.shadow.appendChild(containingDiv);

        let style = document.createElement('style');
        style.innerHTML = `                              
          .range-slider__range {
            -webkit-appearance: none;
            height: 10px;
            border-radius: 5px;
            background: #d7dcdf;
            outline: none;
            padding: 0;
            margin: 10px;
          }

          .range-slider__range::-webkit-slider-thumb {
            -webkit-appearance: none;
                    appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #2c3e50;
            cursor: pointer;
            transition: background .15s ease-in-out;
          }
          .range-slider__range::-webkit-slider-thumb:hover {
            background: #1abc9c;
          }
          .range-slider__range:active::-webkit-slider-thumb {
            background: #1abc9c;
          }
          .range-slider__range::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border: 0;
            border-radius: 50%;
            background: #2c3e50;
            cursor: pointer;
            transition: background .15s ease-in-out;
          }
          .range-slider__range::-moz-range-thumb:hover {
            background: #1abc9c;
          }
          .range-slider__range:active::-moz-range-thumb {
            background: #1abc9c;
          }
          .range-slider__range:focus::-webkit-slider-thumb {
            box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
          }

          input::-moz-range-track {
            background: #d7dcdf;
            border: 0;
          }
          
          input::-moz-focus-inner,
          input::-moz-focus-outer {
            border: 0;
          }
          `;

        this.shadow.appendChild(style);
    }

    addEventListener(name, callback) {
        this.input.addEventListener(name, callback);
    }

    get value() {
        return this.input.value;
    }
}

window.customElements.define('sb-range', Slider);