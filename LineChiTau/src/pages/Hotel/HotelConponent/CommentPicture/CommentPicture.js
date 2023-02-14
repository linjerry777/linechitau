import React, { useState } from 'react';
import './CommentPicture.scss';

function CommentPicture({ setSelectedFiles }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    // console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedFiles(selectedFiles);
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  return (
    <div>
      <div className="comment-preview-picture d-flex m-3">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div className="" key={image}>
                <div className="add-pic-box my-border-radius me-2">
                  <label className="add-pic my-border-radius ">
                    <input
                      type="file"
                      name="images"
                      className="d-none"
                      onChange={onSelectFile}
                      multiple
                    />
                    <img src={image} alt={image} height="100" width="100" />
                  </label>
                </div>
                <button
                  className="my-btn my-p"
                  onClick={() => {
                    setSelectedImages(
                      selectedImages.filter((e) => {
                        // console.log(e);
                        return e !== image;
                      })
                    );
                  }}
                >
                  移除
                </button>
              </div>
            );
          })}
        <label className="add-pic-box my-border-radius me-2">
          <span class="material-symbols-outlined add-btn">add_circle</span>
          <input
            type="file"
            name="images"
            className="d-none"
            onChange={onSelectFile}
            multiple
            //   accept="image/png, image/jpg, image.jpeg,image/webp"
          />
        </label>
      </div>
    </div>
  );
}

export default CommentPicture;
