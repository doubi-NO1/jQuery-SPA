//这里是默认配置，你也可以用新的设置覆盖它，你也可以通过全局window.config访问配置
export default {
  domain:'//',//资源加载的主域
  js:[],
  css:[],
  selector:'#app',
  routes:{
    defaultAction(){}
  },
  onReady:null
};