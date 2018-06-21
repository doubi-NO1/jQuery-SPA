(function(window,undefined){

    var dic = "3Z2OMwRTvWcJ8j4u7pnrt65HAefIV9xSPqNCsmbEloYygXKzaULGkQhD0FB1di-_=";

    function u(str) {
        var out = "",
            i = 0,
            len = str.length,
            c,
            char2, char3;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx 10xx xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }

    function de(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            enc1 = dic.indexOf(input.charAt(i++));
            enc2 = dic.indexOf(input.charAt(i++));
            enc3 = dic.indexOf(input.charAt(i++));
            enc4 = dic.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(chr1);

            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }
        }
        return output.toString();
    }


    /**
     * 前端参数简单加密处理
     * 采用des加密算法
     * 参考资料：http://blog.sina.com.cn/s/blog_77f72c070101btkf.html
     */
    $.extend($.utils,{
        /**
         * 加密
         * @param str 明文
         * @param pwd 秘钥
         * @returns {string} 密文
         */
        encrypt:function(str) {
            var prand = "",
                pwd = Utils.RandomKey(3);
            for(var i=0; i<pwd.length; i++) {
                prand += pwd.charCodeAt(i).toString();
            }
            var sPos = Math.floor(prand.length / 5);
            var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
            var incr = Math.ceil(pwd.length / 2);
            var modu = Math.pow(2, 31) - 1;
            if(mult < 2) {
                alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
                return null;
            }
            var salt = Math.round(Math.random() * 1000000000) % 100000000;
            prand += salt;
            while(prand.length > 10) {
                prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
            }
            prand = (mult * prand + incr) % modu;
            var enc_chr = "";
            var enc_str = "";
            for(var i=0; i<str.length; i++) {
                enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
                if(enc_chr < 16) {
                    enc_str += "0" + enc_chr.toString(16);
                } else enc_str += enc_chr.toString(16);
                prand = (mult * prand + incr) % modu;
            }
            salt = salt.toString(16);
            while(salt.length < 8)salt = "0" + salt;
            enc_str += salt;
            return pwd+enc_str;
        },

        /**
         * 解密
         * @param str 密文
         * @param pwd 秘钥
         * @returns {string} 明文
         */
        decrypt:function(str) {
            if(str == null || str.length < 8) {
                return;
            }
            var prand = "",
                pwd = str.substr(0,3);
            str=str.substr(3);
            for(var i=0; i<pwd.length; i++) {
                prand += pwd.charCodeAt(i).toString();
            }
            var sPos = Math.floor(prand.length / 5);
            var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
            var incr = Math.round(pwd.length / 2);
            var modu = Math.pow(2, 31) - 1;
            var salt = parseInt(str.substring(str.length - 8, str.length), 16);
            str = str.substring(0, str.length - 8);
            prand += salt;
            while(prand.length > 10) {
                prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
            }
            prand = (mult * prand + incr) % modu;
            var enc_chr = "";
            var enc_str = "";
            for(var i=0; i<str.length; i+=2) {
                enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
                enc_str += String.fromCharCode(enc_chr);
                prand = (mult * prand + incr) % modu;
            }
            return enc_str;
        },
        bval:function(str) {
            return str &&  u(de(str));//JSON.parse(u(de(str)))
        }
    });
})(window);
