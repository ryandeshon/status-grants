(function ($) {
  $(document).on('scroll', function (evt) {
    var target = $('.navigation');
    if ($(this).scrollTop() > 400) {
      target.removeClass('navigation__background--top')
      target.addClass('navigation__background--scroll');
    } else {
      target.removeClass('navigation__background--scroll');
      target.addClass('navigation__background--top')
    }
  })
})(jQuery);