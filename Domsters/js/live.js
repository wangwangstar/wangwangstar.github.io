/**
 * Created by wangwangstar on 2016/5/30.
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
function stripeTables() {
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i=0;i<tables.length;i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j=0;j<rows.length;j++){
            if(odd == true){
                rows[j].style.backgroundColor = "#ffc";
                addclass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }

    }
}

