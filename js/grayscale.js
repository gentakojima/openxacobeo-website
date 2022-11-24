/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});
$(window).trigger("scroll");

window.window_format = "horizontal";

// Fullscreen video
function dimensionFunction() {

    if ($('.video-bg').height() <= $(window).height()) {
        $('.video-bg').height($(window).height());
        $('.video-bg').width('auto');
    } else {
        $('.video-bg').width($(window).width());
        $('.video-bg').height('auto');
    }

    if ($('.video-bg').width() <= $(window).width()) {
        $('.video-bg').width($(window).width());
        $('.video-bg').height('auto');
    } else {
        $('.video-bg').height($(window).height());
        $('.video-bg').width('auto');
    }

    if ($('.video-bg').width() > $(window).width()) {
      let howmuch = ( $('.video-bg').width() - $(window).width() ) / 4;
      $('.video-bg').css("transform",`translateX(-${howmuch}px)`);
    }
    else{
      $('.video-bg').css("transform","translateX(0)");
    }

    if(window.window_format == "horizontal" && $(window).width()<$(window).height()){
      window.window_format = "vertical";
      $(".video-bg").get(0).pause();
      $(".video-bg-mp4").attr("src","/video/intro-bg-vertical.mp4");
      $(".video-bg-webm").attr("src","/video/intro-bg-vertical.webm");
      $(".video-bg").get(0).load();
      $(".video-bg").get(0).play();
    }
    else if(window.window_format == "vertical" && $(window).width()>=$(window).height()){
      window.window_format = "horizontal";
      $(".video-bg").get(0).pause();
      $(".video-bg-mp4").attr("src","/video/intro-bg.mp4");
      $(".video-bg-webm").attr("src","/video/intro-bg.webm");
      $(".video-bg").get(0).load();
      $(".video-bg").get(0).play();
    }

}

// Execute on window resize, on video ready, on document ready and after 500ms just in case
$(window).resize(dimensionFunction);
dimensionFunction();
window.setTimeout(dimensionFunction, 500);
if($(".video-bg").length > 0){
  $(".video-bg").get(0).onloadstart = dimensionFunction;
  $(".video-bg").get(0).onplay = dimensionFunction;
}
$(function(){
  dimensionFunction();
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: Math.floor($($anchor.attr('href').substring($anchor.attr('href').indexOf("#"))).offset().top - 50)
        }, 1000);
        history.pushState({}, "", $anchor.attr('href'));
        return false;
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

function checkNavbarCollapsedOpened(){
  if($(".navbar-main-collapse").hasClass("in")||$(".navbar-main-collapse").hasClass("collapsing")){
    $(".navbar-fixed-top").addClass("navbar-opened");
  }
  else{
    $(".navbar-fixed-top").removeClass("navbar-opened");
  }
}

$(".navbar-toggle").click(function(){
  window.setTimeout(checkNavbarCollapsedOpened, 10);
  window.setTimeout(checkNavbarCollapsedOpened, 30);
  window.setTimeout(checkNavbarCollapsedOpened, 60);
  window.setTimeout(checkNavbarCollapsedOpened, 200);
  window.setTimeout(checkNavbarCollapsedOpened, 400);
});

// remove the focused state after click,
// otherwise bootstrap will still highlight the link
$("a").mouseup(function(){
    $(this).blur();
});

// Slider
window.CADDYBOOK_OFFSET = 0;
window.CADDYBOOK_POSITION = 0;
function repositionCaddybookImages(){
  let local_offset = -CADDYBOOK_OFFSET;
  $(".caddybook .slider").css("transform",`translateX(${local_offset}px)`);
}
function hideShowArrows(){
  if(CADDYBOOK_POSITION==0) $(".caddybook .leftbutton").addClass("disabled");
  else $(".caddybook .leftbutton").removeClass("disabled");
  if(CADDYBOOK_POSITION==CADDYBOOK_ELEMENTS-1) $(".caddybook .rightbutton").addClass("disabled");
  else $(".caddybook .rightbutton").removeClass("disabled");
}
$(function() {
  window.CADDYBOOK_ELEMENTS = $(".caddybook img").length;
  window.CADDYBOOK_INITIALPOSITION = (($(".caddybook").width()/2 - $($(".caddybook img").get(0)).width() / 2) - 10 );
  $(".caddybook .rightbutton").click(function(){
    let imgwidth = $($(".caddybook img").get(0)).width();
    let imgseparation = 20;
    CADDYBOOK_POSITION++;
    if(CADDYBOOK_POSITION >= CADDYBOOK_ELEMENTS){
      CADDYBOOK_POSITION = CADDYBOOK_ELEMENTS - 1;
    }
    CADDYBOOK_OFFSET = -CADDYBOOK_INITIALPOSITION + CADDYBOOK_POSITION * (imgwidth + imgseparation);
    repositionCaddybookImages();
    hideShowArrows();
  });
  $(".caddybook .leftbutton").click(function(){
    let imgwidth = $($(".caddybook img").get(0)).width();
    let imgseparation = 20;
    CADDYBOOK_POSITION--;
    if(CADDYBOOK_POSITION < 0){
      CADDYBOOK_POSITION = 0;
    }
    CADDYBOOK_OFFSET = -CADDYBOOK_INITIALPOSITION + CADDYBOOK_POSITION * (imgwidth + imgseparation);
    repositionCaddybookImages();
    hideShowArrows();
  });
  $(window).resize(function(){
    window.CADDYBOOK_INITIALPOSITION = (($(".caddybook").width()/2 - $($(".caddybook img").get(0)).width() / 2) - 10 );
    let imgwidth = $($(".caddybook img").get(0)).width();
    let imgseparation = 20;
    CADDYBOOK_OFFSET = -CADDYBOOK_INITIALPOSITION + CADDYBOOK_POSITION * (imgwidth + imgseparation);
    repositionCaddybookImages();
  });
  $(".caddybook img").click(function(){
    $(".caddybook-modal img").remove();
    let newimg = $(this).clone();
    $(newimg).appendTo(".caddybook-modal");
    $(".caddybook-modal").addClass("opened");
  });

  $(".caddybook-modal i").click(function(){
    $(".caddybook-modal").removeClass("opened");
  });

  hideShowArrows();

  window.setTimeout(function(){
    $(window).trigger("resize");
  }, 200);

});

