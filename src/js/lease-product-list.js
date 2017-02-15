var $table  = $('#leaseProductListTable');
var isFirstEnter = 0;

$table.bootstrapTable({
    url: '../static/json/lease-product-list-data.json',/*/midai/system/message/list.json*/
    queryParams: function(args) {
		if(isFirstEnter){
			if(localStorage.getItem('lease-list-limit')){
				args.limit = Number(localStorage.getItem('lease-list-limit'));
				args.offset = Number(sessionStorage.getItem('lease-list-offset'));
				args.orderId = sessionStorage.getItem('lease-list-orderId');
				args.clientName = sessionStorage.getItem('lease-list-clientName');
				args.idNum = sessionStorage.getItem('lease-list-idNum');
				args.phone = sessionStorage.getItem('lease-list-phone');
				$('[name="orderId"]').val(args.orderId);
				$('[name="clientName"]').val(args.clientName);
				$('[name="idNum"]').val(args.idNum);
				$('[name="phone"]').val(args.phone);

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
			sessionStorage.setItem('lease-list-orderId',$('[name = "orderId"]').val());
			sessionStorage.setItem('lease-list-clientName',$('[name = "clientName"]').val());
			sessionStorage.setItem('lease-list-idNum',$('[name = "idNum"]').val());
			sessionStorage.setItem('lease-list-phone',$('[name = "phone"]').val());
			args.limit = Number(localStorage.getItem('lease-list-limit'));
			args.offset = Number(sessionStorage.getItem('lease-list-offset'));
			args.orderId = $('[name = "orderId"]').val();
			args.clientName = $('[name = "clientName"]').val();
			args.idNum = $('[name = "idNum"]').val();
			args.phone = $('[name = "phone"]').val();
		}
		return args;
	},
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
        field: 'currSchedule',
        title: '进度',
        align:'left'
    }, {
        field: 'idNum',
        title: '身份证',
        align:'left'
    }, {
        field: 'phoneNum',
        title: '手机',
        align:'left',
    },{
        field: 'organName',
        title: '门店',
        align:'left',
    },  {
        field: 'note',
        title: '备注',
        align:'left',
        formatter: function(value, row, index){
			var str = "<p class='leaseNote' style='padding:0px; margin:0px; max-width:300px;font-size:12px; word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;' title='"+value+"' >"+value+"</p>";
			return str;
		}
    },  {
        field: '',
        title: '操作',
        align:'left',
        formatter: function(value, row, index) {
			var str = "查看详情";
			var arr= "";
			if(row.skipPages !== ""){
				arr = '<a class="btn btn-inverse" style="color:#fff;"  title="查看" href="#/lease-check-new-incoming-parts.html/world/'+row.orderId+'/'+row.carType+'/'+row.skipPages+'/'+row.isskip+'/url_19">' + str + '</a>';
			}
			else{
				arr = '<a class="btn btn-default" default style="color:#fff;" href="javascript:void(0);" title="查看">' + str + '</a>';
			}
			return arr;
		},
		events: function(){

		}
    }]
});

//草稿list请求
	$.ajax({
		url : "/midai/lease/order/loadDraftsList.json",
		method : "post",
		success : function(res) {
			var tmpl = $('#optionTmpl').html();
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
			// 打开新页面
			// window.location.hash = '/lease-new-incoming-trafts.html/world/'+orderId+'/url_1';
		}else if(typeId == 4){
			//用路由插件打开新页面

			// window.location.hash = '/lease-first-grade-car-comman-trafts.html/world/'+orderId+'/url_3';
		}
	});

	$(document).on('click','#lease-product-list-sureFind',function(){
		$table.bootstrapTable('selectPage',1)
	});
	$(document).on('click','#lease-product-list-search-reset',function(){
		$('#lease-product-list-toolbar input').val('');
		$table.bootstrapTable('selectPage',1)
	});
	//去除input内容复制有空格问题
	$("#lease-product-list input").on("blur",function(){
		var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
		$(this).val(result);
	});
	// 新建进件按钮
	$("#lease-product-list-xjjj-btn").click(function() {
		WORKFLOW = "url_1";
		// 用路由打开新页面



		// $('#lease_xjjj_btn').attr('href',"#/lease-new-incoming-parts.html/world/onlyOne/onlyOne/"+WORKFLOW+"/lease-new-incoming-parts.html/empty");
	});

