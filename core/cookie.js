module.exports = {
  /**
    * 设置cookie
    * @param name cookie的名称
    * @param value cookie的值
    * @param day cookie的过期时间
  */
  setCookie(name, value, day) {
    if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000;
      var date = new Date(+new Date() + expires);
      document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
      document.cookie = name + "=" + escape(value);
    }
  },
  /**
   * cookie获取
   * @param name
   * @returns {null}
   */
  getcookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  /**
   * 删除cookie
   * @param cookie name
   */
  delCookie(name) {
    this.setCookie(name, ' ', -1);
  }
};