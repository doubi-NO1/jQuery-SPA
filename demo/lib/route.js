﻿//# sourceURL=route.js
(function(root) {

	var Route = root.Route = {
		init: function(map,defaultAction,isRebuild) {
			defaultAction = defaultAction || map['*'] || null;
			if (defaultAction) {
				Route.defaultAction = defaultAction;
				delete map['*'];
			}
			Route.routes = map;
			if(isRebuild===true){
				return;
			}
			init();
			onchange();
		},
        routes: {},
		defaultAction: null
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
	}

    Route.getParam=function(){
        var newURL = window.location.hash,
            answer=[];
        if(!newURL){
            return answer;
        }
        var url = newURL.replace(/.*#/, '');
        for (var path in Route.routes) {
            var reg = getRegExp(path);
            var result = reg.exec(url);
            if (result && result[0] && result[0] != '') {
                answer=result.slice(1);
            }
        }
        return answer;
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
			.replace(namedParam, function(match, optional) {
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
				setTimeout(function() {
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


})(window);
