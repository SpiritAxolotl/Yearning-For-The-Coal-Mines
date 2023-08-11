function ascend() {
    if (money.greaterThan(new Decimal(ascendPrice))) {
        for (var i = 0; i < setup.length; i++) {
        setup[i].changePlaced(-1);
        setup[i].changeAmt(1);
        }
        setup = [];
        hasDropper = false;
        hasFurnace = false;
        changeLengthDisplay()
        setSetupValue();
    var skips = 0;
    var multi = new Decimal(100);
    for (var i = 0; i < 20; i++) {
        if (money.greaterThan(ascendPrice.multiply(multi))) {
            skips++;
            multi = multi.multiply(new Decimal(100));
        }
    }
    ascendPrice = ascendPrice.multiply(Math.pow(1.025, (skips + 1)));
    money = new Decimal(0);
    let rarities = getRarityToGive("Ascension", (Math.floor(skips / 10) + 1));
    for (var i = 0; i < rarities.length; i++) {
        gatherItems(rarities[i]).changeAmt(1);
    }
    document.getElementById("moneyDisplay").innerHTML = "0";
    document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
}
}
function revive() {

}
function renew() {

}
let probabilityTable;
function getRarityToGive(type, amt) {
switch(type) {
    case "Ascension":
            probabilityTable = {
            "0.0000001": 1/1000000000,
            "0.000001": 1/100000000,
            "0.0001": 1/1000000,
            "0.1": 1/1000,
            "0.15": 1/666,
            "0.2": 1/500,
            "0.4": 1/250,
            "0.5": 1/200,
            "0.75": 1/133,
            "1": 1/100,
            "2": 1/50,
            "3": 1/33,
            "4": 1/25,
            "5": 1/20,
            "6": 1/16,
            "7": 1/14,
            "8": 1/12,
            "9": 1/11,
            "10": 1/10,
            "11": 1/9,
            "12": 1 
          }
}  
let rarities = [];
for (var i = 0; i < amt; i++) {
    let summedProbability = 0;
let chosenValue = Math.random();
    for (var propertyName in probabilityTable) {
    summedProbability += probabilityTable[propertyName];
    if (chosenValue < summedProbability) {   
        rarities.push(propertyName);
        break;
    }
  }
}
return rarities;

}
function gatherItems(rarity) {
    var canGive = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].tier == 'Ascension' && items[i].rarity == rarity) {
            canGive.push(items[i]);
        }
    }
    return canGive[Math.floor(Math.random() * canGive.length)];
}