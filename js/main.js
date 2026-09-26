/* ==========================================================================
   5 STAR Sales & Service — site script (no libraries, loaded with `defer`)
   ========================================================================== */

/* ==========================================================================
   >>> SITE CONFIG — EDIT THESE VALUES <<<
   Everything the owner may need to change in JavaScript lives here.
   (Phone numbers / email also appear in the HTML — see README "Edit business details".)
   ========================================================================== */
var SITE_CONFIG = {
  // WhatsApp number: country code + number, digits only (no +, spaces or dashes).
  whatsappNumber: "919688527308",

  // Pre-filled WhatsApp message. {service} and {place} are replaced automatically.
  whatsappMessage: "Hello 5 STAR, I need {service} in {place}.",
  whatsappDefaultService: "service",
  whatsappDefaultPlace: "Pattukkottai",

  // Contact form endpoint (Formspree). Change only the form ID if you create a new Formspree form.
  // This is a public endpoint, not a secret key — it is safe to keep in frontend code.
  formEndpoint: "https://formspree.io/f/moevlzew",

  // Google Maps embed shown in the "Find us" section (loaded only when the visitor taps "Show map").
  // Pinned to the shop's Plus Code (7J2XC88C+FM = "C88C+FM Pattukkottai"). To use Google's own embed
  // instead, open the shop in Google Maps > Share > Embed a map, and paste the src="..." URL here.
  mapEmbedUrl: "https://www.google.com/maps?q=7J2XC88C%2BFM&z=17&output=embed",

  // SERVICE AREAS — shown in the "Areas we serve" section and suggested in the form's Location field.
  // Only add places you genuinely serve. Example: "Adirampattinam", "Peravurani".
  serviceAreas: [
    "Pattukkottai"
  ],

  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Leave empty to disable analytics.
  ga4Id: "G-E0GMSKKG73"
};
/* ======================= END OF SITE CONFIG ============================ */

