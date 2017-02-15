	//草稿list请求
	$.ajax({
		url : "/midai/lease/order/loadDraftsList.json",
		method : "post",
		success : function(res) {
			var tmpl = $('#lease-product-list-optionTmpl').html();
			for(var i = 0 ; i < res.length ; i++){
				var nameLen = res[i].userName.length;
				var userName =res[i].userName;
				for(var j = 0 ;j < (5-nameLen)*4;j++){
					userName += '&nbsp;';
				}
				var option = tmpl.replace(/\{\{orderId\}\}/g,res[i].orderId).replace(/\{\{updateDate\}\}/g,res[i].updateDate).replace(/\{\{userName\}\}/g,userName).replace(/\{\{typeId\}\}/g,res[i].typeId);
				$('#lease-product-list-traftsList').append(option);
			}
		}
	});
	//进入草稿界面
	$('#lease-product-list-traftsList').on('change',function(){
		var orderId = $(this).val();
		var typeId = $(this).find('option:selected').data('type');
		if(typeId == 3){
			window.location.hash = '/lease-new-incoming-trafts.html/world/'+orderId+'/url_1';
		}else if(typeId == 4){
			window.location.hash = '/lease-first-grade-car-comman-trafts.html/world/'+orderId+'/url_3';
		}
	});
	$(document).on('click','#sureFind',function(){
		$('#leaseProductListTable').bootstrapTable('selectPage',1)
	});
	$(document).on('click','#search-reset',function(){
		$('#lease-product-list-toolbar input').val('');
		$('#leaseProductListTable').bootstrapTable('selectPage',1)
	});
	//去除input内容复制有空格问题
	$("input").on("blur",function(){
		var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
		$(this).val(result);
	});


	if(localStorage.getItem('lease-list-limit')){
		var pageSize= Number(localStorage.getItem('lease-list-limit'));
		var pageBeginNum = Number(sessionStorage.getItem('lease-list-offset')) || 0;
		$('#leaseProductListTable').attr('data-page-size',pageSize);
		$('#leaseProductListTable').attr('data-page-number',parseInt(pageBeginNum/pageSize)+1);
	}
	var isFirstEnter = true;
	function searchKey(args) {
		if(isFirstEnter){
			if(localStorage.getItem('lease-list-limit')){
				args.limit = Number(localStorage.getItem('lease-list-limit'));
				args.offset = Number(sessionStorage.getItem('lease-list-offset'));
				args.orderId = sessionStorage.getItem('lease-list-orderId');
				args.clientName = sessionStorage.getItem('lease-list-clientName');
				args.idNum = sessionStorage.getItem('lease-list-idNum');
				args.phone = sessionStorage.getItem('lease-list-phone');
				$('#lease-audit-list [name="orderId"]').val(args.orderId);
				$('#lease-audit-list [name="clientName"]').val(args.clientName);
				$('#lease-audit-list [name="idNum"]').val(args.idNum);
				$('#lease-audit-list [name="phone"]').val(args.phone);

			}else{
				args.limit = 12;
				args.offset = 0;
				args.orderId ='';
				args.clientName = '';
				args.idNum = '';
				args.phone = '';
			}
			isFirstEnter = false;
		}else{
			localStorage.setItem('lease-list-limit',args.limit);
			sessionStorage.setItem('lease-list-offset',args.offset);
			sessionStorage.setItem('lease-list-orderId',$('#lease-audit-list [name = "orderId"]').val());
			sessionStorage.setItem('lease-list-clientName',$('#lease-audit-list [name = "clientName"]').val());
			sessionStorage.setItem('lease-list-idNum',$('#lease-audit-list [name = "idNum"]').val());
			sessionStorage.setItem('lease-list-phone',$('#lease-audit-list [name = "phone"]').val());
			args.limit = Number(localStorage.getItem('lease-list-limit'));
			args.offset = Number(sessionStorage.getItem('lease-list-offset'));
			args.orderId = $('#lease-audit-list [name = "orderId"]').val();
			args.clientName = $('#lease-audit-list [name = "clientName"]').val();
			args.idNum = $('#lease-audit-list [name = "idNum"]').val();
			args.phone = $('#lease-audit-list [name = "phone"]').val();
		}
		return args;
	}

	OSS_MODEL = "lease";
	function leaseNoteFormatter(value, row, index){
		var str = "<p class='leaseNote' style='padding:0px; margin:0px; max-width:300px;font-size:12px; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='"+value+"' >"+value+"</p>";
		return str;
	}
	function actionFormatter(value, row, index) {
		var str = "查看详情";
		var arr= "";
		if(row.skipPages !== ""){
			arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/lease-check-new-incoming-parts.html/world/'+row.orderId+'/'+row.carType+'/'+row.skipPages+'/'+row.isskip+'/url_19">' + str + '</a>';
		}
		else{
			arr = '<a class="btn btn-default" default style="color:#fff;" href="javascript:void(0);" title="查看">' + str + '</a>';
		}
		return arr;
	}
	function FormatDateTime(value, row, index) {
		var value = value.substr(0,19);
		return value;
	}
	
	$("#lease-product-list-xjjj-btn").click(function() {
		WORKFLOW = "url_1";
		$('#lease-product-list-xjjj-btn').attr('href',"#/lease-new-incoming-parts.html/world/onlyOne/onlyOne/"+WORKFLOW+"/lease-new-incoming-parts.html/empty");
	});