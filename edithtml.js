function createElements(item) {
    
    let tempElement = document.createElement('div');
    tempElement.id = item.getItemName();
    tempElement.classList = "text-center itemDisplay";

    let nameDisplay = document.createElement('p');
    nameDisplay.innerHTML = item.itemName;
    nameDisplay.classList = 'itemText';
    nameDisplay.style = "font-size:1.25vw;"
    tempElement.appendChild(nameDisplay);

    let ownedAndAmountDisplay = document.createElement('p');
    ownedAndAmountDisplay.innerHTML = item.amt + " Owned. " + item.placed + " Placed.";
    ownedAndAmountDisplay.classList = 'itemText';
    ownedAndAmountDisplay.id = "" + item.getItemName() + "amtdisplay";
    tempElement.appendChild(ownedAndAmountDisplay);
    if (item.amt == 0 && item.placed == 0) {
        tempElement.style.display = "none";
    }

    let multiDisplay = document.createElement('p');
    multiDisplay.innerHTML = formatNumber(new Decimal(item.multiplier)) + "x";
    multiDisplay.classList = 'itemText';
    tempElement.appendChild(multiDisplay);

    let tierDisplay = document.createElement('p');
    tierDisplay.innerHTML = item.tier + " " + item.usage;
    tierDisplay.classList = 'itemText';
    tempElement.appendChild(tierDisplay);
    
    let rarityDisplay = document.createElement('p');
    rarityDisplay.innerHTML = "Rarity " + item.rarity;
    rarityDisplay.classList = 'itemText';
    tempElement.appendChild(rarityDisplay);

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

    return tempElement;
}
function updateItemDisplay(name, amt, placed) {
    if (amt || placed > 0) {
        document.getElementById(("") + name).style.display = "block";
    } else {
        document.getElementById(name + "").style.display = "none";
    }
    document.getElementById(name + "amtdisplay").innerHTML = amt + " Owned. " + placed + " Placed.";
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
    if (amt == 1) {
        document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
        document.getElementById("ascensionDisplay").innerHTML = "Ascensions: " + formatNumber(lives);
    } else if (amt == 2) {
        document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
        document.getElementById("ascensionDisplay").innerHTML = "Ascensions: " + formatNumber(lives);
        document.getElementById("reviveButton").innerHTML = "Revive: " + "<br>" + formatNumber(revivePrice);
        document.getElementById("reviveDisplay").innerHTML = "Revivals: " + formatNumber(revivals);
    } else if (amt == 3) {
    document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
    document.getElementById("ascensionDisplay").innerHTML = "Ascensions: " + formatNumber(lives);
    document.getElementById("reviveButton").innerHTML = "Revive: " + "<br>" + formatNumber(revivePrice);
    document.getElementById("reviveDisplay").innerHTML = "Revivals: " + formatNumber(revivals);
    document.getElementById("renewButton").innerHTML = "Renew: " + "<br>" + formatNumber(renewalPrice);
    document.getElementById("renewDisplay").innerHTML = "Renewals: " + formatNumber(renewals);
    } else {
        document.getElementById("ascensionButton").innerHTML = "Ascend: " + "<br>" + formatNumber(ascendPrice);
        document.getElementById("ascensionDisplay").innerHTML = "Ascensions: " + formatNumber(lives);
        document.getElementById("reviveButton").innerHTML = "Revive: " + "<br>" + formatNumber(revivePrice);
        document.getElementById("reviveDisplay").innerHTML = "Revivals: " + formatNumber(revivals);
        document.getElementById("renewButton").innerHTML = "Renew: " + "<br>" + formatNumber(renewalPrice);
        document.getElementById("renewDisplay").innerHTML = "Renewals: " + formatNumber(renewals);
        document.getElementById("reawakenButton").innerHTML = "Reawaken: " + "<br>" + formatNumber(awakenPrice);
        document.getElementById("reawakenDisplay").innerHTML = "Reawakens: " + formatNumber(awakens);
    }
}