// /**
//  * Created by yh-xcl001 on 2017/2/15.
//  */

// OSSFLAG = false;
// OSS_MODEL = 'lease';
// $('[data-toggle="radio"]').radiocheck();
// $('#save').on('click',function(){
//     if(!$('[name = "clientInfo.clientName"]').val()){
//         $('#saveErrorModel').modal('show');
//     }else{
//         com.midai.page.util
//             .submitForm({
//                 form : "#yjcp_form",
//                 url : "/midai/lease/order/draftsCarEvalutionSave.json",
//                 showFlag : 'hidden',
//                 success : function(response) {
//                     $('#traftsName').text(response.userName);
//                     $('#traftsTime').text(response.updateDate);
//                     $('#saveSuccessModel').modal('show');
//                 }
//             });
//     }
// });
// var SCRIPT_FLAG = 0;
// UTIL.initToggle();
// initHeaderButton();
// if(CARTYPE!="二手车"){
//     $(".LEASE_CAR_EVALUTION_LV1").hide();
//     $(".LEASE_CAR_EVALUTION_LV2").hide();
//     $(".callback_LV2").remove();
// }
// //头部加载事件
// // $(".wrapper-header").css({"display":"block"});
// function initHeaderButton() {
//     $(".wrapper-header").load("lease-audit-header.html", function() {
//         // 头部的用户权限
//         secureityRight();
//         $(".LEASE_CAR_EVALUTION_LV1").css({
//             "background-color": "#357ebd",
//             "color": "#fff"
//         }).siblings().css({
//             "background-color": "#ecf0f1",
//             "color": "#357ebd"
//         });
//     })
// }
// var orderId = ORDERID;
// $(".orderId").val(ORDERID);
// $("#ossBlock").load("oss-file-manage.html",function(){
//     ossFile();
// })
// // 关于Money的内容转换
// $("input").filter(function(){
//     return $(this).data("money") ==="money";
// }).each(function(index,target){
//     $(target).on("input",function(){
//         // debugger;
//         var tempvalue = $(this).val().replace(/,/g,"");
//         $(this).val(tempvalue);
//         if(tempvalue != ""){
//             $(this).val(outputdollars(tempvalue));
//         }
//         else{
//             $(this).val("");
//         }
//     })
// })
// var index = 0;
// $(".wrapper-header").css({"display":"block"});
// if(WORKFLOW == "url_3"){
//     // 时间插件的初始化
//     $("#factoryDay").datetimepicker({
//         "startView":3,
//         "minView":3,
//         "language": 'zh-CN',
//         "format": 'yyyy-mm',
//         "autoclose":true,
//         "pickerPosition": "bottom-left",
//         "endDate":new Date()
//     });
//     $("#registDay").datetimepicker({
//         "minView": "month",
//         "language": 'zh-CN',
//         "format": 'yyyy-mm-dd',
//         "autoclose":true,
//         "autoclose": 1,
//         "pickerPosition": "bottom-left",
//         "endDate":new Date()
//     });
//     $('.my_date').datetimepicker({
//         "minView": "month",
//         "language": 'zh-CN',
//         "format": 'yyyy-mm-dd',
//         "autoclose":true,
//         "autoclose": 1,
//         "pickerPosition": "bottom-left"
//     });
//     $('.time_year').datetimepicker({
//         "startView":3,
//         "minView":3,
//         "language": 'zh-CN',
//         "format": 'yyyy-mm',
//         "autoclose":true,
//         "pickerPosition": "bottom-left"
//     });
//     var levNum = $("#level").val();
//     $.ajax({
//         url:"/midai/lease/carEvalution/loadCarEvalution.json",
//         type:"GET",
//         data:{
//             orderId:ORDERID,
//             level:1,
//             taskId : TASKID
//         },
//         success:function(res){
//             $("input[name='clientInfo.clientName']").val(res.clientInfo.clientName).prop("readonly",true);
//             $("input[name='clientInfo.idNum']").val(res.clientInfo.idNum).prop("readonly",true);
//             $("input[name='clientInfo.phoneNum']").val(res.clientInfo.phoneNum).prop("readonly",true);
//             $("input[name='taskId']").val(res.taskId);
//             if(res.car.vinNum){
//                 $("input[name='car.vinNum']").val(res.car.vinNum);
//             }
//             check();
//             if(!res.isOutVisited){
//                 $(".LEASE_FOREIGN_VISIT").hide();
//             }
//         }
//     });
//     OSSFLAG = true;
// }
// else{
//     OSSFLAG = false;
//     var levNum = $("#level").val();
//     $("#formCommit").css({"display":"none"});
//     $.ajax({
//         url:"/midai/lease/carEvalution/loadCarEvalution.json",
//         type:"GET",
//         data:{
//             orderId:ORDERID,
//             level:1,
//             taskId : 'empty'
//         },
//         success:function(res){
//             if(!res.isOutVisited){
//                 $('.LEASE_FOREIGN_VISIT').hide();
//             }
//             UTIL.json2form(res);
//             $(".my_date").each(function(){
//                 var str = $(this).find("input").val().substr(0,10);
//                 $(this).find("input").val(str)
//             });
//             $("input[name='factoryDay']").val(res.car.factoryDay.substr(0,7));
//             $("input[name='annualDay']").val(res.car.annualDay.substr(0,7));
//             $("#yjcp_form *").prop("disabled",true);
//             if(!res.isOutVisited){
//                 $(".LEASE_FOREIGN_VISIT").hide();
//             }
//         },
//         error:function(){
//             swal({
//                 title : "<h5 style='font-size:20px;'>提示</h5>",
//                 text : "数据接收失败啦！",
//                 confirmButtonColor: "#48c9b0",
//                 showConfirmButton : true,
//                 closeOnConfirm: true,
//                 html:true
//             });
//         }
//     })
// }

