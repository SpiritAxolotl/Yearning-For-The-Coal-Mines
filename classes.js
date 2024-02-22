class Ore {
    constructor() {
        this.amt = new Decimal(1);
        this.time = 0;
        this.buffedEffects = [];
    }
    addBuffedEffect(effect) {
        if (this.buffedEffects.indexOf(effect) === -1)
            this.buffedEffects.push(effect);
    }
    effectIsBuffed(effect) {
        return this.buffedEffects.indexOf(effect) !== -1;
    }
    goThroughSetup(setup) {
        this.time = 0;
        if (setup.length === 0)
            return 0;
        this.amt = new Decimal(1);
        for (let i = 0; i < setup.length; i++) {
            this.amt = setup[i].upgrade(this.amt);
            this.time += setup[i].itemSpeed;
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
        this.itemSpeed = obj.itemSpeed;
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
    changeAstralAmount(num) {
        this.astralAmt += num;
        updateAstralDisplay(this.getItemName(), this.astralAmt);
    }
    upgrade(value) {
        return value.multiply(this.multiplier);
    }
    getItemName() {
        return this.itemName.replace(/\s/g, "").toLowerCase();
    }
    hasItem() {
        return (this.placed > 0 || this.amt > 0);
    }
    hasAstral() {
        return this.astralAmt > 0;
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
        if (testOre.effectIsBuffed(this.effect))
            return super.upgrade(value).multiply(new Decimal(1.5));
        return super.upgrade(value);
    }
}