var app = getApp()
var today = new Date();
Page({
    data: {
        curYear: 2017,//当前年份
        curMonth:0,//当前月份
        daysCountArr: [// 保存各个月份的长度，平年
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ],
        weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dateList: []
    },
    onLoad: function (options) {
        var y = today.getFullYear();//年  
        var mon = today.getMonth() + 1;//月  
        var d = today.getDate();//日  
        var i = today.getDay();//星期  
        this.setData({
            curYear: y,
            curMonth: mon
        });
    },
    onReady: function () {
        // 页面渲染完成
        this.requireFun(today.getFullYear(),today.getMonth() + 1)
    },
    requireFun: function(y, mon){
        var that = this;
        if (mon >= 1 && mon <= 9) {
            mon = "0" + mon;
        }
        var yearMonth = y + '-' + mon;
        that.getDateList(y, mon-1);
    },
    getDateList: function (y, mon) {
        var that = this;
        that.judgeMonth();
        var toYear = today.getFullYear();//年  
        var toMonth = today.getMonth() + 1;//月  
        var day = today.getDate();//日 
        var bitData = -1;//今天标识
        if(y == toYear && mon == toMonth-1){
            bitData = day;
        }
        //如果是否闰年，则2月是29日
        var daysCountArr = that.data.daysCountArr;
        if (y % 4 == 0 && y % 100 != 0) {
            that.data.daysCountArr[1] = 29;
            that.setData({
                daysCountArr: daysCountArr
            });
        }
        //第几个月；下标从0开始实际月份还要再+1  
        var dateList = [];
        dateList[0] = [];
        var weekIndex = 0;//第几个星期
        for (var i = 0; i < that.data.daysCountArr[mon]; i++) {
            if(bitData==i+1){
                var bit = true;//当前日期
            }else{
                var bit = false;
            }
            var week = new Date(y, mon, (i + 1)).getDay();
            // 如果是新的一周，则新增一周
            if (week == 0) {
                weekIndex++;
                dateList[weekIndex] = [];
            }
            // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
            if (weekIndex == 0) {
                dateList[weekIndex].unshift({
                    value: y + '-' + (mon + 1) + '-' + (i + 1),
                    date: i + 1,
                    bit:bit,
                    week:week
                });
            } else {
                dateList[weekIndex].push({
                    value: y + '-' + (mon + 1) + '-' + (i + 1),
                    date: i + 1,
                    bit:bit,
                    week:week
                });
            }
        }
        that.setData({
            dateList: dateList
        });
    },
    preMonth: function () {
        // 上个月
        var that = this;
        var curYear = that.data.curYear;
        var curMonth = that.data.curMonth;
        curYear = curMonth - 1 ? curYear : curYear - 1;
        curMonth = curMonth - 1 ? curMonth - 1 : 12;
        that.setData({
            curYear: curYear,
            curMonth: curMonth
        });
        that.requireFun(curYear, curMonth);
    },
    nextMonth: function () {
        // 下个月
        var that = this;
        var curYear = that.data.curYear;
        var curMonth = that.data.curMonth;
        curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
        curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
        that.setData({
            curYear: curYear,
            curMonth: curMonth
        });

       that.requireFun(curYear, curMonth);
    },
    judgeMonth:function(){
        var that = this;
        var year = today.getFullYear();//年
        var month = today.getMonth() + 1;//月 
        var curMonth = that.data.curMonth;
        var curYear = that.data.curYear;
    }
})