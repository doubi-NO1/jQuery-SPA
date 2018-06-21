  const {
    cssLoader,
    jsLoader,
    htmlLoader
  } = require('./loader'),
  RouteConfig = require('./route');

  
module.exports = class App {
  constructor(setting) {
    this.config = Object.assign({}, config, setting);
    this.router = new RouteConfig(this.config.routes,this.config.domain);
    this.document =$(document);
  }
  start() {
    //加载顺序css/html->js->route
    //load js
    const dom = this.document;
    dom.one("jsLoader", () => {
      jsLoader(config).then(() => {
        dom.trigger('initRoute');
      });
    });
    //init route
    dom.one("initRoute", ()=> {
      this.router.init(config);
      this.config.onReady && this.config.onReady.call(this);
    });
    //load css
    cssLoader(config);  
    //load html
    htmlLoader(config).done(() => {
      dom.trigger('jsLoader');
    });
  }
};