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
    iframe.src = `${redirectBaseURI}/chat`
    iframe.width = width
    iframe.height = height
    iframe.frameBorder = '0'
    this.append(iframe)
  }
}
window.customElements.define('gevme-chat', GevmeChat)
