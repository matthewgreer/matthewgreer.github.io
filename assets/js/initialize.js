import "./isotope.pkgd.min.js";

// definitions
const navSections = document.querySelectorAll(".section");
const menu = document.getElementById("menu");
const toggle = document.getElementById("menu-toggle");
const close = document.getElementById("menu-close");
const nav = menu.querySelector(".nav-items");
const navItems = nav.querySelectorAll("LI");
const navLinks = nav.querySelectorAll("A");
const firstNavItem = navItems[0];
const internalLinks = document.querySelectorAll(".internal-link");
const isotopeWrapper = document.querySelector(".isotope-wrapper");
const filterCheckboxes = isotopeWrapper.querySelectorAll('INPUT[type="radio"]');

const imagesLoaded = (selector, callback) => {
  const images = document.querySelectorAll(selector);
  let loadedImagesCount = 0;
  const checkAllImagesLoaded = () => {
    loadedImagesCount++;
    if (loadedImagesCount === images.length) {
      callback();
    }
  };

  images.forEach(image => {
    if (image.complete) {
      checkAllImagesLoaded();
    } else {
      image.addEventListener("load", checkAllImagesLoaded);
    }
  });
};

const memoizeNavSectionBoundaries = () => {
  navSections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionBottom = sectionTop + section.offsetHeight;
    section.dataset.top = sectionTop;
    section.dataset.bottom = sectionBottom;
  });
};

const closeMenu = () => {
  menu.classList.remove("open");
};

const openMenu = () => {
  menu.classList.add("open");
};

const toggleMenu = () => {
  menu.classList.contains("open") ? closeMenu() : openMenu();
};

const setNavLinkListeners = () => {
    if (window.innerWidth < 846) {
    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  } else {
    navLinks.forEach(link => {
      link.removeEventListener("click", closeMenu);
    });
  }
};

const handleResize = () => {
  memoizeNavSectionBoundaries();
  setNavLinkListeners();
  handleScroll();
}

const updateActiveNavItem = (navSection) => {
  const activeNavSectionId = navSection.dataset.section;
  const reqLink = nav.querySelector(`A[href="#${activeNavSectionId}"]`);
  const activeNavItem = reqLink.closest("LI");
  navItems.forEach(navItem => {
    if (navItem.classList.contains("active")) {
      navItem.classList.remove("active");
    }
  });
  activeNavItem.classList.add("active");
};

const handleScroll = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  navSections.forEach(section => {
    const sectionTop = section.dataset.top;
    const sectionBottom = section.dataset.bottom;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      updateActiveNavItem(section);
    }
  });
};

const initSections = () => {
  memoizeNavSectionBoundaries();
  window.addEventListener("resize", handleResize);
};

const initMenu = () => {
  toggle.addEventListener("click", toggleMenu);
  close.addEventListener("click", closeMenu);
  setNavLinkListeners();
  firstNavItem.classList.add("active");
};

const initInternalLinks = () => {
  internalLinks.forEach(link => {
    link.addEventListener("click", scrollToSection);
  });
};

const scrollToSection = (e) => {
  const href = e.target.tagName === "A" ? e.target.getAttribute("href") : e.target.closest("A").getAttribute("href");
  e.preventDefault();
  const sectionName = href.replace(/#/, "");
  const section = document.querySelector('[data-section="' + sectionName + '"]');

  if (section.tagName === "SECTION") {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth"
    });
  } else {
    const parent = section.closest(".section");
    window.scrollTo({
      top: parent.offsetTop + section.offsetTop,
      behavior: "smooth"
    });
  }
};

const initPage = () => {
  imagesLoaded(".isotope-item img", () => {
    const isotope = new Isotope(isotopeWrapper.querySelector(".isotope-box"), {
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });
    const filter = () => {
      let type = "";
      filterCheckboxes.forEach(checkbox => {
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
  initSections();
  initMenu();
  initInternalLinks();
  window.addEventListener("scroll", handleScroll);
};

initPage();
