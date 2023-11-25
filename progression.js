function ascend() {
    if (money.greaterThan(new Decimal(ascendPrice))) {
        withdrawAll();
        setup = [];
        hasDropper = false;
        hasFurnace = false;
        changeLengthDisplay();
        setSetupValue();
        saveSetup();
    var skips = 0;
    var multi = new Decimal("100");
    for (var i = 0; i < 10000; i++) {
        if (money.greaterThan(ascendPrice.multiply(multi))) {
            skips++;
            multi = multi.multiply(new Decimal("100"));
        }
    }
    ascendPrice = ascendPrice.multiply(Math.pow(1.025, (skips + 1)));
    money = new Decimal(0);
    lives = lives.add(new Decimal(skips + 1));
    let rarities = getRarityToGive("Ascension", (Math.floor(skips / 10) + 1));
    for (var i = 0; i < rarities.length; i++) {
        let givingItem = gatherItems(rarities[i], ["Ascension", "Supernatural", "Indescribable"]);
        if (Math.floor(Math.random() * 500) == 250) {
            givingItem.changeAstralAmount(1);
        }
        givingItem.changeAmt(1);
        saveData(givingItem.getItemName());
    }
    document.getElementById("moneyDisplay").innerHTML = "0" + "<br>" + "+0";
    setProgressionValues(1);
    saveAmounts();
    saveCosts();
}
}
function revive() {
    if (lives.greaterThanOrEqualTo(revivePrice)) {
        lives = new Decimal("0");
        revivals = revivals.add(new Decimal("1"));
        ascendPrice = new Decimal("25");
        revivePrice = revivePrice.add(new Decimal("50"));
        money = new Decimal(0);
        withdrawAll();
        deleteItems(["Ascension"]);
        let rarities = getRarityToGive("Revival", 1);
        let givingItem = gatherItems(rarities, "Revival");
        givingItem.changeAmt(1);
        saveData(givingItem.getItemName());
        document.getElementById("moneyDisplay").innerHTML = "0" + "<br>" + "+0";
        setProgressionValues(2);
        giveBasics();
        saveAmounts();
        saveCosts();
        saveSetup();
    }
}
function renew() {
    if (revivals.greaterThanOrEqualTo(renewalPrice)) {
        lives = new Decimal("0");
        revivals = new Decimal("0");
        revivePrice = new Decimal("500");
        renewals = renewals.add(new Decimal("1"));
        renewalPrice = renewalPrice.add(new Decimal("1"));
        ascendPrice = new Decimal("25");
        money = new Decimal(0);
        withdrawAll();
        deleteItems(["Ascension", "Supernatural"]);
        let rarities = getRarityToGive("Renewal", 1);
        let givingItem = gatherItems(rarities, "Renewal");
        givingItem.changeAmt(1);
        saveData(givingItem.getItemName());
        document.getElementById("moneyDisplay").innerHTML = "0" + "<br>" + "+0";
        setProgressionValues(3);
        giveBasics();
        saveAmounts();
        saveCosts();
        saveSetup();
    }
}
function awaken() {
    if (renewals.greaterThanOrEqualTo(awakenPrice)) {
        lives = new Decimal("0");
        revivals = new Decimal("0");
        revivePrice = new Decimal("500");
        renewals = new Decimal("0");
        awakens = awakens.add(new Decimal("1"));
        awakenPrice = awakenPrice.add(new Decimal("1"));
        ascendPrice = new Decimal("25");
        money = new Decimal(0);
        withdrawAll();
        deleteItems(["Ascension", "Supernatural", "Revival"]);
        let rarities = getRarityToGive("Awakened", 1);
        let givingItem = gatherItems(rarities, "Awakened");
        givingItem.changeAmt(1);
        saveData(givingItem.getItemName());
        document.getElementById("moneyDisplay").innerHTML = "0" + "<br>" + "+0";
        setProgressionValues(4);
        giveBasics();
        saveAmounts();
        saveCosts();
        saveSetup();
    }
}
let probabilityTable;
function getRarityToGive(type, amt) {
  switch (type) {
    case "Ascension":
      probabilityTable = {
        " 0.0000001": 1 / 1000000000,
        " 0.000001": 1 / 100000000,
        " 0.0001": 1 / 1000000,
        " 0.1": 1 / 1000,
        " 0.15": 1 / 666,
        " 0.2": 1 / 500,
        " 0.4": 1 / 250,
        " 0.5": 1 / 200,
        " 0.75": 1 / 133,
        " 1": 1 / 100,
        " 2": 1 / 50,
        " 3": 1 / 33,
        " 4": 1 / 25,
        " 5": 1 / 20,
        " 6": 1 / 16,
        " 7": 1 / 14,
        " 8": 1 / 12,
        " 9": 1 / 11,
        " 10": 1 / 10,
        " 11": 1 / 9,
        " 12": 1
      }
      break;
    default:
      probabilityTable = {
        " 1": 1 / 5,
        " 2": 1 / 3,
        " 3": 1
      }
  }
  let rarities = [];
  for (var i = 0; i < amt; i++) {
    let summedProbability = 0;
    let chosenValue = Math.random();
    chosenValue /= luckBoost;
    for (var propertyName in probabilityTable) {
      summedProbability += probabilityTable[propertyName];
      if (chosenValue < summedProbability) {
        rarities.push(propertyName.substring(propertyName.indexOf(" ")));
        break;
      }
    }
  }

  return rarities;
}
function gatherItems(rarity, tiers) {
    var canGive = [];
    for (var i = 0; i < items.length; i++) {
        if ((tiers.indexOf(items[i].tier) != -1) && items[i].rarity == rarity) {
            canGive.push(items[i]);
        }
    }
    return canGive[Math.floor(Math.random() * canGive.length)];
}
function deleteItems(tiers) {
    for (var i = 0; i < items.length; i++) {
        if (tiers.indexOf(items[i].tier) != -1) {
            items[i].changeAmt(-(items[i].amt));
            saveData(items[i].getItemName())
        }
    }
}
function giveBasics() {
    items[locateItemIndex("basicdropper")].changeAmt(1);
    items[locateItemIndex("basicprocessor")].changeAmt(1);
    items[locateItemIndex("basicupgrader")].changeAmt(1);
    saveData("basicdropper");
    saveData("basicprocessor");
    saveData("basicupgrader");
}