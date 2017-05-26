/**
 *
 * @requires jQuery
 *
 * 当页面加载完毕关闭加载进度
 * **/
$(window).load(function(){
    $("#loading").fadeOut();
});


/**
 * 使panel和datagrid在加载时提示
 *
 * @requires jQuery,EasyUI
 *
 */
$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';

/**
 * @requires jQuery,EasyUI
 *
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {
    var frame = $('iframe', this);
    try {
        if (frame.length > 0) {
            for ( var i = 0; i < frame.length; i++) {
                frame[i].src = '';
                frame[i].contentWindow.document.write('');
                frame[i].contentWindow.close();
            }
            frame.remove();
            if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
                try {
                    CollectGarbage();
                } catch (e) {
                }
            }
        }
    } catch (e) {
    }
};

/**
 *
 *
 * @requires jQuery,EasyUI
 *
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
    var l = left;
    var t = top;
    if (l < 1) {
        l = 1;
    }
    if (t < 1) {
        t = 1;
    }
    var width = parseInt($(this).parent().css('width')) + 14;
    var height = parseInt($(this).parent().css('height')) + 14;
    var right = l + width;
    var buttom = t + height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (right > browserWidth) {
        l = browserWidth - width;
    }
    if (buttom > browserHeight) {
        t = browserHeight - height;
    }
    $(this).parent().css({/* 修正面板位置 */
        left : l,
        top : t
    });
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;






/**
 *
 *
 * @requires jQuery,EasyUI
 *
 * 通用错误提示
 *
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
/*var easyuiErrorFunction = function(XMLHttpRequest) {
    parent.$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;*/

