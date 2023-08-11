var layouts = [
    [],
    [],
    []
]
function saveLayout(num) {
    if (setup.length < 76) {
        for (var i = 0; i < setup.length; i++) {
            layouts[num][i] = setup[i];
        }
        document.getElementById("layout" + num + "Items").innerHTML = layouts[num].length + "/75";
    }
}
function placeLayout(num, button) {
    if (layouts[num].length > 0) {
        button.disabled = true;
        for (var i = 0; i < setup.length; i++) {
            setup[i].changePlaced(-1);
            setup[i].changeAmt(1);
        }
        slowLoad(num, button);
    }
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
const sleep2 = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
  
const slowLoad = async (num, button) => {
    for (var i = 0; i < layouts[num].length; i++) {
        await sleep(25);
        document.getElementById("placedDisplay").innerHTML = (i + 1) + "/75 Placed";
        setup[i] = layouts[num][i];
        layouts[num][i].changeAmt(-1);
        layouts[num][i].changePlaced(1);
    }
    hasDropper = false;
        hasFurnace = false;
        if (setup[0].usage == 'dropper') {
            hasDropper = true;
        }
        if (setup[setup.length - 1].usage = "processor") {
            hasFurnace = true;
        }
    setSetupValue();
    button.disabled = false;
  }
