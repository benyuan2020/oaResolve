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
// if(CARTYPE!="���ֳ�"){
//     $(".LEASE_CAR_EVALUTION_LV1").hide();
//     $(".LEASE_CAR_EVALUTION_LV2").hide();
//     $(".callback_LV2").remove();
// }
// //ͷ�������¼�
// // $(".wrapper-header").css({"display":"block"});
// function initHeaderButton() {
//     $(".wrapper-header").load("lease-audit-header.html", function() {
//         // ͷ�����û�Ȩ��
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
// // ����Money������ת��
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
//     // ʱ�����ĳ�ʼ��
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
//                 title : "<h5 style='font-size:20px;'>��ʾ</h5>",
//                 text : "���ݽ���ʧ������",
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
//         message: '����ֶλ�û��֤',
//         icon: {
//             valid: 'glyphicon',
//             invalid: 'glyphicon'
//         },
//         fields :{
//             // �ͻ�����
//             'clientName' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д�ͻ�����'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 30,
//                         message : '����ֵ̫����'
//                     }
//                 }
//             },
//             // ֤������
//             'idNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д֤������'
//                     },
//                     regexp : {
//                         regexp : /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
//                         message : '����ֵ��ʽ����'
//                     }
//                 }
//             },
//             'phoneNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д��ϵ�绰'
//                     },
//                     regexp : {
//                         regexp : /^(1[34578]\d{9})$/,
//                         message : '����ֵ��ʽ����'
//                     }
//                 }
//             },
//             // �������
//             'car.mileage' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д�������'
//                     },
//                     regexp : {
//                         regexp : /^[1-9]\d{0,6}(\.\d{1})?$/,
//                         message : '������0��ͷ,���ֻ������7λ��,����һλ,��ֻ����������'
//                     }
//                 }
//             },
//             // Ʒ���ͺ�
//             'car.model' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����дƷ���ͺ�'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 20,
//                         message : '����ֵ̫����'
//                     }
//                 }
//             },
//             // ʹ������
//             'car.useProperty' : {
//                 group: '.form-group',
//                 validators : {
//                     stringLength : {
//                         min : 1,
//                         max : 49,
//                         message : '����ֵ̫����'
//                     }
//                 }
//             },
//             // ��������
//             'car.standConfig' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д������׼����'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 80,
//                         message : '����ֵ̫����'
//                     }
//                 }
//             },
//             // �����¼
//             /* 	'car.otherLog' : {
//              group: '.form-group',
//              validators : {
//              notEmpty: {
//              message: '�����¼����Ϊ�գ�'
//              }
//              }
//              }, */
//             // ��������
//             'car.engineNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д��������'
//                     },
//                     regexp : {
//                         regexp : /^[0-9a-zA-Z]{1,30}$/,
//                         message : '��������ֻ����30λ�������ֺ���ĸ���'
//                     }
//                 }
//             },
//             // ����VIN��
//             'car.vinNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д����VIN��'
//                     },
//                     regexp : {
//                         regexp : /^[0-9a-zA-Z,]{17,}$/,
//                         message : '����VIN��Ϊ17λ��������������ĸ����ϣ������,�ֿ�'
//                     }
//                 }
//             },
//             // ��������
//             'car.licenseNum' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д���ƺ���'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 15,
//                         message : '����ֵ̫����'
//                     }
//                 }
//             },
//             // ����ԭɫ
//             'car.primaryColors' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д����ԭɫ'
//                     },
//                     regexp : {
//                         regexp : /^[\u4E00-\u9FFF]{1,4}$/,
//                         message : '����������'
//                     }
//                 }
//             },
//             // ��������
//             'factoryDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '����д��������'
//                     },
//                     regexp : {
//                         regexp : /^(\d{4})-(\d{2})$/ ,//
//                         message : '��ʽ��2016-05'
//                     }
//                 }
//             },
//             // ���εǼ���
//             'car.registDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '����д���εǼ���'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '���ڸ�ʽ����'
//                     }
//                 }
//             },
//             // ���յ�����
//             'car.commercialDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '����д���յ�����'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '���ڸ�ʽ����'
//                     }
//                 }
//             },
//             // ���յ�����
//             'car.strongDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '����д���յ�����'
//                     },
//                     date: {
//                         format: 'YYYY-MM-DD',
//                         message : '���ڸ�ʽ����'
//                     }
//                 }
//             },
//             // ��쵽����
//             'annualDay': {
//                 group: '.form-group',
//                 validators: {
//                     notEmpty: {
//                         message: '����д��쵽����'
//                     },
//                     regexp : {
//                         regexp : /^(\d{4})-(\d{2})$/ ,//
//                         message : '��ʽ��2016-05'
//                     }
//                 }
//             },
//             // ������ɫ
//             'car.colors' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д������ɫ'
//                     },
//                     regexp : {
//                         regexp : /^[\u4E00-\u9FFF]{1,4}$/,
//                         message : '����������'
//                     }
//                 }
//             },
//             //  ������̬����
//             'orderEvaluate.staticInfo' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д������̬����'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 130,
//                         message : '������130���ڵ��ַ���'
//                     }
//                 }
//             },
//             // ������̬����
//             'orderEvaluate.dynamicInfo' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д������̬����'
//                     },
//                     stringLength : {
//                         min : 1,
//                         max : 130,
//                         message : '������130���ڵ��ַ���'
//                     }
//                 }
//             },
//             // ��ע
//             'orderEvaluate.note' : {
//                 group: '.form-group',
//                 validators : {
//                     stringLength : {
//                         min : 0,
//                         max : 260,
//                         message : '������260���ڵ��ַ���'
//                     }
//                 }
//             },
//             // ����۸�
//             'orderEvaluate.netPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$|^0(\.\d{1,2})?$/ ,
//                         message : '������0��ͷ,���ֻ������8λ��,������λ'
//                     }
//                 }
//             },
//             // �г��۸�
//             'orderEvaluate.marketPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д�г�����'
//                     },
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$/ ,
//                         message : '������0��ͷ,���ֻ������8λ��,������λ'
//                     }
//                 }
//             },
//             // ���ռ۸�
//             'orderEvaluate.licensePrice' : {
//                 group: '.form-group',
//                 validators : {
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$|^0(\.\d{1,2})?$/ ,
//                         message : '������8λ��������,������λ'
//                     }
//                 }
//             },
//             // ����������
//             'orderEvaluate.evaluationPrice' : {
//                 group: '.form-group',
//                 validators : {
//                     notEmpty: {
//                         message: '����д����������'
//                     },
//                     regexp : {
//                         regexp : /^[1-9][0-9,]{0,9}(\.\d{1,2})?$/ ,
//                         message : '������0��ͷ,���ֻ������8λ��,������λ'
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
//         /* Ԥ��ͼ��ʼλ�� */
//         $('#formCommit').showForm({
//             form:"#yjcp_form",
//             box:"#yjcp_preview",
//             group:[{title:"����������Ϣ",
//                 fields : [
//                     {
//                         "chinese":"�ͻ�����",
//                         "name":"clientInfo.clientName"
//                     },{
//                         "chinese":"֤������",
//                         "name":"clientInfo.idNum"
//                     },{
//                         "chinese":"��ϵ�绰",
//                         "name":"clientInfo.phoneNum"
//                     },{
//                         "chinese":"Ʒ���ͺ�",
//                         "name":"car.model"
//                     },{
//                         "chinese":"�������",
//                         "name":"car.mileage"
//                     },{
//                         "chinese":"��������",
//                         "name":"factoryDay"
//                     },{
//                         "chinese":"ʹ������",
//                         "name":"car.useProperty"
//                     },{
//                         "chinese":"���εǼ���",
//                         "name":"car.registDay"
//                     },{
//                         "chinese":"���յ�����",
//                         "name":"car.commercialDay"
//                     },{
//                         "chinese":"���յ�����",
//                         "name":"car.strongDay"
//                     },{
//                         "chinese":"��쵽����",
//                         "name":"annualDay"
//                     },{
//                         "chinese":"�����¼",
//                         "name":"car.otherLog"
//                     },{
//                         "chinese":"��������",
//                         "name":"car.standConfig"
//                     },{
//                         "chinese":"�������Ի�����",
//                         "name":"car.selfConfig"
//                     },{
//                         "chinese":"ȼ������",
//                         "name":"car.fuel"
//                     },{
//                         "chinese":"��������",
//                         "name":"car.engineNum"
//                     },{
//                         "chinese":"����VIN��",
//                         "name":"car.vinNum"
//                     },{
//                         "chinese":"���ƺ���",
//                         "name":"car.licenseNum"
//                     },{
//                         "chinese":"����ԭɫ",
//                         "name":"car.primaryColors"
//                     },{
//                         "chinese":"������ɫ",
//                         "name":"car.colors"
//                     },{
//                         "chinese":"�Ƿ��װ",
//                         "name":"car.refit"
//                     },{
//                         "chinese":"��������",
//                         "name":"car.carType"
//                     },{
//                         "chinese":"�����ŷű�׼",
//                         "name":"car.discharge"
//                     }
//                 ]},
//                 {title:"���������������",
//                     fields : [
//                         {
//                             "chinese":"������̬����",
//                             "name":"orderEvaluate.staticInfo"
//                         },{
//                             "chinese":"������̬����",
//                             "name":"orderEvaluate.dynamicInfo"
//                         },{
//                             "chinese":"����۸�",
//                             "name":"orderEvaluate.netPrice"
//                         },{
//                             "chinese":"�г��۸�",
//                             "name":"orderEvaluate.marketPrice"
//                         },{
//                             "chinese":"����������",
//                             "name":"orderEvaluate.evaluationPrice"
//                         },{
//                             "chinese":"���ռ�ֵ",
//                             "name":"orderEvaluate.licensePrice"
//                         },{
//                             "chinese":"��ע",
//                             "name":"orderEvaluate.note"
//                         }
//                     ]
//                 }
//             ]
//         })
//         /* Ԥ��ͼ����λ�� */
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

//     //����ǰ��ҳ�,�����´���
//     var carType="${carInfo.carType!}";
//     if(carType){
//         if(carType=="2"){
//             changeCarType('2');
//         }
//     }

// }
