$(document).ready(function () {
    //页面加载时判断缓存中是否有数据
    if (window.localStorage){
        console.log('支持localStorage')
        var storage = window.localStorage
        if (storage.json && storage.json.indexOf('{"') > -1){
            var data = JSON.parse(storage.json)
            var language = storage.language || 'zh'
            language == 'zh' ? $('#news_actions').attr("href", "https://www.jianshu.com/c/c130aec4a7d1") : $('#news_actions').attr("href", "https://medium.com/@wormholecash") //切换新闻地址
            $('#chooseLanguage a').text(storage.text)
            $("*[data-item]").each(function () {
                var key = $(this).data('item')
                if (data[key][language]) {
                    $(this).text(data[key][language])
                }
            })
        }
    }
    
    
    $('#chooseLanguage').click(function () { //鼠标移进显示
        $('#languageOptions').show()
    })
  
    $('.js-option').click(function (e) { //点击语言.
        var text = $(this).text()
        e.stopPropagation() //阻止冒泡
        $('#chooseLanguage a').text(text)
        $('#languageOptions').hide()
        var language = $(this).data('lan')
        language == 'zh' ? $('#news_actions').attr("href", "https://www.jianshu.com/c/c130aec4a7d1") : $('#news_actions').attr("href", "https://medium.com/@wormholecash") //切换新闻地址
        $.get('language.json', function (data) {
             console.log(data)
            if (window.localStorage){
                console.log('将语言包缓存在本地')
                var storage = window.localStorage
                storage.language = language  //缓存语言key
                storage.text = text //缓存语言
                storage.json = JSON.stringify(data) //缓存语言包
                // console.log(storage)
                // console.log(window.localStorage)
            }
            $("*[data-item]").each(function () {
                var key = $(this).data('item')
                if (data[key][language]) {
                    $(this).text(data[key][language])
                }
            })
        })
    })
})