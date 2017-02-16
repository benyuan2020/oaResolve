/**
 * Created by swq on 2017/2/16.
 */
$('#dhbDsTable').bootstrapTable({
    url: '../static/json/dhb-ds-data.json',/*/midai/postloan/order/businessList.json*/
    columns: [ {
        field: 'orderIdStr',
        title: '编号',
        align:'left'
    }, {
        field: 'submitUser',
        title: '提交人',
        align:'left'
    }, {
        field: 'submitDateStr',
        title: '提交日期',
        align:'left'
    }, {
        field: 'remark',
        title: '备注',
        align:'left'
    },{
        field: '',
        title: '操作',
        align:'left',
        formatter:function(value,row,index){
            var str = "点击审核";
            var flag = row.urlFlag;
            var oHtml = "";
            var targetUrl = "";
            var data = {
                orderId : row.orderId,
                urlFlag : row.urlFlag,
                orderIdStr : row.orderIdStr,
                taskId : row.taskId
            };
            switch (flag){
                //抵押金申请驳回件
                case 1 :
                    targetUrl = "dhb-newDeposit";
                    break;
                //抵押金申请审核件
                case 2 :
                    targetUrl = "dhb-newDeposit-check";
                    break;
                //抵押金退款申请
                case 4 :
                    targetUrl = "dhb-depositBackMoney";
                    break;
                 //抵押金退款申请审核
                case 5 :
                    targetUrl = "dhb-depositBackMoney-check";
                    break;
                //GPS退款申请
                case 7 :
                    targetUrl = "dhb-gpsBackMoney";
                    break;
                //GPS退款申请审核
                case 8 :
                    targetUrl = "dhb-gpsBackMoney-check";
                    break;
                //还款驳回件
                case 12 :
                    targetUrl = "dhb-qrhk";
                    break;
                //还款驳回件
                case 14 :
                    targetUrl = "dhb-tqjk";
                    break;
                //平账驳回件
                case 16 :
                    targetUrl = "dhb-tqjk";
                    break;
                //销账驳回件
                case 18 :
                    targetUrl = "dhb-tqjk";
                    break;
                default :
                    targetUrl = ""
            }
            return '<a class="btn btn-inverse colorWhite" onclick="newPage('+targetUrl+','+data+')" title="查看">' + str + '</a>'
        }
    }]
});
//待审进件列表点击审核跳转新页面方法
function newPage(url,data){
    alert('1');
    if(url){
        oaRoute.openNewPage({
            targetUrl: url,
            data: data
        })
    }else{
        alert('无跳转页面')
    }
}