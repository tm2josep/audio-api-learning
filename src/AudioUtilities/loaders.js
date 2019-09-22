const AUDIO = window.AudioContext || window.webkitAudioContext;

export function loadWaveFile() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.responseType = "arraybuffer";
        req.onload = function () {
            try {
                AUDIO.decodeAudioData(req.response, function (buffer) {
                    resolve(buffer);
                });
            } catch (error) {
                console.error(error);
                reject();
            }
        }
        req.open('GET', url, true);
        req.send();
    })
}