    /**
     * 内置的jQuery插件
     */
    $.fn.extend({
      /*
       说    明：遍历所有后代元素
       调用示例：$(selector).eachChildNode(parentNode,callback);
       */
      eachChildNode(parentNode, callback) {
        parentNode.children().each((index) => {
          callback(parentNode.children().eq(index));
          parentNode.children().eq(index).eachChildNode(parentNode.children().eq(index), callback); //递归
        });
      },
      /**
       * 表单取值使用
       * @returns {{}}
       */
      getData() {
        var obj = {};
        this.eachChildNode(this, (t) => {
          var tName = t.prop("name") || t.attr("name");
          if (tName) {
            switch (t.prop("tagName")) {
              case "INPUT":
                if (t.prop("type") == "radio") {
                  if (t.is(":checked")) {
                    obj[tName] = t.val();
                  }
                } else {
                  obj[tName] = t.val();
                }
                break;
              case "SELECT":
                obj[tName] = t.val();
                break;
              case "SPAN":
                obj[tName] = t.text();
                break;
              case "LABEL":
                obj[tName] = t.text();
                break;
              case "DIV":
                obj[tName] = t.text();
                break;
              case "P":
                obj[tName] = t.text();
                break;
              case "A":
                obj[tName] = t.text();
                break;
              case "TEXTAREA":
                obj[tName] = t.val();
                break;
              default:
                break;
            }
          }
        });
        if (type = "obj") {
          return obj;
        } else {
          return JSON.stringify(obj);
        }
      },

      /**
       * 统一加载select下拉选项
       * 对带url的标签进行渲染，默认value=id text=name，如果想要自定义，请在selecte上面写textfield=xxx,valuefield=xxx
       * 例：
       * <select textField="name" valueField="teamid" url="xxx/query.do" defalutText="默认选项" defaultValue="默认值"></select>
       * $("xxx").loadSelect();
       */
      loadSelect() {
        this.find("select[url]").each((i, e) => {
          var url = $(e).attr("url") || "";
          if (url) {
            ((i, e) => {
              var textField = $(e).attr("textField") || "name",
                valueField = $(e).attr("valueField") || "id",
                defaultText = $(e).attr("defaultText") || "--请选择--";
              defaultValue = $(e).attr("defaultValue") || "";
              $.get(utils.getDomain()+url).done((text) => {
                var flg = $(e).attr("defaultOpt") == "true";
                var options = flg ? '<option value="' + defaultValue + '">' + defaultText + '</option>' : '',
                  index = 0;
                text.list.forEach((o, num) => {
                  if ($(e).attr("value") == o[valueField]) {
                    index = ++num;
                  }
                  options += '<option value="' + o[valueField] + '">' + o[textField] + '</option>';
                });
                flg || index--;
                $(e).html(options).find("option").eq(index).attr("selected", true);
              }).fail((err) => {
                console.log(err);
              });
            })(i, e);
          }
        });
      }
    });