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
        // 遍历obj
        forInAttr: function (data) {
            var attr = '', key;
            for (key in data) {
                attr += key + '="' + data[key] + '" ';
            }
            return attr;
        },
        // 创建模板
        createTpl: function () {
            var dataF, cls, key, text, attr, i = 0, n = 0, arr, arrLen = 0;
        	var data = this.options.data;
        	var id = this.id;
        	if (!Array.isArray(data)) {
        		data = [];
        	}
        	var len = data.length;
            var tpl = '<div class="widget-ui-pushbutton-list">';

			for (; i < len; i++) {
				dataF = data[i];
				cls = dataF.cls || '';
				text = dataF.text || '';
                arr = dataF.attr;
                attr = '';
                if (typeof arr == 'object' && !Array.isArray(arr)) {
                    attr += this.forInAttr(arr);
                } else if (Array.isArray(arr)) {
                    arrLen = arr.length;
                    for (n = 0; n < arrLen; n++) {
                        attr += this.forInAttr(arr[n]);
                    }
                }

				tpl += '<a href="javascript:void(0);" class="list-a ' + cls + '" ' + attr + '>' + text + '</a>';
			}
				
			tpl += '<a href="javascript:void(0);" class="pushbutton-cancel list-a">取消</a>\
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
                this.hide();
            }.bind(this));
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
        // 点击事件
        evt: function Events(element, type, eventHandle, flg){
            var touchable = "ontouchstart" in window;
            var clickEvent = touchable ? "touchstart" : "click",
                mouseDownEvent = touchable ? "touchstart" : "mousedown",
                mouseUpEvent = touchable ? "touchend" : "mouseup",
                mouseMoveEvent = touchable ? "touchmove" : "mousemove",
                mouseMoveOutEvent = touchable ? "touchleave" : "mouseout";
            var _returnData = function(evt){
                var neweEvt = {};
                var cev = evt.originalEvent;
                if( cev == undefined ) {
                    cev = evt;
                }
                if(cev.changedTouches){
                    neweEvt.pageX = cev.changedTouches[0].pageX;
                    neweEvt.pageY = cev.changedTouches[0].pageY;
                    neweEvt.clientX = cev.changedTouches[0].clientX;
                    neweEvt.clientY = cev.changedTouches[0].clientY;
                }else{
                    neweEvt.pageX = evt.pageX;
                    neweEvt.pageY = evt.pageY;
                    neweEvt.clientX = evt.clientX;
                    neweEvt.clientY = evt.clientY;
                }
                neweEvt.evt = evt;
                return neweEvt;
            };
            var getTouchPos = function(e){
                return { x : e.clientX , y: e.clientY };
            }
            //计算两点之间距离
            var getDist = function(p1 , p2){
                if(!p1 || !p2) return 0;
                return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
            };
            var _onClick = function(dom, evt, callback){
                var neweEvt = _returnData(evt);
                callback(dom, neweEvt);
            };
            var _onClickDown = function(dom, evt, callback){
                var neweEvt = _returnData(evt);
                callback(dom, neweEvt);
            };
            var _onClickUp = function(dom, evt, callback){
                var neweEvt = _returnData(evt);
                callback(dom, neweEvt);
            };
            var _onMove = function(dom, evt, callback){
                var neweEvt = _returnData(evt);
                callback(dom, neweEvt);
            };
            var _onOut = function(evt, callback){
                var neweEvt = _returnData(evt);
                callback(dom, neweEvt);
            };
            var rootEle = this.ele;
            if( flg == undefined ) {
                flg = true;
            }
            
            switch(type){
                case "mousemove" :
                case "touchmove" :
                    if( flg ) {
                        rootEle.off(mouseMoveEvent, element);
                    }
                    rootEle.on(mouseMoveEvent, element, function(e){
                        _onMove($(this), e, eventHandle);
                    });
                    break;
                case "click" :
                case "tap" :
                    //按下松开之间的移动距离小于20，认为发生了tap
                    var TAP_DISTANCE = 20;
                    var pt_pos;
                    var ct_pos;
                    var startEvtHandler = function(e){
                        var ev = _returnData(e);
                        ct_pos = getTouchPos(ev);
                    };
                    var endEvtHandler = function(dom_,e, fn){
                        // e.stopPropagation();
                        var ev = _returnData(e);
                        var now = Date.now();
                        var pt_pos = getTouchPos(ev);
                        var dist = getDist(ct_pos , pt_pos);
                        if(dist < TAP_DISTANCE) {
                            _onClick(dom_, e, eventHandle);
                        }
                    };
                    if( flg ) {
                        rootEle.off(mouseDownEvent, element);
                        rootEle.off(mouseUpEvent, element);
                    }
                    rootEle.on(mouseDownEvent, element, function(e){
                        if(e.button != 2){ // 防止右键点击触发事件
                            startEvtHandler(e);
                        }
                    });
                    rootEle.on(mouseUpEvent, element, function(e){
                        if(e.button != 2){ // 防止右键点击触发事件
                            var $this = $(this);
                            endEvtHandler($this,e,eventHandle);
                        }
                    });
                    break;
                case "mousedown" :
                case "touchstart" :
                    if( flg ) {
                        rootEle.off(mouseDownEvent, element);
                    }
                    rootEle.on(mouseDownEvent, element, function(e){
                        _onClickDown($(this), e, eventHandle);
                    });
                    break;
                case "mouseup" :
                case "touchend" :
                    if( flg ) {
                        rootEle.off(mouseUpEvent, element);
                    }
                    rootEle.on(mouseUpEvent, element, function(e){
                        _onClickUp($(this), e, eventHandle);
                    });
                    break;
                case "mouseout" :
                    if( flg ) {
                        rootEle.off(mouseMoveOutEvent, element);
                    }
                    rootEle.on(mouseMoveOutEvent, element, function(e){
                        endEvtHandler(e, eventHandle);
                    });
                    break;
            }
        }
    }
	return Pushbutton;
}));
