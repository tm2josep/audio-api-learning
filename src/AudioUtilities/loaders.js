const { decodeAudioData } = (window.AudioContext || window.webkitAudioContext);

export async function loadWaveFile(url) {
    let data = await fetch(url);
    let buffer;
    decodeAudioData(data, (b) => {
        buffer = b;
    });

    return buffer;
}