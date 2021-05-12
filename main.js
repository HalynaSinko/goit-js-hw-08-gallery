import gallerySources from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  currentImage: document.querySelector(".lightbox__image"),
  closeLightboxButton: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

refs.galleryList.addEventListener("click", onImageClick);
refs.closeLightboxButton.addEventListener("click", onCloseLightbox);
refs.lightboxOverlay.addEventListener("click", onLightboxOverlayClick);

function createElementsGalleryMarkup(gallerySources) {
  return gallerySources
    .map(({ preview, original, description }, index) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
        />
        </a>
      </li>
    `;
    })
    .join("");
}

const elementsGalleryMarkup = createElementsGalleryMarkup(gallerySources);
// console.log(createElementsGalleryMarkup(gallerySources));
refs.galleryList.insertAdjacentHTML("beforeend", elementsGalleryMarkup);

function onImageClick(event) {
  event.preventDefault();
  const isGalleryImage = event.target.classList.contains("gallery__image");
  if (isGalleryImage) {
    onOpenLightbox(event.target);
  }
}

function onOpenLightbox(obj) {
  window.addEventListener("keydown", onKeyPress);
  refs.lightbox.classList.add("is-open");
  refs.currentImage.src = obj.dataset.source;
  refs.currentImage.dataset.index = obj.dataset.index;
  refs.currentImage.alt = obj.alt;

  // console.log(refs.currentImage);
  // console.log(obj.alt);
}

function onCloseLightbox() {
  refs.lightbox.classList.remove("is-open");
  refs.currentImage.src = "";
  refs.currentImage.dataset.index = "";
  refs.currentImage.alt = "";
  window.removeEventListener("keydown", onKeyPress);
  //   console.log(refs.currentImage);
  //   console.log(refs.currentImage.alt);
  //   console.log(refs.currentImage.src);
}

function onLightboxOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseLightbox();
  }
}

function onKeyPress(event) {
  // console.log(event);
  const ESC_KEY_CODE = "Escape";
  const ARROW_RIGHTC_KEY_CODE = "ArrowRight";
  const ARROW_LEFTC_KEY_CODE = "ArrowLeft";

  if (event.code === ESC_KEY_CODE) {
    onCloseLightbox();
  }

  if (event.code === ARROW_RIGHTC_KEY_CODE) {
    nextImage(+1);
    //console.log(refs.currentImage.dataset.index);
  }

  if (event.code === ARROW_LEFTC_KEY_CODE) {
    nextImage(-1);
    //  console.log(refs.currentImage.dataset.index);
  }
}

function nextImage(step) {
  let nextIndex = +refs.currentImage.dataset.index + step;
  //   console.log(nextIndex);

  if (nextIndex === -1) {
    nextIndex = gallerySources.length - 1;
  }
  if (nextIndex === gallerySources.length) {
    nextIndex = 0;
  }
  refs.currentImage.src = gallerySources[nextIndex].original;
  refs.currentImage.dataset.index = nextIndex;
  refs.currentImage.alt = gallerySources[nextIndex].description;

  // console.log(refs.currentImage);
}


// ________________________________________
// Второй вариант массива катринок галереи

// const arrayOfImages = document.querySelectorAll(".gallery__image");
// console.log(arrayOfImages);

// function nextImage(step) {
//   let nextIndex = +refs.currentImage.dataset.index + step;
//   //   console.log(nextIndex);

//   if(nextIndex === -1) {
//     nextIndex = arrayOfImages.length - 1;
//     };
//   if (nextIndex === arrayOfImages.length) {
//     nextIndex = 0;
//   };
//   refs.currentImage.src = arrayOfImages[nextIndex].dataset.source;
//   refs.currentImage.dataset.index = nextIndex;
//   refs.currentImage.alt = arrayOfImages[nextIndex].alt;

// //   console.log(refs.currentImage);
// }
