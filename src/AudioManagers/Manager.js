export default class Manager {
    constructor(context, name) {
        this.context = context;
        this.name = name;
        this._toggle = false;
        this._volume = 0;

        this.gainNode = context.createGain();
        this.gainNode.gain.value = 0;
        this.analyser = context.createAnalyser();
        this.gainNode.connect(this.analyser);
    }

    connect(node) {
        this.analyser.connect(node);
    }

    disconnect() {
        this.analyser.disconnect();
    }

    set toggle(value) {
        this._toggle = value;
        this.volume = this._volume;
    }

    get toggle() {
        return this._toggle;
    }

    set volume(value) {
        if (value < 0 || value > 1) {
            return;
        }

        this._volume = value;
        this.gainNode.gain.value = this.toggle ? this._volume : 0;
    }

    get volume() {
        return this._volume;
    }
}