// function check(){
//     $('#yjcp_form').formValidation({
//         message: '这个字段还没验证',
//         icon: {
//             valid: 'glyphicon',
//             invalid: 'glyphicon'
//         },
//         fields :{
//             // 客户姓名
//             'clientName' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写客户姓名'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 30,
//                         message : '输入值太多了'
//                     }
//                 }
//             },
//             // 证件号码
//             'idNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写证件号码'
//                     },
//                     regexp : {
//                         regexp : /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
//                         message : '输入值格式错误'
//                     }
//                 }
//             },
//             'phoneNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写联系电话'
//                     },
//                     regexp : {
//                         regexp : /^(1[34578]\d{9})$/,
//                         message : '输入值格式错误'
//                     }
//                 }
//             },
//             // 表显里程
//             'car.mileage' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写表显里程'
//                     },
//                     regexp : {
//                         regexp : /^[1-9]\d{0,6}(\.\d{1})?$/,
//                         message : '不能以0开头,最大只能输入7位数,精度一位,且只能输入数字'
//                     }
//                 }
//             },
//             // 品牌型号
//             'car.model' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写品牌型号'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 20,
//                         message : '输入值太多了'
//                     }
//                 }
//             },
//             // 使用性质
//             'car.useProperty' : {
//                 group: '.form-group',
//                 validators : {
//                     stringLength : {
//                         min : 1,
//                         max : 49,
//                         message : '输入值太多了'
//                     }
//                 }
//             },
//             // 车辆标配
//             'car.standConfig' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆标准配置'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 80,
//                         message : '输入值太多了'
//                     }
//                 }
//             },
//             // 变更记录
//             /* 	'car.otherLog' : {
//              group: '.form-group',
//              validators : {
//              notEmpty: {
//              message: '变更记录不能为空！'
//              }
//              }
//              }, */
//             // 发动机号
//             'car.engineNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写发动机号'
//                     },
//                     regexp : {
//                         regexp : /^[0-9a-zA-Z]{1,30}$/,
//                         message : '发动机号只能由30位以内数字和字母组合'
//                     }
//                 }
//             },
//             // 车辆VIN码
//             'car.vinNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆VIN码'
//                     },
//                     regexp : {
//                         regexp : /^[0-9a-zA-Z,]{17,}$/,
//                         message : '车辆VIN码为17位及以上数字与字母的组合，多个用,分开'
//                     }
//                 }
//             },
//             // 车辆号码
//             'car.licenseNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车牌号码'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 15,
//                         message : '输入值太多了'
//                     }
//                 }
//             },
//             // 车辆原色
//             'car.primaryColors' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆原色'
//                     },
//                     regexp : {
//                         regexp : /^[\u4E00-\u9FFF]{1,4}$/,
//                         message : '请输入中文'
//                     }
//                 }
//             },
//             // 出厂日期
//             'factoryDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '请填写出厂日期'
//                     },
//                     regexp : {
//                         regexp : /^(\d{4})-(\d{2})$/ ,//
//                         message : '格式：2016-05'
//                     }
//                 }
//             },
//             // 初次登记日
//             'car.registDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '请填写初次登记日'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '日期格式错误'
//                     }
//                 }
//             },
//             // 商险到期日
//             'car.commercialDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '请填写商险到期日'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '日期格式错误'
//                     }
//                 }
//             },
//             // 交险到期日
//             'car.strongDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '请填写交险到期日'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '日期格式错误'
//                     }
//                 }
//             },
//             // 年检到期日
//             'annualDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '请填写年检到期日'
//                     },
//                     regexp : {
//                         regexp : /^(\d{4})-(\d{2})$/ ,//
//                         message : '格式：2016-05'
//                     }
//                 }
//             },
//             // 车辆颜色
//             'car.colors' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆颜色'
//                     },
//                     regexp : {
//                         regexp : /^[\u4E00-\u9FFF]{1,4}$/,
//                         message : '请输入中文'
//                     }
//                 }
//             },
//             //  车辆静态评估
//             'orderEvaluate.staticInfo' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆静态评估'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 130,
//                         message : '请输入130以内的字符！'
//                     }
//                 }
//             },
//             // 车辆动态评估
//             'orderEvaluate.dynamicInfo' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆动态评估'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 130,
//                         message : '请输入130以内的字符！'
//                     }
//                 }
//             },
//             // 备注
//             'orderEvaluate.note' : {
//                 group: '.form-group',
//                 validators : {
//                     stringLength : {
//                         min : 0,
//                         max : 260,
//                         message : '请输入260以内的字符！'
//                     }
//                 }
//             },
//             // 网查价格
//             'orderEvaluate.netPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$|^0(\.\d{1,2})?$/ ,
//                         message : '不能以0开头,最大只能输入8位数,精度两位'
//                     }
//                 }
//             },
//             // 市场价格
//             'orderEvaluate.marketPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写市场行情'
//                     },
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$/ ,
//                         message : '不能以0开头,最大只能输入8位数,精度两位'
//                     }
//                 }
//             },
//             // 牌照价格
//             'orderEvaluate.licensePrice' : {
//                 group: '.form-group',
//                 validators : {
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$|^0(\.\d{1,2})?$/ ,
//                         message : '请输入8位以内数字,精度两位'
//                     }
//                 }
//             },
//             // 车辆评估价
//             'orderEvaluate.evaluationPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '请填写车辆评估价'
//                     },
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$/ ,
//                         message : '不能以0开头,最大只能输入8位数,精度两位'
//                     }
//                 }
//             }

