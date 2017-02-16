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


// 全局配置
$.ajaxSetup({
  type:"POST",
  contentType:"application/json",
  dataType:"json",
  error: function(xhr, textStatus, errorThrown) {
    hideLoading();
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


