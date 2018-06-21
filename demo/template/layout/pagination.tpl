
<div class="row m-b-20" id="sys_page">
    <input id="curPage" name="curPage" type="hidden" value="1">
    <input id="lastPage" type="hidden" value="215">
    <div class="col-sm-6 hidden-xs dataTables_info">
                            <span class="m-r-10">
                                每页显示
                                <select  class="select-default" pagination="limit">
                                    <option value="10" selected="selected">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                条
                             </span> 共 <b pagination="total">{{total}}</b> 条
    </div>
    <div class="col-sm-6 text-right dataTables_paginate paging_bootstrap pagination">
        <ul>
            <li class="active">
                <a disabled="disabled" pagination="firstnum">1</a>
            </li>
            <li>
                <a href="javascript:void(0);"  pagination="num">2</a>
            </li>
            <li>
                <a disabled="disabled">...</a>
            </li>
            <li>
                <a href="javascript:void(0);" name="lastnum">215</a>
            </li>
            <li class="next">
                <a href="javascript:void(0);" class="next" pagination="next"> <i class="pg-arrow_right"></i>
                </a>
            </li>
        </ul>
    </div>
</div>