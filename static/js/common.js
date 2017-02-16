/**
 * 表单回显
 */
jQuery.fn.extend({
   json2form: function(obj){
      var $that = $(this);
     var nodeParent = null;
      var value = undefined;
      var $el = null;
      var nodeName = "";
         for(var i in obj){
            value= obj[i] ;
              if(value === undefined || value===null){
                  continue;
              }
            if(typeof value == 'object'){
                nodeParent=obj.nodeParent;
                value.nodeParent=nodeParent?nodeParent+"."+i : i;
                if(value instanceof Array){
                  for(var mm=0;mm<value.length;mm++){
                    var ms=value[mm];
                    if(typeof ms == 'object'){
                      nodeParent=ms.nodeParent;
                      ms.nodeParent=ms.nodeParent?ms.nodeParent+"."+i+"["+mm+"]":i+"["+mm+"]";
                      $that.json2form(ms);
                    }
                  }

                    $el=$that.find("[name='"+i+"']");
                    if($el.is(":checkbox")){
                        $el.each(function(){
                            if($(this).val() == value){
                                $(this).prop("checked",true);
                            }
                        })
                    }
                    else if($el.is(":radio")){
                        $el.each(function(){
                            if($(this).val() == value){
                              $(this).prop("checked",true);
                            }
                        })
                    }
                }else{  //递归    
                    // arguments.callee(value);
                    $that.json2form(value);
                }
            }
            else{
                nodeName=obj.nodeParent?obj.nodeParent+"."+i : i ;

                $el=$that.find("[name='"+nodeName+"']");
                if($el.length > 0){
                // console.log("匹配数据名称："+nodeName+"值："+value);
                    if($el.is(":text")||$el.attr("type")=="hidden"){
                      if($el.data("money") && $el.data("money") == "money"){
                        value = outputdollars(value);
                      }
                        $el.val(value);
                          
                   }else if($el.is(":radio")){
                       $el.each(function(){
                          if($(this).val()==value){
                              $(this).prop("checked",true);
                          }
                       })
                   }
                   else if($el.is("select")){
                      $el.find("option").filter(function(){return $(this).val() == obj[i];}).prop("selected",true);
                      // $el.val(value);
                   }else if($el.is("textarea")){
                      $el.val(value)
                   }
                }
            }
        }  
   },
   // 表单提交序列化
    form2json:function(){
     var $that = $(this);
     var values= that.serializeArray();
     var obj={};
     for (var index = 0; index < values.length; ++index)    
           {    
              var temp=obj; //上一级     
              var n=values[index].name;  
              if(n.indexOf(".")>-1){  
                  var arr=n.split(".");  
                  for(var i=0;i<arr.length-1;i++){     
                      if(arr[i].indexOf("[")>-1){  
                          var a=arr[i].substring(0,arr[i].indexOf("["));  
                          temp[a]=temp[a]||[];  
                          var y=arr[i].substring(arr[i].indexOf("[")+1,arr[i].indexOf("]"));  
                          temp[a][y]=temp[a][y]||{};  
                          temp=temp[a][y];  
                      }else{  
                          temp[arr[i]]=temp[arr[i]] || {};     
                          temp=temp[arr[i]];  
                      }  
                  }
                  // console.log(n);
                  if($that.find("input[name='"+n+"']").data("money") && $that.find("input[name='"+n+"']").data("money") == "money"){
                    values[index].value = values[index].value.replace(/,/g,"");
                  }
                  temp[arr[arr.length-1]]=values[index].value;       
              }else{  
                  if(obj[n] !==undefined && obj[n]!=null){  
                     if( !$.isArray(obj[n])){  
                         var v=obj[n];  
                         obj[n]=[];  
                         obj[n].push(v);  
                     }
                      if($that.find("input[name='"+n+"']").data("money") && $that.find("input[name='"+n+"']").data("money") == "money"){
                      values[index].value = values[index].value.replace(/,/g,"");
                    }  
                     obj[n].push(values[index].value);  
                  }else{  
                     if($that.find("input[name='"+n+"']").data("money") && $that.find("input[name='"+n+"']").data("money") == "money"){
                      values[index].value = values[index].value.replace(/,/g,"");
                    }  
                      obj[n]=values[index].value;  
                  }  
              }     
           }    
     return obj;
   },
   submitForm:function(param){
      var $that = $(this);
      var values= $that.form2json();
      $.ajax({
        url:param.url,
        data:JSON.stringify(values),
        success:function(res){
            if(param.success && typeof param.success == "function"){
              param.success(res);
            }
        } 
      })
     }
});