//         }
//     }).on('success.form.fv', function(e, data) {
//         e.preventDefault();
//         $("#yjcp_preview").empty();
//         $("#formCommit").prop("disabled",false);
//         if(WORKFLOW == "url_3"){
//             $("#preview_confirm_btn").off("click").click(function(){
//                 $("#show_view_modal").modal("hide");
//                 UTIL.submitForm({
//                     form:"#yjcp_form",
//                     url:"/midai/lease/carEvalution/save.json",
//                     success:function(){
//                         setTimeout(function() {
//                             window.location.hash = '/lease-audit-order-list.html';
//                         }, 1000);
//                     }
//                 })
//             })
//         }
//         /* 预览图开始位置 */
//         $('#formCommit').showForm({
//             form:"#yjcp_form",
//             box:"#yjcp_preview",
//             group:[{title:"车辆基本信息",
//                 fields : [
//                     {
//                         "chinese":"客户姓名",
//                         "name":"clientInfo.clientName"
//                     },{
//                         "chinese":"证件号码",
//                         "name":"clientInfo.idNum"
//                     },{
//                         "chinese":"联系电话",
//                         "name":"clientInfo.phoneNum"
//                     },{
//                         "chinese":"品牌型号",
//                         "name":"car.model"
//                     },{
//                         "chinese":"表显里程",
//                         "name":"car.mileage"
//                     },{
//                         "chinese":"出厂日期",
//                         "name":"factoryDay"
//                     },{
//                         "chinese":"使用性质",
//                         "name":"car.useProperty"
//                     },{
//                         "chinese":"初次登记日",
//                         "name":"car.registDay"
//                     },{
//                         "chinese":"商险到期日",
//                         "name":"car.commercialDay"
//                     },{
//                         "chinese":"交险到期日",
//                         "name":"car.strongDay"
//                     },{
//                         "chinese":"年检到期日",
//                         "name":"annualDay"
//                     },{
//                         "chinese":"变更记录",
//                         "name":"car.otherLog"
//                     },{
//                         "chinese":"车辆标配",
//                         "name":"car.standConfig"
//                     },{
//                         "chinese":"车辆个性化配置",
//                         "name":"car.selfConfig"
//                     },{
//                         "chinese":"燃油类型",
//                         "name":"car.fuel"
//                     },{
//                         "chinese":"发动机号",
//                         "name":"car.engineNum"
//                     },{
//                         "chinese":"车辆VIN码",
//                         "name":"car.vinNum"
//                     },{
//                         "chinese":"车牌号码",
//                         "name":"car.licenseNum"
//                     },{
//                         "chinese":"车辆原色",
//                         "name":"car.primaryColors"
//                     },{
//                         "chinese":"车辆颜色",
//                         "name":"car.colors"
//                     },{
//                         "chinese":"是否改装",
//                         "name":"car.refit"
//                     },{
//                         "chinese":"车辆类型",
//                         "name":"car.carType"
//                     },{
//                         "chinese":"车辆排放标准",
//                         "name":"car.discharge"
//                     }
//                 ]},
//                 {title:"车辆基本评估意见",
//                     fields : [
//                         {
//                             "chinese":"车辆静态评估",
//                             "name":"orderEvaluate.staticInfo"
//                         },{
//                             "chinese":"车辆动态评估",
//                             "name":"orderEvaluate.dynamicInfo"
//                         },{
//                             "chinese":"网查价格",
//                             "name":"orderEvaluate.netPrice"
//                         },{
//                             "chinese":"市场价格",
//                             "name":"orderEvaluate.marketPrice"
//                         },{
//                             "chinese":"车辆评估价",
//                             "name":"orderEvaluate.evaluationPrice"
//                         },{
//                             "chinese":"牌照价值",
//                             "name":"orderEvaluate.licensePrice"
//                         },{
//                             "chinese":"备注",
//                             "name":"orderEvaluate.note"
//                         }
//                     ]
//                 }
//             ]
//         })
//         /* 预览图结束位置 */
//         $("#show_view_modal").modal({backdrop: 'static', keyboard: false});
//         $(".viewPic").click(function(){
//             $("#formCommit").prop("disabled",false).removeClass("disabled")
//         })

