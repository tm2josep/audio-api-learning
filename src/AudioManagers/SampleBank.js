import { loadWaveFile } from "../AudioUtilities/loaders";

export default class SampleBank extends Map {
    constructor(context) {
        this.context = context;
        this.source = context.createBufferSource();
    }

    connect(node) {
        this.source.connect(node);
    }

    play(key, duration) {
        let buffer = this.get(key);
        this.source.buffer = buffer;
        this.source.start(this.context.currentTime);
        this.source.stop(this.context.currentTime + duration);
    }

    async load(key, url) {
        let buffer = await loadWaveFile(url);
        this.set(key, buffer);
        return;
    }


}