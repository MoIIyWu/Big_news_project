$(function () {
    $('#go2Reg').on('click', function () {
        $('.login-wrap').hide()
        $('.reg-wrap').show()
    })
    $('#go2Login').on('click', function () {
        $('.reg-wrap').hide()
        $('.login-wrap').show()
    })

    // 获取到layui身上的form对象
    // console.log(layui)   //里面有form对象
    const form = layui.form
    const layer = layui.layer
    // 添加自定义的校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 验证输入密码框和确认密码框的值是否一致
            if ($('#password').val() !== value) {
                return '两次密码不一致'
            }
            // if($('[name=password]').val() !== value){
            //     return '两次密码不一致'
            // }


            // http://big-event-vue-api-t.itheima.net
        }
    })

    // 将key=value的形式转换成json字符串
    // const format2Json = (sourse) => {
    //     let target = {}
    //     sourse.split('&').forEach(el => {
    //         let kv = el.split('=')
    //         target[kv[0]] = kv[1]
    //     })
    //     return JSON.stringify(target)
    // }

    // 给表单添加事件
    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reg',
            // contentType: 'application/json',
            // data: JSON.stringify({
            //     username: $('#reg-form [name=username]').val(),
            //     password: $('#reg-form [name=password]').val(),
            //     repassword: $('#reg-form [name=repassword]').val(),
            // }),
            data:$(this).serialize(),
            success(res) {
                if(res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('#go2Login').click()
            }
        })
    })

    // 登录
    $('#login-form').on('submit',function(e){
        e.preventDefault()
        // console.log('ok')
        $.ajax({
            type: 'POST',
            url: '/api/login',
            contentType: 'application/json',
            data:$(this).serialize(),
            success(res) {
                console.log(res)
                if(res.code !== 0) return layer.msg(res.message)
                // 如果登录成功，将token值保存到本地，跳转到主页
                localStorage.setItem('Big_Event_token',res.token)
                // token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNjEsInVzZXJuYW1lIjoiYmgiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwiaWF0IjoxNjY0NDM1MTAwLCJleHAiOjE2NjQ0NzExMDB9.ccLvb2qOPgWFHe1WLMHnoLKNIAK7Kzf_GfFNqNUh1iM"
                location.href = '/home.html'
            }
        })
    })
})