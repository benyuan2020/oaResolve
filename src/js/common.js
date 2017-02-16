/**
 * ������
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
                }else{  //�ݹ�    
                    // arguments.callee(value);
                    $that.json2form(value);
                }
            }
            else{
                nodeName=obj.nodeParent?obj.nodeParent+"."+i : i ;

                $el=$that.find("[name='"+nodeName+"']");
                if($el.length > 0){
                // console.log("ƥ���������ƣ�"+nodeName+"ֵ��"+value);
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
        // rights�ǵ�ǰ�û��Ľ�ɫ
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
                // ���û��Ȩ�ޣ����Ƴ���Ԫ��
                 $(this).css({"display":"none"}).remove();
              }
            }
          }
      });
   }
});