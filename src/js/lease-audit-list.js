









OSS_MODEL = "lease";
	//列表查询
	var searchDate={
		clientName : ''
	};
	$("#lease-audit-list-sureFind").click(function(event) {
		var clientName = $("#lease-audit-list-jjMan").val();
		searchDate = {
			clientName : clientName
		};
		$("#leaseAuditListTable").bootstrapTable("selectPage", 1);
	});
	//去除input内容复制有空格问题
	$("input").on("blur",function(){
		var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
		$(this).val(result);
	});
	//重置查询
	$(document).on('click','#search-reset',function(){
		$("#lease-audit-list-jjMan").val('');
		var clientName = $("#lease-audit-list-jjMan").val();
		searchDate = {
			clientName : clientName
		};
		$("#leaseAuditListTable").bootstrapTable("selectPage", 1);
	});

	if(localStorage.getItem('lease-ds-limit')){
		var pageSize= Number(localStorage.getItem('lease-ds-limit'));
		var pageBeginNum = Number(sessionStorage.getItem('lease-ds-offset')) || 0;
		$('#leaseAuditListTable').data('pageSize',pageSize);
		$('#leaseAuditListTable').attr('data-page-number',parseInt(pageBeginNum/pageSize)+1);
	}
	var isFirstEnter = true;
	function searchKey(args) {
		if(isFirstEnter){
			if(localStorage.getItem('lease-ds-limit')){
				args.limit = Number(localStorage.getItem('lease-ds-limit'));
				args.offset = Number(sessionStorage.getItem('lease-ds-offset'));
				args.clientName = sessionStorage.getItem('lease-ds-clientName');
				$('[name="clientName"]').val(args.clientName);

			}else{
				args.limit = 12;
				args.offset = 0;
				args.clientName = '';
			}
			isFirstEnter = false;
		}else{
			localStorage.setItem('lease-ds-limit',args.limit);
			sessionStorage.setItem('lease-ds-offset',args.offset);
			sessionStorage.setItem('lease-ds-clientName',$('[name = "clientName"]').val());
			args.limit = Number(localStorage.getItem('lease-ds-limit'));
			args.offset = Number(sessionStorage.getItem('lease-ds-offset'));
			args.clientName = $('[name = "clientName"]').val();
		}
		return args;
	}
	// function searchKey(args) {
	// 	args.clientName = searchDate.clientName;
	// 	return args;
	// }
	function timeTpye(value, row, index) {
		if (value != "" && value != null && value != undefined) {
			return value.substr(0, 19);
		}
		return "";
	}
	// 备注
	function leaseNoteFormatter(value, row, index){
		var str = "<p style='max-width:150px; font-size:12px;margin:0; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='"+value+"' >"+value+"</p>";
		return str;
	}

	function actionFormatter(value, row, index) {
		var str = "点击审核";
		var skipUrl;
		switch (row.result) {
			case "url_1":
				skipUrl = "lease-new-incoming-parts.html";
				break;
			case "url_2":
				skipUrl = "lease-first-audit.html";
				break;
			case "url_3":
				skipUrl = "lease-first-grade-car-comman.html";
				break;
			case "url_4":
				skipUrl = "lease-second-audit.html";
				break;
			case "url_5":
				skipUrl = "lease-second-grade-car-comman.html";
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
	}
	function detail(orderID) {
		$("#lease-audit-list .wrapper-content").empty();
		ORDERID = orderID.split(",")[0];
		FLOWSTATUS = orderID.split(",")[1];
		CARTYPE = orderID.split(",")[2];
		$.ajax({
			url : "/midai/lease/order/urlSkip.json",
			method : "GET",
			data : {
				"orderId" : ORDERID
			},
			success : function(res) {
				WORKFLOW = res.result;
				var skipUrl = "";
				switch (WORKFLOW) {
				case "url_1":
					skipUrl = "lease-new-incoming-parts.html";
					break;
				case "url_2":
					skipUrl = "lease-first-audit.html";
					break;
				case "url_3":
					skipUrl = "lease-first-grade-car-comman.html";
					break;
				case "url_4":
					skipUrl = "lease-second-audit.html";
					break;
				case "url_5":
					skipUrl = "lease-second-grade-car-comman.html";
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
				default:
				swal({							
					title : "<h5 style='font-size:20px;'>提示</h5>",
					text : "没有获取到跳转页面信息，请通知管理员！",								
					confirmButtonColor: "#48c9b0",
					showConfirmButton : true,
					closeOnConfirm: true,
					html:true
				});
					break;
				}
				if (skipUrl != "") {
					$("#lease-audit-list-main-content").load(skipUrl, function() {
					});
				}
			}
		})
	}