window.addEventListener('DOMContentLoaded', function () {
  const logout = document.querySelector('#logout')
  const chat = document.querySelector('#chat')

  

  if (logout) {
    logout.addEventListener('click', function (e) {
      e.preventDefault()
      window.GEVME.utils.logoutUser()
    })
  }

  if (chat) {
    chat.addEventListener('click', function () {
      const GevmeChatIframe = document.querySelector('#GevmeChat')
      if (GevmeChatIframe) {
        GevmeChatIframe.contentWindow.postMessage(
          JSON.stringify({ action: 'open', type: 'chat' }),
          '*',
        )
      }
    })
  }
})
