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
     window.addEventListener('message',
  }
})
