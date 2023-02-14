import React from 'react';
import { useState } from 'react';

function PicUpTest() {
  const [files, setFile] = useState();
  const handleChange = (event) => {
    setFile(event.target.files);
  };
  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images${i}`, files[i]);
      console.log(formData.get(`images${i}`));
    }
  }
  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>上傳</button>
    </div>
  );
}

export default PicUpTest;
