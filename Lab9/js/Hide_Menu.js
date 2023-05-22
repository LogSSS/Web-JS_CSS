document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".navbar-toggler")
    .addEventListener("blur", function (event) {
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        let tempCollapse = new bootstrap.Collapse(
          document.getElementById("navbarToggler"),
          { toggle: true }
        );
      }
    });
});
