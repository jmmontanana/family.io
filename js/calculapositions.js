var result_copy = {}
//no puede devoler nada mayor que totalnodes
// function findnodePointer(node, d) {
//     var totalnodes = d.n.length;
//     for (let i = 0; i < totalnodes; i++) {
//         if (d.n[i].p[0] == node) {
//             return i;
//         }
//     }
//     return totalnodes; //stands for not found
// }

function getTotalesposas(node, rrr//,d
) {
    // let nodePointer = findnodePointer(node, d);
    if (rrr[node].pids.length === 1 && rrr[node].pids[0] === null) return 0;
    return rrr[node].pids.length;
    // let totalesposas = 0;
    // if (rrr[node] != undefined) {
    //     if (rrr[node].pids != undefined) {
    // la lista de esposas esta en rrr[node].pids
    // el total deberia ser rrr[node].pids.length
    // pero si alguna esposa no tiene datos, entonces no aparece en rrr[node].c
    // por ello el total de esposas son las que estan en pids y tambien en c
    // for (let n = 0; n < rrr[node].pids.length; n++) {
    // for (let m = 0; m < d.n[nodePointer].c?.length; m++) {
    // if (rrr[node].pids[n] == d.n[nodePointer].c[m]) {
    // totalesposas += 1;
    // }
    // }
    // }
    //     }
    // }
    // return totalesposas;
}
function findtotalchildren(node, r //,d
) {
    if (r[node] == undefined)
        return 0;//for false 
    if (r[node].pids.length == 0)
        return 0;
    let totalcouples = r[node].pids.length;
    // let nodePointer = findnodePointer(node, d);
    // if (d.n[nodePointer].hasOwnProperty("c")) {
    if (r[node].hasOwnProperty("childrenIds")) {
        // return d.n[nodePointer].c.length - totalcouples;
        return r[node].childrenIds.length - totalcouples;
    } else {
        return 0;
    }
}
//devuelve la position+1 de couple en la lista de parejas de node
function findcoupleposition(couple, node, r) {
    if (node === null) return 0;
    if (r[node] == undefined || r[couple] == undefined)
        return 0;//for false
    var totalcouples = r[node].pids.length;
    for (let i = 0; i < totalcouples; i++) {
        if (r[node].pids[i] == couple) {
            //now we look for the position of the node in the couple list
            var totalwives = r[couple].pids.length;
            for (let j = 0; j < totalwives; j++) {
                if (r[couple].pids[j] == node) {
                    return i + 1;//position of the couple
                }
            }
            console.log("warning not found couple of " + node + " in the list of " + couple);
            return 1;//not expected to reach this point ever
        }
    }
    return 0;
}

