/**
 * 获取资源
 * @param url 可以是字符串或数组
 * @returns {deferred} 返回deferred对象
 */
const getResource = (url) => {
    var def = $.Deferred();
    try {
      if (Array.isArray(url)) {
        var flg = [];
        url.forEach((v, i) => {
          flg.push(false);
          ((i) => {
            $.get(v).done(() => {
              var bool = false;
              flg[i] = true;
              bool = flg.every((v) => {
                return v;
              });
              bool && def.resolve();
            });
          })(i);
        });
        return def;
      } else {
        return $.get(url);
      }
    } catch (err) {
      def.reject(err);
    }
  },
  /**
   * app的加载策略
   * @param v
   */
  loading = (k, v, domain) => {
    console.log(k,v);
    getResource(domain + "template/page/" + v + ".tpl").done((text) => {
      try {
        $("#app").html(text).append('<script type="text/javascript" src="' + domain + 'js/page/' + v + '.js"></script>');
      } catch (err) {
        console.log(err);
      }
    }).fail((err) => {
      console.log(err);
    });
  }
module.exports = {
  getResource,
  loading
};