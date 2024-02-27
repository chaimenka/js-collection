'use-strict';



// elements
const imgContainer = document.querySelector('.images'); 

// helper function with promisifyed timeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');

    //set source attribute
    img.src = imgPath;

    // resolve promise if image is loaded, reject otherwise
    img.addEventListener('load', function()
    { 
      imgContainer.append(img); 
      resolve(img); 
    }); 
    img.addEventListener('error', reject(new Error('promise reject-ception'))); 
  },
    // error handling
    err => new Error('could not load image')
  )
}
  
const loadNPause = async function () {
  try {
    // create first
    img = await createImage('img\\img-1.jpg');
    imgContainer.append(img); 

    await wait(2); 

    img.style.display = 'none'; 

    // create second
    img = await createImage('img\\img-2.jpg');
   
    
  } catch (err) {
    console.error(err); 
  }
}

const loadAll = async function (imgArr) {
  try {
    const imgs = await Promise.all(
      imgArr.map(async img => await createImage(img))
    )

    imgs.forEach(i => i.classList.add('parallel'));
  } catch {
    
  }
}

loadAll(['img\\img-1.jpg', 'img\\img-2.jpg']); 