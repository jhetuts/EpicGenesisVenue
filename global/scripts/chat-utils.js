function handleMessage(e){
  try{
    const dataObj = JSON.parse(event.data);
    console.log('dataObj: ', dataObj)
  } catch(e) {
    console.error(e?.name + ': ', e?.message)
  }
  
}

document.addEventListener('DOMContentLoaded', function(){
  if(window) {
     window.addEventListener('message', handleMessage)
  }

  const user = document.querySelector('#user')
  const dmButton = document.querySelector('.gevme-dm-messages')
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

  if (dmButton) {
    user.dmButton('click', function (e) {
      e.preventDefault()
      
      if (GevmeChatIframe) {
        GevmeChatIframe.contentWindow.postMessage(
          JSON.stringify({ action: 'open', type: 'chat-messages' }),
          '*',
        )
      }
    })
  }

})


