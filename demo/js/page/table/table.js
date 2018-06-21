(function (window, undefined) {
  var listRender = function () {
    var def = $.Deferred();
    //ajax拿数据,这里直接写死
    var data = {
      list: [{
          id: 1,
          name: '张三',
          ctime: '2018-2-3'
        },
        {
          id: 2,
          name: '李四',
          ctime: '2018-6-4'
        },
        {
          id: 3,
          name: '王五',
          ctime: '2018-7-2'
        },
        {
          id: 4,
          name: '赵六',
          ctime: '2018-9-13'
        }
      ]
    };
    $("#tableListCtx").html(template("tableTemplate", data));
    setTimeout(() => {
      def.resolve();
    }, 1000);
    return def;
  };
  $(function () {
    listRender().done(function () {
      //页面渲染已经完成了，绑定你的事件进行页面交互
      console.log("hello table");
    });
  });
})(window);