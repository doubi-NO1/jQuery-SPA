<div class="content full-height">
  <!-- START custom-wrapper -->
  <div class="custom-wrapper">
    <!-- START panel  -->
    <div class="panel dataTables_wrapper">
      <div class="panel-body">
        <div class="table-responsive table-with-checkbox">
          <div class="panel-heading add-heading clearfix">
            <div name="add" class="add-label public-primary-label">
              <span class="f">
                <i class="fa fa-plus"></i>
              </span>
            </div>
            <h3 class="pull-left">列表</h3>
          </div>
          <!-- 表格容器 -->
          <table class="table table-striped" id="stripedTable">
            <thead>
              <tr>
                <th width="10%">编号</th>
                <th width="20%">名称</th>
                <th width="25%">时间</th>
                <th width="20%">操作</th>
              </tr>
            </thead>
            <tbody id="tableListCtx">

            </tbody>
          </table>
        </div>
        <div id="pageContainer">
          <!-- 分页信息 -->
        </div>
      </div>
    </div>
    <!-- END panel  -->
  </div>

  <script id="tableTemplate" type="text/html">
    {{each list as value i}}
    <tr>
      <td>{{value.id}}</td>
      <td>{{value.name}}</td>
      <td>{{value.ctime}}</td>
      <td>
        <a name="edit" href="#detail/detail/{{value.id}}">编辑</a>
      </td>
    </tr>
    {{/each}}
  </script>
  <!-- END custom-wrapper -->
</div>