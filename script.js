$('.hamburguer').click(function (e) {
	e.preventDefault();

	console.log(e.ta);

	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('#header-nav-mb').removeClass('active');
	} else {
		$(this).addClass('active');
		$('#header-nav-mb').addClass('active');
	}
})

$('nav a').click(function (e) {
	e.preventDefault();
	var id = $(this).attr('href'),
		menuHeight = $('nav').innerHeight(),
		targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 300);
});

// // Debounce do Lodash
debounce = function (func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Animação ao Scroll
(function () {
	var $target = $('.scroll'),
		animationClass = 'scroll-start',
		offset = $(window).height() * 3 / 4;

	function animScroll() {
		var documentTop = $(document).scrollTop();

		$target.each(function () {
			var itemTop = $(this).offset().top;
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
				if (this.id == 'skill') {
					// skill();
				}
			} else {
				$(this).removeClass(animationClass);
				if (this.id == 'skill') {
					// cancelSkill();
				}
			}
		});
	}

	animScroll();

	$(document).scroll(debounce(function () {
		animScroll();
	}, 20));
})();