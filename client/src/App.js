import './App.css';
import { ImgGenForm } from './components';
import { useState } from 'react';

import placeholder1 from './assets/ph1.png'
import placeholder2 from './assets/ph2.png'
import placeholder3 from './assets/ph3.png'

import './styles/css/image-gallery.css'

import ImageGallery from 'react-image-gallery';

const ph_images = [
  {
    original: placeholder1,
    thumbnail: placeholder1,
  },
  {
    original: placeholder2,
    thumbnail: placeholder2,
  },
  {
    original: placeholder3,
    thumbnail: placeholder3,
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(
    [
      {
        original: placeholder1,
        thumbnail: placeholder1,
      },
      {
        original: placeholder2,
        thumbnail: placeholder2,
      },
      {
        original: placeholder3,
        thumbnail: placeholder3,
      },
    ]
  );

  async function generateImage(prompt, n, size) {
    setIsLoading(true);
    setTimeout(scrollToBottom, 600);

    console.log("Generating image...");
    console.log("Prompt: ", prompt);
    console.log("N: ", n);
    console.log("Size: ", size);

    const response = await fetch('http://localhost:3080/generateImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        n: n,
        size: size,
      }),
    });

    const data = await response.json();
    console.log(data.message.data);

    let images = [];
    data.message.data.map((item) => {
      images.push({
        original: item.url,
        thumbnail: item.url,
      })
    })
    setImages(images);
    setIsLoading(false);
  }
  
  const scrollToBottom = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  return (
    <div className="App" id="App">
      <h1 align="center">Image Generator</h1>
      <ImgGenForm generateImage={generateImage}/>
      <MyGallery isLoading={isLoading} images={images} />
    </div>
  );
}

export default App;

const MyGallery = ({ isLoading, images }) => {
  console.log("Images: ", images);
  if (images === undefined) {
    images = ph_images;
  }

  if (isLoading === false) {
    return (
       <ImageGallery items={images} />
    )
  }
  else {
    return (
      <img className="loadingGIF" alt="Loading" src="https://johnjorgenson.com/wp-content/uploads/2018/05/colorful-loader-gif-transparent.gif" />
    ) 
  }
  
}
