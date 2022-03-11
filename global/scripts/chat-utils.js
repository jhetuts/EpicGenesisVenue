function handleMessage(e){
  try{
    const dataObj = JSON.parse(event.data);
    if (dataObj && dataObj.chatUpdate && dataObj.chatUpdate === 'new message')
    {
      const dmButton = document.querySelector('.gevme-dm-messages')
      dmButton.classList.add('new-message')
    }
  } catch(e) {
    console.error(e?.name + ': ', e?.message)
  }
  
}

function handleDMSent(userId) {
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

  const user = userObjects[userId.target.dataset.id]
  const GevmeChatIframe = document.querySelector('#GevmeChat')
      
  if (GevmeChatIframe) {
    GevmeChatIframe.contentWindow.postMessage(
      JSON.stringify({ action: 'open', type: 'single-chat', user }),
      '*',
    )
  }
}

document.addEventListener('DOMContentLoaded', function(){
  if(window) {
     window.addEventListener('message', handleMessage)
  }

  const mainChat = document.querySelector('.gevme-main-chat')
  const dmButton = document.querySelector('.gevme-dm-messages')
  const dmButtons = document.querySelectorAll('.gevme-dm-messages-one-on-one')
  const gevmePeopleDirectoryBtn = document.querySelector('.gevme-people-directory')
  const closeButton = document.querySelector('.close-button')

  if (gevmePeopleDirectoryBtn && closeButton)
  {
    gevmePeopleDirectoryBtn.addEventListener('click', function (e)
    {
      e.preventDefault();
      const peopleWrap = document.querySelector('gevme-people-directory')

      if (peopleWrap) {
        peopleWrap.classList.toggle('open-directory')
      }
    })

    closeButton.addEventListener('click', function (e)
    {
      e.preventDefault();
      const peopleWrap = document.querySelector('gevme-people-directory')

      if (peopleWrap) {
        peopleWrap.classList.toggle('open-directory')
      }
    })
    
  }

  if (mainChat) {
    mainChat.addEventListener('click', function (e) {
      e.preventDefault()
    
      const GevmeChatIframe = document.querySelector('#GevmeChat')
      if (GevmeChatIframe) {
          GevmeChatIframe.contentWindow.postMessage(
            JSON.stringify({ action: 'open', type: 'chat' }),
            '*',
          )
        }

    });
  }

  if (dmButton) {
    dmButton.addEventListener('click', function (e) {
      e.preventDefault()
      dmButton.classList.remove('new-message')
      const GevmeChatIframe = document.querySelector('#GevmeChat')
      
      if (GevmeChatIframe) {
        GevmeChatIframe.contentWindow.postMessage(
          JSON.stringify({ action: 'open', type: 'chat-messages' }),
          '*',
        )
      }
    })
  }

  if (dmButtons && dmButtons.length) {
    dmButtons.forEach(dm => {
      dm.removeEventListener('click', handleDMSent)
      dm.addEventListener('click', handleDMSent)
    })
  }

})


