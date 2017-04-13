console.log('hi')
var images = document.querySelectorAll('img');
images.forEach(function(img) {
  console.log(img, img.alt)
  img.alt = 'yo'
})
