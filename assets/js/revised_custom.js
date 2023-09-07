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
      var menuLinks = document.querySelectorAll(".nav-items a");
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

  // initialize nav
  // Add "active" class to the first li element in ".nav-items"
  document.querySelector(".nav-items li:first-child").classList.add("active");

  var showSection = function (section, isAnimate) {
    var direction = section.replace(/#/, "");
    var reqSection = document.querySelector(
      '.section[data-section="' + direction + '"]'
    );
    var reqSectionPos = reqSection.offsetTop - 0;

    if (isAnimate) {
      window.scrollTo({
        top: reqSectionPos,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, reqSectionPos);
    }
  };

  var checkSection = function () {
    var sections = document.querySelectorAll(".section");
    var wScroll = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(function (section) {
      var topEdge = section.offsetTop - 80;
      var bottomEdge = topEdge + section.offsetHeight;

      if (topEdge < wScroll && bottomEdge > wScroll) {
        var currentId = section.getAttribute("data-section");
        var reqLink = document.querySelector('a[href*="#' + currentId + '"]');
        var activeLi = reqLink.closest("li");

        // Remove "active" class from all li elements
        document.querySelectorAll(".nav-items li").forEach(function (li) {
          li.classList.remove("active");
        });

        // Add "active" class to the closest li element
        activeLi.classList.add("active");
      }
    });
  };

  document.querySelector(".nav-items").addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      showSection(e.target.getAttribute("href"), true);
    }
  });

  document.querySelectorAll(".social-icons a, .social-icons svg").forEach(function (link) {
    link.addEventListener("click", function (e) {
      let href = e.target.tagName === "A" ? e.target.getAttribute("href") : e.target.closest("a").getAttribute("href");
      let isAnimated = href[0] === "#";
      if (isAnimated) {
        e.preventDefault();
        showSection(href, isAnimated);
      }
    });
  });

  document.querySelector(".white-button").addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.classList.contains("section-button")) {
      e.preventDefault();
      showSection(e.target.getAttribute("href"), true);
    }
  });

  window.addEventListener("scroll", function () {
    checkSection();
  });

  // Update Current NYT Crossword Solving Streak

  const myStreak = document.querySelector(".my-nyt-streak");
  const startStreak = new Date("2019-12-26 00:00:00");
  const today = new Date();
  const streak = Math.floor(
    (today.getTime() - startStreak.getTime()) / (1000 * 3600 * 24)
  );
  if (myStreak) { myStreak.innerHTML = streak; }

  // initialize lightbox

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true
  });
})();
