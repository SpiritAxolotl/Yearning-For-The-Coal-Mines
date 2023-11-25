let allElements = [];
let astralElements = [];
function createElements(item) {
    let tempAstralElement = document.createElement('div');
    tempAstralElement.id = "astral" + item.getItemName();
    tempAstralElement.classList = "text-center itemDisplay";
    
    let tempElement = document.createElement('div');
    tempElement.id = item.getItemName();
    tempElement.classList = "text-center itemDisplay";

    let nameDisplay = document.createElement('p');
    nameDisplay.innerHTML = item.itemName;
    nameDisplay.classList = 'itemText';
    if (item.itemName.length > 30) {
        nameDisplay.style = "font-size:1.05vw;"
    } else {
        nameDisplay.style = "font-size:1.25vw;"
    }
    
    tempElement.appendChild(nameDisplay);
    astralNameDisplay = nameDisplay.cloneNode(true);
    astralNameDisplay.innerHTML = "✨Astral " + item.itemName + "✨";
    tempAstralElement.appendChild(astralNameDisplay);

    let ownedAndAmountDisplay = document.createElement('p');
    ownedAndAmountDisplay.innerHTML = item.amt + " Owned. " + item.placed + " Placed.";
    ownedAndAmountDisplay.classList = 'itemText';
    ownedAndAmountDisplay.id = "" + item.getItemName() + "amtdisplay";
    tempElement.appendChild(ownedAndAmountDisplay);
    if (item.amt == 0 && item.placed == 0) {
        tempElement.style.display = "none";
    }

    let astralAmount = document.createElement('p');
    astralAmount.id = "astral" + item.getItemName() + "amtdisplay";
    astralAmount.innerHTML = item.astralAmt;
    tempAstralElement.appendChild(astralAmount);
    tempAstralElement.style.display = "none";

    let multiDisplay = document.createElement('p');
    multiDisplay.innerHTML = formatNumber(new Decimal(item.multiplier)) + "x";
    multiDisplay.classList = 'itemText';
    tempElement.appendChild(multiDisplay);

    let timeDisplay = document.createElement('p');
    timeDisplay.innerHTML = "+" + item.itemSpeed + "ms";
    timeDisplay.classList = "itemText";
    tempElement.appendChild(timeDisplay);

    let tierDisplay = document.createElement('p');
    tierDisplay.innerHTML = item.tier + " " + item.usage;
    tierDisplay.classList = 'itemText';
    tempElement.appendChild(tierDisplay);
    tempAstralElement.appendChild(tierDisplay.cloneNode(true));
    
    let rarityDisplay = document.createElement('p');
    rarityDisplay.innerHTML = "Rarity " + item.rarity;
    rarityDisplay.classList = 'itemText';
    tempElement.appendChild(rarityDisplay);
    tempAstralElement.appendChild(rarityDisplay.cloneNode(true));

    if (item.type == "Buffgrader") {
        let buffDisplay = document.createElement('p');
        buffDisplay.innerHTML = "Buffs " + item.buffs;
        buffDisplay.classList = 'itemText';
        tempElement.appendChild(buffDisplay);
    } else if (item.type == "EffectGiver") {
        let effectDisplay = document.createElement('p');
        effectDisplay.innerHTML = "Gives " + item.effect;
        effectDisplay.classList = 'itemText';
        tempElement.appendChild(effectDisplay);
    } else {
        let spacing = document.createElement('br');
        tempElement.appendChild(spacing);
    }

    let addButton = document.createElement('button');
    let removeButton = document.createElement('button');
    addButton.innerHTML = "Add To Setup";
    addButton.classList.add('setupAddButton');
    addButton.setAttribute('onclick', 'addToSetup(this.parentNode.id, this)')
    removeButton.innerHTML = "Remove From Setup";
    removeButton.classList.add('setupRemoveButton');
    removeButton.setAttribute('onclick', 'removeFromSetup(this.parentNode.id, this)');
    tempElement.appendChild(addButton);
    tempElement.appendChild(removeButton);
    allElements.push(tempElement);
    astralElements.push(tempAstralElement);
    document.getElementById("allAstralDisplay").appendChild(tempAstralElement);
    return tempElement;
}
function updateItemDisplay(name, amt, placed) {
    if (document.getElementById(("") + name) != null) {
        if (amt || placed > 0) {
            document.getElementById(("") + name).style.display = "block";
        } else {
            document.getElementById(name + "").style.display = "none";
        }
        document.getElementById(name + "amtdisplay").innerHTML = amt + " Owned. " + placed + " Placed.";
    }
}
function updateAstralDisplay(name, amt) {
    if (document.getElementById(("astral") + name) != null) {
        if (amt > 0) {
            document.getElementById(("astral") + name).style.display = "block";
        } else {
            document.getElementById(("astral") + name).style.display = "none";
        }
        document.getElementById(("astral") + (name + "amtdisplay")).innerHTML = amt + " Owned.";
    }
}
function changeLengthDisplay() {
    document.getElementById("placedDisplay").innerHTML = setup.length + "/75 Placed"
}
function flashGreen(element) {
    element.style.backgroundColor = "green";
    setTimeout(() => {
        element.style.backgroundColor = "buttonface";
  }, 100);
}
function flashRed(element) {
    element.style.backgroundColor = "red";
    setTimeout(() => {
        element.style.backgroundColor = "buttonface";
  }, 100);
}
function setProgressionValues(amt) {
    if (amt > 0) {
        document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
        document.getElementById("ascensionDisplay").innerHTML = "Ascensions: " + formatNumber(lives);
    } 
    if (amt > 1) {
        document.getElementById("reviveButton").innerHTML = "Revive: " + "<br>" + formatNumber(revivePrice) + " Ascensions";
        document.getElementById("reviveDisplay").innerHTML = "Revivals: " + formatNumber(revivals);
    }
    if (amt > 2) {
        document.getElementById("renewButton").innerHTML = "Renew: " + "<br>" + formatNumber(renewalPrice) + " Revivals";
        document.getElementById("renewDisplay").innerHTML = "Renewals: " + formatNumber(renewals);
    } 
    if (amt > 3) {
        document.getElementById("reawakenButton").innerHTML = "Reawaken: " + "<br>" + formatNumber(awakenPrice) + " Renewals";
        document.getElementById("reawakenDisplay").innerHTML = "Reawakens: " + formatNumber(awakens);
    }
}
let searchCategory = "All"
function itemSearchSort(text) {
    //Check for category searches
    //upgrader, dropper, processor
    text = text.replace(/\s/g, "").toLowerCase();
    let parent = document.getElementById("allItemsDisplay");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    if (text == "") {
        if (searchCategory == "All") {
            for (var i = 0; i < allElements.length; i++) {
                if (items[locateItemIndex(allElements[i].id)].hasItem()) {
                    parent.appendChild(allElements[i]);
                }
            }
        } else {
            for (var i = 0; i < allElements.length; i++) {
                tempItem = items[locateItemIndex(allElements[i].id)]
                if (tempItem.hasItem() && tempItem.usage == searchCategory) {
                    parent.appendChild(allElements[i]);
                }
            }
        }
    } else {
        if (searchCategory == "All") {
            for (var i = 0; i < allElements.length; i++) {
                if (allElements[i].id.indexOf(text) == 0 && items[locateItemIndex(allElements[i].id)].hasItem()) {
                    parent.appendChild(allElements[i]);
                }
            }
        } else {
            for (var i = 0; i < allElements.length; i++) {
                tempItem = items[locateItemIndex(allElements[i].id)];
                if (allElements[i].id.indexOf(text) == 0 && tempItem.hasItem() && tempItem.usage == searchCategory) {
                    parent.appendChild(allElements[i]);
                }
            }
        }
        
    }
    
}
let categories = ["All", "Upgraders", "Droppers", "Processors"]
let formattedCategories = ["All", "upgrader", "dropper", "processor"];
function updateCategory(currentCategory, parent) {
    let search = currentCategory.substring(currentCategory.indexOf(" ") + 1);
    let currentSpot = categories.indexOf(search);
    if (currentSpot < 3) {
        currentSpot += 1;
    } else {
        currentSpot = 0;
    }
    searchCategory = formattedCategories[currentSpot];
    document.getElementById("searchType").innerHTML = "Type: " + categories[currentSpot];
    itemSearchSort(document.getElementById("searchInput").value);
}
let currentDisplay = "Normal"
function switchInventory() {
    console.log("meow");
    if (currentDisplay == "Normal") {
        document.getElementById("allItemsDisplay").style.display = "none";
        document.getElementById("allAstralDisplay").style.display = "block";
        document.getElementById("invSwitch").innerHTML = "Normal Inventory";
        currentDisplay = "Astral";
    } else if (currentDisplay == "Astral") {
        document.getElementById("allItemsDisplay").style.display = "block";
        document.getElementById("allAstralDisplay").style.display = "none";
        document.getElementById("invSwitch").innerHTML = "Astral Inventory";
        currentDisplay = "Normal";
    }
}

function openCrafting() {

}