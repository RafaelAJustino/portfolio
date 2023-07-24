let slideIndex = 1;
let touchstart;
let touchmove;
const container = document.querySelector(".container");
const carousel = document.querySelector(".slideshow-container");
const slides = document.getElementsByClassName("mySlides");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsDiv = document.querySelector(".dots-div");
const dots = document.getElementsByClassName("dot");

$('.hamburguer').click(function (e) {
	e.preventDefault();

	console.log(e.ta);

	if ($(this).hasClass('active-btn')) {
		$(this).removeClass('active-btn');
		$('#header-nav-mb').removeClass('active-btn');
	} else {
		$(this).addClass('active-btn');
		$('#header-nav-mb').addClass('active-btn');
	}
})

$('nav a').click(function (e) {
	e.preventDefault();
	var id = $(this).attr('href'),
		menuHeight = $('nav').innerHeight(),
		targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - 80
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
		offset = $(window).height() * 8 / 10;

	function animScroll() {
		var documentTop = $(document).scrollTop();

		$target.each(function () {
			var itemTop = $(this).offset().top;
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			}
			// else {
			// 	$(this).removeClass(animationClass);
			// }
		});
	}

	animScroll();

	$(document).scroll(debounce(function () {
		animScroll();
	}, 20));
})();

// Carrossel

function plusSlides(n) {
	showSlides(slideIndex += n)
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	for (let index = 0; index < dots.length; index++) {
		dots[index].classList.remove('active')
	}

	const width = slides[0].clientWidth

	carousel.style.width = `${slides.length * 300}px`

	// prev.style.display = "block";
	// next.style.display = "block";

	// if (n == 1) {
	// 	prev.style.display = "none";
	// }
	// if (n == slides.length) {
	// 	next.style.display = "none";
	// }

	carousel.style.transform = `translatex(-${(n - 1) * width}px)`

	dots[n - 1].classList.add('active');
}

carousel.addEventListener('touchstart', function (e) {
	touchstart = e.targetTouches[0].clientX;
})

carousel.addEventListener('touchmove', function (e) {
	touchmove = e.targetTouches[0].clientX;
})

carousel.addEventListener('touchend', function (e) {

	if (slideIndex >= 1 && slideIndex < slides.length) {
		if (touchstart + 50 >= touchmove) {
			showSlides(slideIndex += 1)
		}
	}

	if (slideIndex > 1 && slideIndex <= slides.length) {
		if (touchstart <= touchmove + 50) {
			showSlides(slideIndex -= 1)
		}
	}
})

window.onload = () => {
	for (let i = 1; i <= slides.length; i++) {
		const span = document.createElement('span');
		span.classList.add('dot');
		span.addEventListener("click", function () {
			currentSlide(i);
		});

		dotsDiv.appendChild(span);
	}

	showSlides(1);
}
