$(function () {
    getUserInfo()
    // 点击按钮退出
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地的token值
            // localStorage.clear()  //清除本地所有的值
            localStorage.removeItem('Big_Event_token')
            location.href = '/login.html'
            layer.close(index);
          })
    })
})
const layer = layui.layer
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('Big_Event_token') || '',
        // },
        success(res) {
            // console.log(res)
            // 如果获取到用户信息就渲染用户头像
            if (res.code !== 0) return layer.msg(res.message)
            renderUserAvatar(res)
        },
        error(err){
            console.log(err)     //responseJSON: {code: 1, message: '身份认证失败！'}
        }
    })
}

function renderUserAvatar(res) {
    const name = res.data.nickname || res.data.username
    if (res.data.user_pic) {
        $('.text-avatar').hide()
        $('.user-box img').css('src', res.data.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        // 获取用户名的第一个字符
        
        const char = name.charAt(0).toUpperCase()
        $('.text-avatar').html(char)
    }
    $('.text').html(`欢迎&nbsp;&nbsp;${name}`)
}