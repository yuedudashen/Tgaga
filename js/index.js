
//加载开场元素
function start(){
    var main=document.getElementsByClassName("main")[0];
    var startBt=createE("button","开始");
    var searechBt=createE("button","搜索");
    var plotRegion=createE("div");
    var rightopRegion=createE("div");
    var rightdownRegion=createE("div");
    var bar=createE("div");

    plotRegion.id='plotRegion';
    rightopRegion.id="rightopRegion";
    rightdownRegion.id="rightdownRegion";
    bar.id="bar";
    startBt.id="startBt";
    searechBt.id="searechBt";
    searechBt.style.display="none";
    main.appendChild(plotRegion);
    main.appendChild(rightopRegion);
    main.appendChild(rightdownRegion);
    rightopRegion.appendChild(startBt);
    rightopRegion.appendChild(searechBt);
    rightdownRegion.appendChild(bar);
}

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
    var box=document.getElementById("plotRegion");
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
    var down=document.getElementById("rightopRegion");
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
    document.getElementById("rightdownRegion").appendChild(this);
}

window.onload=function () {
    start();
    //开始按钮点击事件
    var startBt=document.getElementById("startBt");
    startBt.onclick=function() {
        startPlotRoll();
        var searechBt=document.getElementById("searechBt");
        setTimeout(function(){searechBt.style.display='';},4000);
        this.style.display="none";
    };
    //搜索按钮点击事件
    var searechBt=document.getElementById("searechBt");
    searechBt.onclick=function(){
        this.style.display="none";
        var box=document.getElementById("rightopRegion");
        var all_items=box.getElementsByClassName("items");
        var number=all_items.length;
        for (var i=0;i<number;i++)
        {
            box.removeChild(all_items[0]);
        }
        bargo(item_down,10,1,4);
    }

};


