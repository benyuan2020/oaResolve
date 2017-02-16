/**
 * Created by yh-xcl001 on 2017/2/14.
 */
$('#system-role-new').bootstrapTable({
    url: '../static/json/role.json',/*/data-url="/midai/system/role/list.json"n*/
    columns: [{
        field: 'roleName',
        title: '名称',
        align:'left'
    }, {
        field: 'description',
        title: '描述',
        align:'left'
    }, {
        field: 'systemDesc',
        title: '角色类型',
        align:'left'
    },{
        field: 'action',
        title: '操作',
        align:'left',
        formatter:roleManageFormatter,
        events:'roleManageEvents'
    }]
});


function roleManageFormatter(value, row, index) {
    var arr = '<a class="detail"  title="查看角色详情" href="#/system-role-desc.html/'+row.roleId+'">'
        + '查看' + '</a> | ';
    arr += '<a class="update" href="javascript:void(0)" title="修改角色权限">'
        + '修改' + '</a>';
    return arr;
}

window.roleManageEvents = {
//		'click .detail' : function(e, value, row, index) {
//			ROLEID = row.roleId;
////			$("#main-content").load("system-role-desc.html");
//			//window.location.href =MIDAI_HOST+"/html/system/role/role_desc.html?id="+row.roleId;
//		},
    'click .update' : function(e, value, row, index) {
        ROLEID = row.roleId;
        swal({
            title : "<h5>提示</h5>",
            text : "你确认要修改角色及所属权限信息 !",
            showCancelButton : true,
            cancelButtonText : "取消",
            confirmButtonColor : "#48c9b0",
            confirmButtonText : "确认",
            closeOnConfirm : true,
            html:true
        }, function() {
//				$("#main-content").load("system-role-add.html")
            window.location.hash = '#/system-role-add.html/'+ROLEID;
            //window.location.href ="/midai/html/system/role/role_add.html?id="+row.roleId;
        });
    }

};