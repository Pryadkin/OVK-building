$(function() {

  $(".slide-one").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    margin:20,
    responsive:{
           0:{
               items:1
           },
           520:{
               items:1
           },
           560:{
               items:2
           },
           768:{
               items:2
           },
           992:{
               items:3
           },
           1200:{
               items:4
           }
       }
  });

  $(".slide-two").owlCarousel({
    loop: true,
    margin: 50,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive:{
           0:{
               items:1
           },
           520:{
               items:1
           },
           560:{
               items:2
           },
           768:{
               items:2
           },
           992:{
               items:3
           },
           1200:{
               items:4
           }
       }
  });


  ymaps.ready(init);
  function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.711132, 37.618008],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 16
    });
    var myPlacemark = new ymaps.Placemark([55.711132, 37.618008]);
    myMap.geoObjects.add(myPlacemark);
  }


  function heightses() {
    $('.s-direct .item-vertical p').height('auto').equalHeights();
    $('.testimonials-head').height('auto').equalHeights();
    $('.testimonials-desc').height('auto').equalHeights();
  }
  $(window).resize(function() {
    heightses();
  });
  heightses();


  $("a[href='#callback']").click(function() {
    // Для админа
    var dataForm = $(this).data("form")
    // Для посетителя сайта
    var dataText = $(this).data("text");
    $(".form-callback h4").text(dataText);
    $(".form-callback [name=admin-data]").val(dataForm);
  });


  // -----------------magnificPopup для портфолио----------------------
  $(".portfolio-item").each(function(e) {
    var th = $(this);

    th.attr("href", "#portfolio-img-" + e) // Добавляем ссылку #portfolio-img-0
      .find(".portfolio-popup")
        .attr("id", "portfolio-img-" + e);   // Ссылка ведет на portfolio-popup - id
  });

  $(".portfolio-item, .callback").magnificPopup({
    type: 'inline',
    mainClass: 'my-mfp-zoom-in',
    removalDelay: 300
  });






  //---------------magnificPopup для галереи-------------
  $('.mfp-gallery').each(function() {
    $(this).magnificPopup({
  	  mainClass: 'mfp-zoom-in',
  	  delegate: 'a',
  	  type: 'image',
  	  tLoading: '',
  	  gallery:{
  		  enabled:true,
  	  },
  	  removalDelay: 300,
  	  callbacks: {
  		  beforeChange: function() {
  			  this.items[0].src = this.items[0].src + '?=' + Math.random();
        },
  		  open: function() {
  			  $.magnificPopup.instance.next = function() {
    				var self = this;
    				self.wrap.removeClass('mfp-image-loaded');
    				setTimeout(function() { $.magnificPopup.proto.next.call(self);   }, 120);
  			  }
    			$.magnificPopup.instance.prev = function() {
    				var self = this;
    				self.wrap.removeClass('mfp-image-loaded');
    				setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
  			  }
  		  },
  		  imageLoadComplete: function() {
  			  var self = this;
  			  setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
  		  }
  	  }
    });
  });


  $(".mouse-icon").click(function() {
    $("html, body").animate({
      scrollTop : $(".s-adv").offset().top
    }, 1000)
  })

// ---числа увеличиваются в блюре---------------------------
  $(".s-adv").waypoint(function() {
    $({blurRadius: 5}).animate({blurRadius: 0}, {
	duration: 1200,
	easing: 'swing',
	step: function() {
		$(".s-adv-item h3 span").css({
			"-webkit-filter": "blur("+this.blurRadius+"px)",
			"filter": "blur("+this.blurRadius+"px)"
		});
	}
});
var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
$(".s-adv-item h3 span").each(function() {
	var tcount = $(this).data("count");
	$(this).animateNumber({ number: tcount,
		easing: 'easeInQuad',
		"font-size": "40px",
		numberStep: comma_separator_number_step},
		1200);
  });
  this.destroy();  // блюр на цифрах работает только при первом скроле сайта.
  }, {
    offset: '70%'
  });


  let getToggleMnu;
  function getToggleMnuMainFunc(){
    let _this;

    getToggleMnu = function() {
      $(_this).toggleClass("on");
      $(".toggle-mnu").parent().next().next().find(".main-mnu").slideToggle();
      return false;
    };

    $(".toggle-mnu").click(function() {
      _this = this;
      getToggleMnu();
    });

    $(".main-foot .toggle-mnu").click(function() {
      $("html, body").animate({scrollTop: $(document).height() + 200}, "slow");
        return false;
    });
  }
  getToggleMnuMainFunc();



  function getAnchor(){
    _this = this;
    $('.main-mnu a[href^="#"]').click(function(){
      let target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
      getToggleMnu();
    })
  }
  getAnchor();


// При клике на top страница листается вверх----------------
  $("body").on("click", ".top", function() {
    $("html, body").animate({scrollTop: 0}, "slow");
      return false;
  });

// Создание класса top для кнопки вверх---------------------
  $("body").append('<div class="top"><i class="fa fa-angle-double-up"></i>');


  //E-mail Ajax Send
  $("form.contact-form").submit(function() { //Change
  var th = $(this);
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function() {
   $(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
    setTimeout(function() {
      $(th).find('.success').removeClass('active').fadeOut();
      th.trigger("reset");
    }, 2000);
  });
  return false;
});

  $("#callback").submit(function() { //Change
  var th = $(this);
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function() {
    $('.form-callback .success_popup').addClass('active');
    setTimeout(function() {
      $('.form-callback .success_popup').removeClass('active');
      th.trigger("reset");
      $.magnificPopup.close();
    }, 2000);
  });
  return false;
});





  $(window).scroll(function() {
    if($(this).scrollTop() > $(this).height()) {
      $(".top").addClass("active");
    } else {
      $(".top").removeClass("active");
    }
  });


});
