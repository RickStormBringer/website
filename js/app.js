// get source data
var getData = function (language, text) {
    $.get('language_v1.json', function (data) {
        if (window.localStorage) {
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
};

var scrollToCon = function (ele) {
    $('#' + ele).get(0).scrollIntoView({behavior: "smooth", block: "start"})
};

$(document).ready(function () {

    // scroll to about
    $('#link-about').click(function () {
        scrollToCon('about')
    });

    // scroll to about
    $('#link-futures').click(function () {
        scrollToCon('futures')
    });

    // judge last choices
    if (window.localStorage) {
        var storage = window.localStorage
        var language = storage.language || 'zh'
        var text = storage.text || '简体中文'
        // change blog address
        $('#chooseLanguage a').text(text)
        language == 'zh' ? $('#news_actions').attr("href", "https://www.jianshu.com/c/c130aec4a7d1") : $('#news_actions').attr("href", "https://medium.com/@wormholecash")
        getData(language, text)
    }

    //toogle languages
    $('#chooseLanguage').click(function () {
        $('#languageOptions').show()
    }).mouseleave(function () {
        $('#languageOptions').hide()
    })

    //toogle downloads
    $('#chooseDownload').click(function () {
        $('#downloadOptions').show()
    }).mouseleave(function () {
        $('#downloadOptions').hide()
    })

    // choose languages
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