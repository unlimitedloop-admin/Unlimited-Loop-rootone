(function () {
  "use strict";

  var mount = document.getElementById("sidebar-mount");
  if (!mount) return;

  var prefix = document.documentElement.getAttribute("data-prefix") || "";
  var currentPage = document.body.getAttribute("data-page") || "";

  fetch(prefix + "assets/partials/sidebar.html")
    .then(function (res) {
      if (!res.ok) throw new Error("sidebar fetch failed: " + res.status);
      return res.text();
    })
    .then(function (html) {
      html = html.split("__PREFIX__").join(prefix);
      mount.innerHTML = html;

      if (currentPage) {
        var link = mount.querySelector('[data-page="' + currentPage + '"]');
        if (link) link.classList.add("current");
      }
    })
    .catch(function (err) {
      mount.innerHTML =
        '<p style="padding:1.5rem;font-size:13px;color:var(--text-muted)">目次を読み込めませんでした。</p>';
      console.error(err);
    });
})();
