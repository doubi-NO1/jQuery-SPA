module.exports = {
  /**
   * blob方式文件上传
   * settings:{
   *   data:{}
   *   url:"",
   *   file:file
   * }
   */
  fileUploader(settings) {
    var def = $.Deferred(),
      s = settings;
    //将参数拼接到url上
    if (s.data) {
      s.url += "?";
      for (var k in s.data) {
        s.url += k + "=" + s.data[k] + "&";
      }
      s.url = s.url.substr(0, s.url.length - 1);
    }
    if (s.file && s.file instanceof File) {
      var reader = new FileReader();
      reader.addEventListener('loadend', () => {
        var upfile = (blob, type) => {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              var text = JSON.parse(xhr.responseText);
              if (text.ec == -100) {
                window.location.href = "login.html";
              } else if (text.ec == -1) {
                def.reject(text);
              } else {
                def.resolve(text);
              }
            }
          };
          xhr.open('POST', s.url);
          xhr.setRequestHeader('Content-Type', type);
          xhr.setRequestHeader('Filename', encodeURIComponent(s.file.name));
          xhr.send(blob);
        };
        upfile(new Blob([reader.result], {
          type: s.file.type
        }), s.file.type);
      });
      reader.readAsArrayBuffer(s.file);
      return def;
    } else {
      return $.ajax(s.url);
    }
  },
  /*
    说    明：随机生成字符串，可用于加密秘钥使用。
    调用示例：var key = Utils.random(5);
  */
  random(length) {
    var key = "",
      seed = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 'i', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    seedlength = seed.length;
    for (var i = 0; i < length; i++) {
      var j = Math.floor(Math.random() * seedlength);
      key += seed[j];
    }
    return key;
  },
  getDomain(){
    return config.domain;
  }
};