function calculateTreePosition(
    rrr,
    node,
    t,
    widebox, heightbox
) {
    //build rrr, copy pids into childrenIds,
    //follow all the table and fill with the fid and mid fields the childrenIds and ftChildrenIds
    for (const key in rrr) {
        for (let j = 0; j < rrr[key].pids.length; j++) {//is not a wife
            let pid = rrr[key].pids[j];
            if (pid != null && rrr[pid]) {
                if (!rrr[key].childrenIds.includes(pid))
                    rrr[key].childrenIds.push(pid);
            }
        }
    }
    for (const key in rrr) {
        let mid = rrr[key].mid;
        if (mid != null && rrr[mid]) {
            if (!rrr[mid].childrenIds.includes(rrr[key].id))
                rrr[mid].childrenIds.push(rrr[key].id);
            if (!rrr[mid].ftChildrenIds.includes(rrr[key].id))
                rrr[mid].ftChildrenIds.push(rrr[key].id);
        }
        let fid = rrr[key].mid;
        if (fid != null && rrr[fid]) {
            if (!rrr[fid].childrenIds.includes(rrr[key].id))
                rrr[fid].childrenIds.push(rrr[key].id);
            if (!rrr[fid].ftChildrenIds.includes(rrr[key].id))
                rrr[fid].ftChildrenIds.push(rrr[key].id);
        }
        // if (rrr[smallBrothercase].hasOwnProperty("childrenIds")) {
    }

    let totalnodes = 0; for (const id in rrr) { totalnodes++ };//d.n.length;
    let smallbrother = totalnodes;//d.n.length;
    let bigbrother = totalnodes;//totalnodes
    let result1 = findchildsposition(
        null,//parent = none 
        rrr,
        4510, //Aliaga 
        0,// startx,
        0,// starty,
        {},// current_result, 
        smallbrother,
        bigbrother,
        t,
        widebox, heightbox, totalnodes
    );
    for (const key in result1) {
        if (result1[key].p && !result_copy[key]?.p)
            result_copy[key] = { ...(result1[key] ?? {}), p: [...result1[key].p] };
    }
    let result2 = findchildsposition(
        null,//parent = none 
        rrr,
        42632, //Montañana 
        0,// startx,
        0,// starty,
        {},// current_result, 
        smallbrother,
        bigbrother,
        t,
        widebox, heightbox, totalnodes
    );
    let offsetx = 0;
    let offsety = 0;
    for (const id in result2) {
        // Check if the same id exists in result2
        if (result_copy[id]?.p) {
            offsetx = result_copy[id].p[0] - result2[id].p[0];
            offsety = result_copy[id].p[1] - result2[id].p[1];
            if (offsetx != 0 || offsety != 0)
                break; // we got the offset
        }
    }
    for (const id in result2) {
        if (result2[id].p && !result_copy[id]?.p) {
            result2[id].p[0] += offsetx;
            result2[id].p[1] += offsety;
            result_copy[id] = { ...(result2[id] ?? {}), p: [...result2[id].p] };
        } else if (result2[id].p && result_copy[id]?.p)
            result2[id].p = result_copy[id].p;
    }

    let result3 = findchildsposition(
        null,//parent = none 
        rrr,
        node,
        0,// startx,
        0,// starty,
        {},// current_result, 
        smallbrother,
        bigbrother,
        t,
        widebox, heightbox, totalnodes
    );
    // Now need combine the results
    //buscamos el primer elemento en result2 que exista en result1 y anotamos el offset
    //aplicamos el offset a todos los elementos de result2 que no esten en result1, y los añadimos a result1
    // const structure1 = {
    //     12: { p: [0, 6292.5, 120, 40] },
    //     30: { p: [10, 292.5, 12, 43] },
    //     //...
    // };
    // const structure2 = {
    //     42: { p: [40, 61192.5, 1240, 440] },
    //     30: { p: [410, 242.5, 14, 443] },
    //     //...
    // };

    offsetx = 0;
    offsety = 0;
    for (const id in result3) {
        // Check if the same id exists in result2
        if (result_copy[id]?.p) {
            offsetx = result_copy[id].p[0] - result3[id].p[0];
            offsety = result_copy[id].p[1] - result3[id].p[1];
            if (offsetx != 0 || offsety != 0)
                break; // we got the offset
        }
    }
    for (const id in result3) {
        if (result3[id].p && !result_copy[id]?.p) {
            result3[id].p[0] += offsetx;
            result3[id].p[1] += offsety;
            result_copy[id] = { ...(result3[id] ?? {}), p: [...result3[id].p] };
        } else if (result3[id].p && result_copy[id]?.p)
            result3[id].p = result_copy[id].p;
    }
    return result3;
}

