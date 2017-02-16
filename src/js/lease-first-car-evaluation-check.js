var levNum = $("#level").val();
var ORDERID="JJ-RZ-170108-010";
$.ajax({
    url:"../static/json/yijicheping.json",  /*/midai/lease/carEvalution/loadCarEvalution.json*/
    type:"GET",
    data:{
        orderId:ORDERID,
        level:1,
        taskId : 'empty'
    },
    success:function(res){
        if(!res.isOutVisited){
            $('.LEASE_FOREIGN_VISIT').hide();
        }
        $("#lease-first-car-evaluation").json2form(res);
        $(".my_date").each(function(){
            var str = $(this).find("input").val().substr(0,10);
            $(this).find("input").val(str)
        });
        $("input[name='factoryDay']").val(res.car.factoryDay.substr(0,7));
        $("input[name='annualDay']").val(res.car.annualDay.substr(0,7));
        if(!res.isOutVisited){
            $(".LEASE_FOREIGN_VISIT").hide();
        }
    },
    error:function(){
        swal({
            title : "<h5 style='font-size:20px;'>提示</h5>",
            text : "数据接收失败啦！",
            confirmButtonColor: "#48c9b0",
            showConfirmButton : true,
            closeOnConfirm: true,
            html:true
        });
    }
})