//     })
//     $('#registDay')
//         .on('changeDate', function(e) {
//             // Validate the date when user change it
//             // $('#xjjj_form').data('formValidation').revalidateField('clientCareer.entryTime');s
//             // You also can call it as following:
//             $('#yjcp_form').formValidation('revalidateField', 'car.registDay');
//         });
//     $('#commercialDay')
//         .on('changeDate', function(e) {
//             // Validate the date when user change it
//             $('#yjcp_form').formValidation('revalidateField', 'car.commercialDay');
//         });
//     $('#strongDay')
//         .on('changeDate', function(e) {
//             // Validate the date when user change it
//             $('#yjcp_form').formValidation('revalidateField', 'car.strongDay');
//         });
//     $('#annualDay')
//         .on('changeDate', function(e) {
//             // Validate the date when user change it
//             $('#yjcp_form').formValidation('revalidateField', 'annualDay');
//         });
//     $('#factoryDay')
//         .on('changeDate', function(e) {
//             // Validate the date when user change it
//             $('#yjcp_form').formValidation('revalidateField', 'factoryDay');
//         });

//     function changeCarType(value){
//         var orderId="${orderID!}";
//         if(value=='2'){
//             $('#carTypeHeTong').removeClass("none");
//             $('#carTypeHeTong').addClass("block");
//             //$("#${orderID!}_cheliangzhengming_anjiehetong")[0].attributes.necessary.value="yes";
//         }else{
//             $('#carTypeHeTong').removeClass("block");
//             $('#carTypeHeTong').addClass("none");
//             $("#"+orderId+"_cheliangzhengming_anjiehetong")[0].attributes.necessary.value="no";
//         }
//     }

//     //如果是按揭车,做以下处理
//     var carType="${carInfo.carType!}";
//     if(carType){
//         if(carType=="2"){
//             changeCarType('2');
//         }
//     }

// }
