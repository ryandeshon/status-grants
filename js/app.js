(function ($) {

  // If javascript enabled, hide the html file
  // input box and replace with a nice button.
  $(document).ready(function () {
    $('.upload_resume_btn').show();
    $('#upload_resume_filename').show();
    $('#upload_resume').hide();
  })

  $(document).ready(function () {
    // Trigger nav bar transition
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

    // Smooth scroll to apply section
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

    // Trigger the language switcher
    $('.language-switcher').on('change', function (e) {
      var selected = $(this).val()
      if (selected === 'en') {
        window.location.href = '/'
      } else {
        window.location.href = selected + '.html'
      }
    })

    // Short more repo fields
    $('.more-repo').on('click', function (e) {
      var parent = $(this).closest('.repo');
      parent.next('.hidden').first().removeClass('hidden');
      $(this).hide();
    })

    // Show more projects
    $('.more-projects').on('click', function (e) {
      var projects = $('.project');
      projects.each(function (i, ele) {
        if ($(ele).hasClass('hidden')) {
          $(ele).removeClass('hidden');
          if ($(ele).hasClass('last')) {
            $('.more-projects').hide();
          }
          return false;
        }
      })
    })

    // Trigger the file upload input box
    $('.upload_resume_btn').on('click', function (e) {
      e.preventDefault();
      $('#upload_resume').trigger('click');
    })

    // Make file change visible
    $('#upload_resume').on('change', function (e) {
      var file = $('#upload_resume').val();
      if (file) {
        var fileName = file.split(/(\\|\/)/g).pop();
        $('#upload_resume_filename').text(fileName);
      }
    })

    // On form submit, prevent default add some metadata, then submit
    function handleSubmit(e) {
      e.preventDefault();
      var context = {};
      context.pageUrl = window.location.href;
      context.pageName = $(document).find("title").text();
      $(this).find('#hs_context').val(JSON.stringify(context));

      if (validateForm()) {
        alert('submit test');
        // $(this).trigger('submit', function () {
        //   alert("You've successfully submitted the form. yay!")
        // });
      }

      // Prevent infinite loop
      $('#applyForm').one('submit', handleSubmit)
    }
    $('#applyForm').one('submit', handleSubmit)

    // Goes through form fields and makes sure they're kosher
    function validateForm () {
      var fields = [
        'firstname',
        'lastname',
        'countryofresidence',
        'email',
        'username',
        'area_of_focus',
        'tell_us_about_your_project',
        'amount_requested'
      ]

      // Clear missing form field border
      if (window.missingFormFields != null && window.missingFormFields) {
        window.missingFormFields.forEach(function (item) {
          $('#' + item).removeClass('error');
        })
      }

      var form = $('#applyForm').serializeArray();
      var missing = [];
      form.forEach(function (item) {
        if (fields.indexOf(item.name) > -1) {
          if (item.value == null || !item.value) {
            missing.push(item.name)
            $('#' + item.name).addClass('error');
          }
        }
      });

      // Check if a resume has been pasted or uploaded
      var upload_resume = $('#upload_resume')[0].files.length
      var paste_resume = $('#paste_resume').val()
      // Check if there are either files attached, or if a resume has been pasted
      if (upload_resume <= 0 && (paste_resume == null || !paste_resume)) {
        missing = missing.concat(['upload_resume', 'paste_resume']);
        $('#paste_resume').addClass('error');
      }

      if (missing.length == 0) {
        return true;
      } else {
        console.log('missing fields', missing);
        // Stash missing fields for next submit
        window.missingFormFields = missing;
        $('#submit-error').removeClass('hidden');
        return false;
      }
    }
  })
})(jQuery);

