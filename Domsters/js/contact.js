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
// function resetFields(whichform) {
//     if (Modernizr.input.placeholder) return;
// }
// function resetFields(whichform) {
//     if(var i=0;i<whichform.elements.length;i++){
//         var element = whichform.elements[i];
//         if(element.type == "submit")
//             continue;
//     
//         var check =element.placeholder || element.getAttribute('placeholder');
//         if(!check) continue;
//         element.onfocus =function () {
//             var text =this.placeholder || this.getAttribute('placeholder');
//             if(this.value == text){
//                 this.className ='';
//                 this.value ="";
//             }
//         }
//         element.onblur = function () {
//             if(this.value == ""){
//                 this.className ='placeholder';
//                 this.value = this.placeholder || this.getAttribute('placeholder');
//             }
//         }
//         element.onblur();
//     }
// }