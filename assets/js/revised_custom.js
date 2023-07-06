(function() {
  var imagesLoaded = function(selector, callback) {
    var images = document.querySelectorAll(selector);
    var loadedImagesCount = 0;
    var checkAllImagesLoaded = function() {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        callback();
      }
    };

    images.forEach(function(image) {
      if (image.complete) {
        checkAllImagesLoaded();
      } else {
        image.addEventListener("load", checkAllImagesLoaded);
      }
    });
  }

  // initialize isotope for photo gallery once all images are loaded
  imagesLoaded(".isotope-item img", function() {
    var isotopeWrapper = document.querySelector(".isotope-wrapper");
    var isotope = new Isotope(isotopeWrapper.querySelector(".isotope-box"), {
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });
    var filterCheckboxes = isotopeWrapper.querySelectorAll('input[type="radio"]');

    var filter = function() {
      var type = "";
      filterCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          type = checkbox.dataset.type || "*";
          if (type !== "*") {
            type = '[data-type="' + type + '"]';
          }
        }
      });
      isotope.arrange({ filter: type });
    };

    isotopeWrapper.addEventListener("change", filter);
    filter();
  });

  // initialize menu
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  window.addEventListener("resize", function() {
    if (window.innerWidth < 846) {
      var menuLinks = document.querySelectorAll(".main-menu a");
      menuLinks.forEach(function(link) {
        link.addEventListener("click", function() {
          menu.classList.remove("open");
        });
      });
    }
  });

  var hoverElements = document.querySelectorAll(".hover");
  hoverElements.forEach(function(element) {
    element.addEventListener("mouseleave", function() {
      element.classList.remove("hover");
    });
  });

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true
  });
})();
