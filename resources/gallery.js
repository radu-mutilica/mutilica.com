// Get list of images from AWS
const photosListURL = "https://mutilica.com-photo-gallery.s3.eu-west-2.amazonaws.com/photos.json";

fetch(photosListURL, {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
    .then(res => res.json())
    .then((jsonContents) => {
        console.log('Output: ', jsonContents);
    }).catch(err => console.error(err));


// Iterate over the json list of photos and generate html for 
// each entry, then append the newly generated html to
// the gallery container
const gallery = document.querySelector("#gallery");
for (var jsonPhoto of photos) {
    console.log(jsonPhoto);

    const newPhotoContainer = document.createElement("div");
    newPhotoContainer.classList.add("photo-container");

    const newLink = document.createElement("a");
    newLink.setAttribute("target", "_blank");
    newLink.setAttribute("href", jsonPhoto.url);

    const newImg = document.createElement("img");

    // todo: exclude the first 20 or so images from lazy loading
    newImg.classList.add("lazy");
    newImg.setAttribute("data-src", jsonPhoto.url);

    const newDesc = document.createElement("div");
    newDesc.classList.add("desc");
    newDesc.innerText = jsonPhoto.desc;

    newLink.appendChild(newImg);
    newPhotoContainer.appendChild(newLink);
    newPhotoContainer.appendChild(newDesc)

    gallery.appendChild(newPhotoContainer);
}



// Set up event listeners for all of the images for lazy loading
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.scrollY;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});


