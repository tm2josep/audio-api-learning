
function makeNumericInput(type, id, min = 0, max = 100, step = 1) {
    let el = document.createElement('input');
    el.type = type;
    el.min = min;
    el.max = max;
    el.step = step;
    el.id = id;

    return el;
}

export function makeRangeInput(id, { min = 0, max = 100, step = 1 }) {
    return makeNumericInput('range', id, min, max, step)
}

export function makeNumberInput(id, { min = 0, max = 1000 }) {
    return makeNumericInput('number', id, min, max);
}


export function makeSelectInput(id, valuePairs) {
    let el = document.createElement('select');
    el.id = id;

    const keys = Object.keys(valuePairs);

    keys.forEach((key) => {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = valuePairs[key];
        el.appendChild(opt);
    });

    return el;
}

export function makeCheckbox(id, checked = false) {
    let el = document.createElement('input');
    el.type = "checkbox";
    el.defaultChecked = checked;
    el.id = id;
    return el;
}