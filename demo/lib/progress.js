//# sourceURL=lib/progress.js
(function(window,$,undefined){
    var progress={
        /**
         *
         * @Override
         */
        start: function() {
            var root = $('#lineprog-container');
            if (!root.length) {
                $('body').prepend('<div id="lineprog-container"></div>');
                root = $('#lineprog-container');
            } else {
                root.empty();
            }
            root.append(
                '<div id="line-progress" data-value="1" class="line-progress line-progress-theme" style="width: ' +
                document.body.offsetWidth +
                'px;"><div class="line-progress-inner" style="width: 1' +
                '%;"> <div class="line-progress-percent">1%</div></div></idv>'
            );
        },

        /**
         * 进度条增加值,值域范围( 0 ~ 100 )
         * @return {Integer} 增加值
         *
         * @Override
         */
        increase: function(val) {
            var ele = $('#line-progress');
            var v = parseInt(ele.attr("data-value"));
            if (v == 100) return;
            var p = v + val;
            if (p > 100) {
                p = 100;
            }
            ele.attr("data-value", p);
            ele.find('.line-progress-inner').css("width", p + "%");
        },

        /**
         * 设置值( 0 ~ 100 )
         * @return {int} 设置值
         *
         * @Override
         */
        set: function(val) {
            var ele = $('#line-progress');
            if (val <= 100) {
                ele.attr("data-value", val);
                ele.find('.line-progress-inner').css("width", val + "%");
            }
        },

        /**
         * 进度条结束
         * @return {[type]} [description]
         *
         * @Override
         */
        done: function() {
            setTimeout(function(){
                var ele = $('#line-progress');
                var inner = ele.find('.line-progress-inner');
                var v = parseInt(ele.attr("data-value"));
                for (; v < 100; v++) {
                    inner.css("width", v + "%");
                }
                inner.addClass('line-progress-end');
            },100);
        }
    };
    $.progress=progress;
})(window,jQuery);
