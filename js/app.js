(function ($) {
  $(document).on('scroll', function () {
    var target = $('.navigation');
    if ($(this).scrollTop() > 400) {
      target.removeClass('navigation__background--top')
      target.addClass('navigation__background--scroll');
    } else {
      target.removeClass('navigation__background--scroll');
      target.addClass('navigation__background--top')
    }
  })

  $('.apply-btn').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({
      scrollTop: $("#apply").offset().top - 100
    }, 2000);
  })

  $('.faq-btn').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({
      scrollTop: $("#faq").offset().top - 100
    }, 2000);
  })

  // Toggle FAQ block open and closed
  $('.question__block').on('click', function (e) {
    var toggle = $(this).data('toggle')
    console.log(toggle)
    if (toggle) {
      $(this).data('toggle', false)
      $(this).find('.question__block--body').hide()
      $(this).find('.question__block--carat').removeClass('flip')
      $(this).find('.question__block--carat').addClass('flip-reverse')
    } else {
      $(this).data('toggle', true)
      $(this).find('.question__block--body').show()
      $(this).find('.question__block--carat').removeClass('flip-reverse')
      $(this).find('.question__block--carat').addClass('flip')
      $('html, body').animate({
        scrollTop: $(this).offset().top - 200
      }, 1000);
    }
  })

  $('.language-switcher').on('change', function (e) {
    var selected = $(this).val()
    if (selected === 'en') {
      window.location.href = '/'
    } else {
      window.location.href = selected + '.html'
    }
  })
})(jQuery);