import NoteComponent from "./Components/NoteComponent.js";
import { mergeNodes } from "./AudioUtilities/helpers.js";

const AudioContext = window.AudioContext || window.webkitAudioContext;
const root = document.getElementById('root');
root.innerHTML = `
    Hello dear user!
    Chrome, and other Evergreen Browsers Require a user gesture to play audio on a page.
    Please click anywhere to allow the app to continue. 
`;

document.onclick = () => {
    root.innerHTML = "";
    const context = new AudioContext();
    let notes =
        [
            new NoteComponent(context, 'Note'),
            new NoteComponent(context, 'Note'),
            new NoteComponent(context, 'Note'),
            new NoteComponent(context, 'Note'),
            new NoteComponent(context, 'Note')
        ];
    notes.forEach(el => {
        root.appendChild(el);
    });

    let output = mergeNodes(context, ...notes.map((el) => el.note));
    output.connect(context.destination);
}

// let outputButton = document.createElement('button');
// outputButton.innerText = "click";
// outputButton.addEventListener('click', () => console.log(output));
// root.appendChild(outputButton);