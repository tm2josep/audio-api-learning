export function labelEach(elements) {
    elements.forEach((element) => {
        const label = document.createElement('label');
        label.for = element.id;
        label.innerHTML = element.id
        element.insertAdjacentElement('beforebegin', label);
    })
}

export function newLineEach(elements) {
    elements.forEach((element) => {
        element.insertAdjacentElement('afterend',
            document.createElement('br')
        );
    });
}