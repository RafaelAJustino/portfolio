let slideIndex = 1;
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

// Carrossel

function plusSlides(n) {
	showSlides(slideIndex += n)
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {

	const width = slides[0].clientWidth

	carousel.style.width = `${slides.length * 300}px`

	prev.style.display = "block";
	next.style.display = "block";

	if (n == 1) {
		prev.style.display = "none";
	}
	if (n == slides.length) {
		next.style.display = "none";
	}

	carousel.style.transform = `translatex(-${(n - 1) * width}px)`

	for (let index = 0; index < dots.length; index++) {
		dots[index].classList.remove('active')
	}
	dots[n - 1].classList.add('active');
}

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
