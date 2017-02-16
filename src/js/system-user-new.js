

EMPLOYEEDID = "";
var key;
var treeNodeObj;
var log, className = "dark";
var setting = {
    data : {
        key : {
            title : "title"
        },
        simpleData : {
            enable : true
        }
    },
    view : {
        showTitle : true,
        fontCss : getFontCss
    },
    callback : {
        beforeClick : beforeClick,
        onClick : onClick
    }
};

$(document).ready(function() {
    key = $("#condition");
    key.bind("propertychange", searchNode).bind("input", searchNode);

});
var nodeList = [], fontCss = {};
function searchNode(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

    var value = $.trim(key.get(0).value);
    var keyType = "name";

    if (value === "")
        return;
    updateNodes(false);

    nodeList = zTree.getNodesByParamFuzzy(keyType, value);

    updateNodes(true);

}
function updateNodes(highlight) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    for (var i = 0, l = nodeList.length; i < l; i++) {
        nodeList[i].highlight = highlight;
        zTree.updateNode(nodeList[i]);
    }
}
function getFontCss(treeId, treeNode) {
    return (!!treeNode.highlight) ? {
        color : "#A60000",
        "font-weight" : "bold"
    } : {
        color : "#333",
        "font-weight" : "normal"
    };
}

function beforeClick(treeId, treeNode, clickFlag) {
    if (treeNode.resource == "user") {
        if (treeNode.gjdbs != '0') {
            swal({
                title : "<h5 style='font-size:20px;'>提示</h5>",
                text : "请选择人员!",
                confirmButtonColor: "#48c9b0",
                showConfirmButton : true,
                closeOnConfirm: true,
                html:true
            });
            return false;
        }
    }

    var a = $("#" + treeNode.hideName + "Id")[0];
    var parent = a.parentNode;
    while (parent.tagName != undefined
    && parent.tagName.toLowerCase() != "form") {
        parent = parent.parentNode;
    }
    if (parent.tagName != undefined
        && parent.tagName.toLowerCase() == "form") {
        if (treeNode.hideName != '') {
            if (parent.id != "toolbar") {
                $("#" + parent.id).data('formValidation').updateStatus(
                    treeNode.hideName + "Name", 'VALID', null)
                    .validateField(treeNode.hideName + "Name");
            }
        }
    }

    var id = treeNode.id;
    if (id.indexOf("_") > 0) {
        $("#" + treeNode.hideName + "Id").val(
            id.substr(id.indexOf("_") + 1, id.length));
    } else {
        $("#" + treeNode.hideName + "Id").val(id);
    }
    $("#" + treeNode.hideName + "Name").val(treeNode.name);
    return true;
}
function onClick(event, treeId, treeNode, clickFlag) {
    $("#myModal2").modal("hide");
    $("#condition").val("");
    $('.modal-backdrop').remove();
}
function clearOption() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var treeNodeName = zTree.getNodes()[0].hideName;
    $("#" + treeNodeName + "Id").val("");
    $("#" + treeNodeName + "Name").val("");

}
function showLog(str) {
    if (!log)
        log = $("#log");
    log.append("<li class='"+className+"'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now = new Date(), h = now.getHours(), m = now.getMinutes(), s = now
        .getSeconds();
    return (h + ":" + m + ":" + s);
}

function loadOrgTree(root,hideId){
    $.ajax({
        url:"../static/json/user-data-tree.json",///midai/system/organ/getOrgTreeFun/"+hideId+".json
        type:'get',//post
        dataType:'json',
        async:false,
        success:function(data){
            $.fn.zTree.init($("#user-new-trees"), setting, data.orgTreeJson);
        },
        error:function(xhr,textStatus,errorThrown){
            swal("提 示", "亲，系统出问题了，请联系管理员！", "error");
        }

    });
    $("#myModal2").modal("show");
}
$("#user_organizationName").focus(function(){
    loadOrgTree()
})


$('#system-user-new-table').bootstrapTable({
    url: '../static/json/user.json', /*/midai/system/user/list.json*/
   /* queryParams: searchKey,*/
    columns: [{
        field: 'employeeId',
        title: '登录账号',
        align: 'left'
    }, {
        field: 'employeeName',
        title: '名称',
        align: 'left'
    }, {
        field: 'email',
        title: '邮箱',
        align: 'left'
    }, {
        field: 'phoneNumber',
        title: '手机号',
        align: 'left'
    }, {
        field: 'tel',
        title: '分机',
        align: 'left'
    }, {
        field: 'organizationName',
        title: '所属组织机构',
        align: 'left',
    }, {
        field: 'createTime',
        title: '创建时间',
        align: 'left',
        sortable: true
    }, {
        field: 'sendMail',
        title: '是否邮件通知',
        align: 'left',
        formatter: function (value, row, index) {
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
    }, {
        field: 'activeInd',
        title: '状态',
        align: 'left',
        formatter: function (value, row, index) {
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
    }, {
        field: 'action',
        title: '操作',
        align: 'left',
        formatter: function (value, row, index) {
            var arr = '<a class="edit" href="javascript:void(0)' + row.employeeId + '" title="修改用户">'
                + '修改' + '</a> | ';
            arr += '<a class="delete" href="javascript:void(0)" title="删除用户">'
                + '删除' + '</a> | ';
            arr += '<a class="init" href="javascript:void(0)" title="初始密码">'
                + '初始密码' + '</a>';
            return arr;
        },
        // 订单详情
        events: {
            'click .edit': function (e, value, row, index) {
                //	window.location.href = "/midai/html/system/user/user_add.html?id="+row.employeeId;
                EMPLOYEEDID = row.employeeId;
            },
            'click .delete': function (e, value, row, index) {
                var employeeName = '${employeeName!}';
                var activeInd = row.activeInd;
                if (employeeName == row.employeeName) {
                    swal({
                        title: "<h5 style='font-size:20px;'>提示</h5>",
                        text: "亲，不能删除自己",
                        confirmButtonColor: "#48c9b0",
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        html: true
                    });
                } else if (activeInd == 3) {
                    swal({
                        title: "<h5 style='font-size:20px;'>提示</h5>",
                        text: "亲，该职员已经离职,不能删除",
                        confirmButtonColor: "#48c9b0",
                        showConfirmButton: true,
                        closeOnConfirm: true,
                        html: true
                    });
                } else {
                    swal(
                        {
                            title: "<h5 style='font-size:20px;'>提示</h5>",
                            text: "你将要删除用户\"" + row.employeeName
                            + "\"吗 ",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                            confirmButtonColor: "#48c9b0",
                            confirmButtonText: "确认",
                            closeOnConfirm: true,
                            html: true
                        },
                        function () {
                            $
                                .ajax({
                                    url: "/midai/system/user/delete/"
                                    + row.employeeId
                                    + ".json",
                                    type: 'post',
                                    // data:{employeeId:row.employeeId},
                                    dataType: 'json',
                                    async: false,
                                    success: function (data) {
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
                                    error: function (xhr,
                                                     textStatus, errorThrown) {
                                        swal({
                                            title: "<h5 style='font-size:20px;'>提示</h5>",
                                            text: "删除失败，请联系管理员",
                                            confirmButtonColor: "#48c9b0",
                                            showConfirmButton: true,
                                            closeOnConfirm: true,
                                            html: true
                                        });
                                        flag = false;
                                    }

                                });

                        });
                }
            },
            'click .init': function (e, value, row, index) {
                swal({
                    title: "<h5 style='font-size:20px;'>提示</h5>",
                    text: "你将要初始化用户" + row.employeeName + "密码吗 ？",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    confirmButtonColor: "#48c9b0",
                    confirmButtonText: "确认",
                    closeOnConfirm: true,
                    html: true
                }, function () {

                    $.ajax({
                        url: "/midai/system/user/initPasswd/" + row.employeeId
                        + ".json",
                        type: 'POST',
                        // data : {
                        // 	employeeId : row.employeeId
                        // },
                        dataType: 'json',
                        async: false,
                        success: function (data) {
                            if (data.result == "success") {
                                setTimeout(function () {
                                    swal({
                                        title: "<h5 style='font-size:20px;'>提示</h5>",
                                        text: "密码初始化成功",
                                        confirmButtonColor: "#48c9b0",
                                        showConfirmButton: true,
                                        closeOnConfirm: true,
                                        html: true
                                    });
                                }, 1000);
                            } else if (data.result == "fail") {
                                swal({
                                    title: "<h5 style='font-size:20px;'>提示</h5>",
                                    text: "密码初始化失败",
                                    confirmButtonColor: "#48c9b0",
                                    showConfirmButton: true,
                                    closeOnConfirm: true,
                                    html: true
                                });
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            swal({
                                title: "<h5 style='font-size:20px;'>提示</h5>",
                                text: "密码初始化失败，请联系管理员",
                                confirmButtonColor: "#48c9b0",
                                showConfirmButton: true,
                                closeOnConfirm: true,
                                html: true
                            });
                            flag = false;
                        }

                    });

                });

            }
        }
    }]
});

//列表搜索与重置
$(document).on('click', '#system-user-new-search', function () {
    $('#system-user-new-table').bootstrapTable('selectPage', 1)
});
$(document).on('click', '#system-user-new-search-reset', function () {
    document.getElementById("system-user-new-form").reset();
    $('#system-user-new-table').bootstrapTable('selectPage', 1)
});
//去除input内容复制有空格问题
$("#system-user-new-form input").on("blur", function () {
    var result = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
    $(this).val(result);
});
/*function searchKey(args) {
    var str = form2json(("#system-user-new-form"));
    for (var index in str) {
        args[index] = str[index]
    }
    return args;
}*/

