function handleMessage(e){
  try{
    const dataObj = JSON.parse(event.data);
    console.log('dataObj: ', dataObj)
  } catch(e) {
    console.error(e?.name + ': ', e?.message)
  }
  
}

function handleDMSent(user) {
  const userObjects = {
    "ovSyhRNGI0Mb916gz7":  {
      company: "",
      country: "",
      firstname: "Casey",
      id: "ovSyhRNGI0Mb916gz7",
      isOnboarded: false,
      jobTitle: "",
      lastname: "Ong",
      projectId: "6225c830216bc102013c437c",
    },
    "093Ulzricncn51XxmK": {
      company: "",
      country: "",
      firstname: "Michelle",
      id: "093Ulzricncn51XxmK",
      isOnboarded: false,
      jobTitle: "",
      lastname: "Cruz",
      projectId: "6225c830216bc102013c437c",
    }
  }

  const user = userObjects[user?.target?.id]
  console.log(user)
}

document.addEventListener('DOMContentLoaded', function(){
  if(window) {
     window.addEventListener('message', handleMessage)
  }

  const user = document.querySelector('#user')
  const dmButton = document.querySelector('.gevme-dm-messages')
  const dmButtons = document.querySelectorAll('.gevme-dm-messages-one-on-one')
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
    dmButton.addEventListener('click', function (e) {
      e.preventDefault()
      
      if (GevmeChatIframe) {
        GevmeChatIframe.contentWindow.postMessage(
          JSON.stringify({ action: 'open', type: 'chat-messages' }),
          '*',
        )
      }
    })
  }

  if (dmButtons && dmButtons.length)
  {
    dmButtons.forEach(dm => {
      dm.removeEventListener('click', handleDMSent)
      dm.addEventListener('click', handleDMSent)
    })
  }

})


