//created proudly by Serge Babayan sometime in 2015

giphy_url = '';
myImage = null;
imageLink = null;

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
  if(myImage == null ){
    myImage = getImagesByAlt("Sloth GIF")[0];
  }
  if(imageLink == null ){
    imageLink = document.getElementById("gif_link");
  }
  var animal = ["sloth","cat","pug","kitty","bunny","dog", "duck", "geese","goat", "taylor swift"]; //yes, taylor swift is an animal
  var adjective = ["","funny ","sad ", "cute ","derpy "];

  //randomize an animal and adjective
  var query = adjective[Math.ceil(Math.random() * adjective.length)-1] + animal[Math.ceil(Math.random() * animal.length)-1];
  console.log(query);
  var offset = 0;
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
      myImage.src = giphy_url; 
      imageLink.href = giphy_url;
    });
}

//only do this at the root page
if(window.location.pathname == '/'){
  updateGiphyUrl();
  setInterval(updateGiphyUrl, 5000);
}