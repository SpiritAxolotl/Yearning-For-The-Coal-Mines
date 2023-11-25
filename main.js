var items = [];
var setup = [];
let money = new Decimal(0);
var lives = new Decimal(0);
var revivals = new Decimal("0");
var renewals = new Decimal("0");
var awakens = new Decimal("0");
let ascendPrice = new Decimal("25");
var revivePrice = new Decimal("500");
var renewalPrice = new Decimal("10");
var awakenPrice = new Decimal("5");
var luckBoost = 1;
function init() {
//loopMoney(true);
createAllItems();
testOre = new Ore();
sortItemList(items);
    for (var i = items.length - 1; i >= 0; i--) {
        switch(items[i].tier) {
            case 'Ascension':
                sortByTier(i, 0);
                break;
            case 'Supernatural':
                sortByTier(i, 1);
                break;
            case 'Indescribable':
                sortByTier(i, 2);
                break;
            case 'Conglomerate':
                sortByTier(i, 3);
                break;
            case 'Revival':
                sortByTier(i, 4)
                break;
            case 'Renewal':
                sortByTier(i, 5)
                break;
            case 'Awakened':
                sortByTier(i, 6)
                break;
            case 'Abyssal':
                sortByTier(i, 7);
                break;
        }
    }
    for (var r = 0; r < tieredItems.length; r++) {
        for (var c = 0; c < tieredItems[r].length; c++) {
            document.getElementById('allItemsDisplay').appendChild(createElements(tieredItems[r][c]));
        }
    }
    var playedBefore = JSON.parse(localStorage.getItem("playedBefore"));
    if (playedBefore) {
        loadData();
    } else {
        items[locateItemIndex("basicdropper")].changeAmt(1);
        items[locateItemIndex("basicprocessor")].changeAmt(1);
        items[locateItemIndex("basicupgrader")].changeAmt(1);
        firstSave();
        localStorage.setItem("playedBefore", true);
    }
}
var hasDropper = false;
var hasFurnace = false;


//SETUP CREATION
function addToSetup(item, parent) {
    let tempItem = items[locateItemIndex(item)];
    if (tempItem.amt > 0) {
    if (tempItem.usage == 'dropper') {
        if (hasDropper) {
            setup[0].changeAmt(1);
            setup[0].changePlaced(-1);
            saveData(setup[0].getItemName());
            setup[0] = tempItem;
            tempItem.changeAmt(-1);
            tempItem.changePlaced(1);
            flashGreen(parent);
        } else {
            setup[0] = tempItem;
            tempItem.changeAmt(-1);
            tempItem.changePlaced(1);
            saveData(tempItem.getItemName());
            hasDropper = true;
            flashGreen(parent);
            changeLengthDisplay();
        }
        setSetupValue();
        saveSetup();
        localStorage.setItem("setupReqs", JSON.stringify([hasDropper, hasFurnace]));
        return 0;
        }
        if (tempItem.usage == 'processor') {
            if (hasDropper) {
                if (hasFurnace) {
                    setup[setup.length - 1].changeAmt(1);
                    setup[setup.length - 1].changePlaced(-1);
                    saveData(setup[setup.length - 1].getItemName());
                    setup[setup.length - 1] = tempItem;
                    tempItem.changeAmt(-1);
                    tempItem.changePlaced(1)
                    saveData(tempItem.getItemName());
                    flashGreen(parent);
                } else {
                    setup[setup.length] = tempItem;
                    tempItem.changeAmt(-1);
                    tempItem.changePlaced(1);
                    saveData(tempItem.getItemName());
                    hasFurnace = true;
                    flashGreen(parent);
          changeLengthDisplay();
                }
            } else {
                flashRed(parent);
            }
            saveSetup();
            setSetupValue();
            localStorage.setItem("setupReqs", JSON.stringify([hasDropper, hasFurnace]));
            return 0;
        }
        if (tempItem.usage == 'upgrader') {
            if (setup.length < 75) {
                if (hasDropper && hasFurnace) {
                setup.splice(setup.length - 1, 0, tempItem);
                tempItem.changeAmt(-1);
                tempItem.changePlaced(1);
                saveData(tempItem.getItemName());
                flashGreen(parent);
            }
            changeLengthDisplay();
            setSetupValue();
            saveSetup();
            return 0;
            }  
        }
    } else {
        flashRed(parent);
    }
}
function removeFromSetup(item, parent) {
    let tempItem = items[locateItemIndex(item)];
    if (tempItem.usage != 'dropper' && tempItem.usage != 'processor') {
        for (var i = setup.length - 1; i >= 0; i--) {
            if (setup[i] == tempItem) {
                setup[i].changeAmt(1);
                setup[i].changePlaced(-1);
                saveData(setup[i].getItemName());
                setup.splice(i, 1);
                flashGreen(parent);
                setSetupValue();
                changeLengthDisplay();
                saveSetup();
                return 0;
            }
        }
        flashRed(parent);
    } else {
        flashRed(parent);
    }
    
}
function sortItemList(items) {
    for (var i = 0; i < items.length - 1; i++) {
        var min = i;
        for (var j = i + 1; j < items.length; j++) {
            if (items[j].getItemName() < items[min].getItemName()) {
                min = j;
            }
        }
    var temp = items[min];
    items[min] = items[i];
    items[i] = temp;
    }
    return items;
}
function locateItemIndex(target) {
    var x = 0;
    var y = items.length - 1;
    var reps = 0;
    while (y >= 1) {
        reps++;
    mid = x + Math.floor((y - x) / 2);
    if (items[mid].getItemName() == target) {
        return mid;
    }
    if (items[mid].getItemName() > target) {

        y = mid - 1;
    } else {
        x = mid + 1;
    }
    if (reps > 500) {
        console.log(target);
        return "ERROR";
    }
 }
 return -1;
}
var tieredItems = [
    [],
    [],
    [], 
    [], 
    [],
    [],
    [],
    []
    ]