// UTIL.<functionName>
var UTIL = {
  outputdollars : function(number) {
    // 钱数格式化
      var signFlag = "";
        var numberStr=""+number;
        if(numberStr.substr(0,1) == "-"){
          signFlag = "-";
          numberStr = numberStr.substr(1);
        }
        var numberLastStr = "";
        if(numberStr.match(/\./)){
            numberStr = numberStr.split(".");
            numberLastStr = "."+numberStr[1];
            numberStr = numberStr[0];
        }
        else{
           numberStr = numberStr;
        }
        if (numberStr.length <= 3){
          numberStr = (numberStr == '' ? '0' : numberStr + numberLastStr);
            return (signFlag + numberStr);
      }
        else {
          var mod = numberStr.length % 3;
          var output = (mod == 0 ? '' : (numberStr.substring(0, mod)));
          for (i = 0; i < Math.floor(numberStr.length / 3); i++) {
            if ((mod == 0) && (i == 0))
              output += numberStr.substring(mod + 3 * i, mod + 3 * i + 3);
            else
              output += ',' + numberStr.substring(mod + 3 * i, mod + 3 * i + 3);
          }
          return (signFlag + output+""+numberLastStr);
        }
    },
    formatMoney : function(s, n)  
      {  
        // 格式化钱的

           var s=""+s;
           if(s === "" || s === undefined || s === null){
            return "";
           }
          var signFlag = "";
          if(s.substr(0,1) == "-"){
            signFlag = "-";
                s = s.substr(1);
          }
         n = n > 0 && n <= 20 ? n : 2;  
         s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
         var l = s.split(".")[0].split("").reverse(),  
         r = s.split(".")[1];  
         t = "";  
         for(i = 0; i < l.length; i ++ )  
         {  
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
         }  
         return signFlag+t.split("").reverse().join("") + "." + r;  
      },
    clickDisappearSwal : function(text, callback){
      // 只有确定，点击消失
      swal({
                title : "<h5 style='font-size:20px;font-family: 微软雅黑;font-weight: 400;'>提示</h5>",
                text : '<p style="font-family:微软雅黑 ">'+text+'</p>' ,
                confirmButtonText:"确定",
                showConfirmButton : true
            },function(){
              if(callback){
                callback();
              }
              else{
                return;
              }
              
            })
    },
    autoDisappearSwal : function(text, callback){
      // 没有确定按钮
      swal({
                title: '<h5 style="font-size:20px;font-family: 微软雅黑;font-weight: 400">提示</h5>',
                text: '<p style="font-family:微软雅黑 ">'+text+'</p>' ,
                showConfirmButton : false,
                timer:1000,
                html:true
            });
            if(callback){
              setTimeout(function(){
                callback();
              }, 1000)
            }
    },
    normalSwal : function(text, callback){
      // 有确定和取消按钮的点击消失的方法
      swal({
            title: '<h5 style="font-size:20px;font-family: 微软雅黑;font-weight: 400">提示</h5>',
            text: '<p style="font-family:微软雅黑 ">'+text+'</p>' ,
            showCancelButton: true,
            confirmButtonText:"确定",
            cancelButtonText: "取消",
            html:true
        },function(){
          if(callback){
            callback();
          }
          else{
            return;
          }
          
        })
    }
}



// 全局配置
$.ajaxSetup({
  type:"POST",
  contentType:"application/json",
  dataType:"json",
  error: function(xhr, textStatus, errorThrown) {
    // hideLoading();
    if(xhr.responseText.length > 200){
      msg = "系统出错，请联系管理员！";
      UTIL.clickDisappearSwal(msg);
    }
    else{
      var msg=jQuery.parseJSON(xhr.responseText).errorMsg || "系统出错，请联系管理员！";
      if(msg === 'session-out'){
        window.location.href = "/login.html";
      }else if(xhr.status===408){
              var ossText = jQuery.parseJSON(msg);
              UTIL.clickDisappearSwal("登陆超时 !", function(){
                window.location.href = "/login.html";
              });
           }else if(xhr.status===666){
              msg = "任务不存在";
              UTIL.clickDisappearSwal(msg);
           }
           else if(/^[\u4e00-\u9fa5]*$/.test(xhr.responseText.substr(0,2))){
              msg = xhr.responseText;
              UTIL.clickDisappearSwal(msg);
           }
           else{
              UTIL.clickDisappearSwal(msg);
           }
    }
  }
});


