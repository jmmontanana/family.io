function findNodeWithInvalidPids(nodes) {
    // const allPids = new Set(nodes.map(node => node.id));
    let result = [];
    for (const node of nodes) {
        for (const pid of node.pids) {
            if (pid != null && !nodes.some(n => n.id === pid)) {
                result.push(node.id);
            }
        }
    }
    return result;
}

function findNodeWithInvalidMid(nodes) {
    let result = [];
    for (const node of nodes) {
        if (node.mid != null && !nodes.some(n => n.id === node.mid)) {
            result.push(" node.id:" + node.id + "- mid:" + node.mid);
        }
    }
    return result;
}

function findNodeWithInvalidFid(nodes) {
    let result = [];
    for (const node of nodes) {
        if (node.fid != null && !nodes.some(n => n.id === node.fid)) {
            result.push(" node.id:" + node.id + "- fid:" + node.fid);
        }
    }
    return result;
}

function findNodesDisconnected(nodes) {
    const invalidPids = [];
    for (const node of nodes) {
        let disconectedpids = false;
        let disconectedmid = false;
        let disconectedfid = false;
        // Check if pid is not present in pids or mid
        if (!nodes.some(n => n.pids.includes(node.id) || n.mid === node.id || n.fid === node.id)) {
            // Check if none of the pids exists as mid or mid 
            if (node.pids.length === 0 || (node.pids.length === 1 && node.pids[0] === null)) {
                disconectedpids = true;
            } else if (!node.pids.some(pid => nodes.some(n => n.id === pid || n.mid === pid))) {
                disconectedpids = true;
            }
            if (node.mid === null || !nodes.some(n => n.id === node.mid)) {
                disconectedmid = true;
            }
            if (node.fid === null || !nodes.some(n => n.id === node.fid)) {
                disconectedfid = true;
            }
        }
        if (disconectedpids && disconectedmid && disconectedfid)
            invalidPids.push(node.id);
    }
    return invalidPids;
}

function checkConsistency(nodes) {
    //testing example
    const nodestest = [
        { id: 120, pids: [null], mid: 33 },
        { id: 210, pids: [80, 120], mid: 111 },
        { id: 33, pids: [210, 125], mid: null },
        { id: 127, pids: [null], mid: 11 }
    ];
    //Tenemos que:
    // 0-contar cuantas fichas hay
    // 1-si hay parejas que apunta a fichas que no existen, o que no hay correspondencia en la referencia
    // 2-ver si hay hijos que apunta a padres que no existen
    // 3-hay que ver si hay nodos que no tienen ninguna conexion
    let totalnodes = nodes.length;
    console.log("totalnodes is " + totalnodes);

    const missingcouples = findNodeWithInvalidPids(nodes);
    console.log("si hay parejas que apunta a fichas que no existen: " + missingcouples);

    const missingmids = findNodeWithInvalidMid(nodes);
    console.log("madres que no existen: " + missingmids);
    const missingfids = findNodeWithInvalidFid(nodes);
    console.log("padres que no existen: " + missingfids);

    const pidsDisconnected = findNodesDisconnected(nodes);
    console.log("nodos que no tienen ninguna conexion: " + pidsDisconnected);
}

export { checkConsistency };
