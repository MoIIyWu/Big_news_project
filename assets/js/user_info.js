$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '输入昵称必须是1-6位非空字符串'
            }
        }
    })

    // 获取用户的相关信息
    function initInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                // layer.msg(res.message)
                // console.log(res)
                // 向表单中填充数据
                form.val('userForm', res.data)
            }
        })
    }
    initInfo()

    // 重置用户信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //重新渲染用户信息
        initInfo()
    })

    // 表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'PUT',
            url: '/my/userinfo',
            data: form.val('userForm'),
            success(res) {
                // console.log(res)
                if (res.code !== 0) return layer.msg(res.message)
                window.parent.getUserInfo()
                layer.msg(res.message)
            }
        })
    })
})