var jms = null,
    timeHandle = null;
window.onload = function () {
    var radios = document.getElementsByName("level");
    for (var i = 0, j = radios.length; i < j; i++) {
        radios[i].onclick = function () {
            if (jms != null)
                if (jms.landMineCount > 0)
                    if (!confirm("确定结束当前游戏？"))
                        return false;
            var value = this.value;
            init(value, value, value * value / 5 - value, value * value / 5);
            document.getElementById("JMS_main").style.width = value * 40 + 180 + 60 + "px";
        }
    }
    init(10, 10);
};

function init(rowCount, colCount, minLandMineCount, maxLandMineCount) {
    var doc = document,
        landMineCountElement = doc.getElementById("landMineCount"),
        timeShow = doc.getElementById("costTime"),
        beginButton = doc.getElementById("begin");
    if (jms != null) {
        clearInterval(timeHandle);
        timeShow.innerHTML = 0;
        landMineCountElement.innerHTML = 0;
    }
    jms = JMS("landmine", rowCount, colCount, minLandMineCount, maxLandMineCount);
}