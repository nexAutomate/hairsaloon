    const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backTop = document.getElementById("backTop");


/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {

  const open = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("active", open);

  menuToggle.setAttribute(
    "aria-expanded",
    open
  );

  document.body.classList.toggle(
    "menu-open",
    open
  );

});


document
  .querySelectorAll(".nav-menu a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    });

  });


/* =========================
   NAVBAR + BACK TO TOP
========================= */

function handleScroll() {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );

  backTop.classList.toggle(
    "show",
    window.scrollY > 600
  );

}

window.addEventListener(
  "scroll",
  handleScroll
);

handleScroll();


backTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================
   SCROLL REVEAL
========================= */

const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(el =>
    revealObserver.observe(el)
  );


/* =========================
   GALLERY LIGHTBOX
========================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxClose =
  document.getElementById(
    "lightboxClose"
  );


document
  .querySelectorAll(".gallery-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      () => {

        lightboxImage.src =
          item.dataset.image;

        lightboxImage.alt =
          item.querySelector(
            "img"
          ).alt;

        lightbox.classList.add(
          "open"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow =
          "hidden";

      }
    );

  });


function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  event => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeLightbox();

    }

  }
);


/* =========================
   TESTIMONIAL SLIDER
========================= */

const reviewTrack =
  document.getElementById(
    "reviewTrack"
  );

const reviewDots = [
  ...document.querySelectorAll(
    "#reviewDots button"
  )
];

let reviewIndex = 0;


function showReview(index) {

  reviewIndex =
    (index + 3) % 3;

  reviewTrack.style.transform =
    `translateX(-${reviewIndex * 100}%)`;

  reviewDots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === reviewIndex
      );

    }
  );

}


document
  .getElementById("prevReview")
  .addEventListener(
    "click",
    () => {

      showReview(
        reviewIndex - 1
      );

    }
  );


document
  .getElementById("nextReview")
  .addEventListener(
    "click",
    () => {

      showReview(
        reviewIndex + 1
      );

    }
  );


reviewDots.forEach(
  (dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showReview(index);

      }
    );

  }
);


/* AUTO SLIDER */

let reviewTimer =
  setInterval(() => {

    showReview(
      reviewIndex + 1
    );

  }, 6000);


document
  .querySelector(".review-slider")
  .addEventListener(
    "mouseenter",
    () => {

      clearInterval(
        reviewTimer
      );

    }
  );


document
  .querySelector(".review-slider")
  .addEventListener(
    "mouseleave",
    () => {

      reviewTimer =
        setInterval(() => {

          showReview(
            reviewIndex + 1
          );

        }, 6000);

    }
  );


/* =========================
   CONTACT FORM
========================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );

const formMessage =
  document.getElementById(
    "formMessage"
  );


contactForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    if (
      !contactForm.checkValidity()
    ) {

      contactForm.reportValidity();

      return;

    }


    formMessage.textContent =
      "Thank you — your appointment request has been received. We will be in touch shortly.";


    contactForm.reset();

  }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = [
  ...document.querySelectorAll(
    "main section[id]"
  )
];

const navLinks = [
  ...document.querySelectorAll(
    ".nav-menu a:not(.nav-cta)"
  )
];


const sectionObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute(
                "href"
              ) ===
              `#${entry.target.id}`
            );

          });

        }

      });

    },

    {
      rootMargin:
        "-35% 0px -55% 0px"
    }

  );


sections.forEach(section =>
  sectionObserver.observe(section)
);
