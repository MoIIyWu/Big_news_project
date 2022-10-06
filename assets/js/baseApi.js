$.ajaxPrefilter(function (option) {
    // debugger
    // 将key=value的形式转换成json字符串 http://github.com/zlc1000/big_news51.git
    const format2Json = (sourse) => {
        let target = {}
        sourse.split('&').forEach(el => {
            let kv = el.split('=')
            // 对值进行解码
            target[kv[0]] = decodeURIComponent(kv[1])
        })
        return JSON.stringify(target)
    }
    option.url = 'http://big-event-vue-api-t.itheima.net' + option.url,

        // 设置统一的请求头
        option.contentType = 'application/json',
        option.data = option.data && format2Json(option.data)

    if (option.url.includes('/my')) {
        option.headers = {
            Authorization: localStorage.getItem('Big_Event_token') || '',
        }
    }

    option.error = function (err) {
        if (err.responseJSON?.code === 1 && err.responseJSON?.message === '身份认证失败！') {
            localStorage.clear()
            location.href = '/login.html'
        }
    }
})