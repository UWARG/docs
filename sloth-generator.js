giphy_url = '';
myImage = null;

function getImagesByAlt(alt) {
    var allImages = document.getElementsByTagName("img");
    var images = [];
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt == alt) {
            images.push(allImages[i]);
        }
    }
    return images;
}

function httpGetAsync(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

//random url http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=r
//trending url http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=1
//sloth url http://api.giphy.com/v1/gifs/translate?s=sloth&api_key=dc6zaTOxFJmzC
//funny cat http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
function updateGiphyUrl() {
  var query = Math.ceil(Math.random() * 4);
  var offset = 0;
  if (query === 1) {
    query = 'sloth';
  } else if (query === 2) {
    query = 'funny+cat';
  } else if (query === 3) {
    query = 'funny+pug';
  } else if (query === 4) {
    query = 'kitty';
  }
  httpGetAsync('http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC&rating=pg-13&offset=' + offset,
    function (response) {
      response = JSON.parse(response)
      if (response.data.length) { //its an array
        var random = Math.round(Math.random() * response.data.length);
        giphy_url = 'http://i.giphy.com/' + response.data[random].id + '.gif';
      }
      else {
        giphy_url = 'http://i.giphy.com/' + response.data.id + '.gif';
      }
      myImage.src = giphy_url
    });
}

//only do this at the root page
if(window.location.pathname == '/'){
  myImage = getImagesByAlt("Sloth GIF")[0];
  updateGiphyUrl();
  setInterval(updateGiphyUrl, 5000);
}