/**
 * Created by wangwangstar on 2016/5/29.
 */
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
//选择性的每次只显示其中一部分
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (i=0;i<=sections.length;i++){
        if(sections[i].getAttribute("id")!= id){
            sections[i].style.display = "none";
        }else {
            sections[i].style.display = "block";
        }
    }
}
function prepareINternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0)return false;
    var navs =articles[0].getElementsByTagName("navs");
    if (navs.length == 0) return false;
    var nav =navs[0];
    var links =nav.getElementsByTagName("a");
    for (var i=0;i<=links.length;i++){
        var sectionId = links[i].getAttribute("href");
        if (!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick =function () {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareINternalnav);