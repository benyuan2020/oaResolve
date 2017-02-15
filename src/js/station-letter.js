



    $('#stationLetterTable').bootstrapTable({
        url: '../static/json/data.json',/*/midai/system/message/list.json*/
        columns: [{
            field: '',
            title: '',
            align:'left',
            checkbox:true
        }, {
            field: 'msgId',
            title: 'msgID',
            align:'left',
            visible:false
        }, {
            field: 'employeeId',
            title: 'employeeID',
            align:'left',
            visible:false
        }, {
            field: 'addressorId',
            title: '发件人ID',
            align:'left',
            visible:false
        }, {
            field: 'addressorName',
            title: '发件人',
            align:'left',
            formatter:titleStatusFormatter
        }, {
            field: 'msgTitle',
            title: '标题',
            align:'left',
        },  {
            field: 'createTime',
            title: '时间',
            align:'left',
        },  {
            field: 'msgContent',
            title: '内容',
            align:'left',
        }, {
            field: 'msgType',
            title: '信件类型',
            align:'left',
            formatter:msgTypeFormatter
        },{
            field: 'msgResource',
            title: '信件来源',
            align:'left',
        },{
            field: 'msgStatus',
            title: '状态',
            align:'left',
            formatter:msgStatusFormatter,
            events:'msgEvents'
        },{
            field: 'action',
            title: '操作',
            align:'left',
            formatter:actionFormatter,
            events:'actionEvents'
        }]
    });



//
function actionFormatter(value, row, index) {
    var arr = '<a class="delete" href="javascript:void(0)" title="删除此条信息">'
        + '删除' + '</a>';
    return arr;
}
//操作
function msgStatusFormatter(value, row, index) {
    if (value == 0) {
        var ayy = '<button class="update" href="javascript:void(0)">'
            + '未读' + '</button>';
        return ayy;
    } else if (value == 1) {
        return "<button style='background: #276bb0; border-radius:4px; color:white; border:0;' disabled>已读</button>"

    }
}
    //状态格式化
function msgTypeFormatter(value, row, index) {
    if (value == 0) {
        return "系统通知";
    } else if (value == 1) {
        return "员工通知";

    }
}

function titleStatusFormatter(value, row, index) {
    if (row.msgStatus == 0) {
        var arr = '<span id="'+row.msgId+'point" class="no-label-tip"></span>'
            + row.msgTitle;
        return arr;
    } else if (row.msgStatus == 1) {
        var arr = '<span id="'+row.msgId+'point" class="yi-label-tip"> </span> '
            + row.msgTitle;
        return arr;

    }
}


  window.actionEvents = {

    'click .delete' : function(e, value, row, index) {
        var msgId = '${msgId!}';
        console.log(12)
        swal({
            title : "<h5 style='font-size:20px;'>提示</h5>",
            text : "你将要删除这条记录\"" + row.msgTitle + "\"吗？",
            showCancelButton : true,
            cancelButtonText : "取消",
            confirmButtonColor : "#48c9b0",
            confirmButtonText : "确认",
            closeOnConfirm : true,
            html:true
        }, function() {
            $
                .ajax({
                    url : "/midai/system/message/delete/" + row.msgId
                    + ".json",
                    type : 'get',
                    dataType : 'json',
                    async : false,
                    success : function(data) {
                        if (data.result == "success") {
                            if(row.msgStatus==0){
                                $("#messageCount").text(
                                    +$("#messageCount").text() - 1);
                            }
                            $("#main-content").load(
                                "message-list.html",
                                function() {
                                    $('[data-toggle="table"]')
                                        .bootstrapTable();
                                })
                        } else if (data.result == "fail") {
                            swal("Cancelled", data.msg, "error");
                        }
                    },
                    error : function(xhr, textStatus, errorThrown) {
                        swal({
                            title : "<h5 style='font-size:20px;'>提示</h5>",
                            text : "删除失败，请联系管理员!",
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

 window.msgEvents = {
    'click .update' : function(e, value, row, index) {
        $
            .ajax({
                url : "/midai/system/message/update.json",
                type : 'post',
                data : JSON.stringify({
                    "msgId" : row.msgId
                }),
                dataType : 'json',
                async : false,
                success : function(data) {
                 //   var date = data.messageModel;
                    if (data.result == "success") {
                        e.target.innerHTML = "已读";
                        $(e.target)
                            .attr("style",
                            "background: #276bb0; color:white; border:0; border-radius:4px; width:40px;");
                        $(e.target).attr("disabled", true);
                        $('#' + row.msgId + 'point')
                            .attr(
                            "style",
                            "background:blue; font-size:30px;line-height:30px; font-weight:bolder;");

                        $("#messageCount").text(
                            +$("#messageCount").text() - 1);
                        row.msgStatus = 1;
                        swal({
                            title : "<h5 style='font-size:20px;'>提示</h5>",
                            text : "已标记为已读!",
                            confirmButtonColor: "#48c9b0",
                            showConfirmButton : true,
                            closeOnConfirm: true,
                            html:true
                        });
                        $("#main-content").load("message-list.html", function() {
                            $('[data-toggle="table"]').bootstrapTable();
                        });

                    } else if (data.result == "fail") {
                        swal("Cancelled", data.msg, "error");
                    }
                },
                error : function(xhr, textStatus, errorThrown) {
                    swal({
                        title : "<h5 style='font-size:20px;'>提示</h5>",
                        text : "修改失败，请联系管理员!",
                        confirmButtonColor: "#48c9b0",
                        showConfirmButton : true,
                        closeOnConfirm: true,
                        html:true
                    });
                }

            });

    }

};

    // 批量标记为已读
var $update = $('#stationLetter #DjUpdate');
$update.click(function() {

    var ids = $.map($("#stationLetterTable").bootstrapTable('getSelections'), function(
        row) {
        if (row.msgStatus == 0) {
            return row.msgId
        }
    });
    if (ids.length <= 0) {
        swal({
            title : "<h5 style='font-size:20px;'>提示</h5>",
            text : "亲,请细心检查一下,是否未选或者选中的全部为已读信息!",
            confirmButtonColor: "#48c9b0",
            showConfirmButton : true,
            closeOnConfirm: true,
            html:true
        });
        $("#main-content").load("message-list.html", function() {
            $('[data-toggle="table"]').bootstrapTable();
        })
        return;
    }
    var i = ids.length;
    $.ajax({
        url : "/midai/system/message/updatebatch.json?ids=" + ids,
        type : 'post',
        dataType : 'json',
        async : false,
        success : function(data) {
            if (data.result == "success") {
                $("#main-content").load(
                    "message-list.html",
                    function() {
                        $('[data-toggle="table"]').bootstrapTable();
                        $("#messageCount").text(
                            +$("#messageCount").text() - i);

                    });
            } else if (data.result == "fail") {
                swal("Cancelled", data.msg, "error");
                swal({
                    title : "<h5 style='font-size:20px;'>提示</h5>",
                    text : data.msg,
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
                text : "修改失败，请联系管理员!",
                confirmButtonColor: "#48c9b0",
                showConfirmButton : true,
                closeOnConfirm: true,
                html:true
            });
            flag = false;
        }

    });

});

//删除未读
var $remove = $('#stationLetter #Djdelete');
$remove.click(function() {
    var ids = getIdSelections();
    var numDelete=0;
    var idDelete = $.map($("#stationLetterTable").bootstrapTable('getSelections'), function(
        row) {
        if (row.msgStatus == 0) {
            numDelete++;
            return numDelete;
        }
    });
    if (ids.length <= 0) {
        swal({
            title : "<h5 style='font-size:20px;'>提示</h5>",
            text : "亲,请细心检查一下,是否未选中信息!",
            confirmButtonColor: "#48c9b0",
            showConfirmButton : true,
            closeOnConfirm: true,
            html:true
        });
        $("#main-content").load("message-list.html", function() {
            $('[data-toggle="table"]').bootstrapTable();
        })
        return;
    }
    else{
        swal({   title: "<h5 style='font-size:20px;'>提示</h5>",
                text: "您确定要删除选中的信息吗？",
                showCancelButton: true,
                confirmButtonColor: "#48c9b0",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: true,html:true,   closeOnCancel: true },
            function(isConfirm){   if (isConfirm) {
                $.ajax({
                    url : "/midai/system/message/deletebatch.json?ids=" + ids,
                    type : 'post',
                    dataType : 'json',
                    async : false,
                    success : function(data) {
                        if (data.result == "success") {
                            $("#messageCount").text(
                                +($("#messageCount").text() - idDelete.length));
                            $("#main-content").load("message-list.html", function() {
                                $('[data-toggle="table"]').bootstrapTable();

                            })
                        } else if (data.result == "fail") {
                            swal("Cancelled", data.msg, "error");
                        }
                    },
                    error : function(xhr, textStatus, errorThrown) {
                        swal({
                            title : "<h5 style='font-size:20px;'>提示</h5>",
                            text : "删除失败，请联系管理员!",
                            confirmButtonColor: "#48c9b0",
                            showConfirmButton : true,
                            closeOnConfirm: true,
                            html:true
                        });
                        flag = false;
                    }
                });
            }
            });

    }

});

function getIdSelections() {
    return $.map($("#stationLetterTable").bootstrapTable('getSelections'),
        function(row) {
            return row.msgId
        });
}