(function () {
  "use strict";
  var C = SITE_CONFIG;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- WhatsApp links ---------- */
  function waLink(service, place) {
    var msg = C.whatsappMessage
      .replace("{service}", service || C.whatsappDefaultService)
      .replace("{place}", place || C.whatsappDefaultPlace);
    return "https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent(msg);
  }
  // Any link with data-wa="Service name" gets a message built from the config above.
  document.querySelectorAll("a[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa"));
  });

  /* ---------- Service areas ---------- */
  var areaList = document.getElementById("area-list");
  if (areaList && C.serviceAreas.length) {
    var pin = areaList.getAttribute("data-icon");
    areaList.innerHTML = C.serviceAreas.map(function (name) {
      var safe = String(name).replace(/[<>&"]/g, "");
      return '<li><svg class="icon" aria-hidden="true"><use href="' + pin + '"/></svg>' + safe + "</li>";
    }).join("");
  }
  var areaData = document.getElementById("area-options");
  if (areaData) {
    areaData.innerHTML = C.serviceAreas.map(function (n) {
      return '<option value="' + String(n).replace(/[<>&"]/g, "") + '"></option>';
    }).join("");
  }

  /* ---------- "Enquire Now" buttons pre-select the service in the form ---------- */
  var form = document.getElementById("enquiry-form");
  var serviceSelect = form && form.querySelector("#f-service");
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-enquire]");
    if (!btn || !serviceSelect) return;
    var wanted = btn.getAttribute("data-enquire");
    for (var i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value === wanted) { serviceSelect.selectedIndex = i; break; }
    }
    // Let the #contact anchor scroll, then move focus to the first field for keyboard/screen-reader users.
    setTimeout(function () { var n = form.querySelector("#f-name"); if (n) n.focus({ preventScroll: true }); }, 400);
  });

  /* ---------- Contact form ---------- */
  if (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector("button[type=submit]");
    var sending = false;
    var lastPayload = "";

    if (C.formEndpoint) form.setAttribute("action", C.formEndpoint);

    var showStatus = function (type, text) {
      status.className = "form-status is-" + type;
      status.textContent = text;
    };
    var fieldError = function (input, msg) {
      var box = document.getElementById(input.id + "-error");
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (box) box.textContent = msg || "";
    };
    var validate = function () {
      var ok = true;
      var name = form.elements.name, phone = form.elements.phone, service = form.elements.service;
      var digits = phone.value.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
      if (name.value.trim().length < 2) { fieldError(name, "Please enter your name."); ok = false; } else fieldError(name);
      if (!/^[6-9]\d{9}$/.test(digits)) { fieldError(phone, "Please enter a 10-digit mobile number."); ok = false; } else fieldError(phone);
      if (!service.value) { fieldError(service, "Please choose the service you need."); ok = false; } else fieldError(service);
      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
      }
      return ok;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      if (!validate()) { showStatus("error", "Please correct the highlighted fields."); return; }

      // Honeypot: real visitors never fill this hidden field.
      if (form.elements._gotcha && form.elements._gotcha.value) { showStatus("success", "Thank you. We will contact you soon."); form.reset(); return; }

      var data = new FormData(form);
      var payload = [data.get("name"), data.get("phone"), data.get("service"), data.get("location"), data.get("message")].join("|");
      if (payload === lastPayload) { showStatus("info", "This enquiry has already been sent. We will call you back soon."); return; }

      sending = true;
      submitBtn.disabled = true;
      var label = submitBtn.innerHTML;
      submitBtn.textContent = "Sending…";
      showStatus("info", "Sending your enquiry…");

      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            lastPayload = payload;
            showStatus("success", "Thank you, " + data.get("name") + ". Your enquiry has been sent. We will call you on " + data.get("phone") + " soon. For urgent work, please call us directly.");
            form.reset();
            return;
          }
          return res.json().catch(function () { return {}; }).then(function (j) {
            var msg = j && j.errors && j.errors.length ? j.errors.map(function (x) { return x.message; }).join(", ") : "";
            throw new Error(msg || "Server error");
          });
        })
        .catch(function () {
          showStatus("error", "Sorry, your enquiry could not be sent. Please check your internet connection and try again, or call / WhatsApp us directly.");
        })
        .then(function () {
          sending = false;
          submitBtn.disabled = false;
          submitBtn.innerHTML = label;
        });
    });

    // "Send on WhatsApp" builds a message from whatever has been typed so far.
    var waBtn = form.querySelector("[data-form-wa]");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        var f = form.elements;
        var text = C.whatsappMessage
          .replace("{service}", f.service.value || C.whatsappDefaultService)
          .replace("{place}", f.location.value.trim() || C.whatsappDefaultPlace);
        if (f.name.value.trim()) text += "\nName: " + f.name.value.trim();
        if (f.phone.value.trim()) text += "\nPhone: " + f.phone.value.trim();
        if (f.message.value.trim()) text += "\n" + f.message.value.trim();
        window.open("https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      });
    }
  }

  /* ---------- Click-to-load Google Map (keeps the page fast) ---------- */
  var mapBtn = document.querySelector("[data-load-map]");
  if (mapBtn) {
    mapBtn.addEventListener("click", function () {
      var box = mapBtn.closest(".map-box");
      var frame = document.createElement("iframe");
      frame.src = C.mapEmbedUrl;
      frame.title = "Map showing 5 STAR Sales & Service, Pattukkottai";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(frame);
    });
  }

  /* ---------- Hero logo video: plays once (skipped for reduced motion), button pauses / replays ---------- */
  var heroVideo = document.querySelector("[data-hero-video]");
  var heroBtn = document.querySelector("[data-hero-video-btn]");
  if (heroVideo && heroBtn) {
    var setBtn = function (state, label) { heroBtn.setAttribute("data-state", state); heroBtn.setAttribute("aria-label", label); };
    var sync = function () {
      if (heroVideo.ended) setBtn("replay", "Replay logo animation");
      else if (heroVideo.paused) setBtn("play", "Play logo animation");
      else setBtn("pause", "Pause logo animation");
    };
    ["play", "pause", "ended"].forEach(function (ev) { heroVideo.addEventListener(ev, sync); });
    heroBtn.addEventListener("click", function () {
      if (heroVideo.ended) heroVideo.currentTime = 0;
      if (heroVideo.paused) heroVideo.play(); else heroVideo.pause();
    });
    heroBtn.hidden = false;
    sync();
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var autoplay = function () {
      var p = heroVideo.play();
      if (p && p.catch) p.catch(sync);   // autoplay blocked (e.g. data saver): poster stays, button shows Play
    };
    if (!reduceMotion) {
      // Start when the video is actually on screen (on phones it sits below the buttons).
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { io.disconnect(); autoplay(); }
        }, { threshold: 0.6 });
        io.observe(heroVideo);
      } else autoplay();
    }
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Google Analytics 4 (only if an ID is configured) ---------- */
  if (C.ga4Id) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.ga4Id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", C.ga4Id);
    // Track calls / WhatsApp taps as events.
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a) return;
      if (a.href.indexOf("tel:") === 0) window.gtag("event", "click_call");
      else if (a.href.indexOf("wa.me") > -1) window.gtag("event", "click_whatsapp");
    });
  }
})();
