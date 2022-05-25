(function ($) {
  "use strict";
  const cfg = {
    scrollDuration: 800,
    mailChimpURL: "",
  };
  const $WIN = $(window);
  const ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      $("html, body").animate({ scrollTop: 0 }, "normal");
      $("#loader").fadeOut("slow", function () {
        $("#preloader").delay(300).fadeOut("slow");
      });
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };
  const ssPrettyPrint = function () {
    $("pre").addClass("prettyprint");
    $(document).ready(function () {
      prettyPrint();
    });
  };
  const ssMoveHeader = function () {
    const $hero = $(".s-hero"),
      $hdr = $(".s-header"),
      triggerHeight = $hero.outerHeight() - 170;
    $WIN.on("scroll", function () {
      let loc = $WIN.scrollTop();
      if (loc > triggerHeight) {
        $hdr.addClass("sticky");
      } else {
        $hdr.removeClass("sticky");
      }
      if (loc > triggerHeight + 20) {
        $hdr.addClass("offset");
      } else {
        $hdr.removeClass("offset");
      }
      if (loc > triggerHeight + 150) {
        $hdr.addClass("scrolling");
      } else {
        $hdr.removeClass("scrolling");
      }
    });
  };

  const ssMobileMenu = function () {
    const $toggleButton = $(".s-header__menu-toggle");
    const $headerContent = $(".s-header__content");
    const $siteBody = $("body");

    $toggleButton.on("click", function (event) {
      event.preventDefault();
      $toggleButton.toggleClass("is-clicked");
      $siteBody.toggleClass("menu-is-open");
    });

    $headerContent.find(".s-header__nav a, .btn").on("click", function () {
      if (window.matchMedia("(max-width: 900px)").matches) {
        $toggleButton.toggleClass("is-clicked");
        $siteBody.toggleClass("menu-is-open");
      }
    });

    $WIN.on("resize", function () {
      if (window.matchMedia("(min-width: 901px)").matches) {
        if ($siteBody.hasClass("menu-is-open"))
          $siteBody.removeClass("menu-is-open");
        if ($toggleButton.hasClass("is-clicked"))
          $toggleButton.removeClass("is-clicked");
      }
    });
  };

  const ssPhotoswipe = function () {
    const items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".folio-item");

    $folioItems.each(function (i) {
      let $folio = $(this),
        $thumbLink = $folio.find(".folio-item__thumb-link"),
        $title = $folio.find(".folio-item__title"),
        $caption = $folio.find(".folio-item__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      let item = {
        src: $href,
        w: $width,
        h: $height,
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function (i) {
      $(this)
        .find(".folio-item__thumb-link")
        .on("click", function (e) {
          e.preventDefault();
          let options = {
            index: i,
            showHideOpacity: true,
          };

          let lightBox = new PhotoSwipe(
            $pswp,
            PhotoSwipeUI_Default,
            items,
            options
          );
          lightBox.init();
        });
    });
  };
  const ssSlickSlider = function () {
    $(".clients").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });

    $(".testimonial-slider").slick({
      arrows: true,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            dots: true,
          },
        },
      ],
    });
  };

  const ssAOS = function () {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-out",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  const ssAlertBoxes = function () {
    $(".alert-box").on("click", ".alert-box__close", function () {
      $(this).parent().fadeOut(500);
    });
  };
  const ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      const target = this.hash;
      const $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          window.location.hash = target;
        });
    });
  };
  const ssBackToTop = function () {
    const pxShow = 800;
    const $goTopButton = $(".ss-go-top");
    if ($(window).scrollTop() >= pxShow)
      $goTopButton.addClass("link-is-visible");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        if (!$goTopButton.hasClass("link-is-visible"))
          $goTopButton.addClass("link-is-visible");
      } else {
        $goTopButton.removeClass("link-is-visible");
      }
    });
  };
  (function ssInit() {
    ssPreloader();
    ssPrettyPrint();
    ssMoveHeader();
    ssMobileMenu();
    ssPhotoswipe();
    ssSlickSlider();
    ssAOS();
    ssAlertBoxes();
    ssSmoothScroll();
    ssBackToTop();
  })();
})(jQuery);

const isUnderMaintainence = false;
const html = document.querySelector("html");
if (isUnderMaintainence) {
  const text = document.createElement("h1");
  text.innerText = "Site Under Maintainence";
  html.innerText = "";
  html.append(text);
}
