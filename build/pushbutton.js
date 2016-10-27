/**
 * pushbutton
 * xisa
 * 0.1.0(2014-2016)
 */
 /*
    依赖iscroll 
    底层库使用 Zepto 或者 jQuery
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Pushbutton = factory();
  }
}(this, function() {
    'use strict';
    function Pushbutton(element, options) {
        this.ele = $(element);
        var id   = this.ele.attr('id');
        // 如果没有ID 则自动创建一个id
        if (!id) {
            id = 'pushbutton' + Math.random().toString().replace('0.', '');
            this.ele.attr('id', id);
        }
        this.id = $('#' + id);
        this.init(options);
    }
    Pushbutton.prototype = {
    	version: '0.1.0',
    	// 初始化
        init: function (options) {
            this.options = {};
            this.options.animateIn = 'pushbutton-in';
        	this.options.animateOut = 'pushbutton-out';

            // 继承
            $.extend(this.options, options);
            // 执行render
            this.render();
        },
        // 入口
        render: function () {
            this.id.addClass('widget-ui-pushbutton').append(this.createTpl());
            this.show();
            // 事件
            this.event();
        },
        // 销毁ListLoading
        destroy: function () {
            this.id.remove();
        },
        // 刷新listloading
        refresh: function () {
            // 
        },
        // 创建模板
        createTpl: function () {
            var dataF, cls, key, text, i = 0, n = 0, arr, arrLen = 0;
        	var data = this.options.data;
        	var id = this.id;
            var ahref = '';
        	if (!Array.isArray(data)) {
        		data = [];
        	}
        	var len = data.length;
            var tpl = '<div class="widget-ui-pushbutton-list">';

			for (; i < len; i++) {
				dataF = data[i];
				cls = dataF.cls || '';
				// key = dataF.key ? 'data-key="' + dataF.key + '"' : '';
				text = dataF.text || '';
                arr = dataF.attr;
                if (Array.isArray(arr)) {
                    arrLen = arr.length;
                    for (n = 0; n < arrLen; n++) {
                        //
                    }
                }
                if (typeof arr === 'object') {
                    for (arr in key) {
                        console.log(arr)
                    }
                }

				tpl += '<a href="javascript:void(0);" class="list-a' + cls + '" ' + key + '>' + text + '</a>';
			}
				
			tpl += '<a href="javascript:void(0);" class="pushbutton-cancel">取消</a>\
					</div>';
			return tpl;
        },
        // 事件
        event: function () {
            var id = this.id;
            var op = this.options;
            var onClick = op.onClick;
            var dom = '';
            // 点击
            id.on('click', function (e) {
                dom = e.target || e.srcElement;
                console.log(e.srcElement);
            });
            // if ($.isFuntion(onClick)) {
            //     onClick(dom);
            // }
        },
        // 显示
        show: function () {
        	var In = this.options.animateIn;
            this.id.show().addClass(In);
        },
        // 隐藏
        hide: function () {
        	var op = this.options;
        	var In = op.animateIn;
        	var Out = op.animateOut;
        	var id = this.id;
            id.addClass(Out);
    		setTimeout(function() {
    			id.removeClass(Out + ' ' + In).hide();
    		}, 351);
        },
    }
	return Pushbutton;
}));
