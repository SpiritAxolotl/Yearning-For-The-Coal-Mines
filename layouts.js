var layouts = [
    [],
    [],
    []
]
function saveLayout(num) {
    if (setup.length < 76 && (hasDropper && hasFurnace)) {
        layouts[num] = [];
        for (var i = 0; i < setup.length; i++) {
            layouts[num][i] = setup[i];
        }
        document.getElementById("layout" + num + "Items").innerHTML = layouts[num].length + "/75";
        saveLayouts();
    }
}
function placeLayout(num, button) {
    if (layouts[num].length > 0) {
        button.disabled = true;
        withdrawAll();
        setTimeout(() => {
            slowLoad(num, button);
          }, "25");
    }
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
const sleep2 = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
  
const slowLoad = async (num, button) => {
    console.log(items);
    var temp = layouts[num][0];
    if (temp.usage == "dropper") {
        if (temp.amt > 0) {
        setup[0] = temp;
        temp.changeAmt(-1);
        temp.changePlaced(1);
        saveData(temp.getItemName());
        } else {
            temp = items[locateItemIndex("basicdropper")];
            setup[0] = temp;
            temp.changeAmt(-1);
            temp.changePlaced(1);
            saveData(temp.getItemName());
        } 
    }
    for (var i = 1; i < layouts[num].length - 1; i++) {
        console.log(layouts[num][i]);
        console.log("entered");
        if (layouts[num][i].amt > 0) {
            console.log("entered2");
        await sleep(25);
        setup.push(layouts[num][i]);
        layouts[num][i].changeAmt(-1);
        layouts[num][i].changePlaced(1);
        saveData(layouts[num][i].getItemName());
        }  
    }
    var temp = layouts[num][layouts[num].length - 1];
    if (temp.usage == "processor") {
        if (temp.amt > 0) {
        setup.push(temp);
        temp.changeAmt(-1);
        temp.changePlaced(1);
        saveData(temp.getItemName());
        } else {
            temp = items[locateItemIndex("basicprocessor")];
            setup.push(temp);
            temp.changeAmt(-1);
            temp.changePlaced(1);
            saveData(temp.getItemName());
        } 
    }
    hasDropper = true;
    hasFurnace = true;
    localStorage.setItem("setupReqs", JSON.stringify([hasDropper, hasFurnace]));
    saveSetup();
    setSetupValue();
    changeLengthDisplay();
    button.disabled = false;
  }
