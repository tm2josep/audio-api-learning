import Manager from "./Manager.js";
export default class NoteManager extends Manager {
    constructor(context, name) {
        super(context, name);
        this.oscillator = context.createOscillator();

        this.oscillator.type = "sine";
        this.oscillator.frequency.value = 100;

        this.oscillator.connect(this.gainNode);
        this.oscillator.start();

    }

    set waveform(value) {

        let valid = [
            'sine',
            'sawtooth',
            'square',
            'triangle'
        ].includes(value);

        if (!valid) {
            return;
        }

        this.oscillator.type = value;
    }

    get waveform() {
        return this.oscillator.type;
    }

    set frequency(value) {
        if (value < 20 || value > 20000) {
            return;
        }

        this.oscillator.frequency.value = value;
    }

    get frequency() {
        return this.oscillator.frequency.value;
    }
}