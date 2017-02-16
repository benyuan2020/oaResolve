var $table  = $('#leaseAuditListTable');

$table.bootstrapTable({
    url: '../static/json/lease-audit-list-data.json',/*/midai/system/message/list.json*/
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
					skipUrl = "lease-new-part-add.html";
					break;
				case "url_2":
					skipUrl = "lease-first-audit.html";
					break;
				case "url_3":
					skipUrl = "lease-first-car-evaluation.html";
					break;
				case "url_4":
					skipUrl = "lease-second-audit.html";
					break;
				case "url_5":
					skipUrl = "lease-second-car-evaluation.html";
					break;
				case "url_6":
					skipUrl = "lease-expatriate.html";
					break;
				case "url_7":
					skipUrl = "lease-last-audit.html";
					break;
				case "url_8":
					skipUrl = "lease-risk.html";
					break;
				case "url_9":
					skipUrl = "lease-master.html";
					break;
				case "url_10":
					skipUrl = "lease-alldetail.html";
					break;
				case "url_11":
					skipUrl = "lease-scht.html";
					break;
				case "url_12":
					skipUrl = "lease-htsh.html";
					break;
				case "url_14":
					skipUrl = "lease-vin-comfirm.html";
					break;
			}
			var arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/'+skipUrl+'/world/'+row.orderId+'/'+row.state+'/'+row.carType+'/'+row.result+'/'+skipUrl+'/'+row.taskId+'">' + str + '</a>';
			return arr;
		},
		events: function(){

		}
    }]
});


var searchDate={clientName : '', roleId: ''};
// 查询点击事件
$("#lease-audit-list-sureFind").click(function(event) {
	var clientName = $("#lease-audit-list-jjMan").val();
	var roleId = $('#lease-audit-list-processRoles').val();
	searchDate = {
		clientName : clientName,
		roleId: roleId
	};
	$table.bootstrapTable("selectPage", 1);
});

//去除input内容复制有空格问题
$("#lease-audit-list input").on("blur",function(){
	var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
	$(this).val(result);
});

// 重置查询条件
$('#lease-audit-list-search-reset').on('click',function(){
	$("#lease-audit-list-jjMan").val('');
	$('#lease-audit-list-processRoles').val('');
	searchDate = {
		clientName : '',
		roleId: ''
	};
	$table.bootstrapTable("selectPage", 1);
});






// OSS_MODEL = "lease";
// 	//列表查询

	
// 	
	
// 	//重置查询


// 	if(localStorage.getItem('lease-ds-limit')){
// 		var pageSize= Number(localStorage.getItem('lease-ds-limit'));
// 		var pageBeginNum = Number(sessionStorage.getItem('lease-ds-offset')) || 0;
// 		$('#leaseAuditListTable').data('pageSize',pageSize);
// 		$('#leaseAuditListTable').attr('data-page-number',parseInt(pageBeginNum/pageSize)+1);
// 	}
// 	var isFirstEnter = true;
// 	function searchKey(args) {
// 		if(isFirstEnter){
// 			if(localStorage.getItem('lease-ds-limit')){
// 				args.limit = Number(localStorage.getItem('lease-ds-limit'));
// 				args.offset = Number(sessionStorage.getItem('lease-ds-offset'));
// 				args.clientName = sessionStorage.getItem('lease-ds-clientName');
// 				$('[name="clientName"]').val(args.clientName);

// 			}else{
// 				args.limit = 12;
// 				args.offset = 0;
// 				args.clientName = '';
// 			}
// 			isFirstEnter = false;
// 		}else{
// 			localStorage.setItem('lease-ds-limit',args.limit);
// 			sessionStorage.setItem('lease-ds-offset',args.offset);
// 			sessionStorage.setItem('lease-ds-clientName',$('[name = "clientName"]').val());
// 			args.limit = Number(localStorage.getItem('lease-ds-limit'));
// 			args.offset = Number(sessionStorage.getItem('lease-ds-offset'));
// 			args.clientName = $('[name = "clientName"]').val();
// 		}
// 		return args;
// 	}
// 	// function searchKey(args) {
// 	// 	args.clientName = searchDate.clientName;
// 	// 	return args;
// 	// }