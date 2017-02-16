var $table = $('#carAuditListTable');
$table.bootstrapTable({
    url: '../static/json/car-audit-list-data.json',/*/midai/system/message/list.json*/
    columns: [{
        field: 'orderId',
        title: '进件编号',
        align:'left'
    }, {
        field: 'clientName',
        title: '进件人',
        align:'left'
    }, {
        field: 'createTime',
        title: '进件时间',
        align:'left',
        formatter: function(value, row, index) {
			if (value != "" && value != null && value != undefined) {
				return value.substr(0, 19);
			}
			return "";
		}
    }, {
        field: 'orderType',
        title: '进件类型',
        align:'left'
    }, {
        field: 'state',
        title: '进件状态',
        align:'left'
    }, {
        field: 'carType',
        title: '资质',
        align:'left',
    },  {
        field: 'note',
        title: '备注',
        align:'left',
        formatter: function(value, row, index){
			var str = "<p style='max-width:150px; font-size:12px;margin:0; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='"+value+"' >"+value+"</p>";
			return str;
		}
    },  {
        field: '',
        title: '操作',
        align:'left',
        formatter: function(value, row, index) {
			var str = "点击审核";
			var skipUrl;
			switch (row.result) {
				case "url_1":
					skipUrl = "car-new-part-add.html";
					break;
				case "url_2":
					skipUrl = "car-first-audit.html";
					break;
				case "url_3":
					skipUrl = "car-first-car-evaluation.html";
					break;
				case "url_4":
					skipUrl = "car-second-audit.html";
					break;
				case "url_5":
					skipUrl = "car-second-car-evaluation.html";
					break;
				case "url_6":
					skipUrl = "car-expatriate.html";
					break;
				case "url_7":
					skipUrl = "car-last-audit.html";
					break;
				case "url_8":
					skipUrl = "car-risk.html";
					break;
				case "url_9":
					skipUrl = "car-master.html";
					break;
				case "url_10":
					skipUrl = "car-alldetail.html";
					break;
				case "url_11":
					skipUrl = "car-scht.html";
					break;
				case "url_12":
					skipUrl = "car-htsh.html";
					break;
				case "url_14":
					skipUrl = "car-vin-comfirm.html";
					break;
			}
			var arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/'+skipUrl+'/world/'+row.orderId+'/'+row.state+'/'+row.carType+'/'+row.result+'/'+skipUrl+'/'+row.taskId+'">' + str + '</a>';
			return arr;
		}
    }]
});

var searchDate={clientName : '', roleId: ''};
// 查询点击事件
$("#car-audit-list-sureFind").click(function(event) {
	var clientName = $("#car-audit-list-jjMan").val();
	var roleId = $('#car-audit-list-processRoles').val();
	searchDate = {
		clientName : clientName,
		roleId: roleId
	};
	$table.bootstrapTable("selectPage", 1);
});

//去除input内容复制有空格问题
$("#car-audit-list input").on("blur",function(){
	var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
	$(this).val(result);
});

// 重置查询条件
$('#car-audit-list-search-reset').on('click',function(){
	$("#car-audit-list-jjMan").val('');
	$('#car-audit-list-processRoles').val('');
	searchDate = {
		clientName : '',
		roleId: ''
	};
	$table.bootstrapTable("selectPage", 1);
});