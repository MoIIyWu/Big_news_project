const layer = layui.layer

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 点击上传按钮上传文件
$('#btnChoose').on('click', function () {
    file.click()
})

$('#file').on('change', function (e) {
    // console.dir(e)
    const filelist = e.target.files
    // 判断用户是否上传了文件
    if (filelist.length === 0) return layer.msg('请选择上传的头像')
    var newImgURL = URL.createObjectURL(filelist[0])
    // console.log(newImgURL)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})