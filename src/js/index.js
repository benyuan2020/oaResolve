require('../css/styles.css')
require('../css/app.css')
require('../css/onePage.css')
require('../css/index.css')
var test = require('../lease-new-part-add.html')

require('../../static/js/route-plugin.js')

// 侧边栏点击效果
$('nav.sidebar>.nav>li').each(function(){
	// 一级菜单点击事件
	$(this).click(function(){
		$(this).siblings('li').removeClass('active').find('.collapse').removeClass('in');
		$(this).addClass('active').find('.collapse').addClass('in');
	});
	// 二级菜单点击事件
	$(this).find('.collapse>li').each(function(){
		$(this).click(function(){
			$(this).parent('.collapse').parent('li').siblings().find('.collapse').find('li').removeClass('active');
			$(this).addClass('active').siblings('li').removeClass('active');
		})
	});
	
})
// 左边菜单的显示隐藏
$('.toggle-aside').click(function(){
	$('body').toggleClass('aside-toggled');
})

var oaRoute = new OPRouter({
	routes: [
		{"url":"todo-list.html","title":"待办事项"},
		{"url":"station-letter.html","title":"站内信"},
		{"url":"system-user-new.html","title":"用户管理"},
		{"url":"system-role-new.html","title":"角色管理"},
		{"url":"system-organize-structural.html","title":"组织机构管理"},
		{"url":"product-audit-list.html","title":"产品待审进件"},
		{"url":"product-car.html","title":"车贷租赁"},
		{"url":"product-asset-package.html","title":"资产包列表"},
		{"url":"product-finana.html","title":"融资租赁"},
		{"url":"product-upload-contract.html","title":"上传合同"},
		{"url":"product-asset-match.html","title":"处理待审进件"},
		{"url":"product-jmd.html","title":"金米袋打包"},
		{"url":"lease-first-car-evaluation.html","title":"一级车评-车贷"},
		{"url":"lease-first-car-evaluation-check.html","title":"一级车评回显-车贷"},
		{"url":"lease-second-car-evaluation.html","title":"二级车评-车贷"},
		{"url":"lease-second-car-evaluation-check.html","title":"二级车评回显-车贷"},
		{"url":"lease-new-part-add.html","title":"新建进件-增加"},
		{"url":"lease-new-part-change.html","title":"新建进件-修改"},
		{"url":"lease-new-part-check.html","title":"新建进件-查看"},
		{"url":"lease-audit-list.html","title":"待审进件-融资"},
		{"url":"lease-product-list.html","title":"进件列表-融资"},
		{"url":"car-audit-list.html","title":"待审进件-车贷"},
		{"url":"car-product-list.html","title":"进件列表-车贷"}
	]
});

window.oaRoute = oaRoute;



// 首页添加路由插件


