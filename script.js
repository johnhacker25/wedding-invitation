/* ===========================================================
   JAVLONBEK & MALOXATXON — WEDDING INVITATION
   script.js — interactivity, i18n, countdown, gallery, wishes
   =========================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------
     1. LOADING SCREEN
  ----------------------------------------------------- */
  const loader = document.getElementById("loader");

  function hideLoader() {
    if (!loader) return;
    loader.classList.add("is-hidden");
    // Remove from DOM after transition for accessibility
    setTimeout(() => loader.remove(), 900);
  }

  window.addEventListener("load", () => {
    // Small delay so the loader animation is perceptible even on fast connections
    setTimeout(hideLoader, 600);
  });

  // Failsafe: never let the loader block the page for more than 4s
  setTimeout(hideLoader, 4000);

  /* -----------------------------------------------------
     2. FLOATING PETALS (ambient particle animation)
  ----------------------------------------------------- */
  const petalsContainer = document.getElementById("petals");

  function createPetals(count) {
    if (!petalsContainer) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";

      const size = 8 + Math.random() * 10;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 16;
      const delay = Math.random() * -duration;
      const drift = (Math.random() - 0.5) * 160;
      const opacity = 0.3 + Math.random() * 0.35;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.left = `${left}%`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.setProperty("--drift", `${drift}px`);
      petal.style.opacity = opacity;

      petalsContainer.appendChild(petal);
    }
  }

  createPetals(18);

  /* -----------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
  ----------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* -----------------------------------------------------
     4. SMOOTH "OPEN INVITATION" BUTTON
  ----------------------------------------------------- */
  const openBtn = document.getElementById("openInvitation");
  const invitationSection = document.getElementById("invitation");

  if (openBtn && invitationSection) {
    openBtn.addEventListener("click", () => {
      invitationSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* -----------------------------------------------------
     5. BACKGROUND MUSIC TOGGLE
  ----------------------------------------------------- */
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {
          // Autoplay or missing file — fail silently, UI still toggles
        });
        musicToggle.classList.add("is-playing");
        musicToggle.setAttribute("aria-pressed", "true");
      } else {
        bgMusic.pause();
        musicToggle.classList.remove("is-playing");
        musicToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  /* -----------------------------------------------------
     6. LANGUAGE SWITCHER (UZ / RU)
  ----------------------------------------------------- */
  const translations = {
    uz: {
      "hero.eyebrow": "Sizni nikoh to'yimizga taklif qilamiz",
      "hero.line1": "Siz",
      "hero.line2": "To'yimizga",
      "hero.line3": "taklif etilgansiz",
      "hero.month": "iyun",
      "hero.cta": "Taklifnomani ochish",
      "invite.bismillah": "Bismillahir Rohmanir Rohiym",
      "invite.lead": "Ikki qalb, bir muhabbat, bir umrga birga bo'lish nasibasi — bugun bizning eng baxtli kunimiz.",
      "invite.text": "Sizni hayotimizdagi eng muhim kunda — turmush qurish marosimimizda — biz bilan baxtni baham ko'rishga chorlaymiz.",
      "invite.dayLabel": "Dushanba",
      "invite.timeLabel": "To'y boshlanadi",
      "invite.venue": "Gulsanam To'yxonasi",
      "invite.location": "Buvayda tumani",
      "details.eyebrow": "Bayram dasturi",
      "details.title": "To'y Tafsilotlari",
      "details.nikoh.title": "Nikoh marosimi",
      "details.nikoh.desc": "Rasmiy nikoh marosimi va guvohlar tomonidan tasdiqlash",
      "details.toy.title": "To'y marosimi",
      "details.toy.desc": "Bayramona dastur, kechki ziyofat va raqs kechasi",
      "details.venue.title": "Manzil",
      "details.dress.title": "Dress Code",
      "details.dress.time": "Klassik & Elegant",
      "details.dress.desc": "Champagne, oltin va fil suyagi ranglarini afzal ko'ring",
      "countdown.days": "kun",
      "countdown.hours": "soat",
      "countdown.minutes": "daqiqa",
      "countdown.seconds": "soniya",
      "map.cta": "Google Maps'da ochish",
      "gallery.eyebrow": "Eslatmalar",
      "gallery.title": "Galereya",
      "gallery.note": "* Suratlar uchun namuna joylar — o'z rasmlaringizni assets/images papkasiga joylashtiring va style.css faylida background-image qiymatlarini almashtiring.",
      "wishes.eyebrow": "Mehmonlardan",
      "wishes.title": "Tilaklaringizni Yozing",
      "wishes.intro": "Ezgu tilaklaringiz biz uchun eng qadrli sovg'adir. Iliq so'zlaringizni quyida qoldiring.",
      "wishes.nameLabel": "Ismingiz",
      "wishes.namePlaceholder": "Ismingizni kiriting",
      "wishes.messageLabel": "Tilagingiz",
      "wishes.messagePlaceholder": "Yosh kelin-kuyovga tilaklaringizni yozing...",
      "wishes.submit": "Yuborish",
      "wishes.listTitle": "Mehmonlar Tilaklari",
      "wishes.empty": "Hozircha tilaklar yo'q. Birinchi bo'lib tilak qoldiring!",
      "wishes.statusSuccess": "Rahmat! Tilagingiz qabul qilindi.",
      "wishes.statusError": "Iltimos, ism va tilak maydonlarini to'ldiring.",
      "footer.text": "29.06.2026 · Gulsanam To'yxonasi · Buvayda tumani",
      "footer.signature": "Sevgi bilan, Javlonbek & Maloxatxon"
    },
    ru: {
      "hero.eyebrow": "Приглашаем вас на нашу свадьбу",
      "hero.line1": "Вы",
      "hero.line2": "Приглашены",
      "hero.line3": "на нашу свадьбу",
      "hero.month": "июня",
      "hero.cta": "Открыть приглашение",
      "invite.bismillah": "Бисмиллахир Рохманир Рохийм",
      "invite.lead": "Два сердца, одна любовь, желание быть вместе всю жизнь — сегодня самый счастливый день в нашей жизни.",
      "invite.text": "Приглашаем вас разделить с нами радость в самый важный день нашей жизни — в день нашей свадьбы.",
      "invite.dayLabel": "Понедельник",
      "invite.timeLabel": "Начало торжества",
      "invite.venue": "Банкетный зал «Гулсанам»",
      "invite.location": "Буваидинский район",
      "details.eyebrow": "Программа торжества",
      "details.title": "Детали Свадьбы",
      "details.nikoh.title": "Церемония Никох",
      "details.nikoh.desc": "Официальная церемония бракосочетания и подтверждение свидетелями",
      "details.toy.title": "Свадебное торжество",
      "details.toy.desc": "Праздничная программа, вечерний банкет и танцевальный вечер",
      "details.venue.title": "Место проведения",
      "details.dress.title": "Дресс-код",
      "details.dress.time": "Классика & Элегантность",
      "details.dress.desc": "Предпочтительны оттенки шампанского, золота и слоновой кости",
      "countdown.days": "дней",
      "countdown.hours": "часов",
      "countdown.minutes": "минут",
      "countdown.seconds": "секунд",
      "map.cta": "Открыть в Google Maps",
      "gallery.eyebrow": "Воспоминания",
      "gallery.title": "Галерея",
      "gallery.note": "* Образцы мест для фото — добавьте свои фотографии в папку assets/images и замените значения background-image в style.css.",
      "wishes.eyebrow": "От гостей",
      "wishes.title": "Оставьте Пожелание",
      "wishes.intro": "Ваши добрые слова — самый ценный подарок для нас. Оставьте тёплое пожелание ниже.",
      "wishes.nameLabel": "Ваше имя",
      "wishes.namePlaceholder": "Введите ваше имя",
      "wishes.messageLabel": "Ваше пожелание",
      "wishes.messagePlaceholder": "Напишите пожелание молодожёнам...",
      "wishes.submit": "Отправить",
      "wishes.listTitle": "Пожелания Гостей",
      "wishes.empty": "Пожеланий пока нет. Будьте первым!",
      "wishes.statusSuccess": "Спасибо! Ваше пожелание принято.",
      "wishes.statusError": "Пожалуйста, заполните имя и текст пожелания.",
      "footer.text": "29.06.2026 · Банкетный зал «Гулсанам» · Буваидинский район",
      "footer.signature": "С любовью, Жавлонбек & Малохатхон"
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const i18nEls = document.querySelectorAll("[data-i18n]");
  const i18nPlaceholderEls = document.querySelectorAll("[data-i18n-placeholder]");

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.uz;

    i18nEls.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    i18nPlaceholderEls.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("wedding-lang", lang);

    langButtons.forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Restore saved language preference
  const savedLang = localStorage.getItem("wedding-lang");
  if (savedLang && translations[savedLang]) {
    applyLanguage(savedLang);
  }

  /* -----------------------------------------------------
     7. COUNTDOWN TIMER
  ----------------------------------------------------- */
  // Wedding ceremony begins 29.06.2026 at 18:00 (local time)
  const WEDDING_DATE = new Date("2026-06-29T18:00:00");

  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();
    let diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* -----------------------------------------------------
     8. GALLERY LIGHTBOX
  ----------------------------------------------------- */
  const masonryItems = Array.from(document.querySelectorAll(".masonry__item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !masonryItems.length) return;
    currentIndex = (index + masonryItems.length) % masonryItems.length;
    const item = masonryItems[currentIndex];

    const tile = item.style.getPropertyValue("--tile").trim();
    const caption = item.getAttribute("data-caption") || "";

    lightboxImg.style.setProperty("--tile", tile);
    lightboxCaption.textContent = caption;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  masonryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => openLightbox(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => openLightbox(currentIndex + 1));

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
    if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
  });

  /* -----------------------------------------------------
     9. GUEST WISHES (LocalStorage)
  ----------------------------------------------------- */
  const WISHES_KEY = "wedding-wishes-jm-2026";

  const wishForm = document.getElementById("wishForm");
  const wishNameInput = document.getElementById("wishName");
  const wishMessageInput = document.getElementById("wishMessage");
  const wishStatus = document.getElementById("wishStatus");
  const wishList = document.getElementById("wishList");
  const wishEmpty = document.getElementById("wishEmpty");

  function getWishes() {
    try {
      const raw = localStorage.getItem(WISHES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
    } catch (e) {
      // LocalStorage unavailable (e.g. private browsing) — fail silently
    }
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const lang = document.documentElement.getAttribute("lang") || "uz";
    const locale = lang === "ru" ? "ru-RU" : "uz-UZ";
    try {
      return date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch (e) {
      return date.toLocaleDateString();
    }
  }

  function renderWishes() {
    const wishes = getWishes();
    if (!wishList) return;

    wishList.innerHTML = "";

    if (wishes.length === 0) {
      if (wishEmpty) wishEmpty.classList.remove("is-hidden");
      return;
    }

    if (wishEmpty) wishEmpty.classList.add("is-hidden");

    // Show newest first
    wishes
      .slice()
      .reverse()
      .forEach((wish) => {
        const card = document.createElement("article");
        card.className = "wish-card";
        card.innerHTML = `
          <div class="wish-card__header">
            <span class="wish-card__name">${escapeHTML(wish.name)}</span>
            <time class="wish-card__date" datetime="${escapeHTML(wish.date)}">${formatDate(wish.date)}</time>
          </div>
          <p class="wish-card__message">${escapeHTML(wish.message)}</p>
        `;
        wishList.appendChild(card);
      });
  }

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (wishNameInput.value || "").trim();
      const message = (wishMessageInput.value || "").trim();
      const lang = document.documentElement.getAttribute("lang") || "uz";
      const dict = translations[lang] || translations.uz;

      if (!name || !message) {
        if (wishStatus) wishStatus.textContent = dict["wishes.statusError"];
        return;
      }

      const wishes = getWishes();
      wishes.push({
        name,
        message,
        date: new Date().toISOString()
      });
      saveWishes(wishes);
      renderWishes();

      wishForm.reset();
      if (wishStatus) wishStatus.textContent = dict["wishes.statusSuccess"];

      // Clear the status message after a few seconds
      setTimeout(() => {
        if (wishStatus) wishStatus.textContent = "";
      }, 4000);
    });
  }

  renderWishes();

})();
