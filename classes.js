class Ore {
    constructor() {
        this.amt = new Decimal(1);
        this.time = setup.length;
        this.buffedEffects = [];
    }
    addBuffedEffect(effect) {
        if (this.buffedEffects.indexOf(effect) == -1) {
            this.buffedEffects.push(effect);
        }
    }
    effectIsBuffed(effect) {
        if (this.buffedEffects.indexOf(effect) != -1) {
            return true;
        }
        return false;
    }
    goThroughSetup(setup) {
        this.amt = new Decimal(1);
        for (var i = 0; i < setup.length; i++) {
            this.amt = setup[i].upgrade(this.amt);
        }
        return this.amt;
    }
}
class Item {
    constructor(obj) {
        this.amt = 0;
        this.placed = 0;
        this.itemName = obj.itemName;
        this.multiplier = new Decimal(obj.multiplier);
        this.type = "Item";
        this.tier = obj.tier;
        this.usage = obj.usage;
        this.rarity = obj.rarity;
        this.astralAmt = 0;
    }
    testFunction() {
        return this.itemName;
    }
    changeAmt(num) {
        this.amt += num;
        updateItemDisplay(this.getItemName(), this.amt, this.placed);
    }
    changePlaced(num) {
        this.placed += num;
        updateItemDisplay(this.getItemName(), this.amt, this.placed);
    }
    upgrade(value) {

        return value.multiply(this.multiplier);
    }
    getItemName() {
        return this.itemName.replace(/\s/g, "").toLowerCase();
    }

}
class Buffgrader extends Item {
    constructor(obj) {
        super(obj);
        this.buffs = obj.buffs;
        this.type = "Buffgrader";
    }
    upgrade(value) {
        testOre.addBuffedEffect(this.buffs);
        return super.upgrade(value);
    }
}
class EffectGiver extends Item {
    constructor(obj) {
        super(obj);
        this.effect = obj.effect;
        this.type = "EffectGiver";
    }
    upgrade(value) {
        if (testOre.effectIsBuffed(this.effect)) {
            return super.upgrade(value).multiply(new Decimal(1.5));
        }
        return super.upgrade(value);
    }
}