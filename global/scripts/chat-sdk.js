try {
  class GevmeChat extends HTMLElement {
    constructor() {
      super()
    }

    handleMessage(event) {
      try {
        const dataObj = JSON.parse(event.data)
        if (dataObj && dataObj.open) {
          var chat = document.querySelector('iframe#GevmeChat')
          if (dataObj.position && dataObj.position === 'left') {
            chat.style =
              'position: fixed; z-index: 1; left: 0; right: unset; top: 0px; bottom: 0px; margin: auto;'
          } else {
            chat.style =
              'position: fixed; z-index: 1; left: unset; right: 0; top: 0px; bottom: 0px; margin: auto;'
          }
        }

        if (dataObj && !dataObj.open) {
          var chat = document.querySelector('iframe#GevmeChat')
          chat.style =
            'position: fixed; z-index: 1; left: -200%; right: unset; top: 0px; bottom: 0px; margin: auto;'
        }
      } catch (error) {
        console.error(error)
      }
    }

    windowEventListener() {
      window.addEventListener('message', this.handleMessage)
    }

    connectedCallback() {
      var settings = JSON.parse(this.getAttribute('settings'))
      var iframe = document.createElement('iframe'),
        redirectBaseURI = window.location.href.includes('env=localhost')
          ? 'http://localhost:3001/widgets'
          : window.location.href.includes('dev')
          ? 'https://showcase-dev.gevme.com/widgets'
          : 'https://www.gevme.com/widgets'

      iframe.id = 'GevmeChat'
      iframe.name = 'GevmeChat'
      iframe.title = 'GEVME Chat'
      iframe.sandbox =
        'allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-presentation allow-same-origin'
      iframe.allowFullScreen = true
      iframe.seamless = true
      iframe.loading = 'lazy'
      iframe.referrerPolicy = 'no-referrer'
      iframe.src = `${redirectBaseURI}/chat?s=${encodeURI(
        JSON.stringify(settings),
      )}`
      iframe.width = settings?.width || '300px'
      iframe.height = settings?.height || '100%'
      iframe.frameBorder = '0'
      iframe.style =
        'position: fixed; z-index: 1; left: -200%; right: unset; top: 0; bottom: 0; margin: auto;'

      while (this.attributes.length > 0)
        this.removeAttribute(this.attributes[0].name)

      this.append(iframe)
      this.windowEventListener()
    }
  }
  window.customElements.define('gevme-chat', GevmeChat)
} catch (error) {
  console.error(error)
}
