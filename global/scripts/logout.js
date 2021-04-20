window.addEventListener("DOMContentLoaded", function () {
  const user = document.querySelector("#user");

  if (user) {
    console.log(user);
    user.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        if (window.parent) {
          console.log("send action logout");
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
