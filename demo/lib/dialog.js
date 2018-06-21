//# sourceURL=lib/dialog.js
;(function(window,$,undefined){
    /**
     * 弹出层插件
     * @constructor
     */
    function Dialog(settings){
        if(!this instanceof Dialog){
            return new Dialog(settings);
        }
        var _default={
            width:150,
            height:75,
            type:"str",
            dom:"",
            ok:function(e,d){
                d.hide();
            },
            cancel:function(){
                d.hide();
            }
        };
        this.settings = $.extend({},_default,settings);
        this.init();
    }

    Dialog.prototype={
        init:function(){
            var self=this;
            if(!$("#dialog").length){
                $("body").append([
                    '<div id="dialog" class="modal" tabindex="-1" role="dialog" aria-hidden="true" >',
                        '<div id="dialogMask" style="background:#000; opacity:0.3; position:absolute; width:100%;height:100%;z-index:1060;"></div>',
                        '<div id="dialogContent" style="position:absolute; z-index:1061;top: 30%;left: 0;right: 0;bottom: 0;"></div>',
                    '</div>'
                ].join(""));
            }
            this.dom = $("#dialog");
            this.render().done(function(){
                //事件绑定
                $("#dialogContent").off("click").on("click",function(e){
                    var tar = $(e.target),
                        name = tar.attr("name");
                    self.settings[name] && self.settings[name].call(tar,e,self);
                });
            });
        },
        render:function(){
            var def = $.Deferred(),
                s = this.settings;
                if(s.type=="str" || s.type=="ele") {
                    $("#dialogContent").html(s.dom);
                    def.resolve();
                }else if(s.type=="src"){
                    $.get(s.dom).done(function(result){
                        $("#dialogContent").html(result);
                        def.resolve();
                    });
                }
            return def;
        },
        show:function(){
            this.dom.show();
            //this.dom.slideDown();
        },
        hide:function(){
            this.dom.hide();
            //this.dom.slideUp();
        },
        destroy:function(){
            this.dom.remove();
        }
    };
    //改写系统默认弹窗
    window._alert=window.alert;
    var alert = function(text,cb){
        var _dialog = new Dialog({
            width:300,
            height:164,
            type:"str",
            dom:[
                '<div class="modal-dialog modal-sm" >',
                    '<div class="modal-content-wrapper">',
                        '<div class="modal-content">',
                            '<div class="modal-header clearfix text-left">',
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> <i name="ok" class="pg-close fs-14"></i></button>',
                                '<h5>来自网页的提醒</h5>',
                            '</div>',
                            '<div style="padding: 20px;">'+text+'</div>',
                        '</div>',
                    '</div>',
                    '<div class="modal-footer">',
                        '<button name="ok" type="button" class="btn btn-primary btn-cons">确定</button>',
                    '</div>',
                '</div>'
            ].join(""),
            ok:function(e,d){
                d.hide();
                cb && cb();
            }
        });
        _dialog.show();
    };
    window._confirm=window.confirm;
    var confirm=function(text,cb){
        var _dialog = new Dialog({
            width:300,
            height:164,
            type:"str",
            dom:[
                '<div class="modal-dialog modal-sm" >',
                    '<div class="modal-content-wrapper">',
                        '<div class="modal-content">',
                            '<div class="modal-header clearfix text-left">',
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> <i name="cancel" class="pg-close fs-14"></i></button>',
                                '<h5>来自网页的提醒</h5>',
                            '</div>',
                            '<div style="padding: 20px;">'+text+'</div>',
                        '</div>',
                    '</div>',
                    '<div class="modal-footer">',
                        '<button name="ok" type="button" class="btn btn-primary btn-cons">确定</button>',
                        '<button name="cancel" type="button" class="btn btn-primary btn-cons">取消</button>',
                    '</div>',
                '</div>'
            ].join(""),
            ok:function(e,d){
                d.hide();
                cb && cb();
            },
            cancel:function(e,d){
                d.hide();
            }
        });
        _dialog.show();
    };
    $.extend(window,{
        Dialog:Dialog,
        alert:alert,
        confirm:confirm
    });
})(window,jQuery);