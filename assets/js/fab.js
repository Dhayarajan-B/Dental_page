/* Floating action stack — toggles the WhatsApp/contact quick menu.
   Book and Call buttons are plain links and work without JS; only the
   WhatsApp sub-menu is progressively enhanced here. */
(function () {
    var stack = document.querySelector('.fab-stack');
    if (!stack) return;
    var toggle = stack.querySelector('.fab--whatsapp');
    var menu = stack.querySelector('.fab-menu');
    if (!toggle || !menu) return;

    function close() {
        stack.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
        stack.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        stack.classList.contains('is-open') ? close() : open();
    });

    document.addEventListener('click', function (e) {
        if (!stack.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
        a.addEventListener('click', close);
    });
})();
