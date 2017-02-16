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
            switch (flag){
                //抵押金申请驳回件
                case 1 :
                    oHtml = '<a class="btn btn-inverse colorWhite"  href="#/automobile-credit-newDeposit-check.html/world/'+row.orderId+'/'+row.urlFlag+'/'+row.orderIdStr+'/'+row.taskId+'" title="查看">'
                            + str
                            + '</a>';
                    break;
                //抵押金申请审核件
                case 2 :
                    oHtml = '<a class="btn btn-inverse colorWhite"   href="#/automobile-credit-newDeposit-check.html/world/'+row.orderId+'/'+row.urlFlag+'/'+row.orderIdStr+'/'+row.taskId+'" title="查看">'
                            + str
                            + '</a>';
                    break;
                //抵押金退款申请
                case 4 :
                    oHtml = '<a class="btn btn-inverse colorWhite"   href="#/automobile-credit-newDepositBackMoney.html/world/'+row.orderId+'/'+row.urlFlag+'/'+row.orderIdStr+'/'+row.taskId+'" title="查看">'
                            + str
                            + '</a>';
                    break;
                 //抵押金退款申请审核
                case 5 :
                    oHtml = '<a class="btn btn-inverse colorWhite"   href="#/automobile-credit-newDepositBackMoney-check.html/world/'+row.orderId+'/'+row.urlFlag+'/'+row.orderIdStr+'/'+row.taskId+'" title="查看">'
                            + str
                            + '</a>';
            }
        }
    }]
});