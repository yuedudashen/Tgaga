
//加载开场元素
function start(){
    var scene=document.getElementById("scene");
    var EventDiv=document.getElementById("Event");
    var fcbtview=document.getElementById("fcbtview");
    var bigMapUl=createE("ul");
    var bar=createE("div");
    bigMapUl.id="bigMapUl";
    bigMapUl.className="nav nav-tabs";
    bar.id="bar";
    scene.appendChild(bigMapUl);
    fcbtview.appendChild(funcBtView());
    EventDiv.appendChild(bar);
    var fc=document.getElementsByClassName("fc");
    fc[0].style.display="block";
}
//创造元素
function createE(eName,eContent){
    var newElement=document.createElement(eName);
    newElement.className='';
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
    var downBox=document.getElementById("Event");
    for (var i=0;i<item_amount; i++)
    {
        var itemName=item_food[getRandomInt(min-1,max-1)].name;
        var itemE=createE("div",itemName);
        itemE.className="items label label-info";
        itemE.addEventListener("click",pickUp);
        downBox.appendChild(itemE);
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
    document.getElementsByClassName("fc")[0].appendChild(this);
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

//大地图
function onloadMap(){
    var bigMap=["林地","美舍湖","垃圾场","西城近郊"];
    var bigMapUl=document.getElementById("bigMapUl");
    var mapWidth=100/bigMap.length;
    for (var i=0;i<bigMap.length;i++){
        var bigMapLi=createE("li");
        var bigMapA=createE("a",bigMap[i]);
        bigMapA.href="#";
        bigMapLi.appendChild(bigMapA);
        bigMapLi.className="bigMapLi";
        bigMapLi.style.width=mapWidth+"%";
        bigMapLi.onclick=function(){
            bigMapClick(this);
            this.className="active bigMapLi";
        };
        bigMapUl.appendChild(bigMapLi);
    }
}
//地图切换
function bigMapClick(ts){
    var bigMapLi=document.getElementsByClassName("bigMapLi");
    for (var i=0;i<bigMapLi.length;i++){
        bigMapLi[i].className="bigMapLi";
    }
    var box=document.getElementById("scene");
    switch (ts.childNodes[0].innerHTML){
        case "美舍湖":
            if(box.childNodes[1]){
                box.removeChild(box.childNodes[1]);
            }
            box.appendChild(createSmallTable(place_lake));
            break;
        case "林地":
            if(box.childNodes[1]){
                box.removeChild(box.childNodes[1]);
            }
            box.appendChild(createSmallTable(place_Woods));
            break;
        case "垃圾场":
            if(box.childNodes[1]){
                box.removeChild(box.childNodes[1]);
            }
            box.appendChild(createSmallTable(place_Landfill));
            break;
        case "西城近郊":
            if(box.childNodes[1]){
                box.removeChild(box.childNodes[1]);
            }
            box.appendChild(createSmallTable(city_Suburbs));
            break;
    }
}
//小地图
function createSmallTable(city){
    var table=createE("table");
    var thead=createE("thead");
    var tbody=createE("tbody");
    var tr=createE("tr");
    var headContent=["地名","距离","事件"];
    for (var i=0;i<headContent.length;i++){
        tr.appendChild(createE("th",headContent[i]));
    }
    var map=city;
    for (var l=0;l<map.length;l++){
        var tr_body=createE("tr");
        var tdName=createE("td",map[l].mapname);
        var tddistance=createE("td",map[l].distance);
        var tdfunc=createE("td");
        switch (map[l].func){
            case 1:
                tdfunc.appendChild(createE("button","搜集"))
        }
        tr_body.appendChild(tdName);
        tr_body.appendChild(tddistance);
        tr_body.appendChild(tdfunc);
        tbody.appendChild(tr_body);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.className="table table-hover";
    return table
}
//功能按钮组
function funcBtView(){
    var btDiv=createE("div");
    btDiv.className="btn-group";
    btDiv.style.margin="0 auto";
    var btView=["开始","搜索","测试"];
    for(var i=0;i<btView.length;i++){
        var bt=createE("button",btView[i]);
        bt.addEventListener("click",btViewFunc)
        bt.className="btn btn-default";
        btDiv.appendChild(bt)
    }
    return btDiv;
}
//功能按钮组事件
function btViewFunc(){
    switch (this.innerHTML){
        case "开始":
            startPlotRoll();
            this.disabled="disabled";
            break;
        case "搜索":
            var EventDiv=document.getElementById("Event");
            var all_items=EventDiv.getElementsByClassName("items");
            var number=all_items.length;
            for (var i=0;i<number;i++)
            {
                EventDiv.removeChild(all_items[0]);
            }
            bargo(item_down,10,1,4);
            break;
        case"测试":
            alert("testisok");
            break
    }
}
window.onload=function () {
    //加载开场元素
    start();
    //功能区标签页
    fcRegionTag();
    //加载大地图
    onloadMap();
};



