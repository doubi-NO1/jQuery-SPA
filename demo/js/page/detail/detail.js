(function (window, undefined) {
  var param = Route.getParam(); //获取参数
  if (!param[1]) {
    //参数有问题，错误处理
  }
  var formRender = function () {
    var def = $.Deferred();
    //ajax拿数据,这里直接写死
    var data = {
      1: {
        id: 1,
        name: '张三',
        ctime: '2018-2-3'
      },
      2: {
        id: 2,
        name: '李四',
        ctime: '2018-6-4'
      },
      3: {
        id: 3,
        name: '王五',
        ctime: '2018-7-2'
      },
      4: {
        id: 4,
        name: '赵六',
        ctime: '2018-9-13'
      }
    };
    $("#detailCtx").html(template("detailRoleForm", data[param[0]]));
    setTimeout(() => {
      def.resolve();
    }, 1000);
    return def;
  }

  $(function () {
    formRender().done(function () {
      //页面渲染已经完成了，绑定你的事件进行页面交互
      console.log("hello detail");
    });
  })
})(window);