/**
 *
 *
 * @requires jQuery,EasyUI
 *
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
    e.preventDefault();
    var grid = $(this);/* grid本身 */
    var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
    if (!headerContextMenu) {
        var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
        var fields = grid.datagrid('getColumnFields');
        for ( var i = 0; i < fields.length; i++) {
            var fildOption = grid.datagrid('getColumnOption', fields[i]);
            if (!fildOption.hidden) {
                $('<div iconCls="tick" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
            } else {
                $('<div iconCls="bullet_blue" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
            }
        }
        headerContextMenu = this.headerContextMenu = tmenu.menu({
            onClick : function(item) {
                var field = $(item.target).attr('field');
                if (item.iconCls == 'tick') {
                    grid.datagrid('hideColumn', field);
                    $(this).menu('setIcon', {
                        target : item.target,
                        iconCls : 'bullet_blue'
                    });
                } else {
                    grid.datagrid('showColumn', field);
                    $(this).menu('setIcon', {
                        target : item.target,
                        iconCls : 'tick'
                    });
                }
            }
        });
    }
    headerContextMenu.menu('show', {
        left : e.pageX,
        top : e.pageY
    });
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

/**
 * grid tooltip参数
 *
 *
 */
var gridTooltipOptions = {
    tooltip : function(jq, fields) {
        return jq.each(function() {
            var panel = $(this).datagrid('getPanel');
            if (fields && typeof fields == 'object' && fields.sort) {
                $.each(fields, function() {
                    var field = this;
                    bindEvent($('.datagrid-body td[field=' + field + '] .datagrid-cell', panel));
                });
            } else {
                bindEvent($(".datagrid-body .datagrid-cell", panel));
            }
        });

        function bindEvent(jqs) {
            jqs.mouseover(function() {
                var content = $(this).text();
                if (content.replace(/(^\s*)|(\s*$)/g, '').length > 5) {
                    $(this).tooltip({
                        content : content,
                        trackMouse : true,
                        position : 'bottom',
                        onHide : function() {
                            $(this).tooltip('destroy');
                        },
                        onUpdate : function(p) {
                            var tip = $(this).tooltip('tip');
                            if (parseInt(tip.css('width')) > 500) {
                                tip.css('width', 500);
                            }
                        }
                    }).tooltip('show');
                }
            });
        }
    }
};
/**
 * Datagrid扩展方法tooltip 基于Easyui 1.3.3，可用于Easyui1.3.3+
 *
 * 简单实现，如需高级功能，可以自由修改
 *
 * 使用说明:
 *
 * 在easyui.min.js之后导入本js
 *
 * 代码案例:
 *
 * $("#dg").datagrid('tooltip'); 所有列
 *
 * $("#dg").datagrid('tooltip',['productid','listprice']); 指定列
 *
 *
 */
$.extend($.fn.datagrid.methods, gridTooltipOptions);

/**
 * Treegrid扩展方法tooltip 基于Easyui 1.3.3，可用于Easyui1.3.3+
 *
 * 简单实现，如需高级功能，可以自由修改
 *
 * 使用说明:
 *
 * 在easyui.min.js之后导入本js
 *
 * 代码案例:
 *
 * $("#dg").treegrid('tooltip'); 所有列
 *
 * $("#dg").treegrid('tooltip',['productid','listprice']); 指定列
 *
 *
 */
$.extend($.fn.treegrid.methods, gridTooltipOptions);

/**
 *
 *
 * @requires jQuery,EasyUI
 *
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
    eqPwd : {
        validator : function(value, param) {
            return value == $(param[0]).val();
        },
        message : '密码不一致！'
    }
});

//扩展tree，使其可以获取实心节点
$.extend($.fn.tree.methods, {
    getCheckedExt : function(jq) {// 获取checked节点(包括实心)
        var checked = $(jq).tree("getChecked");
        var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
        $.each(checkbox2, function() {
            var node = $.extend({}, $.data(this, "tree-node"), {
                target : this
            });
            checked.push(node);
        });
        return checked;
    },
    getSolidExt : function(jq) {// 获取实心节点
        var checked = [];
        var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
        $.each(checkbox2, function() {
            var node = $.extend({}, $.data(this, "tree-node"), {
                target : this
            });
            checked.push(node);
        });
        return checked;
    }
});

//扩展tree，使其支持平滑数据格式
$.fn.tree.defaults.loadFilter = function(data, parent) {
    var opt = $(this).data().tree.options;
    var idFiled, textFiled, parentField;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'text';
        parentField = opt.parentField;
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

// 扩展treegrid，使其支持平滑数据格式
$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
    var opt = $(this).data().treegrid.options;
    var idFiled, textFiled, parentField;
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'text';
        parentField = opt.parentField;
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

// 扩展combotree，使其支持平滑数据格式
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

/**
 * 扩展easyui-combobox,该方法用于在输入框输入了文本,
 * 却未进行选择就关闭了下拉面板(点击其他区域会导致combobox失去焦点,关闭下拉面板),
 * 这是combobox有text值但是没有value值。
 * 在onHidePanel方法中调用该方法,会用combobox当前的text值如所有的选项进行匹配
 * ,使用第一个匹配的选项的value值调用select方法,会触发onselect事件。
 * 
 *
 * @param jq combobox的jq对象,默认参数
 * @param prompt 设置为true时,如果找不到匹配的选项,会设置验证提示选项不存在。
 *
 **/
$.fn.combobox.methods.selectByText = function(jq,prompt){
	var text = jq.combobox("getText");
	var data = jq.combobox("getData");
	var options = jq.combobox("options");
	
	var flat = false;
	for(var i = 0 ;i < data.length ; i++)
	{
		if( data[i][options.textField] == text )
		{
			jq.combobox("select",data[i][options.valueField]);
			flat = true;
		}
	}
	
	if( (prompt!=undefined&&prompt==true) && flat == false )
	{
		jq.combobox("clear");
		//console.log("提示选项不存在");
		//jq.textbox({validType:'hasGood[true]'});
	}
	else if(flat == true )
	{
		//jq.combobox({validType:'notHasOptions[false]'});
	}
};

/**
 *
 * @requires jQuery,EasyUI
 *
 * 创建一个模式化的dialog
 *
 * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
 *
 * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
 */
$.modalDialog = function(options) {
    if ($.modalDialog.handler == undefined) {// 避免重复弹出
        var opts = $.extend({
            title : '',
            width : 840,
            height : 680,
            modal : true,
            onClose : function() {
                $.modalDialog.handler = undefined;
                $(this).dialog('destroy');
            },
            onOpen : function() {
            }
        }, options);
        opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
        return $.modalDialog.handler = $('<div/>').dialog(opts);
    }
};


$.cookie = function(key, value, options) {
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = $.extend({}, options);
        if (value === null) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        return (document.cookie = [ encodeURIComponent(key), '=', options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : '' ].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function(s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/**
 *
 * @requires jQuery
 *
 * 将form表单元素的值序列化成对象
 *
 * @returns object
 */
$.serializeObject = function(form) {
    var o = {};
    $.each(form.serializeArray(), function(index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};

/**
 *
 * 增加formatString功能
 *
 * 使用方法：$.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 *
 * @returns 格式化后的字符串
 */
$.formatString = function(str) {
    for ( var i = 0; i < arguments.length - 1; i++) {
        str = str.replace("{" + i + "}", arguments[i + 1]);
    }
    return str;
};

/**
 *
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 *
 * @returns list
 */
$.stringToList = function(value) {
    if (value != undefined && value != '') {
        var values = [];
        var t = value.split(',');
        for ( var i = 0; i < t.length; i++) {
            values.push('' + t[i]);/* 避免他将ID当成数字 */
        }
        return values;
    } else {
        return [];
    }
};

/**
 *
 * @requires jQuery
 *
 * 改变jQuery的AJAX默认属性和方法
 */
/*$.ajaxSetup({
    type : 'POST',
    error : function(XMLHttpRequest, textStatus, errorThrown) {
        try {
            parent.$.messager.progress('close');
            parent.$.messager.alert('错误', XMLHttpRequest.responseText);
        } catch (e) {
            alert(XMLHttpRequest.responseText);
        }
    }
});*/


/**
 *
 * @requires jQuery
 *
 * 去掉空格
 * **/
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, '');
};
String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, '');
};

/**
 *
 * @requires jQuery
 *
 * 页面加载加载进度条启用
 * **/
function progressLoad(){
    var left = ($(document.body).outerWidth(true) - 190) / 2;
    var top = ($(window).height() - 45) / 2;
    
    $("<div class=\"datagrid-mask\" style=\"position:absolute;z-index: 9999;\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");
    $("<div class=\"datagrid-mask-msg\" style=\"position:absolute;z-index: 9999;\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",left:left,top:top});
}

/**
 *
 * @requires jQuery
 *
 * 页面加载加载进度条关闭
 * **/
function progressClose(){
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

/**
 *
 * @requires jQuery
 *
 * 防止退格键导致页面回退
 */
$(document).keydown(function (e) {
    var doPrevent;
    if (e.keyCode == 8) {
        var d = e.srcElement || e.target;
        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }else{
            doPrevent = true;
        }
    }else{
        doPrevent = false;
    }
    if (doPrevent)
        e.preventDefault();
});


/** 
 * 重新easyui-datagrid行号自适应 
 */  
$.extend($.fn.datagrid.methods, {  
    fixRownumber : function(jq) {  
        return jq.each(function() {  
            var panel = $(this).datagrid("getPanel");  
            //获取最后一行的number容器,并拷贝一份   
            var clone = $(".datagrid-cell-rownumber", panel).last().clone();  
            //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下   
            clone.css({  
                "position" : "absolute",  
                left : -1000  
            }).appendTo("body");  
            var width = clone.width("auto").width();  
            //默认宽度是25,所以只有大于25的时候才进行fix   
            if (width > 25) {  
                //多加5个像素,保持一点边距   
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);  
                //修改了宽度之后,需要对容器进行重新计算,所以调用resize   
                $(this).datagrid("resize");  
                //一些清理工作   
                clone.remove();  
                clone = null;  
            } else {  
                //还原成默认状态   
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");  
            }  
        });  
    }  
});


/**
 * 以字符串样式"2016-6-2",获取当前时间
 */
$.getCurrentTime=function ()
{
	var currentTime = '';
	
	var time = new Date();
	
	var date = time.getDate();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	
	currentTime = year+'-'+month+'-'+date;
	
	return currentTime;
};

/**
 * 以字符串样式"2016-6-2 12:12:12",获取当前时间
 */
$.getLongCurrentTime = function()
{	
	var time = new Date();
	
	var date = time.getDate();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	
	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
};


/**
 * @param t {string} 后台的date字符串
 * 将后台传来的Date数据转换为"2016-6-2"格式
 */
$.setTime = function (t)
{
	if( t != null && t != undefined && t != '')
	{
		//console.log("未转换前："+t);
		var date = new Date(t);
		
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		
		//console.log(year+'-'+month+'-'+day);
		return year+'-'+month+'-'+day;
	}
	else
	{
		return '';
	}
};

/**
 * @param t {string} 后台的date字符串
 *  将后台传来的Date数据转换为"2016-6-2 09:45:10"格式
 */
$.setLongTime = function(t)
{
	if( t != null && t != undefined && t != '')
	{
		//console.log("未转换前："+t);
		var date = new Date(t);
		
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		
		//console.log(year+'-'+month+'-'+day);
		return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
	}
	else
	{
		return '';
	}
};


/**
 * 普通字符转换成转义符
 */
function html2Escape(sHtml) 
{
	 return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}

/**
 * 将str字符串按照split字符串分割成字符串数组
 */
$.wuStrToArray = function (str,s)
{
	if( str != null && str != '' && str != undefined)
	{
		//字符串分割
		if(str.indexOf(s) == -1)
		{
			str += s;
		}
		var array = str.split(s);
		
		//去除字符串数组中内容为空的元素
		for(var i=0;i<array.length;i++)
		{
			if( typeof(array[i]) == "undefined" || array[i] == "" || array[i] == " ")
			{
				array.splice(i,1);
				i = i-1;
			}
		}
		
		return array;
	}
};

/**
 * 判断字符串是否不为空
 * 
 * @param str 
 * 
 * @returns 如果字符串不为空,返回false;否则返回true
 * 
 */
$.strIsEmpty = function(str)
{
	if( str == undefined || str == null )
	{
		return true;
	}
	
	if( typeof(str) ==  "string" || typeof(str) ==  "String" )
	{
		if(str.replace(/(^\s*)|(\s*$)/g, '') != "")
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		throw new Error("参数不是字符串类型");
	}
};
