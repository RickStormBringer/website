// get source data
var getData = function(language, text) {
    $.get('language.json', function (data) {
       if (window.localStorage){
           var storage = window.localStorage
           storage.language = language  //storage language
           storage.text = text //storage text
       }
       $("*[data-item]").each(function () {
           var key = $(this).data('item')
           if (data[key][language]) {
               $(this).text(data[key][language])
           }
       })
   })
}

$(document).ready(function () {
    // judge last choices
    if (window.localStorage){
        var storage = window.localStorage
        var language = storage.language || 'zh'
        // change blog address
        $('#chooseLanguage a').text(storage.text)
        language == 'zh' ? $('#news_actions').attr("href", "https://www.jianshu.com/c/c130aec4a7d1") : $('#news_actions').attr("href", "https://medium.com/@wormholecash")
        getData(language, storage.text)
    }
    
    
    $('#chooseLanguage').click(function () { 
        $('#languageOptions').show()
    })
  
    // choose language
    $('.js-option').click(function (e) { 
        var text = $(this).text()
        e.stopPropagation() //stop propagation
        $('#chooseLanguage a').text(text)
        $('#languageOptions').hide()
        var language = $(this).data('lan')
        language == 'zh' ? $('#news_actions').attr("href", "https://www.jianshu.com/c/c130aec4a7d1") : $('#news_actions').attr("href", "https://medium.com/@wormholecash") //切换新闻地址
        getData(language, text)
    })
})