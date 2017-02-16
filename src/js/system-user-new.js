

$('#system-user-new-table').bootstrapTable({
    url: '../static/json/user.json',/*/midai/system/user/list.json*/
    queryParams:searchKey,
    columns: [ {
        field: 'employeeId',
        title: '登录账号',
        align:'left'
    }, {
        field: 'employeeName',
        title: '名称',
        align:'left'
    }, {
        field: 'email',
        title: '邮箱',
        align:'left'
    }, {
        field: 'phoneNumber',
        title: '手机号',
        align:'left'
    },{
        field: 'tel',
        title: '分机',
        align:'left'
    }, {
        field: 'organizationName',
        title: '所属组织机构',
        align:'left',
    },  {
        field: 'createTime',
        title: '创建时间',
        align:'left',
        sortable:true
    },  {
        field: 'sendMail',
        title: '是否邮件通知',
        align:'left',
        formatter:sendMailFormatter
    }, {
        field: 'activeInd',
        title: '状态',
        align:'left',
        formatter:stateActionFormatter
    },{
        field: 'action',
        title: '操作',
        align:'left',
        formatter:userManageFormatter,
        events:'userManageEvents'
    }]
});


$(document).on('click','#system-user-new-search',function(){
    $('#system-user-new-table').bootstrapTable('selectPage',1)
});
$(document).on('click','#system-user-new-search-reset',function(){
    document.getElementById("system-user-new-form").reset();
    $('#system-user-new-table').bootstrapTable('selectPage',1)
});
//去除input内容复制有空格问题
$("#system-user-new-form input").on("blur",function(){
    var result=$(this).val().replace(/(^\s*)|(\s*$)/g, "");
    $(this).val(result);
});
function searchKey(args) {
    var str = UTIL.form2json({
        form : "#toolbar"
    });
    for(var index in str){
        args[index] = str[index]
    }
    return args;
}
EMPLOYEEDID = "";
$("#zTree-container").load("system-dialog-tree.html", function() {
})

$(function() {
    $('#nav_user').addClass('nav-active');
    $('#nav_user #nav_user_manage_id').addClass('active');
//	$("#add-user").click(function() {
//		var str = $(this).data("href");
//		$("#main-content").load(str);
//	})
})
//操作
function userManageFormatter(value, row, index) {
    var arr = '<a class="edit" href="#/system-user-add.html/'+row.employeeId+'" title="修改用户">'
        + '修改' + '</a> | ';
    arr += '<a class="delete" href="javascript:void(0)" title="删除用户">'
        + '删除' + '</a> | ';
    arr += '<a class="init" href="javascript:void(0)" title="初始密码">'
        + '初始密码' + '</a>';
    return arr;
}

function stateActionFormatter(value, row, index) {
    var text = '';
    if (row.activeInd == 1) {
        text = '正常';
    } else if (row.activeInd == 3) {
        text = '删除';
    } else {
        text = '-';
    }
    return text;
}

function sendMailFormatter(value, row, index) {
    var text = '';
    if (row.sendMail == 0) {
        text = '不发送';
    } else if (row.sendMail == 1) {
        text = '删除';
    } else {
        text = '-';
    }
    return text;
}
window.userManageEvents = {
// 订单详情
    'click .edit' : function(e, value, row, index) {
        //	window.location.href = "/midai/html/system/user/user_add.html?id="+row.employeeId;
        EMPLOYEEDID = row.employeeId;
    },
    'click .delete' : function(e, value, row, index) {
        var employeeName = '${employeeName!}';
        var activeInd = row.activeInd;
        if (employeeName == row.employeeName) {
            swal({
                title : "<h5 style='font-size:20px;'>提示</h5>",
                text :"亲，不能删除自己",
                confirmButtonColor: "#48c9b0",
                showConfirmButton : true,
                closeOnConfirm: true,
                html:true
            });
        } else if (activeInd == 3) {
            swal({
                title : "<h5 style='font-size:20px;'>提示</h5>",
                text :"亲，该职员已经离职,不能删除",
                confirmButtonColor: "#48c9b0",
                showConfirmButton : true,
                closeOnConfirm: true,
                html:true
            });
        } else {
            swal(
                {
                    title : "<h5 style='font-size:20px;'>提示</h5>",
                    text : "你将要删除用户\"" + row.employeeName
                    + "\"吗 ",
                    showCancelButton : true,
                    cancelButtonText : "取消",
                    confirmButtonColor : "#48c9b0",
                    confirmButtonText : "确认",
                    closeOnConfirm : true,
                    html:true
                },
                function() {
                    $
                        .ajax({
                            url : "/midai/system/user/delete/"
                            + row.employeeId
                            + ".json",
                            type : 'post',
                            // data:{employeeId:row.employeeId},
                            dataType : 'json',
                            async : false,
                            success : function(data) {
                                if (data.result == "success") {
                                    $(
                                        '[data-toggle="table"]')
                                        .bootstrapTable(
                                        "refresh",
                                        "/midai/system/user/list.json");
                                } else if (data.result == "fail") {
                                    swal("Cancelled",
                                        data.msg,
                                        "error");
                                }
                            },
                            error : function(xhr,
                                             textStatus, errorThrown) {
                                swal({
                                    title : "<h5 style='font-size:20px;'>提示</h5>",
                                    text :"删除失败，请联系管理员",
                                    confirmButtonColor: "#48c9b0",
                                    showConfirmButton : true,
                                    closeOnConfirm: true,
                                    html:true
                                });
                                flag = false;
                            }

                        });

                });
        }
    },
    'click .init' : function(e, value, row, index) {
        swal({
            title : "<h5 style='font-size:20px;'>提示</h5>",
            text : "你将要初始化用户" + row.employeeName + "密码吗 ？",
            showCancelButton : true,
            cancelButtonText : "取消",
            confirmButtonColor : "#48c9b0",
            confirmButtonText : "确认",
            closeOnConfirm : true,
            html:true
        }, function() {

            $.ajax({
                url : "/midai/system/user/initPasswd/" + row.employeeId
                + ".json",
                type : 'POST',
                // data : {
                // 	employeeId : row.employeeId
                // },
                dataType : 'json',
                async : false,
                success : function(data) {
                    if (data.result == "success") {
                        setTimeout(function() {
                            swal({
                                title : "<h5 style='font-size:20px;'>提示</h5>",
                                text :"密码初始化成功",
                                confirmButtonColor: "#48c9b0",
                                showConfirmButton : true,
                                closeOnConfirm: true,
                                html:true
                            });
                        }, 1000);
                    } else if (data.result == "fail") {
                        swal({
                            title : "<h5 style='font-size:20px;'>提示</h5>",
                            text :"密码初始化失败",
                            confirmButtonColor: "#48c9b0",
                            showConfirmButton : true,
                            closeOnConfirm: true,
                            html:true
                        });
                    }
                },
                error : function(xhr, textStatus, errorThrown) {
                    swal({
                        title : "<h5 style='font-size:20px;'>提示</h5>",
                        text :"密码初始化失败，请联系管理员",
                        confirmButtonColor: "#48c9b0",
                        showConfirmButton : true,
                        closeOnConfirm: true,
                        html:true
                    });
                    flag = false;
                }

            });

        });

    }
};