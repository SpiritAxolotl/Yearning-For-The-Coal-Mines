function firstSave() {
    let itemData = [];
    for (var i = 0; i < items.length; i++) {
        let temp = [items[i].getItemName(), items[i].amt, items[i].placed, items[i].astralAmt]
        itemData.push(temp);
    }
    saveSetup();
    localStorage.setItem("saveMoney", JSON.stringify(money));
    localStorage.setItem("saveLives", JSON.stringify(lives));
    localStorage.setItem("saveRevivals", JSON.stringify(revivals));
    localStorage.setItem("saveRenewals", JSON.stringify(renewals));
    localStorage.setItem("saveAwakens", JSON.stringify(awakens));
    localStorage.setItem("saveAscendPrice", JSON.stringify(ascendPrice));
    localStorage.setItem("saveRevivePrice", JSON.stringify(revivePrice));
    localStorage.setItem("saveRenewalPrice", JSON.stringify(renewalPrice));
    localStorage.setItem("saveAwakenPrice", JSON.stringify(awakenPrice));
    localStorage.setItem("saveLuckBoost", JSON.stringify(luckBoost));
    localStorage.setItem("itemData", JSON.stringify(itemData));
    localStorage.setItem("saveLayouts", JSON.stringify(layouts));
    localStorage.setItem("setupReqs", JSON.stringify([hasDropper, hasFurnace]));
}
function loadData() {
    //Load Items
    var loadItemData = JSON.parse(localStorage.getItem("itemData"));
    console.log(loadItemData);
    for (var i = 0; i < loadItemData.length; i++) {
        var temp = items[locateItemIndex(loadItemData[i][0])];
        temp.changeAmt(loadItemData[i][1]);
        temp.changePlaced(loadItemData[i][2]);
        temp.changeAstralAmount(loadItemData[i][3]);
    }
    //Load Setups + Layouts
    let tempLayouts = JSON.parse(localStorage.getItem("saveLayouts"));
    for (var i = 0; i < tempLayouts.length; i++) {
        for (var j = 0; j < tempLayouts[i].length; j++) {
            layouts[i][j] = items[locateItemIndex(tempLayouts[i][j])];
        }
    }
    console.log(layouts);
    document.getElementById("layout" + 0 + "Items").innerHTML = layouts[0].length + "/75";
    document.getElementById("layout" + 1 + "Items").innerHTML = layouts[1].length + "/75";
    document.getElementById("layout" + 2 + "Items").innerHTML = layouts[2].length + "/75";
    let setupNames = JSON.parse(localStorage.getItem("saveSetup"));
    console.log(setupNames);
    for (var i = 0; i < setupNames.length; i++) {
        setup[i] = items[locateItemIndex(setupNames[i])];
    }
    setSetupValue();
    changeLengthDisplay();
    //Load Values
    money = new Decimal(JSON.parse(localStorage.getItem("saveMoney")));
    lives = new Decimal(JSON.parse(localStorage.getItem("saveLives")));
    revivals = new Decimal(JSON.parse(localStorage.getItem("saveRevivals")));
    renewals = new Decimal(JSON.parse(localStorage.getItem("saveRenewals")));
    awakens = new Decimal(JSON.parse(localStorage.getItem("saveAwakens")));
    //Load Costs
    ascendPrice = new Decimal(JSON.parse(localStorage.getItem("saveAscendPrice")));
    revivePrice = new Decimal(JSON.parse(localStorage.getItem("saveRevivePrice")));
    renewalPrice = new Decimal(JSON.parse(localStorage.getItem("saveRenewalPrice")));
    awakenPrice = new Decimal(JSON.parse(localStorage.getItem("saveAwakenPrice")));
    //Everything Else
    let reqs = JSON.parse(localStorage.getItem("setupReqs"));
    hasDropper = reqs[0];
    hasFurnace = reqs[1];
    setSetupValue();
    setProgressionValues(4);
}
function saveData(item) {
    var itemData = JSON.parse(localStorage.getItem("itemData"));
    num = locateItemIndex(item)
    let newItemData = [item, items[num].amt, items[num].placed, items[num].astralAmt];
    itemData.splice(num, 1, newItemData);
    localStorage.setItem(("itemData"), JSON.stringify(itemData));
}
function saveAmounts() {
    localStorage.setItem("saveMoney", JSON.stringify(money));
    localStorage.setItem("saveLives", JSON.stringify(lives));
    localStorage.setItem("saveRevivals", JSON.stringify(revivals));
    localStorage.setItem("saveRenewals", JSON.stringify(renewals));
    localStorage.setItem("saveAwakens", JSON.stringify(awakens));
}
function saveCosts() {
    localStorage.setItem("saveAscendPrice", JSON.stringify(ascendPrice));
    localStorage.setItem("saveRevivePrice", JSON.stringify(revivePrice));
    localStorage.setItem("saveRenewalPrice", JSON.stringify(renewalPrice));
    localStorage.setItem("saveAwakenPrice", JSON.stringify(awakenPrice));
}
function saveSetup() {
    var setupNames = [];
    for (var i = 0; i < setup.length; i++) {
        setupNames.push(setup[i].getItemName());
    }
    localStorage.setItem("saveSetup", JSON.stringify(setupNames));
}
function saveLayouts() {
    var tempLayouts = [[],[],[]];
    for (var i = 0; i < layouts.length; i++) {
        for (var j = 0; j < layouts[i].length; j++) {
            tempLayouts[i][j] = layouts[i][j].getItemName();
        }
    }
    localStorage.setItem("saveLayouts", JSON.stringify(tempLayouts));
}
function saveMisc() {
    localStorage.setItem("saveLuckBoost", JSON.stringify(luckBoost));
}