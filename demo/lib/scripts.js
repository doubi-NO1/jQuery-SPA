//菜单设置
var sub_sidebar = $(".custom-sidebar"),
    body_dom = $(document.body),
    content = $(".page-content-wrapper .content"),
    cont_width = $(".page-content-wrapper .content .custom-content");

//解决page-sidebar点击时白色间隙
function solveBlank() {
    $(".sidebar-header-controls .visible-lg-inline").click(function() {
        if (!body_dom.hasClass("menu-pin")) {
            content.addClass("solveBlank");
        } else {
            content.removeClass("solveBlank");
        }
    });
}




//菜单提示
function sidebarTooltips() {
    var x = 50;
    var y = -10;

    $(".tooltips").mouseover(function(e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "<\/div>"; //创建 div 元素
        $("body").append(tooltip); //把它追加到文档中
        $("#tooltip").css({
            "top": (e.pageY + y) + "px",
            "left": (e.pageX + x) + "px"
        });
        if (!body_dom.hasClass("menu-pin")) {
            $("#tooltip").show("fast"); //设置x坐标和y坐标，并且显示
        }
    }).mouseout(function() {
        this.title = this.myTitle;
        $("#tooltip").remove(); //移除
    }).mousemove(function(e) {
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            });
    });
}


$(document).ready(function() {
     // Initializes search overlay plugin.
     // Replace onSearchSubmit() and onKeyEnter() with
     // your logic to perform a search and display results
     // $('[data-pages="search"]').search({
     //     searchField: '#overlay-search',
     //     closeButton: '.overlay-close',
     //     suggestions: '#overlay-suggestions',
     //     brand: '.brand',
     //     onSearchSubmit: function(searchString) {
     //         console.log("Search for: " + searchString);
     //     },
     //     onKeyEnter: function(searchString) {
     //         console.log("Live search for: " + searchString);
     //         var searchField = $('#overlay-search');
     //         var searchResults = $('.search-results');
     //         clearTimeout($.data(this, 'timer'));
     //         searchResults.fadeOut("fast");
     //         var wait = setTimeout(function() {
     //             searchResults.find('.result-name').each(function() {
     //                 if (searchField.val().length != 0) {
     //                     $(this).html(searchField.val());
     //                     searchResults.fadeIn("fast");
     //                 }
     //             });
     //         }, 500);
     //         $(this).data('timer', wait);
     //     }
     // });
     //二级菜单点击展开关闭
     sub_sidebar.find(".toggle").click(function() {
         sub_sidebar.toggleClass("open");
         if (sub_sidebar.hasClass("open")) {
             cont_width.addClass("big");
         } else {
             cont_width.removeClass("big");
         }
     });

     solveBlank();
     //取消鼠标移入移出效果   
     $(".page-sidebar").bind("mouseenter mouseover mouseleave", function() {
         body_dom.removeClass("sidebar-visible");
     });

     //菜单提示
     sidebarTooltips();

          //菜单滚动条
     //$(".custom-sidebar-cont").scrollbar();

     var allApi = $(".custom-sidebar-cont .all-api ");
      //allApi.scrollbar();

     // if ($(".all-api-title") != null) {
     //     $(".all-api-title").click(function() {
     //        var naviList = allApi.find('.navi-list');
     //
     //         naviList.slideToggle("fast",function(){
     //              if($(".all-api .navi-list").is(':hidden')) {
     //                console.log(1);
     //                 $(".all-api").css("height",0);
     //              }else{
     //                 console.log(2)
     //                 $(".custom-sidebar-cont .all-api ").scrollbar();
     //                  $(".all-api").css("height","calc(100% - 150px)");
     //              };
     //         });
     //
     //     })
     // };
     
     
     // //菜单滚动条
     // $(".custom-sidebar-cont").scrollbar();

 });
