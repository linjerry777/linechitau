import axios from 'axios';
import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import './HotelComment.scss';

function HotelComment({ hotelDetail }) {
  const { jwtToken, init, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  init(axios);
  const beImagePath = 'http://localhost:3001/';
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleReset = () => {
    setRating(0);
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  // console.log('selectedFiles', selectedFiles);
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
  const handleSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Array.from(selectedFiles).map((file) => {
      formData.append('photos', file);
    });
    formData.append('rating', rating);
    formData.append('user', jwtDecodedData.email);
    formData.append('comment_text', commentText);
    formData.append('company_name', hotelDetail.company_name);

    (async () => {
      let result = await axios.post(
        'http://localhost:3000/auth/postHotelComment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    })();
    setSelectedImages([]);
    setCommentText('');
    setSelectedFiles([]);
    // handleReset()
    // setSelectedFiles([]);
  };
  const handleRemovePreview = (index) => {
    selectedFiles(selectedFiles.filter((_, i) => i !== index));
  };
  const getCommentList = async function () {
    let response = await axios.get(
      `http://localhost:3001/api/hotelDetail/${hotelDetail.company_name}/comment`
    );
    console.log(response.data);
    setCommentList(response.data);
  };
  //呈現評論
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    getCommentList();
    console.log('進來了');
  }, [hotelDetail]);
  //星星數函式
  const displayStars = function (commentStars) {
    let stars = [];
    for (let i = 1; i <= commentStars; i++) {
      stars.push(
        <span class="material-symbols-outlined hotel-star-fill">star</span>
      );
    }
    return stars;
  };

  return (
    <div className="container-xxl comment-for-hotel p-5" id="comment">
      <h2 className="title">評論區</h2>
      {jwtToken && (
        <form onSubmit={handleSubmission}>
          <Rating onClick={handleRating} initialValue={rating} />

          <div className="d-flex my-4">
            <p className="me-5">{jwtDecodedData.email}</p>
            <textarea
              cols="5"
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
              value={commentText}
              className="form-control comment-textarea"
            />
          </div>
          <p className="my-p">上傳圖片</p>
          {/* <CommentPicture setSelectedFiles={setSelectedFiles} /> */}
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
                          <img
                            src={image}
                            alt={image}
                            height="100"
                            width="100"
                          />
                        </label>
                      </div>
                      <button
                        className="my-btn my-p"
                        onClick={(index) => {
                          setSelectedImages(
                            selectedImages.filter((e) => {
                              // console.log(e);
                              return e !== image;
                            })
                          );
                          handleRemovePreview(index);
                        }}
                      >
                        移除
                      </button>
                    </div>
                  );
                })}
              <label className="add-pic-box my-border-radius me-2">
                <span class="material-symbols-outlined add-btn">
                  add_circle
                </span>
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
          <div className="">
            <button
              className="my-btn my-p"
              type="submit"
              onClick={() => {
                setTimeout(() => {
                  handleReset();
                  getCommentList();
                }, 500);
              }}
            >
              送出
            </button>
          </div>
        </form>
      )}

      <div className="comment-display-box">
        <h2 className="title my-heading my-5">別人怎麼說</h2>
        <div></div>
        {commentList.map((comment, index) => {
          return (
            <div className="my-5" key={comment.id}>
              {displayStars(comment.comment_stars)}
              <div className="text-part">
                <p className="">{comment.name}</p>
                <p>{comment.comment}</p>
              </div>
              <div className="comment-pic-box d-flex my-2">
                {comment.comment_image.split(',').map((pic, pic_index) => {
                  const picPath = `${beImagePath}${pic}`;
                  return (
                    <div className="comment-display-box m-2">
                      <img
                        src={picPath}
                        alt={comment.comment}
                        className="comment-display-pic"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelComment;
