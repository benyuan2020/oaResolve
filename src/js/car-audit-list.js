// 车贷待审进件页面JS
OSS_MODEL = "car";
	//列表查询
	var searchDate={
		clientName : ''
	};
	$("#car-audit-list-sureFind").click(function(event) {
		var clientName = $("#jjMan").val();
		searchDate = {
			clientName : clientName
		};
		$("#carAuditListTable").bootstrapTable("selectPage", 1);
	});
	//去除input内容复制有空格问题
	$("#car-audit-list input").on("blur",function(){
		var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
		$(this).val(result);
	});
	//重置查询
	$(document).on('click','#car-audit-list-search-reset',function(){
		$("#car-audit-list-jjMan").val('');
		var clientName = $("#car-audit-list-jjMan").val();
		searchDate = {
			clientName : clientName
		};
		$("#carAuditListTable").bootstrapTable("selectPage", 1);
	});
	if(localStorage.getItem('car-ds-limit')){
		$('#carAuditListTable').data('pageSize',Number(localStorage.getItem('car-ds-limit')));
		var pageNumber = (Number((sessionStorage.getItem('car-ds-offset')) || 0)/Number(localStorage.getItem('car-ds-limit')))+1;
		$('#carAuditListTable').attr('data-page-number',pageNumber);
	}
	var isFirstEnter = true;
	function searchKey(args) {
		if(isFirstEnter){
			if(localStorage.getItem('car-ds-limit')){
				args.limit = Number(localStorage.getItem('car-ds-limit'));
				args.offset = Number(sessionStorage.getItem('car-ds-offset'));
				args.clientName = sessionStorage.getItem('car-ds-clientName');
				$('#car-audit-list [name="clientName"]').val(args.clientName);
			}else{
				args.limit = 12;
				args.offset = 0;
				args.clientName = '';
			}
			isFirstEnter = false;
		}else{
			localStorage.setItem('car-ds-limit',args.limit);
			sessionStorage.setItem('car-ds-offset',args.offset);
			sessionStorage.setItem('car-ds-clientName',$('#car-audit-list [name = "clientName"]').val());
			args.limit = Number(localStorage.getItem('car-ds-limit'));
			args.offset = Number(sessionStorage.getItem('car-ds-offset'));
			args.clientName = $('#car-audit-list [name = "clientName"]').val();
		}
		return args;
	}
	function carNoteFormatter(value, row, index){
		var str = "<p style='max-width:150px; font-size:12px;margin:0; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='"+value+"' >"+value+"</p>";
		return str;
	}

	function timeTpye(value, row, index) {
		if (value != "" && value != null && value != undefined) {
			return value.substr(0, 19);
		}
		return "";
	}

	function actionFormatter(value, row, index) {
		var str = "点击审核";
		var skip_url;
		if(row.orderIdView != null){
			switch (row.result) {
				case 'url_1': //clean
					skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
					break;
				case 'url_2': //clean
					skip_url = "automobile-credit-newExhibitionPeriod.html"; //newIncomingParts
					break;
				case 'url_3': //clean
					skip_url = "automobile-credit-exhibitionPeriod-firstGradeCarComman.html"; //firstGradeCarComman
					break;
				case 'url_4': //clean
					skip_url = "automobile-credit-secondAudit.html"; //secondAudit
					break;
				case 'url_5': //clean
					skip_url = "automobile-credit-exhibitionPeriod-secondGradeCarComman.html"; //secondGradeCarComman
					break;
				case 'url_6': //clean
					skip_url = "automobile-credit-expatriate.html"; //expatriate
					break;
				case 'url_7': //clean
					skip_url = "automobile-credit-exhibitionPeriod-lastAudit.html"; //lastAudit
					break;
				case 'url_8': //clean
					skip_url = "automobile-credit-exhibitionPeriod-risk.html"; //risk
					break;
				case 'url_9': //clean
					skip_url = "automobile-credit-exhibitionPeriod-master.html"; //master
					break;
				case 'url_10':
					skip_url = "automobile-credit-alldetail.html"; //alldetail
					break;
				case 'url_11': //clean
					skip_url = "automobile-credit-exhibitionPeriod-scht.html"; //car_scht
					break;
				case 'url_12': //clean
					skip_url = "automobile-credit-exhibitionPeriod-htsh.html"; //car_htsh
					break;
				case 'url_13':
					skip_url = "automobile-credit-fileMaster.html"; //fileMaster
					break;
			}
			var arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/'+skip_url+'/world/'+row.orderId+'/'+row.state+'/'+row.orderIdView+'/'+row.carType+'/'+row.result+'/'+skip_url+'/'+row.taskId+'">' + str + '</a>';
		}else{
			switch (row.result) {
				case 'url_1': //clean
					skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
					break;
				case 'url_2': //clean
					skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
					break;
				case 'url_3': //clean
					skip_url = "automobile-credit-firstGradeCarComman.html"; //firstGradeCarComman
					break;
				case 'url_4': //clean
					skip_url = "automobile-credit-secondAudit.html"; //secondAudit
					break;
				case 'url_5': //clean
					skip_url = "automobile-credit-secondGradeCarComman.html"; //secondGradeCarComman
					break;
				case 'url_6': //clean
					skip_url = "automobile-credit-expatriate.html"; //expatriate
					break;
				case 'url_7': //clean
					skip_url = "automobile-credit-lastAudit.html"; //lastAudit
					break;
				case 'url_8': //clean
					skip_url = "automobile-credit-risk.html"; //risk
					break;
				case 'url_9': //clean
					skip_url = "automobile-credit-master.html"; //master
					break;
				case 'url_10':
					skip_url = "automobile-credit-alldetail.html"; //alldetail
					break;
				case 'url_11': //clean
					skip_url = "automobile-credit-car-scht.html"; //car_scht
					break;
				case 'url_12': //clean
					skip_url = "automobile-credit-car-htsh.html"; //car_htsh
					break;
				case 'url_13':
					skip_url = "automobile-credit-fileMaster.html"; //fileMaster
					break;
			}
			var arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/'+skip_url+'/world/'+row.orderId+'/'+row.state+'/'+row.orderIdView+'/'+row.carType+'/'+row.result+'/'+skip_url+'/'+row.taskId+'">' + str + '</a>';
		}
		return arr;
	}
	function detail(a,orderID) {
		var $this = a;
		$(".wrapper-content").empty();
		ORDERID = orderID.split(",")[0];
		FLAGSTATUS = orderID.split(",")[1];
		ORDERIDVIEW = orderID.split(",")[2];
		CARTYPE = "二手车";
		$("#car-audit-list-orderId").val(ORDERID);
		if(ORDERIDVIEW != 'null'){
			$.ajax({
				url : "/midai/car/order/defer/urlSkip.json",
				data : "orderId=" + ORDERIDVIEW,
				type : "get",
				success : function(res) {

					var skip_url = "";
					var urlStr = res.result;
					console.log(res);
					WORKFLOW = urlStr;
					console.log("urlStr" + urlStr);

					switch (urlStr) {
						case 'url_1': //clean
							skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
							break;
						case 'url_2': //clean
							skip_url = "automobile-credit-newExhibitionPeriod.html"; //newIncomingParts
							break;
						case 'url_3': //clean
							skip_url = "automobile-credit-exhibitionPeriod-firstGradeCarComman.html"; //firstGradeCarComman
							break;
						case 'url_4': //clean
							skip_url = "automobile-credit-secondAudit.html"; //secondAudit
							break;
						case 'url_5': //clean
							skip_url = "automobile-credit-exhibitionPeriod-secondGradeCarComman.html"; //secondGradeCarComman
							break;
						case 'url_6': //clean
							skip_url = "automobile-credit-expatriate.html"; //expatriate
							break;
						case 'url_7': //clean
							skip_url = "automobile-credit-exhibitionPeriod-lastAudit.html"; //lastAudit
							break;
						case 'url_8': //clean
							skip_url = "automobile-credit-exhibitionPeriod-risk.html"; //risk
							break;
						case 'url_9': //clean
							skip_url = "automobile-credit-exhibitionPeriod-master.html"; //master
							break;
						case 'url_10':
							skip_url = "automobile-credit-alldetail.html"; //alldetail
							break;
						case 'url_11': //clean
							skip_url = "automobile-credit-exhibitionPeriod-scht.html"; //car_scht
							break;
						case 'url_12': //clean
							skip_url = "automobile-credit-exhibitionPeriod-htsh.html"; //car_htsh
							break;
						case 'url_13':
							skip_url = "automobile-credit-fileMaster.html"; //fileMaster
							break;
						default:
							swal({
								title : "<h5 style='font-size:20px;'>提示</h5>",
								text : "错误!",
								confirmButtonColor: "#48c9b0",
								showConfirmButton : true,
								closeOnConfirm: true,
								html:true
							});
					}
					$($this).prop('href','#/'+skip_url+'/'+'world/'+ORDERID+'/'+FLAGSTATUS+'/'+ORDERIDVIEW+'/'+CARTYPE+'/'+WORKFLOW+'/ok/'+skip_url);

				}
			})
		}else{
			$.ajax({
				url : "/midai/car/order/urlSkip.json",
				data : "orderId=" + ORDERID,
				type : "get",
				success : function(res) {

					var skip_url = "";

					var urlStr = res.result;
					console.log(res);
					WORKFLOW = urlStr;
					console.log("urlStr" + urlStr);

					switch (urlStr) {
						case 'url_1': //clean
							skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
							break;
						case 'url_2': //clean
							skip_url = "automobile-credit-newIncomingParts.html"; //newIncomingParts
							break;
						case 'url_3': //clean
							skip_url = "automobile-credit-firstGradeCarComman.html"; //firstGradeCarComman
							break;
						case 'url_4': //clean
							skip_url = "automobile-credit-secondAudit.html"; //secondAudit
							break;
						case 'url_5': //clean
							skip_url = "automobile-credit-secondGradeCarComman.html"; //secondGradeCarComman
							break;
						case 'url_6': //clean
							skip_url = "automobile-credit-expatriate.html"; //expatriate
							break;
						case 'url_7': //clean
							skip_url = "automobile-credit-lastAudit.html"; //lastAudit
							break;
						case 'url_8': //clean
							skip_url = "automobile-credit-risk.html"; //risk
							break;
						case 'url_9': //clean
							skip_url = "automobile-credit-master.html"; //master
							break;
						case 'url_10':
							skip_url = "automobile-credit-alldetail.html"; //alldetail
							break;
						case 'url_11': //clean
							skip_url = "automobile-credit-car-scht.html"; //car_scht
							break;
						case 'url_12': //clean
							skip_url = "automobile-credit-car-htsh.html"; //car_htsh
							break;
						case 'url_13':
							skip_url = "automobile-credit-fileMaster.html"; //fileMaster
							break;
						default:
							swal({
								title : "<h5 style='font-size:20px;'>提示</h5>",
								text : "错误!",
								confirmButtonColor: "#48c9b0",
								showConfirmButton : true,
								closeOnConfirm: true,
								html:true
							});
					}
					$($this).prop('href','#/'+skip_url+'/'+'world/'+ORDERID+'/'+FLAGSTATUS+'/'+ORDERIDVIEW+'/'+CARTYPE+'/'+WORKFLOW+'/ok/'+skip_url);
					//页面加载
//					$("#main-content").load(skip_url, function() {
//						PAGE.initPage();
//					});

				}
			})
		}

	}