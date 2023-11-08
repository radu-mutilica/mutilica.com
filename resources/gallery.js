// Get list of images from AWS
const photosListURL = "https://mutilica.com-photo-gallery.s3.eu-west-2.amazonaws.com/photos.json";

const buildGallery = async function () {
    fetch(photosListURL, {mode: 'cors'})
        .then(res => res.json())
        .then((photos) => {

            // Iterate over the json list of photos and generate html for 
            // each entry, then append the newly generated html to
            // the gallery container
            const gallery = document.querySelector("#main-gallery");

            for (let [index, jsonPhoto] of photos.entries()) {

                const newLink = document.createElement("a");
                newLink.setAttribute("href", jsonPhoto.url);
                newLink.classList.add("image");
                newLink.classList.add("fit");

                const newImg = document.createElement("img");
                newImg.setAttribute("src", jsonPhoto.thumb);

                newLink.appendChild(newImg)
                gallery.appendChild(newLink);
            }
            console.log("Finished building gallery...")
            var lightbox = new SimpleLightbox('.gallery a', { /* options */ });
            return photos;
        }).catch(err => console.error(err));
}

const start = async function () {
    const result = await buildGallery();

}

start();

