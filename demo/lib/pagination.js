//# sourceURL=lib/pagination.js
/**
 * 分页插件
 * @param settings 对象类型,分页参数
 * @constructor
 */
;(function(){
    function Pagination(dom,settings){
        var _default = {
            limit:10,
            total:0,
            begin:0,
            current:1,//当前
            number:4,//多少个页码 
            limitList:[10,20,50],
            onChange:null
        };
        this.selector=dom.selector;
        this.settings = $.extend({},_default, settings);
        this.dom = dom;
        this.init();
    }

    Pagination.prototype={
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            var s = this.settings;
            var _num = Math.ceil(s.total/s.limit);//共有多少页
            s.number = _num>s.number?s.number:_num;//
            if(Math.ceil(s.total/s.limit)>=1) {
                var head = '',
                    foot = '',
                    body = '',
                    i=0;
                   head += '<div class="row m-b-20" id="sys_page">'
                    + '<div class="col-sm-6 hidden-xs dataTables_info">'
                    + '<span class="m-r-10">'
                    + '每页显示'
                    + '<select  class="select-default" pagination="limit">';
                    s.limitList.forEach(function(e){
                      if(s.limit==e){
                        head+='<option value='+e+' selected="selected">'+e+'</option>';    
                      }else{
                         head+='<option value='+e+'>'+e+'</option>';   
                      }
                    });
                    head +='</select>'
                    + '条'
                    + '</span> 共 <b pagination="total">'+s.total+'</b> 条'
                    + '</div>'
                    + '<div class="col-sm-6 text-right dataTables_paginate paging_bootstrap pagination">'
                    + '<ul>';
               
                 //如果小于4页则全部显示
                if(_num<=4){
                     for(var i=1;i<=_num;i++){
                          if(s.current==i){
                             body+= '<li class="active">'
                                + '<a disabled="disabled" href="javascript:void(0);" pagination="num">' + (i)+ '</a>'
                                + '</li>'
                          } else{
                              body += '<li>'
                                + '<a href="javascript:void(0);"  pagination="num">'+i+'</a>'
                                + '</li>';
                          }
                     }  
                }else{  //若是大于4页则按照省略来处理
                   if(s.current!=1){ //若不是当前页则显示行一页按钮
                          head += '<li class="prev">'
                             + '<a href="javascript:void(0);" class="prev" pagination="prev"> <i class="pg-arrow_left" pagination="prev"></i></a>'
                             + '</li>';
                    }
                   //如果当前页小于等于4并且不是剩余3条的话则显示前面4列中间省略
                   if(s.current<4 && s.current+3 <_num ){
                     for(var i=1;i<=4;i++){
                        if(s.current==i){//是第一页
                            body+= '<li class="active">'
                                + '<a disabled="disabled" href="javascript:void(0);" pagination="num">' + (i)+ '</a>'
                                + '</li>'
                        }else{
                             body += '<li>'
                                + '<a href="javascript:void(0);"  pagination="num">'+i+'</a>'
                                + '</li>';
                        }
                     }
                     body+= '<li>'
                            + '<a disabled="disabled">...</a>'
                            + '</li>';
                   }else{
                        //若是大于4页的时候则前面保留2页2页后面省略中间留4个页数后面再省略后面留最后一页和下一页按钮
                        body += '<li>'
                          + '<a href="javascript:void(0);"  pagination="num">'+1+'</a>'
                          + '</li>'
                          +'<li>'
                          + '<a disabled="disabled">...</a>'
                          + '</li>';

                        //每次点一页后面依次显示当前页在内的4个页面
                        var  begin=s.current;
                        var  end =s.current+4;  

                        //页码到了最后4页则后面显示4个中间省略前面显示1页
                        if(end>_num){
                            end=_num+1;
                            begin=end-4;
                        }
                        for(var i=begin;i<end;i++){
                             if(s.current==i){

                                  body +='<li class="active">'
                                      + '<a disabled="disabled" href="javascript:void(0);" pagination="num">' + (i)+ '</a>'
                                      + '</li>'
                              }
                              else{

                                  body += '<li>'
                                      + '<a href="javascript:void(0);"  pagination="num">'+i+'</a>'
                                      + '</li>';
                              } 
                        }
                        if(s.current + 4 <= _num){
                             body+= '<li>'
                            + '<a disabled="disabled">...</a>'
                            + '</li>';
                        }
                  }
                  if (s.current + 4 <= _num) {//当前页加上最后几页还没有到尾部
                        //还没到尾页
                        foot += '<li>'
                            + '<a href="javascript:void(0);" pagination="num">'+_num+'</a>'
                            + '</li>';
                    }
                 //若当前页不是最后一页了
                 if(s.current!=_num){

                    foot+= '<li class="next">'
                        + '<a href="javascript:void(0);" class="next" pagination="next"> <i class="pg-arrow_right" pagination="next"></i></a>'
                        + '</li>';
                 }
            }
            foot += '</ul>'
                + '</div>'
                + '</div>';
            this.dom.html(head+body+foot);
            }else{//若是0条的时候则每页分页
              var head='';
                  head += '<div class="row m-b-20" id="sys_page">'
                    + '<div class="col-sm-6 hidden-xs dataTables_info">'
                    + '<span class="m-r-10">'
                    + '每页显示'
                    + '<select  class="select-default" pagination="limit">';
                    s.limitList.forEach(function(e){
                      if(s.limit==e){
                        head+='<option value='+e+' selected="selected">'+e+'</option>';    
                      }else{
                         head+='<option value='+e+'>'+e+'</option>';   
                      }
                    });
                    head +='</select>'
                    + '条'
                    + '</span> 共 <b pagination="total">'+s.total+'</b> 条'
                    + '</div>'
                    + '<div class="col-sm-6 text-right dataTables_paginate paging_bootstrap pagination">'
                    + '<ul>';
                   this.dom.html(head);
            }
        },
        bind:function(){
            var self = this;
            this.dom.find("li").off("click").on("click",function(e){
                var tar = $(e.target),
                    name = tar.attr("pagination"),
                    num = name==="num"?parseInt(tar.text()):"",
                    events = self.events();
                    events[name] && events[name](num);
            });

            //改变每页显示的条数
            this.dom.find("select").on("change",function(e){
                 var tar =$(e.target),
                 name=tar.attr("pagination"),   
                 limit=tar.children("option:selected").val(),
                 events = self.events();
                 events[name] && events[name](limit);
            });

        },
        events:function(){
            var self = this,
                s=self.settings;
            return {
                first: function() {
                    s.begin = 0;
                    self.init();
                    s.onChange && s.onChange(s);
                },
                prev: function() {
                    if (s.begin == 0) return;
                    s.begin = s.begin - s.limit < 0?s.begin = 0:s.begin -= s.limit;
                    //修改当前页
                    s.current =s.current-1;
                    self.init();
                    s.onChange && s.onChange(s);
                },
                next: function() {
                    if (s.begin + s.limit > s.total) {
                        var _page = s.total - (s.total % s.limit);
                        if (s.begin == _page) return;
                        s.begin = _page;
                    } else {
                        s.begin += s.limit;
                    }
                    //修改当前页
                    s.current =s.current+1;
                    self.init();
                    s.onChange && s.onChange(s);//渲染表格的数据
                },
                last: function() {
                    s.begin = s.total % s.limit > 0 ? s.total - (s.total % s.limit) : s.begin = s.total - s.limit;
                    self.init();
                    s.onChange && s.onChange(s);
                },
                num:function(num){
                    s.current = num;
                    s.begin = s.limit*(num-1);
                    self.init();
                    s.onChange && s.onChange(s);
                },
                limit:function(limit){
                    s.begin = 0;
                    s.current=1;
                    s.limit=limit;
                    self.init();
                    s.onChange && s.onChange(s);
                }
            }
        },
        reRender:function(){
            this.dom=$(this.selector);
            this.init();
        }
    };

    $.extend($.fn,{
        pagination:function(settings){
            return new Pagination(this,settings);
        }
    });
})();