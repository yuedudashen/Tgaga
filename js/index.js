
//加载开场元素
function start(){
    var rightTop=document.getElementById("rightopregion");
    var rightDown=document.getElementById("rightdownregion");
    var startBt=createE("button","开始");
    var searechBt=createE("button","搜索");
    var bar=createE("div");
    bar.id="bar";
    startBt.id="startBt";
    searechBt.id="searechBt";
    searechBt.style.display="none";
    rightTop.appendChild(startBt);
    rightTop.appendChild(searechBt);
    rightDown.appendChild(bar);
    var fc=document.getElementsByClassName("fc");
    fc[0].style.display="block";
}
var test=document.getElementById("test");
//创造元素
function createE(eName,eContent){
    var newElement=document.createElement(eName);
    if(eContent){
        if (eName=="button"){
            newElement.innerHTML=eContent;
            return newElement
        }
        else{
            var content=document.createTextNode(eContent);
            newElement.appendChild(content);
            return newElement
        }
    }
    else{
        return newElement;
    }
}
//生成随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//限时插入剧情，连续剧情间隔一秒插入，独立剧情直接调用insertPlot
function timePlot(content,Time){
    setTimeout(function(){ insertPlot(content); },  Time);
}
function insertPlot(content){
    var box=document.getElementById("plotregion");
    var contP=createE("li",content);
    contP.className="contP";
    box.insertBefore(contP, box.childNodes[0]);
}

//开场剧情滚动
function startPlotRoll(){
    var startPlot=["你好","欢迎来到","这个世界！！！"];
    var startPlotTime=1000;
    for (var i=0;i<startPlot.length;i++){
        timePlot(startPlot[i],startPlotTime);
        startPlotTime=startPlotTime+1000;
    }
}
//物品掉落  item_down(最少min个，最多max个）
function item_down(min, max)
{
    var item_amount=getRandomInt(min,max+1);
    var down=document.getElementById("rightopregion");
    for (var i=0;i<item_amount; i++)
    {
        var itemName=item_food[getRandomInt(min-1,max-1)].name;
        var itemE=createE("div",itemName);
        itemE.className="items btn btn-default";
        itemE.addEventListener("click",pickUp);
        down.appendChild(itemE);
    }
}
//滚动条
function bargo(func,time,a,b){
    var barWidth=document.getElementById("bar").style.width;
    if (barWidth=100){
        barWidth=0;
    }
    var proBar = setInterval(function(){
        barWidth++;
        document.getElementById("bar").style.width=barWidth+"%";
        if(barWidth == 100){
            func(a,b);
            clearInterval(proBar);
        }
    },time);
}
//捡起物品
function pickUp(){
    document.getElementById("rightdownregion").appendChild(this);
}
//功能区标签页
function fcRegionTag(){
    var nav=document.getElementsByClassName("nav")[0];
    var nav_a=nav.getElementsByTagName("a");
    var fc=document.getElementsByClassName("fc");
    for (var i=0;i<nav_a.length;i++){
        nav_a[i].NO=i;
        nav_a[i].onclick=function(){
            for(var a=0;a<nav_a.length;a++){
                fc[a].style.display="none";
                nav_a[a].parentElement.className="";
            }
            fc[this.NO].style.display="block";
            this.parentElement.className="active";
        }
    }
}
//搜索按钮点击事件
function searchBtClick(){
    var searechBt=document.getElementById("searechBt");
    searechBt.onclick=function(){
        this.style.display="none";
        var box=document.getElementById("rightopregion");
        var all_items=box.getElementsByClassName("items");
        var number=all_items.length;
        for (var i=0;i<number;i++)
        {
            box.removeChild(all_items[0]);
        }
        bargo(item_down,10,1,4);
    };
}
//开始按钮点击事件
function startBtClick(){
    var startBt=document.getElementById("startBt");
    startBt.onclick=function() {
        startPlotRoll();
        var searechBt=document.getElementById("searechBt");
        setTimeout(function(){searechBt.style.display='';},4000);
        this.style.display="none";
    };
}
window.onload=function () {
    start();
    //开始按钮点击事件
    startBtClick();
    //搜索按钮点击事件
    searchBtClick();
    //功能区标签页
    fcRegionTag()
};



