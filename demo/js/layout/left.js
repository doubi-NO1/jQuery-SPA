//# sourceURL=left.js
(function(window,$,undefined){
    $(function(){
        $(".menu-items").on("click",function(e){
            e.stopPropagation();
            var nowOne = $(e.target);
            $(".active").removeClass("active");
            nowOne.parent().addClass("active");
        });
    });
})(window,jQuery);