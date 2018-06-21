const { loading } = require('./require');

//# sourceURL=route.js
window.Route = {
	init(map, defaultAction, isRebuild) {
		defaultAction = defaultAction || map['*'] || null;
		if (defaultAction) {
			Route.defaultAction = defaultAction;
			delete map['*'];
		}
		Route.routes = map;
		if (isRebuild === true) {
			return;
		}
		init();
		onchange();
	},
	getParam() {
		var hash = window.location.hash,
			answer = [];
		if (!hash) {
			return answer;
		}
		var url = hash.replace(/.*#/, '');
		for (var path in Route.routes) {
			var reg = getRegExp(path);
			var result = reg.exec(url);
			if (result && result[0] && result[0] != '') {
				answer = result.slice(1);
			}
		}
		return answer;
	},
	routes: {},
	defaultAction: null,
	
};

function onchange(onChangeEvent) {
	var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	var url = newURL.replace(/.*#/, '');
	var found = false;
	for (var path in Route.routes) {
		var reg = getRegExp(path);
		var result = reg.exec(url);
		if (result && result[0] && result[0] != '') {
			var handler = Route.routes[path];
			handler && handler.apply(null, result.slice(1));
			found = true;
			break;
		}
	}
	if (!found && Route.defaultAction) {
		Route.defaultAction();
	}
};

/**
 * 引自backbone，非常牛逼的正则
 * @param route
 * @returns {RegExp}
 */
function getRegExp(route) {
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	route = route.replace(escapeRegExp, '\\$&')
		.replace(optionalParam, '(?:$1)?')
		.replace(namedParam, function (match, optional) {
			return optional ? match : '([^/?]+)';
		})
		.replace(splatParam, '([^?]*?)');
	return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}

/**
 * 这段判断，引用于director：https://github.com/flatiron/director
 */
function init() {
	if ('onhashchange' in window && (document.documentMode === undefined ||
			document.documentMode > 7)) {
		// At least for now HTML5 history is available for 'modern' browsers only
		if (this.history === true) {
			// There is an old bug in Chrome that causes onpopstate to fire even
			// upon initial page load. Since the handler is run manually in init(),
			// this would cause Chrome to run it twise. Currently the only
			// workaround seems to be to set the handler after the initial page load
			// http://code.google.com/p/chromium/issues/detail?id=63040
			setTimeout(function () {
				window.onpopstate = onchange;
			}, 500);
		} else {
			window.onhashchange = onchange;
		}
		this.mode = 'modern';
	} else {
		throw new Error('sorry, your browser doesn\'t support route');
	}
}


/**
 * 封装Route配置的维护
 * 构造函数RouteConfig
 */
function RouteConfig(routes,domain) {
	if (!this instanceof RouteConfig) {
		return new RouteConfig(routes);
	}
	this.domain=domain;
	this.add(routes);
}
RouteConfig.prototype = {
	/**
	 * 添加或修改路由配置
	 * @param k key 必须，类型string,路由名称
	 * @param v value 必须,类型string,要路由的url地址
	 * 示例：
	 * RouteConfig.add("login","temp/login.tpl").then(function(tpl){
	 *    //tpl为请求返回的模版数据
	 *    //写你的数据渲染
	 * });
	 */
	add(k, v) {
		if (typeof k === "string") {
			this[k] = this.setup(k, v);
		} else {
			for (var i in k) {
				this[i] = this.setup(i, k[i]);
			}
		}
		return this;
	},

	/**
	 * 删除某个路由配置项
	 * @param k 要删除的路由名称
	 * @returns {RouteConfig}
	 */
	remove(k) {
		this[k] && delete this[k];
		return this;
	},
	/**
	 * add调用的是setup,用来装载一个路由配置
	 * @param k
	 * @param v
	 * @returns {Function}
	 */
	setup(k, v) {
		return ()=> {
			loading(k, v,this.domain);
		}
	},
	init(config){
		Route.init(this,config.routes["*"]);
	},
	//为了处理#之前?之后的url参数，设置重建路由机制（暂时关闭，需要再行实现）
	// reBuild(params, defaultAction) {
	// 	var route = {};
	// 	for (var k in this) {
	// 		route[params + "/" + k] = this[k];
	// 	}
	// 	Route.init(route, defaultAction, true);
	// }
};

module.exports = RouteConfig;