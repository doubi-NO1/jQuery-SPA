//# sourceURL=lib/loading.js
(function(window,$,undefined){
    /**
     * loading
     * @constructor
     */
    function Loading(){
        if(!(this instanceof Loading)){
            return new Loading();
        }
        if(!$("#loading").length){
            var element=$([
                    '<div style="display:none;" id="loading">',
                        '<div class="loading-mask"></div>',
                            '<div class="loading-content">',
                                '<img style="width:80px;height:80px;" src="'+BASE.SITE+'img/com/progress/balls.svg" mce_src="loading.gif" alt="loading.." />',
                                '<p style="text-align: center;width: 90px;font-size: larger;color:#006fbb">loading...</p>',
                            '</div>',
                    '</div>'
                ].join("")),
                maskCss = {
                    'position': 'fixed',
                    'width': '100%',
                    'height': '100%',
                    'top': '0',
                    'left': '0',
                    'right': '0',
                    'bottom': '0',
                    'margin': 'auto',
                    'text-align': 'center',
                    'font-style': 'normal',
                    'font-variant': 'normal',
                    'font-weight': 'bold',
                    'font-stretch': 'normal',
                    'font-size': '11px',
                    'line-height': 'normal',
                    'font-family': 'Arial, Helvetica, sans-serif',
                    'z-index': '1000',
                    //'background': 'black',
                    'opacity': '.5'
                },
            contentCss={
                    'position': 'fixed',
                    'margin': 'auto',
                    'left': '0',
                    'right': '0',
                    'top': '0',
                    'bottom': '0',
                    'width': '150px',
                    'height': '100px',
                    'z-index':'1001'
                };
            $("body").append(element);
            element.find(".loading-mask").css(maskCss);
            element.find(".loading-content").css(contentCss);
        }
        this.dom = $("#loading");
    }
    Loading.prototype={
        show:function(){
            this.dom.show();
        },
        hide:function(){
            this.dom.hide();
        }
    };
    //导出
        $.loading = Loading;
})(window,jQuery);
