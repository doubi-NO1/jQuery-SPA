<div class="content full-height">
    <!-- START custom-wrapper -->
    <div class="custom-wrapper">
        <!-- START panel  -->
        <div class="panel dataTables_wrapper">
            <div class="panel-heading add-heading clearfix">
                <div class="add-label public-primary-label"> <span class="f"> <i class="fa fa-plus"></i></span> </div>
                <h3 class="pull-left">操作员组编辑</h3>
            </div>
            <div class="panel-body padding-20">
                <div id="detailCtx" class="form-horizontal">

                </div>
            </div>
        </div>
        <!-- END panel  -->
    </div>
    <!-- END custom-wrapper -->
</div>
<script type="text/html" id="detailRoleForm">
    <div class="form-group">
        <label class="col-sm-2 control-label">序号：</label>
        <div class="col-sm-8">
            <input value="{{id}}" name="name" type="text" class="form-control w-400 inline" placeholder="请输入名称">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">名称：</label>
        <div class="col-sm-8">
            <input value="{{name}}" name="name" type="text" class="form-control w-400 inline" placeholder="请输入名称">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">时间：</label>
        <div class="col-sm-8">
            <textarea name="ctime" rows="5" class="form-control w-400" placeholder="请输入描述">{{ctime}}</textarea>
        </div>
    </div>
</script>