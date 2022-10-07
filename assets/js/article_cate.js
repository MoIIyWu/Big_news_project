$(function () {
    const layer = layui.layer
    const form = layui.form
    // 获取文章列表，渲染表格
    function laodCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/cate/list',
            success(res) {
                console.log(res)
                if (res.code !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    laodCateList()

    let index = null
    // 添加文章分类
    $('#btnAdd').on('click', function () {
        index= layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加分类名称',
            content: $('#addDaiLog').html()
        })
    })

    let isEdit = false
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()
        // 判断
        if (isEdit) {
            $.ajax({
                type: 'PUT',
                url: '/my/cate/info',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    laodCateList()
                }
            })
        } else {
            $.ajax({
                type: 'POST',
                url: '/my/cate/add',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    // 重新渲染
                    laodCateList()
                }
            })
        }
        isEdit = false
        // 关闭弹窗
        layer.close(index)
    })

    $('tbody').on('click', '.btnEdit', function () {
        // console.log('修改', $(this).attr('data-id'))
        isEdit = true
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加分类名称',
            content: $('#addDaiLog').html()
        })
        // 回显表单
        const id = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: `/my/cate/info?id=${id}`,
            success(res) {
                if (res.code !== 0) return layer.msg('获取文章分类失败！')
                form.val('addFormFilter', res.data)
            }
        })
    })

    // 删除列表
    $('tbody').on('click', '.btnDel', function () {
        const id = $(this).attr('data-id')
        const result = confirm('确定删除该分类吗？')
        $.ajax({
            type: 'DELETE',
            url: `/my/cate/del?id=${id}`,
            success(res) {
                if (res.code !== 0) return layer.msg('删除文章分类失败！')
                layer.msg('删除文章分类成功！')
                laodCateList()
            }
        })
    })
})