var myChart;
var domCode = document.getElementById('sidebar-code');
var domGraphic = document.getElementById('graphic');

var domMain = document.getElementById('myChartGD400GChina');

var domMessage = document.getElementById('wrong-message');
var iconResize = document.getElementById('icon-resize');
var needRefresh = false;

var enVersion = location.hash.indexOf('-en') != -1;
var hash = location.hash.replace('-en','');
hash = hash.replace('#','') || (needMap() ? 'default' : 'macarons');
hash += enVersion ? '-en' : '';

var curTheme;
function requireCallback (ec, defaultTheme) {
    curTheme = themeSelector ? defaultTheme : {};
    echarts = ec;
    refresh();
    window.onresize = myChart.resize;
}

var themeSelector = $('#theme-select');
if (themeSelector) {
    themeSelector.html(
        '<option selected="true" name="macarons">macarons</option>' 
        + '<option name="infographic">infographic</option>'
        + '<option name="shine">shine</option>'
        + '<option name="dark">dark</option>'
        + '<option name="blue">blue</option>'
        + '<option name="green">green</option>'
        + '<option name="red">red</option>'
        + '<option name="gray">gray</option>'
        + '<option name="helianthus">helianthus</option>'
        + '<option name="default">default</option>'
    );
    $(themeSelector).on('change', function(){
        selectChange($(this).val());
    });
    function selectChange(value){
        var theme = value;
        myChart.showLoading();
        $(themeSelector).val(theme);
        if (theme != 'default') {
            window.location.hash = value + (enVersion ? '-en' : '');
            require(['theme/' + theme], function(tarTheme){
                curTheme = tarTheme;
                setTimeout(refreshTheme, 500);
            })
        }
        else {
            window.location.hash = enVersion ? '-en' : '';
            curTheme = {};
            setTimeout(refreshTheme, 500);
        }
    }
    function refreshTheme(){
        myChart.hideLoading();
        myChart.setTheme(curTheme);
    }
    if ($(themeSelector).val(hash.replace('-en', '')).val() != hash.replace('-en', '')) {
        $(themeSelector).val('macarons');
        hash = 'macarons' + enVersion ? '-en' : '';
        window.location.hash = hash;
    }
}

function autoResize() {
    if ($(iconResize).hasClass('glyphicon-resize-full')) {
        focusCode();
        iconResize.className = 'glyphicon glyphicon-resize-small';
    }
    else {
        focusGraphic();
        iconResize.className = 'glyphicon glyphicon-resize-full';
    }
}

function focusCode() {
    domGraphic.className = 'col-md-4 ani';
}

function focusGraphic() {
    domGraphic.className = 'col-md-8 ani';
    if (needRefresh) {
        myChart.showLoading();
        setTimeout(refresh, 1000);
    }
}


function refresh(isBtnRefresh){
    if (isBtnRefresh) {
        needRefresh = true;
        focusGraphic();
        return;
    }
    needRefresh = false;
    if (myChart && myChart.dispose) {
        myChart.dispose();
    }
    myChart = echarts.init(domMain, curTheme);
    window.onresize = myChart.resize;
    //(new Function(editor.doc.getValue()))();
    
    myChart.setOption(optionChinaMap());
    //myChart.setOption(optionInnerChinaMap());
    //myChart.setOption(option, true)
    
    alert("--1--");
    var ecConfig = require('echarts/config');
    alert("--2-1-");
    myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
    	alert("--2--");
        var selected = param.selected;
        var str = '当前选择： ';
        for (var p in selected) {
            if (selected[p]) {
                str += p + ' ';
            }
        }
        alert(str);
    });
    
    domMessage.innerHTML = '';
    
    
    
}

function needMap() {
    var href = location.href;
    return href.indexOf('map') != -1||href.indexOf('Map') != -1
           || href.indexOf('mix3') != -1
           || href.indexOf('mix5') != -1
           || href.indexOf('dataRange') != -1;

}

var echarts;
var developMode = false;

if (developMode) {
    // for develop
    require.config({
        packages: [
            {
                name: 'echarts',
                location: '../../src',
                main: 'echarts'
            },
            {
                name: 'zrender',
                //location: 'http://ecomfe.github.io/zrender/src',
                location: '../../../zrender/src',
                main: 'zrender'
            }
        ]
    });
}
else {
    // for echarts online home page
    require.config({
        paths: {
            echarts: './www/js'
        }
    });
}

// 按需加载
require(
    [
        'echarts',
        'theme/' + hash.replace('-en', ''),
         'echarts/chart/map'
    ],
    requireCallback
);