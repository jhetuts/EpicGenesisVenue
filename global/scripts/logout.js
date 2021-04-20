window.addEventListener("DOMContentLoaded", function () {
  const user = document.querySelector("#user");

  if (user) {
    console.log(user);
    user.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        if (window.parent) {
          console.log(window.parent);
          window.parent.postMessage(
            JSON.stringify({ action: "logout", enableConfirmation: true }),
            "*"
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});
