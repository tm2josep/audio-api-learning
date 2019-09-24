import { makeRangeInput } from "../DomUtilities/inputMakers.js";

export default class Slider extends HTMLElement {
    constructor(id, { min = 0, max = 100, step = 0.01 }) {
        super();
        this.id = id;
        this.input = makeRangeInput(id, { min, max, step });
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(this.input);

        let style = document.createElement('style');
        style.innerHTML = `          
        input[type=range] {
            -webkit-appearance: none;
            -moz-appearance: none;
        }
          
        input[type=range]::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            background: rgba(59,173,227,1);
            background: -moz-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(59,173,227,1)), color-stop(25%, rgba(87,111,230,1)), color-stop(51%, rgba(152,68,183,1)), color-stop(100%, rgba(255,53,127,1)));
            background: -webkit-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -o-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -ms-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
            height: 2px;
        }
          
        input[type=range]:focus {
            outline: none;
        }
          
        input[type=range]::-moz-range-track {
            -moz-appearance: none;
            background: rgba(59,173,227,1);
            background: -moz-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(59,173,227,1)), color-stop(25%, rgba(87,111,230,1)), color-stop(51%, rgba(152,68,183,1)), color-stop(100%, rgba(255,53,127,1)));
            background: -webkit-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -o-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: -ms-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            background: linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(152,68,183,1) 51%, rgba(255,53,127,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
            height: 2px;
        }
          
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: 2px solid;
            border-radius: 50%;
            height: 10px;
            width: 10px;
            max-width: 80px;
            position: relative;
            bottom: 3px;
            background-color: #1d1c25;
            cursor: -webkit-grab;
          
            -webkit-transition: border 1000ms ease;
            transition: border 1000ms ease;
        }
          
        input[type=range]::-moz-range-thumb {
            -moz-appearance: none;
            border: 2px solid;
            border-radius: 50%;
            height: 10px;
            width: 10px;
            max-width: 80px;
            position: relative;
            bottom: 3px;
            background-color: #1d1c25;
            cursor: -moz-grab;
            -moz-transition: border 1000ms ease;
            transition: border 1000ms ease;
        }
          
        input[type=range]::-webkit-slider-thumb {
             border-color: rgb(59,173,227);
        }
          
        input[type=range]::-moz-range-thumb {
             border-color: rgb(59,173,227);
        }
          
        input[type=range]::-webkit-slider-thumb:active {
            cursor: -webkit-grabbing;
        }
          
        input[type=range]::-moz-range-thumb:active {
            cursor: -moz-grabbing;
        }`;

        this.shadow.appendChild(style);
    }

    connectedCallback() {
        this.input.addEventListener('change', function () {
            let rangePercent = (this.value / this.max) * 100;
            this.style.filter = `hue-rotate(-${rangePercent}deg)`
        });
    }

    addEventListener(name, callback) {
        this.input.addEventListener(name, callback);
    }

    get value() {
        return this.input.value;
    }
}

window.customElements.define('sb-range', Slider);