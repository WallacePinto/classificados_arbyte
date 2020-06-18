$(function() {
    "use strict";

    var $header = $('header'),
        $sticky = $header.find('.sticky'),
        $btns_group_demo = $('main.single-item .btns-group-demo'),
        $slider = $('.slider'),
        $isotope = $('.isotope'),
        addResizeCarousels_timeout;

    //sticky
    function toggle_sticky() {
        var btns_t = $btns_group_demo.get(0).getBoundingClientRect().top;

        if(btns_t < 0) $sticky.addClass('active');
        else $sticky.removeClass('active');
    };

    //slider
    function addResizeCarousels(selector, breakpoint, options) {
        if(!selector) return false;

        var $carousels = $(selector),
            breakpoint = breakpoint || 768,
            options = options || null;

        var windW = window.innerWidth || $(window).width();

        if (windW < breakpoint) {
            $carousels.each(function() {
                var $this = $(this);

                $this.not('.slick-initialized').slick(options);

                var $slick_track = $this.find('.slick-track'),
                    $slick_slides = $slick_track.find('.slick-slide'),
                    slick_h = $slick_track.height();

                $slick_slides.each(function () {
                    var $this = $(this);

                    $this.css({ marginTop: '0'});

                    var slide_h = $this.height();

                    if(slide_h < slick_h) {
                        $this.css({ marginTop: (slick_h - slide_h)/2 + 'px'});
                    }
                });
            });
        } else {
            $carousels.each(function() {
                var $this = $(this);

                if ($this.hasClass('slick-initialized'))
                    $this.slick('unslick');

                $this.find('.slick-slide').removeAttr('style');
            });
        }
    };

    //change payment
    var $payment_method = $('.payment-method');
    if($payment_method.length) {
        $payment_method.find('> div').on('click', function () {
            $payment_method.find('> div').removeClass('active');
            $(this).addClass('active');
        });
    }

    //slider
    if($slider.length) {
        $slider.slick({
            dots: false,
            infinite: false,
            autoplay: true,
            speed: 600,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            centerPadding: '0',
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 780,
                    settings: {
                        centerMode: false,
                        variableWidth: false,
                        adaptiveHeight: true,
                        autoplay: false
                    }
                }
            ]
        });
    }

    //isotope
    function isotopeInit() {
        var $navigation = $('.navigation-isotope');

        $navigation.find('.button').on('click', function (e) {
            var $this = $(this);

            $this.parent().children().removeClass('is-checked');
            $this.addClass('is-checked');

            var selector = $this.attr('data-filter');

            $isotope.isotope({
                itemSelector: '.block',
                layoutMode: 'packery',
                filter: selector
            });

            e.stopPropagation();
            e.preventDefault();
            return false;
        });
        $navigation.find('.button').first().trigger('click');
    };

    if($('video').length) {
        $('video').mediaelementplayer({
            alwaysShowControls: false,
            videoVolume: 'horizontal',
            features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
            enableKeyboard: true,
            pauseOtherPlayers: true,
            enableAutosize: true
        });
    }

    $(window).on('resize', function() {

        clearTimeout(addResizeCarousels_timeout);

        addResizeCarousels_timeout = setTimeout(function () {
            addResizeCarousels(
                '.brands-carousel',
                1025,
                {
                    dots: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 380,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                }
            );
        }, 100);
    });

    $(window).trigger('resize');

    $(window).on('scroll', function () {
        if($sticky.length && $btns_group_demo.length) {
            toggle_sticky();
        }
    });

    $(window).on('load', function () {
        if($isotope.length) {
            isotopeInit();
        }
    });
});

$('.list-inline a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;
      
    $('html, body').animate({ 
      scrollTop: targetOffset - 100
    }, 500);
  });


  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.fontSize = "30px";
  } else {
    document.getElementById("header").style.fontSize = "90px";
  }
}


// swiper - Carrossel das logos

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 5,
  spaceBetween: 20,
  centeredSlides: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
    on: {
        resize: function() {
            swiper.changeDirection(getDirection());
        }
    }
});

function getDirection() {
    var windowwidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}




(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});


//carrossel de jobs dos alunos
