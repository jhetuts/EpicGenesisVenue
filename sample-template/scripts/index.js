function establishedConnection()
{
  try {
    window.top.postMessage(JSON.stringify({ action: 'establish-preview-connection' }), "*")

    window.addEventListener('message', function (d)
    {
      console.log(data)
    })
  } catch (error) {
    console.error(error)
  }
}

function callback(data) {
  console.log('data received: ', data)
}


document.addEventListener('DOMContentLoaded', function () {
 establishedConnection(callback) 
})