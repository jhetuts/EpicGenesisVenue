try {
  class GevmeChat extends HTMLElement {
    constructor() {
      super()
    }

    handleMessage(event) {
      try {
        const dataObj = JSON.parse(event.data)
        console.log(dataObj)
      } catch (error) {
        console.error(error)
      }
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
      iframe.frameBorder = '0'
      this.append(iframe)
      this.addEventListener('message', this.handleMessage)
    }
  }
  window.customElements.define('gevme-chat', GevmeChat)
} catch (error) {
  console.error(error)
}
