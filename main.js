(function () {
  'use strict';

  /* ---- mobile nav toggle ------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      links.classList.toggle('open', !isOpen);
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      }
    });
  }

  /* ---- reviews page: filter chips ------------------------------------ */
  var chips = document.querySelectorAll('.review-filter .chip');
  var reviewCards = document.querySelectorAll('.review-card[data-room]');

  if (chips.length && reviewCards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');

        var filter = chip.getAttribute('data-filter');
        reviewCards.forEach(function (card) {
          var show = filter === 'all' || card.getAttribute('data-room') === filter;
          card.hidden = !show;
        });
      });
    });
  }

  /* ---- location page: booking request form ---------------------------- */
  var bookForm = document.getElementById('book-form');
  var bookStatus = document.getElementById('book-form-status');

  if (bookForm && bookStatus) {
    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = bookForm.querySelector('#name');
      var phone = bookForm.querySelector('#phone');

      if (!name.value.trim() || !phone.value.trim()) {
        bookStatus.textContent = 'Add your name and phone number so we can confirm the slot.';
        bookStatus.classList.add('error');
        return;
      }

      bookStatus.classList.remove('error');
      bookStatus.textContent =
        'Request noted — we\u2019ll call ' + phone.value.trim() + ' shortly to confirm your slot.';
      bookForm.reset();
    });
  }

  /* ---- header shadow on scroll ------------------------------------- */
  var header = document.querySelector('header.site');
  if (header) {
    var lastState = false;
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastState) {
        header.style.borderBottomColor = scrolled ? 'rgba(217,164,65,0.18)' : '';
        lastState = scrolled;
      }
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
