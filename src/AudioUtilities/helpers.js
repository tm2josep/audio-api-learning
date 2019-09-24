export function chainNodes(...nodes) {
    nodes.forEach((node, i) => {
        if (!(i === nodes.length - 1)) {
            node.connect(nodes[i + 1]);
        }
    })
}

export function mergeNodes(context, ...nodes) {
    let mergerNode = context.createChannelMerger(nodes.length);
    
    nodes.forEach((node) => {
        node.connect(mergerNode);
    });

    return mergerNode;
}