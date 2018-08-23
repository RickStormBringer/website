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
        window.location.href='/'+language;
        Cookies.set('whc_lang',language)
    })
})