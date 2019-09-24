import { mergeNodes } from "../AudioUtilities/helpers.js";
import NoteManager from "./Note";
import Manager from "./Manager.js";
export default class InstrumentManager extends Manager {
    constructor(context, name) {
        super(context, name);
        this.notes = [];
        this.mergerNode = {};
    }

    makeNewNote(name) {
        if (this.mergerNode.disconnect) {
            this.mergerNode.disconnect();
        }
        this.notes = [
            ...this.notes,
            new NoteManager(this.context, name)
        ];
        name = "";
        this.mergerNode = mergeNodes(this.context, ...this.notes);
        this.mergerNode.connect(this.gainNode);
        return this.notes;
    }

    removeNote(id) {
        if (parseInt(id) !== NaN) {
            id = this.notes.findIndex(note => {
                return note.name === id;
            })
        }

        this.notes.splice(id, 1);
        return this.notes;
    }
}