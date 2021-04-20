window.addEventListener("DOMContentLoaded", function () {
  const user = document.querySelector("#user");

  if (user) {
    console.log(user);
    user.addEventListener("click", function (e) {
      e.preventDefault();
      window.GEVME.utils.logoutUser();
    });
  }
});
