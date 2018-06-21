window.config = {
  domain: './',
  js: [
    'lib/encrypt.js',
    'lib/pagination.js',
    'lib/dialog.js',
    'lib/loading.js',
    'lib/progress.js',
    'lib/bootstrap.min.js',
    'lib/modernizr.custom.js',
    'lib/jquery-ui.min.js',
    'lib/jquery.validate.min.js',
    'lib/jquery.scrollbar.min.js',
    'lib/pages.js',
    'lib/scripts.js',
    'js/layout/head.js',
    'js/layout/left.js',
    'lib/jquery-html5Validate.js'
  ],
  css: [
    'css/com/bootstrap.min.css',
    'css/com/font-awesome.css',
    'css/com/jquery.scrollbar.css',
    'css/com/pages-icons.css',
    'css/com/pages.css',
    'css/com/style.css',
    'css/com/pace-theme-flash.css',
    'css/com/datepicker3.css',
    'css/com/progress.css'
  ],
  routes: {
    "table/table": "table/table",
    "detail/detail/:id": "detail/detail",
    "404":"404/404",
    "*": function(){
      console.log("404 not found");
      window.location.hash="#404"
    }
  }
};