// Get list of images from AWS
const photosListURL = "https://mutilica.com-photo-gallery.s3.eu-west-2.amazonaws.com/photos.json";

fetch(photosListURL)
    .then(res => res.json())
    .then((photos) => {

        // Iterate over the json list of photos and generate html for 
        // each entry, then append the newly generated html to
        // the gallery container
        const gallery = document.querySelector("#gallery");

        for (let [index, jsonPhoto] of photos.entries()) {

            const newLink = document.createElement("a");
            newLink.setAttribute("href", "javascript:;");
            newLink.classList.add("image");
            newLink.classList.add("fit");

            const newImg = document.createElement("img");

            // todo: exclude the first 20 or so images from lazy loading
            if (index > 20) {
                newImg.classList.add("lazy");
                newImg.setAttribute("data-src", jsonPhoto.url);
            } else {
                newImg.setAttribute("src", jsonPhoto.url);
            }

            newLink.appendChild(newImg)
            gallery.appendChild(newLink);
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


    }).catch(err => console.error(err));

