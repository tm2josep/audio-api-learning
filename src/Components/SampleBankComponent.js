import SampleBank from "../AudioManagers/SampleBank";
import { makeNumberInput } from "../DomUtilities/inputMakers";

export class SampleBankComponent extends HTMLElement {
    constructor(context) {
        this.shadow = this.attachShadow({mode: "open"});

        let style = document.createElement('style');
        style.innerHTML = ``;
        this.shadow.appendChild(style);

        this.samples = new SampleBank(context);
    }
}

class SampleComponent extends HTMLElement {
    constructor(sampleKey, sampleBank) {
        this.sampleBank = sampleBank;
        this.sampleKey = sampleKey;
        this.shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = ``;
        this.shadow.appendChild(style);

        this.playButton = document.createElement('button');
        this.duration = makeNumberInput('duration', { 
            min: 0,
            max: Infinity
        });
    }

    connectedCallback() {
        this.playButton.addEventListener('click', () => {
            let dur = this.duration.value;
            if (dur < 0) {
                return;
            }

            this.sampleBank.play(this.sampleKey, dur);
        })
    }
}