// 融资租赁新建进件页面JS
OSSFLAG = false;
		OSS_MODEL = 'lease';
		SCRIPT_FLAG = 0;
		UTIL.initToggle();

							var orderId = ORDERID;
							var carType = CARTYPE;
							$(".orderId").val(orderId);
							$("#ossBlock").load("oss-file-manage.html",function(){
								ossFile();
							})
							// 退回进件的时候的模态框
							secureityRight();
							initHeaderButton();
							//头部加载事件
							// $(".wrapper-header").css({"display":"block"});
							function initHeaderButton() {
								$(".wrapper-header").load("lease-check-audit-header.html", function() {
									if(CARTYPE != '二手车'){
										$('.LEASE_CAR_EVALUTION_LV1,.LEASE_CAR_EVALUTION_LV2').hide();
									}
									$(".LEASE_ZHUANYUAN").css({
										"background-color": "#357ebd",
										"color": "#fff"
									}).siblings().css({
										"background-color": "#ecf0f1",
										"color": "#357ebd"
									});
								})
							}
								$("#formCommit").hide();
								$.ajax({
									type:"GET",
									url: '/midai/lease/order/loadOrderInfo.json',
									data: {"orderId":ORDERID,"taskId" :"empty"},
									success: function(res) {
										if(!res.isOutVisited){
											$(".LEASE_FOREIGN_VISIT").hide();
										}
										$("#paramsYybId").val(res.orderUser.organId);
										$("#paramsYybName").val(res.orderUser.organName);
										$("#directorUserNameId").val(res.orderUser.directorUser)
										$("#directorUserName").val(res.orderUser.directorUserName);
										$("#ywzgNameId").val(res.orderUser.managerUser)
										$("#ywzgName").val(res.orderUser.managerUserName);
										$("#note").val(res.orderUser.note);
										UTIL.json2form(res);
										$(".my_date").each(function(){
											var str = $(this).find("input").val().substr(0,10);
											$(this).find("input").val(str);
										})
										$(".time_year").each(function(){
											var str = $(this).find("input").val().substr(0,7);
											$(this).find("input").val(str);
										})
			                             // 居住状况
										 if(res.clientHome.stateTime != 0){
										 	$("select[name='clientHome.stateTime']").change();
										 }
										 if(res.clientHome.status != 0){
										 	$("select[name='clientHome.status']").change();
										 }
										$("select[name='clientCareer.type']").change();
										if(res.clientMarriage.status != 0){
											$("select[name='clientMarriage.status']").change();
											if(res.clientMarriage.childrenFlag != 1){
												$("input[name='clientMarriage.childrenFlag']").change();
											}
										}
										if(res.orderLoan.carMode == 5){
											$("select[name='orderLoan.carMode']").change();
										}
										$("select[name='clientCareer.payType']").change();
										$("select[name='clientCareer.otherPayType']").change();
										if(res.orderLoan.useProperty == 3){
											$("select[name='orderLoan.useProperty']").change();
										}

										changeProvince($("#register-province"), function() {
											$("#register-city").val(res.clientAddress.registerCity);
										});
										changeProvince($("#live-province"), function() {
											$("#live-city").val(res.clientAddress.liveCity);
										});
										if (res.orderLoan.leaseType == 0){
											$("input[name='orderLoan.leaseType']").eq(0).change();
											if (res.clientCareer.hireType == 1) {
												$("input[name='clientCareer.hireType']").eq(0).change();
												changeProvince($("#unit-province"), function() {
													$("#unit-city").val(res.clientCareer.city);
												});
											} else if (res.clientCareer.hireType == 0) {
												$("input[name='clientCareer.hireType']").eq(1).change();
												changeProvince($("#qiye-province"), function() {
													$("#qiye-city").val(res.clientCareer.city);
												});
											}else if(res.clientCareer.hireType == 2){
												$("input[name='clientCareer.hireType']").eq(2).change();
											}
										}else{
											changeProvince($("#qiye-province"), function() {
												$("#qiye-city").val(res.clientCareer.city);
											});
										}
										if(res.orderLoan.carType==1){
											$("input[name='orderLoan.carType']").eq(1).change();
										}else if(res.orderLoan.carType==2){
											$("input[name='orderLoan.carType']").eq(2).change();
										}
										$("#xjjj_form *").prop("disabled", true);
										$("#xjjj_form select").prop("disabled", true);
										$('[data-toggle="radio"]').prop("disabled", true);
										$("#confirmSub").prop("disabled", true).css({
											"display": "none"
										});
									}
								});
							//企业用户和个人用户
							$('[data-toggle="radio"]').radiocheck();
							$("input[name='orderLoan.leaseType']").change(function(event){
								if($(this).val()=='0'){
									//受薪--个人用户
									$("input[name='clientCareer.hireType']").eq(0).change();
									$(".business_hide").show();
									$(".business_hide").find("input").prop("disabled",false);
									$(".business_show").hide();
									$(".business_show").find("input").prop("disabled",true);
								}else{
									//自雇-企业用户
									$("input[name='clientCareer.hireType']").eq(1).change();
									$(".business_hide").hide();
									$(".business_hide").find("input").prop("disabled",true);
									$(".business_show").show();
									$(".business_show").find("input").prop("disabled",false);
								}
							})
							$("input[name='clientCareer.hireType']").eq(1).change();
							$(".business_hide").hide();
							$(".business_hide").find("input").prop("disabled",true);

							//页面加载时省份初始化

							$.ajax({
									url: "/midai/system/address/loadProvince.json",
									success: function(res) {
										var $selectList = $('select').filter(function() {
											return ($(this).attr('id') || '').toLowerCase().indexOf('province') >= 0;
										});
										$selectList.empty();
										$selectList.each(function(index) {
											for (var i = 0; i < res.provs.length; i++) {
												var str = $("#optionTmpl").html();
												$(this).append(str.replace(/\{\{code\}\}/g, res.provs[i].code).replace(/\{\{id\}\}/g, res.provs[i].id).replace(/\{\{name\}\}/g, res.provs[i].name));
											}
											changeProvince($(this));
											$(this).change(function() {
												var $that = $(this);
												changeProvince($that);
											})
										})
									}
								})
								// 省市区的数据联动
							function changeProvince($that, success) {
								var nameStr = $that.attr("id").toLowerCase().replace("province", "city");
								var provinceCode;
								if($('option:selected', $that).data('code')){
									provinceCode = $('option:selected', $that).data('code').toString();
								}
								var provsValue = $that.find("option:selected").data("value");
								var provincialCityFlag = "";
								if (provsValue&&provsValue.substr(provsValue.length - 1, 1) == "市") {
									provincialCityFlag = "area";
									if(provinceCode){
										provinceCode = provinceCode.substr(0, provinceCode.length - 3) + "100";
									}
								} else {
									provincialCityFlag = "city";
								}
								// console.log(nameStr);
								// 找到和身份对应的城市
								var $selectCity = $('select').filter(function() {
									return ($(this).attr('id') || '').toLowerCase() == nameStr;
								});
								$.ajax({
									url: "/midai/system/address/getCityByProvinceCode/" + provinceCode + "/" + provincialCityFlag + ".json",
									success: function(res) {
										$selectCity.empty();
										$selectCity.val('');
										for (var i = 0; i < res.result.length; i++) {
											var cityStr = $('#cityTmpl').html();
											var cityName = cityStr.replace(/\{\{code\}\}/g, res.result[i].code).replace(/\{\{name\}\}/g, res.result[i].name).replace(/\{\{father\}\}/g, res.result[i].father);
											$selectCity.append(cityName);
										}

										if (success && typeof success === 'function') {
											success();
										}

									}
								})
							}
