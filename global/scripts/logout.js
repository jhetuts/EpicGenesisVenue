window.addEventListener('DOMContentLoaded', function () {
  const logout = document.querySelector('#logout')

  

  if (logout) {
    logout.addEventListener('click', function (e) {
      e.preventDefault()
      window.GEVME.utils.logoutUser()
    })
  }
})
