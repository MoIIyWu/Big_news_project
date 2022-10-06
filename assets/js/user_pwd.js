$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能一致的验证
        samePwd: function (value) {
            if (value === $('[name=old_pwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        // 再次确认新密码与新密码的内容要一致的验证
        rePwd: function (value) {
            if (value !== $('[name=new_pwd]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'PATCH',
            url: '/my/updatepwd',
            data: form.val('pwdForm'),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 修改表单成功后清空表单
                // $('#btnReset').click()
                $('.layui-form')[0].reset()
            }
        })
    })
})