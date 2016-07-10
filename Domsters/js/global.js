/**
 * Created by wangwangstar on 2016/5/17.
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addclass(element,value) {
    if (!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName+= "";
        newClassName+= value;
        element.className = newClassName;
    }
}

//取得导航列表中所有的链接，循环遍历这些链接
function highLightPage() {
    if (!document.getElementsByTagName)return false;
    if (!document.getElementById)return false;
    var headers =document.getElementsByTagName('header');
    if (headers.length == 0)return false;
    var navs = headers[0].getElementsByTagName('nav');
    if(navs.length == 0)return false;
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i=0;i<links.length;i++){
        linkurl = links[i].getAttribute("here");
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = "href";
            //用JavaScript的toLowerCase方法把该文本转化成小写形式
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            //把变量的值设置为body元素的id属性，相当于在<body>标签中添加了id="home"
            document.body.setAttribute("id",linktext);
        }
    }
}

// Home

function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

//创建幻灯片元素并准备相应链接
function prepareSlideshow() {
    if (!document.getElementsByTagName)return false;
    if (!document.getElementById)return false;
    if (!document.getElementById("intro"))return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","../img/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src", "../img/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    var links = document.getElementsByTagName("a");
    // var links =intro.getElementsByTagName("a");
    var destination;
    for (var i=0;i<links.length;i++){
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html") != -1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html") != -1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html") != -1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html") != -1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !='function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

addLoadEvent(prepareSlideshow);
addLoadEvent(highLightPage);


function loadEvents() {
    // home
    prepareSlideshow();
    // about
    prepareInternalnav();
    // photos
    preparePlaceholder();
    prepareGallery();
    // live
    stripeTables();
    highlightRows();
    displayAbbreviations();
    // contact
    focusLabels();
    prepareForms();
}
function preparePlaceholder() {
    //测试浏览器是否支持createElement的DOM方法
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById) return false;
    //创建一个img元素节点
    var placehoder = document.createElement("img");
    //设置img元素节点的id属性
    placehoder.setAttribute("id","placeholder");
    //设置img元素节点的src属性
    placehoder.setAttribute("src","../img/placeholder.gif");
    //设置img元素节点的alt属性
    placehoder.setAttribute("alt","my image gallery");
    //创建一个P元素节点
    var description = document.createElement("p");
    //设置P元素节点的id属性
    description.setAttribute("id","description");
    //创建一个文本节点
    var desctext = document.createTextNode("Choose an image");
    //把这个文本节点追加到P元素上
    description.appendChild(desctext);
    //得到图片清单
    var gallery = document.getElementById("imagegallery");
    //把placehoder插入到gallery的后面
    insertAfter(placehoder,gallery);
    //把description插入到placehoder的后面
    insertAfter(description,placehoder);
}
function prepareGallery() {
    //测试浏览器是否支持getElementsByTagName的DOM方法
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    //把document.getElementById("imagegallery")赋值给变量gallery
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    //用for循环遍历处理links数组里的各个元素
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
               return showPic(this);
                  }
    }
}
function showPic(whichpic) {
    //找到whichpic节点的href属性对应的 值，也就是图片路径
    if (!document.getElementById("placeholder")) {
        return false;
    }
    var source = whichpic.getAttribute("href");
    // 找到占位符 图片标签
    var placeholder = document.getElementById("placeholder");
    //将占位符 图片标签的src属性，改成 whichpic节点href属性的值，也就是上面的source
    placeholder.setAttribute("src", source);
    //当图片库页面上的某个图片链接被点击时，这个链接的title属性值将被提取并保存到text变量中
    if (!document.getElementById("description"))
        return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    // 引用id为description的文本段落，并保存到变量description中
    var description;
    description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        //把description对象的第一个子节点的nodeValue属性值给变量text
        description.firstChild.nodeValue = text;
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function displayAbbreviations() {
    if (!document.getElementsByTagName ||!document.createElement||!document.createTextNode) return false;
    //遍历文档里的所有abbr元素，并把节点集合构成的数组保到变量abbreviations里
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    //遍历所有缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i]
        //保证displayAbbreviations函数在ＩＥ中能够平稳退化
        if (current_abbr.childNodes.length < 1) continue;
        //用getAttribute()方法得到title属性，并把值存入到变量definition中
        var definition = current_abbr.getAttribute("title");
        //得到文本节点的nodeValue属性值并把它赋值给变量key
        var key = current_abbr.lastChild.nodeValue;
        //把变量key 和definition的值保存到defs数组里
        defs[key] = definition;
    }
    //用createElement方法创建这个定义列表，并把这个新创建的元素赋值给变量dlist
    var dlist = document.createElement("dl");
    //用一个for/in循环对defs数组进行遍历定义
    for (key in defs) {
        //defa关联数组里的每个键，把它的值赋给变量key
        var definition = defs[key];
        //创建相应的文本节点并分别把它们添加到新创建的DT和DD元素，元素节点赋值给变量dtitle
        var dtitle = document.createElement("dt");
        //新创建的文本节点赋值给变量dtitle_text
        var dtitle_text = document.createTextNode(key);
        //使用appendChild（）方法把dtitle_text文本节点添加到 dtitle元素节点
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    //创建标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviation");
    header.appendChild(header_text);
    //把标题添加到页面主体
    document.body.appendChild(header);
    //把定义列表添加到页面主体
    document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

function stripeTables() {
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i=0;i<tables.length;i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j=0;j<rows.length;j++){
            if(odd == true){
                addclass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }
        
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0;i<rows.length;i++){
        rows[i].oldClassName = rows[i].className
        rows[i].onmouseover =function () {
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function () {
            this.className = this.oldClassName
        }
    }
}
function focusLabels() {
    if(!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if(!document.getElementsById(id)) return false;
            var element = document.getElementsById(id);
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);