function sortByTier(id, arr) {
    tieredItems[arr].unshift(items[id]);
}
let setupValue = new Decimal(0);
function setSetupValue() {
        setupValue = new Decimal(testOre.goThroughSetup(setup));
        document.getElementById("moneyDisplay").innerHTML = formatNumber(money) + "<br>" + "+" + formatNumber(setupValue);
        moneyTimer();
    
}
function addSetupValueToMoney() {
    money = money.add(setupValue);
    document.getElementById("moneyDisplay").innerHTML = formatNumber(money) + "<br>" + "+" + formatNumber(setupValue);
    saveAmounts();
}
let myTimer = null;
function moneyTimer() {
    clearInterval(myTimer);
    if (hasDropper && hasFurnace) {
        myTimer = setInterval(addSetupValueToMoney, testOre.time)
    }
}
const suffixes = ["", "k", "M", "B", "T", "qd", "Qn", "sx", "Sp", "O", "N", "de", "Ud", "DD", "tdD", "qdD", "QnD", "sxD", "SpD", "OcD", "NvD", "Vgn", "UVg", "DVg", "TVg", "qtV", "QnV", "SeV", "SPG", "OVG", "NVG", "TGN", "UTG", "DTG", "tsTG", "qtTG", "QnTG", "ssTG", "SpTG", "OcTg", "NoTG", "QdDR", "uQDR", "dQDR", "tQDR", "qdQDR", "QnQDR", "sxQDR", "SpQDR", "OQDDr", "NQDDr", "qQGNT", "uQGNT", "dQGNT", "tQGNT", "qdQGNT", "QnQGNT", "sxQGNT", "SpQGNT", "OQQGNT", "NQQGNT", "SXGNTL", "USXGNTL", "DSXGNTL", "TSXGNTL", "QTSXGNTL", "QNSXGNTL", "SXSXGNTL", "SPSXGNTL", "OSXGNTL", "NVSXGNTL", "SPTGNTL", "USPTGNTL", "DSPTGNTL", "TSPTGNTL", "QTSPTGNTL", "QNSPTGNTL", "SXSPTGNTL", "SPSPTGNTL", "OSPTGNTL", "NVSPTGNTL", "OTGNTL", "UOTGNTL", "DOTGNTL", "TOTGNTL", "QTOTGNTL", "QNOTGNTL", "SXOTGNTL", "SPOTGNTL", "OTOTGNTL", "NVOTGNTL", "NONGNTL", "UNONGNTL", "DNONGNTL", "TNONGNTL", "QTNONGNTL", "QNNONGNTL", "SXNONGNTL", "SPNONGNTL", "OTNONGNTL", "NONONGNTL", "CENT"];
function formatNumber(num) {
    if (num.exponent < 303) {
        num = Number(num.toString());
      if (num < 1000) {
        return Math.floor(num * 100) / 100;
        }
    return Math.floor(num / Math.pow(1000, (Math.floor(Math.log10(num) / 3))) * 100) / 100 + suffixes[Math.floor(Math.log10(num) / 3)];
    } else {
        return num.toExponential(2, num.ROUND_FLOOR);
    }
    
}
function withdrawAll() {
    for (var i = 0; i < setup.length; i++) {
        setup[i].changePlaced(-1);
        setup[i].changeAmt(1);
        saveData(setup[i].getItemName());
    }
    hasDropper = false;
    hasFurnace = false;
    setup.length = 0;
    localStorage.setItem("setupReqs", JSON.stringify([hasDropper, hasFurnace]));
    saveSetup();
    changeLengthDisplay();
    setSetupValue();
}
function simulateLives() {
    for (var i = 0; i < 100000; i++) {
        money = new Decimal("1e+1000000");
        ascend();
    }
}