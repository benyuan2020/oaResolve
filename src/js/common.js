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
   secureityRight : function(rights){
        // rights是当前用户的角色
      var $security = $this.find('.security');
      $security.each(function(){
        var sid=$(this).data("security").split(",");
        var flat = false;
        for(var i = 0; i < rights.length; i++){
            for(var j = 0; j < sid.length; j++){
              if(sid[j] == rights[i]){
                $(this).css({"display":"block"});
                 var method = $(this).data("securityMethod");
                   if(method){
                     method($(this));
                  }
                return;
              }
              if(i == rights.length-1 && j == sid.length - 1){
                // 如果没有权限，就移除该元素
                 $(this).css({"display":"none"}).remove();
              }
            }
          }
      });
   },
    // 表单提交序列化
    form2json:function(params){
        var selector=params.form;
        var values= $(selector).serializeArray();
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
                if($("input[name='"+n+"']").data("money") && $("input[name='"+n+"']").data("money") == "money"){
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
                    if($("input[name='"+n+"']").data("money") && $("input[name='"+n+"']").data("money") == "money"){
                        values[index].value = values[index].value.replace(/,/g,"");
                    }
                    obj[n].push(values[index].value);
                }else{
                    if($("input[name='"+n+"']").data("money") && $("input[name='"+n+"']").data("money") == "money"){
                        values[index].value = values[index].value.replace(/,/g,"");
                    }
                    obj[n]=values[index].value;
                }
            }
        }
        return obj;
    }
});