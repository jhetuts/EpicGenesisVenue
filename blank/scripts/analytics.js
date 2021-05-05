try {
  const data = {
    title: 'Sample Video Title',
    src:
      'https://ae-herbalife-ve-2021.s3.ap-southeast-1.amazonaws.com/assets/6f18f0c4-23e6-4775-9754-5e32f8962210',
  }
  const button = document.getElementById('btn-video-modal')
  const vidWrap = document.querySelector('.video-container')

  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault()
      const vid = document.createElement('video')
      vid.src = data.src
      vid.controls = true
      vid.autoplay = true
      vid.playsinline = true
      vid.disablepictureinpicture = true
      vid.controlslist = 'nodownload'
      vid.draggable = 'false'
      vid.setAttribute('data-matomo-title', data.title)
      vid.setAttribute('data-matomo-resource', data.src)
      vidWrap.append(vid)

      vid.addEventListener('loadedmetadata', function () {
        if (
          window.Matomo &&
          window.Matomo.MediaAnalytics &&
          window.Matomo.MediaAnalytics.enableMediaAnalytics &&
          window.Matomo.MediaAnalytics.scanForMedia &&
          window.Matomo.MediaAnalytics.isMediaAnalyticsEnabled()
        ) {
          window.Matomo.MediaAnalytics.scanForMedia()
        }
      })
    })
  }
} catch (error) {
  console.error(error)
}
