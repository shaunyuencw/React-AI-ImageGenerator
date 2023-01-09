import React from 'react';
import { useState } from 'react';
import './ImgGenForm.css';


const ImgGenForm = ({ generateImage }) => {
  const [prompt, setPrompt] = useState('');
  const [n, setN] = useState('');
  const [size, setSize] = useState("256x256");

  async function submitForm(e) {
    e.preventDefault();
    generateImage(prompt, n, size);
    setPrompt('');
    setN('');
    setSize('256x256');
  }


  return (
    <form className="imggenform" onSubmit={(e) => submitForm(e)}>
      <label className="form__label" htmlFor="textarea">Prompt</label>
      <textarea className="imggenform__textarea" rows="3" value={prompt} onChange={(e) => setPrompt(e.target.value)} required placeholder="Pixar style 3D render of a fox wearing a tophat, 4k, high resolution, trending in artstation"/>
      <br />
      <label className="form__label" htmlFor="input-number">Images to Generate (1-4)</label>
      <input className="imggenform__input-number" type="number" value={n} required min="1" max="4" onChange={(e) => setN(e.target.value)}/>
      <br />
      <label className="form__label" htmlFor="select">Size of Image</label>
      <select className="imggenform__select" value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="1024x1024">1024x1024</option>
        <option value="512x512">512x512</option>
        <option value="256x256">256x256</option>
      </select>
      <br />
      <button className="imggenform__button" type="submit">Generate</button>
    </form>
  );
}

export default ImgGenForm;