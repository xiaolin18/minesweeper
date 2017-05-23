//  游戏调用
(function () {
    var JMS = function (id, rowCount, colCount, minLandMineCount, maxLandMineCount) {
        if (!(this instanceof JMS)){
            return new JMS(id, rowCount, colCount, minLandMineCount, maxLandMineCount);
        }
        this.doc = document;
        console.log('this.doc is', this.doc);
        this.table = this.doc.getElementById(id);//画格子的表格
        this.cells = this.table.getElementsByTagName("td");//小格子
        this.rowCount = rowCount || 10;//格子行数
        this.colCount = colCount || 10;//格子列数
        this.landMineCount = 0;//地雷个数
        this.markLandMineCount = 0;//标记的地雷个数
        this.minLandMineCount = minLandMineCount || 10;//地雷最少个数
        this.maxLandMineCount = maxLandMineCount || 20;//地雷最多个数
        this.arrs = [];//格子对应的数组
        this.beginTime = null;//游戏开始时间
        this.endTime = null;//游戏结束时间
        this.currentSetpCount = 0;//当前走的步数
        this.endCallBack = null;//游戏结束时的回调函数
        this.landMineCallBack = null;//标记为地雷时更新剩余地雷个数的回调函数
        this.doc.oncontextmenu = function () {//禁用右键菜单
            return false;
        };
        this.drawMap();
    };

    JMS.prototype = {
        //画格子
        drawMap: function () {
            var tds = [];
            if (window.ActiveXObject && parseInt(navigator.userAgent.match(/msie ([\d.]+)/i)[1]) < 8) {
                var css = '#JMS_main table td{background-color:#888;}',
                    head = this.doc.getElementsByTagName("head")[0],
                    style = this.doc.createElement("style");
                style.type = "text/css";
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(this.doc.createTextNode(css));
                }
                head.appendChild(style);
            }
            for (var i = 0; i < this.rowCount; i++) {
                tds.push("<tr>");
                for (var j = 0; j < this.colCount; j++) {
                    tds.push("<td id='m_" + i + "_" + j + "'></td>");
                }
                tds.push("</td>");
            }
            this.setTableInnerHTML(this.table, tds.join(""));
        },
        //添加HTML到Table
        setTableInnerHTML: function (table, html) {
            if (navigator && navigator.userAgent.match(/msie/i)) {
                var temp = table.ownerDocument.createElement('div');
                temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                if (table.tBodies.length == 0) {
                    var tbody = document.createElement("tbody");
                    table.appendChild(tbody);
                }
                table.replaceChild(temp.firstChild.firstChild, table.tBodies[0]);
            } else {
                table.innerHTML = html;
            }
        }
    };

    window.JMS = JMS;
})();