# jQuery-SPA

## 描述

- 基于jQuery的单页应用开发骨架。

## 产生原因
- 之前在很多前端群里面发现非北上广深小伙伴在实际工作中，很多还都以jQuery作为主要技术选型，而基于jQuery的单页应用也比较少见，因此抽空将两年前我们前端用jQuery做单页应用的一些想法整理起来，一来记录一下当初我的成长经历，二来起一个抛砖引玉的作用（其实就是炒冷饭😁 ）。

## 依赖说明

### 依赖的库版本

Version | jQuery | artTemplate
--- | --- | ---
3.x | 😁 |  😁
2.x | 😁 |  😁
1.x | 😁 |  😁

### 什么是artTemplate
- 框架内部使用artTemplate作为默认模板引擎，关于它的更多信息都在[这里](https://github.com/aui/art-template)。

## 快速开始

### 安装
```javascript
//先引入依赖
<script src="jquery.js">
<script src="arttemplate.js"></script>//artTemplate不是必要的，你也可以替换成你喜欢的其他模板引擎
//再引入jQuery-SPA
<script src="jQuery-SPA.min.js"></script>
```

### 初始化
```javascript
$(function(){
  //实例化一个单页应用
  window.app = new App(config);
  //启动单页应用
  app.start();
});
```
- 关于config的更多信息都在[这里](https://github.com/doubi-NO1/jQuery-SPA/blob/master/core/config.js)。


### 关于路由
- 单页应用的核心就是路由，本路由来自backbone,也是参考了[@拂晓风起](https://www.cnblogs.com/kenkofox/p/4650824.html)的博文进行了改造
- 当地址栏hash值发生变化时，路由内部会默认到/template/page根据路由对应的值去加载模板，同时到js/page加载相应的js文件，因此jQuery-SPA对于目录结构是有依赖的。
- 详细的目录结构可以参考[demo](https://github.com/doubi-NO1/jQuery-SPA/tree/master/demo)的目录结构。
- 定义路由:
```javascript
//config/config.js
  window.config = {
    routes: {
      "table/table": "table/table",
      "detail/detail/:id": "detail/detail",//路由传参
      "404":"404/404",
      "*": function(){ //未匹配到时的回调
        console.log("404 not found");
        window.location.hash="#404"
      }
    }
  }
```

## 其他功能

### 操作cookie
```javascript
 /**
  * @param name 名称
  * @param value 值
  * @param day 过期时间
  */
 //设置
 utils.setCookie(name, value, day);
 //获取
 utils.getCookie(name);
 //删除
 utils.delCookie(name);
```

### 内置的jQuery插件
- 框架内置了两个jQuery插件:
- jQuery-getData可以获取任何一个元素中所有写有name属性的子节点的值,你可以这样方便的使用:
```javascript
  $.ajax({
    url:'xxx.com/insert.do',
    data:$("#id").getData()
  }).done(function(){

  });
```
- jQuery-loadSelect可以获取任何一个元素中所有写有url属性的select，并按照url所描述的接口进行渲染:
```html
<div id="selects">
  <select textField="name" valueField="id" url="xxx1/query.do" defalutText="默认选项" defaultValue="默认值"></select>
  <select textField="description" valueField="type" url="xxx2/query.do" defalutText="默认选项" defaultValue="默认值"></select>
  </div>
```
```javascript
  $(function(){
    $("#selects").loadSelect();
  });
```

##在线体验
- 请访问[http://jquery-spa.demos.party](http://jquery-spa.demos.party)
- 你可以再这里[查看](https://github.com/doubi-NO1/jQuery-SPA/tree/master/demo)demo源码

## 提问交流
请到[jQuery-SPA issues](https://github.com/doubi-NO1/jQuery-SPA/issues)异步交流。


## License
MIT