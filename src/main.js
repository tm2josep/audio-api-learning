import NoteComponent from "./Components/NoteComponent.js";
import { mergeNodes } from "./AudioUtilities/helpers.js";

const AudioContext = window.AudioContext || window.webkitAudioContext;
const root = document.getElementById('root');

root.innerHTML = "";
const context = new AudioContext();

let notes = [
    new NoteComponent(context, 'Note')
];

notes.forEach(el => {
    root.appendChild(el);
});

let output = mergeNodes(context, ...notes.map((el) => el.note));
output.connect(context.destination);

document.addEventListener('click', () => {
    context.resume();
}, {
    once: true
});