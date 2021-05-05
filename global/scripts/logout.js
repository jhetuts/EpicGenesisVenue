window.addEventListener('DOMContentLoaded', function () {
  const user = document.querySelector('#user')
  const logout = document.querySelector('#logout')
  const GevmeChatIframe = document.querySelector('#GevmeChat')

  if (user) {
    user.addEventListener('click', function (e) {
      e.preventDefault()
      const userDetails = document.querySelector('.user-details')
      if (userDetails) {
        userDetails.classList.toggle('active')
      }

      if (GevmeChatIframe) {
        GevmeChatIframe.contentWindow.postMessage(
          JSON.stringify({ action: 'open', type: 'chat' }),
          '*',
        )
      }
    })
  }

  if (logout) {
    logout.addEventListener('click', function (e) {
      e.preventDefault()
      window.GEVME.utils.logoutUser()
    })
  }
})
