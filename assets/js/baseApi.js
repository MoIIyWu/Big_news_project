$.ajaxPrefilter(function (option) {
    // debugger
    // 将key=value的形式转换成json字符串 http://github.com/zlc1000/big_news51.git
    const format2Json = (sourse) => {
        let target = {}
        sourse.split('&').forEach(el => {
            let kv = el.split('=')
            target[kv[0]] = kv[1]
        })
        return JSON.stringify(target)
    }
    option.url = 'http://big-event-vue-api-t.itheima.net' + option.url,

    // 设置统一的请求头
    option.contentType = 'application/json',
    option.data = format2Json(option.data)
})