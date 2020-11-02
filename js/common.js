// JavaScript Document
//page Loading
$(window).on('load', function () {
	function _first() {
		return new Promise(function(resolve) {
			//Loading
			var loader = $('.loader');
			loader.fadeOut('slow');
			setTimeout(function () {
				loader.fadeOut('slow');
			}, 3000);
			resolve();
		});
	}
	//hero animetion
	function _second() {
		var $target = $('.hero__img');
		$target.toggleClass('hero__img_filter');
	}
	_first().then(_second);
});

//anchor scroll
$(function () {
	$('a[href^="#"]').click(function () {
		var speed = 500;
		var href = $(this).attr('href');
		var target = $(href == '#' || href == '' ? "html" : href);
		var position = target.offset().top;
		$('html, body').animate({
			scrollTop: position
		}, speed, 'swing');
		return false;
	});
});

$(function () {
	//slick
	$('.slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: '0',
		infinite: false,
		responsive: [{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '18px',
			}
		}]
	});
	
	//Blur
	/*$('#process').backgroundBlur({
		blurAmount : 30,
	});*/
	
	//close nav
	$('.nav__link').on('click', function () {
		var prop = $('#navToggle').prop('checked');
		if (prop) {
			setTimeout(function () {
				$('#navToggle').prop('checked', false);
			}, 150);
		}
	});
});
