key = ''
var url = "https://vision.googleapis.com/v1/images:annotate?key=" + key
var images = document.querySelectorAll('img');
var requests = []

images.forEach(function(img) {
  var imgRequest = { "image": { "source": { "imageUri": img.src } }, "features": [ { "type": "LABEL_DETECTION" } ] }
  requests.push(imgRequest)
})

var finalRequest = { "requests": requests }
function success(response) {
  response.responses.forEach(function(response, i) {
    if (response.labelAnnotations) {
      var alt = response.labelAnnotations.map(function(label) {
        console.log(label.description)
        return label.description
      })
      images[i].alt = alt.join(', ')
    } else if (response.error) {
      images[i].alt = 'Error: no alt tag could be generated'
    }
  })
}

$.ajax({
  type: "POST",
  url: url,
  data: JSON.stringify(finalRequest),
  success: success,
  dataType: "json",
  headers: { "Content-Type": "application/json" }
})
