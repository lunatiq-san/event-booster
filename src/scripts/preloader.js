$(window).load(function () {
  setTimeout(function () {
    $('.loader').delay(100).fadeOut().remove();
  }, 1000);
});


const btn = $('#top__button');

$(window).scroll(function () {
  if ($(window).scrollTop() > 500) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});
