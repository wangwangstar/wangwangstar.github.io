/**
 * Created by wangwangstar on 2016/7/10.
 */
$(function () {
    var $li =$("#skin li");
    $li.click(function () {
        switchSkin(this.id );
    });
    var cookie_skin = $.cookie("MyCssSkin");
    if(cookie_skin){
        switchSkin( cookie_skin);
    }
});
function switchSkin(skinName) {
    $("#"+skinName).addClass("selected")
        .siblings().removeClass("selected");
    //设置不同的皮肤
    $("#cssfile").attr("herf","../css"+skinName+".css");
    $.cookie("MyCssSkin",skinName,{path:'/',expires:10});
}