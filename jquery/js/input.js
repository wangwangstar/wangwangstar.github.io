/**
 * Created by wangwangstar on 2016/7/8.
 */

$(function(){
    $("#inputSearch").focus(function () {
        $(this).addClass("focus");
        if($(this).val()==this.defaultValue){
            $(this).val("");
    }
    }).blur(function () {
        $(this).removeClass("focus");
        if($(this).val()==''){
        $(this).val(this.defaultValue);
    }
    }).keyup(function (e) {
    if(e.which==13){
        alert('回车提交表单！');
    }
})
})