function findchildsposition(
    parent,
    rrr,
    node,
    startx,
    starty,
    result,
    smallbrother,
    bigbrother,
    t,
    widebox, heightbox, totalnodes
) {
    // let result = {};
    // const nodePointer = findnodePointer(node, d);if (nodePointer >= totalnodes) return result;
    const siblingSeparation = t.base.siblingSeparation;// 15;
    const extraspacemarriedwithchildren = 10;
    const levelSeparation = t.base.levelSeparation;//30;
    let maxy = starty;
    let miny = starty;
    const totalesposas = getTotalesposas(node, rrr);
    // if (d.n[nodePointer].hasOwnProperty("c")) {//tiene pareja o hijos
    if (rrr[node].hasOwnProperty("childrenIds") && rrr[node].childrenIds.length > 0) {//tiene pareja o hijos
        // for (let j = totalesposas; j < d.n[nodePointer].c.length; j++) {//is not a wife
        for (let j = totalesposas; j < rrr[node].childrenIds.length; j++) {//is not a wife
            // let smallBrothercase = (j > 0) ? d.n[nodePointer].c[j - 1] : totalnodes;
            let smallBrothercase = (j > 0) ? rrr[node].childrenIds[j - 1] : totalnodes;
            // let bigBrothercase = (j + 1 < d.n[nodePointer].c.length) ? d.n[nodePointer].c[j + 1] : totalnodes;
            let bigBrothercase = (j + 1 < rrr[node].childrenIds.length) ? rrr[node].childrenIds[j + 1] : totalnodes;
            let desplazamiento = heightbox + 2 * siblingSeparation;
            let marginBrotherwife = 0;
            let meNode = rrr[node].childrenIds[j];//d.n[nodePointer].c[j]
            //Calculamos marginBrotherwife si el brother tiene wife
            if (j > totalesposas) {//no somos el primer hijo, al menos el segundo
                // let childnodePointer = findnodePointer(smallBrothercase, d);
                //si el hijo anterior tenia esposa
                // if (d.n[childnodePointer].hasOwnProperty("c")) {
                if (rrr[smallBrothercase].hasOwnProperty("childrenIds") && rrr[smallBrothercase].childrenIds.length > 0) {
                    let childtotalesposasBrother = getTotalesposas(smallBrothercase, rrr);
                    let slotsforwives = (childtotalesposasBrother > 1) ? 2 : 1;
                    //si este hijo tambien tiene mas de 1 esposa, entonces aumentamos tambien.
                    let childtotalesposas = getTotalesposas(meNode, rrr);
                    if (childtotalesposas > 0) {
                        slotsforwives += 1;
                    }
                    marginBrotherwife = desplazamiento * slotsforwives;
                    let totalchidren = findtotalchildren(meNode, rrr);
                    if (totalchidren > 0) {
                        marginBrotherwife = desplazamiento + extraspacemarriedwithchildren;
                    }
                }
            }
            //if have more than 2 wives need extra space, 
            let extraxmargin = 0; //magin: 0 y 1=0, 2 y 3 = 1 ... 
            if (totalesposas > 2) {
                if ((totalesposas % 2) == 0) {//par/even
                    extraxmargin = (widebox + levelSeparation) * totalesposas / 2;
                } else {
                    extraxmargin = (widebox + levelSeparation) * (totalesposas - 1) / 2;
                }
            }
            result = findchildsposition(
                node,
                rrr,
                meNode,
                startx + (widebox + levelSeparation) + extraxmargin,
                starty + marginBrotherwife,
                result,
                smallBrothercase,
                bigBrothercase,
                t,
                widebox, heightbox
            );
            if (result[meNode].yy != undefined) {
                if (maxy < result[meNode].yy[1])
                    maxy = result[meNode].yy[1];
                // cxhildnodePointer = findnodePointer(meNode, d);
                // maxy = d.n[cxhildnodePointer].y[2];
                // if (j + 1 < d.n[nodePointer].c.length) {
                if (j + 1 < rrr[node].childrenIds.length) {
                    // y = d.n[cxhildnodePointer].y[2] + siblingSeparation + heightbox;
                    starty = result[meNode].yy[1] + siblingSeparation + heightbox;
                }
            }
        }
    }
    //ahora calculamos nuestra propia posicion:
    let mstring = {};
    const iamiswife = findcoupleposition(node, parent, rrr);
    if (iamiswife == 0) {//is not a wife, las posiciones son relativas al ancho del arbol de cada hijo
        // let bigbrotherPointer = findnodePointer(bigbrother, d);
        // let smallbrotherPointer = findnodePointer(smallbrother, d);
        // if (bigbrotherPointer < totalnodes && smallbrotherPointer < totalnodes) {
        mstring = {
            p: [startx, miny + (maxy - miny) / 2, widebox, heightbox],
            yy: [miny, maxy],
            ln: smallbrother,
            rn: bigbrother
        };
        // } else if (bigbrotherPointer < totalnodes && smallbrotherPointer >= totalnodes) {
        //     mstring = {
        //         p: [startx, miny + (maxy - miny) / 2, widebox, heightbox],
        //         yy: [miny, maxy],
        //         rn: bigbrother
        //     };
        // } else if (bigbrotherPointer >= totalnodes && smallbrotherPointer < totalnodes) {
        //     mstring = {
        //         p: [startx, miny + (maxy - miny) / 2, widebox, heightbox],
        //         yy: [miny, maxy],
        //         ln: smallbrother,
        //     };
        // } else {
        //     mstring = {
        //         p: [startx, miny + (maxy - miny) / 2, widebox, heightbox],
        //         yy: [miny, maxy]
        //     };
        // }
    }
    result[node] = mstring;
    //ahora corregimos la posición de las esposas, sumándoles nuestra posición
    //nuestra posición es: mstring = { p: []}
    // if (d.n[nodePointer].hasOwnProperty("c")) {
    if (rrr[node].hasOwnProperty("childrenIds") && rrr[node].childrenIds.length > 0) {//tiene pareja o hijos
        // for (let j = 0; j < totalesposas && j < d.n[nodePointer].c.length; j++) {
        for (let j = 0; j < totalesposas && j < rrr[node].childrenIds.length; j++) {
            let meNode = rrr[node].childrenIds[j];//d.n[nodePointer].c[j]
            var iswife = j + 1;//findcoupleposition(meNode, node, rrr);
            // 1-0=1
            // 2-1=1 
            // 3-0=3
            // 4-1=3
            if (iswife > 0) {//is a wife
                let desplazamientoy = heightbox + 2 * siblingSeparation;
                if (rrr[node]?.pids.length > 0) {
                    const totalchidren = findtotalchildren(node, rrr);
                    if (totalchidren > 0) {
                        desplazamientoy += extraspacemarriedwithchildren;
                    }
                }
                let desplx = iswife - 1;
                // if(totalesposas==3) desplx = iswife;
                const moduloWife = (iswife % 2);
                if (moduloWife == 0) {//par/even
                    desplx = (iswife - 2);
                    desplazamientoy = -1 * desplazamientoy
                }
                result[meNode] = {
                    p: [startx + (widebox + levelSeparation) * (desplx) / 2,
                    result[node].p[1] + desplazamientoy, widebox, heightbox]
                }
            }
        }
        //si tenemos más de 2 esposas, no desplazamos (totalesposas/2)*(desplazamientox/2) 
        if (totalesposas > 2) {
            if ((totalesposas % 2) != 0) {//impar/odd
                result[node].p[0] += ((widebox + levelSeparation) / 2) * (totalesposas + 1) / 4;
            } else {
                result[node].p[0] += ((widebox + levelSeparation) / 2) * (totalesposas) / 4;
            }
        }
    }

    //intercambiamos las posiciones de la pareja para que el hombre aparezca en primer lugar,
    //asi cuando cambiamos de arbol y mantenemos las fichas donde están,
    //los cálculos coinciden para desplazar el nuevo arbol y que no se superpongan fichas en la pantalla
    for (const key in result) {
        if (rrr[key].pids.length === 1 && rrr[key].pids[0] != null) {
            let couple = rrr[key].pids[0];
            if (rrr[couple].pids.length === 1 && rrr[couple].pids[0] != null) {
                if (rrr[key].gender === 'female' && result[key].p[1] > result[couple].p[1]) {
                    let temp = result[couple].p[1];
                    result[couple].p[1] = result[key].p[1];
                    result[key].p[1] = temp;
                } else if (rrr[key].gender === 'male' && result[key].p[1] < result[couple].p[1]) {
                    let temp = result[couple].p[1];
                    result[couple].p[1] = result[key].p[1];
                    result[key].p[1] = temp;
                }
            }
        }
    }
    return result;
}

export { calculateTreePosition };
