window.addEventListener('DOMContentLoaded', function () {
  const user = document.querySelector('#user')

  if (user) {
    user.addEventListener('click', function (e) {
      e.preventDefault()
      const logout = document.querySelector('#logout')
      const chat = document.querySelector('#chat')

      const userDetails = document.querySelector('.user-details')
      if (userDetails) {
        userDetails.classList.toggle('active')
      }

      if (logout) {
        logout.addEventListener('click', function (e) {
          e.preventDefault()
          window.GEVME.utils.logoutUser()
        })
      }

      if (chat) {
        const GevmeChatIframe = document.querySelector('#GevmeChat')
        if (GevmeChatIframe) {
          GevmeChatIframe.contentWindow.postMessage(
            JSON.stringify({ action: 'open', type: 'chat' }),
            '*',
          )
        }
      }
    })
  }
})
