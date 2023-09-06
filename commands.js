let moneyLoopInterval = null;
function loopMoney(state) {
    if (state) {
        clearInterval(moneyLoopInterval);
        loopTimer = setInterval(setMoney, 10)
    } else {
        clearInterval(moneyLoopInterval);
    }

}
function setMoney() {
    money = new Decimal("1e+10000");
    document.getElementById("moneyDisplay").innerHTML = "$" + money;
}