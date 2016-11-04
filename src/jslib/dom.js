// hapjs
// http://github.com/hapjs/tethys

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.tethys = factory();
    root.$ = root.$ || root.tethys;
  }

}(this, function() {
    'use strict';

    function Tethys(){};

    Tethys.prototype = {

        // 查询
        query: function(selector, context){

            if(typeof context === 'string'){
                context = document.querySelector(context);
            };

            if(typeof selector === 'string'){

                this._nodes = (context || document).querySelectorAll(selector);
            }else{

                this._nodes = [selector];
            };

            return this;
        },

        // 遍历
        each: function(fn){
            
            Array.prototype.forEach.call(this._nodes || [], fn);

            return this;
        },

        // 绑定事件
        on: function(events, fn){

            events = events.split(/\s*\,\s*/);

            return this.each(function(el){
                fn = fn.bind(el);
                events.forEach(function(event){
                    el.addEventListener(event, fn);
                });
            });
        },

        // 设置css
        // css('color', 'red')
        // css({ color: 'red' })
        css: function(key, value){
            var attrs = {}, keys;
            
            if(typeof key === 'object'){
                attrs = key;
            }else{
                attrs[key] = value;
            };

            keys = Object.keys(attrs);
            
            return this.each(function(el){
                keys.forEach(function(key){
                    var val = attrs[key] + '';
                    // backgroundColor 格式转成 background-color 格式
                    key = key.replace(/(-([a-z]))/g, function(s, $0, $1){
                        return $1.toUpperCase();
                    });
                    // 设置样式
                    el.style[key] = val;
                });
            });
        },

        // 检查是否有class
        hasClass: function(cls){
            var has = false, reg = new RegExp('\\b' + cls + '\\b');

            this.each(function(el){
                has = has || !!el.className.match(reg);
            });
            
            return has;
        },

        // 添加class
        addClass: function(cls, type){
            var reg = new RegExp('\\b' + cls + '\\b');
            
            // 为所有节点添加或删除class
            return this.each(function(el){
                var name = el.className;

                if(typeof name !== 'string') return;
                
                if(type === 'remove'){
                    // remove
                    if(name.match(reg)) {
                        el.className = name.replace(reg, '');
                    }
                }else{
                    // add
                    if(!name.match(reg)) {
                        el.className += ' ' + cls;
                    }
                }
            });
        },

        // 删除class
        removeClass: function(cls){
            return this.addClass(cls, 'remove');
        }

    };

    return function(selector, context){
        
        return new Tethys().query(selector, context);
        
    };

}));