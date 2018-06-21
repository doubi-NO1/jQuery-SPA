

const cssLoader = (config) => {
    config.css.forEach( (v)=> {
      $("head").append('<link href="' + config.domain + v + '?v=' + config.version + '" rel="stylesheet" type="text/css">');
    });
  },
  jsLoader = (config) => {
    const def = $.Deferred();
      var flg = [],
        bool = false,
        timestep = (new Date()).getTime();
      config.js.forEach(function (v, i) {
        (function () {
          flg.push(false);
          var script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.setAttribute("charset", "utf-8");
          script.setAttribute("src", config.domain + v + "?timestep=" + timestep);
          script.addEventListener("load", function (e) {
            flg[i] = true;
            bool = flg.every(function (v) {
              return v;
            });
            if (bool === true) {
              def.resolve();
            }
          }, false);
          $("head")[0].appendChild(script);
        })();
      });
      return def;
  },
  htmlLoader = (config) => {
    const def = $.Deferred();
    var ls = $('include'),
      flg = [];
    const loadNext=(i)=> {
      var src = config.domain + $(ls[i]).attr("src");
      $.get(src).done(function (result) {
        $(ls[i]).replaceWith($(result));
        i++;
        if (i < ls.length) {
          loadNext(i);
        } else {
          def.resolve();
        }
      }).fail(function (err) {
        //flg[i]=true;
        console.log(err);
      });
    }
    if (ls.length) {
      loadNext(0);
    } else {
      def.resolve();
    };
    return def;
  };
  
  module.exports={
    cssLoader,
    jsLoader,
    htmlLoader
  };