// Sponsorships Slider

$.fn.randomize = function(selector){
    (selector ? this.find(selector) : this).parent().each(function(){
        $(this).children(selector).sort(function(){
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};

window.SPONSORSHIP_OFFSET = 0;
window.SPONSORSHIP_POSITION = 0;
function repositionSponsorshipImages(immediate = false){
  let local_offset = -SPONSORSHIP_OFFSET;
  $(".sponsorships-slider").css("transform",`translateX(${local_offset}px)`);
}

function immediateRepositionSponsorshipImages(immediate = false){
  let local_offset = -SPONSORSHIP_OFFSET;
  $(".sponsorships-slider").css("transition","none");
  window.setTimeout(function(){
    $(".sponsorships-slider").css("transform",`translateX(${local_offset}px)`);
    window.setTimeout(function(){
      $(".sponsorships-slider").css("transition","300ms all ease");
    },40);
  },40);
}

$(function() {
  window.SPONSORSHIP_ELEMENTS = $(".sponsorships-slider img").length;
  window.SPONSORSHIP_INITIALPOSITION = 0;

  // Randomize logos
  $(".sponsorships-slider a").randomize();

  // Clone last one and first one
  let first = $(".sponsorships-slider a:first").clone();
  let second = $(".sponsorships-slider a:first").next("a").clone();
  let last = $(".sponsorships-slider a:last").clone();
  $(first).appendTo($(".sponsorships-slider"));
  $(second).appendTo($(".sponsorships-slider"));
  $(last).prependTo($(".sponsorships-slider"));

  window.setInterval(function(){
    let imgwidth = $($(".sponsorships-slider img").get(0)).width();
    let imgseparation = 40;
    SPONSORSHIP_POSITION++;
    if(SPONSORSHIP_POSITION > SPONSORSHIP_ELEMENTS){
      SPONSORSHIP_POSITION = 0;
      SPONSORSHIP_OFFSET = -SPONSORSHIP_INITIALPOSITION + SPONSORSHIP_POSITION * (imgwidth + imgseparation);
      immediateRepositionSponsorshipImages();
      window.setTimeout(function(){
        SPONSORSHIP_POSITION = 1;
        SPONSORSHIP_OFFSET = -SPONSORSHIP_INITIALPOSITION + SPONSORSHIP_POSITION * (imgwidth + imgseparation);
        repositionSponsorshipImages();
      }, 120);
    }
    else{
      SPONSORSHIP_OFFSET = -SPONSORSHIP_INITIALPOSITION + SPONSORSHIP_POSITION * (imgwidth + imgseparation);
      repositionSponsorshipImages();
    }
  }, 3000);

  $(window).resize(function(){
    let imgwidth = $($(".sponsorships-slider img").get(0)).width();
    let imgseparation = 40;
    window.SPONSORSHIP_INITIALPOSITION = (($(".sponsorships-slider-outer").width()/2 - imgwidth / 2) - imgseparation/2 ) - imgwidth - imgseparation;
    SPONSORSHIP_OFFSET = -SPONSORSHIP_INITIALPOSITION + SPONSORSHIP_POSITION * (imgwidth + imgseparation);
    immediateRepositionSponsorshipImages();
  });

  window.setTimeout(function(){
    $(window).trigger("resize");
  }, 200);

});



// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(42.886765, -8.4987588), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        scrollwheel: false,
        draggable: true,

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var myLatLng = new google.maps.LatLng(42.886765, -8.4987588);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });
}
