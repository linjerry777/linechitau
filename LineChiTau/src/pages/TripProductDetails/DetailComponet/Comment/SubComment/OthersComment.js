import './OthersComment.scss';
import testPic from './dohpins_hotel.jpg';

export default function OthersComment() {
  //TODO 1.先找到資料庫中的評論者 2.找到評論者的頭貼、評論內容、評價、照片。
  //TODO  評論者(users.nickname) 評論者相片(users.profile_picture) 內容評價照片(comment.content/comment_grade/picture  )
  //骨架
  return (
    <>
      <div className="comment-wrapper d-flex">
        <div className="profile-wrapper d-flex justify-content-center aligm-items-center">
          <div className="profile-container">
            <img src={testPic} alt="" className="profile-pic" />
          </div>
        </div>
        <div className="content-wrapper">
          <h1>John Adams</h1>
          <p>4 seconds ago</p>
          <p>It was such an amazing experience. Certainlly will do again! </p>
          <div className="picture-container d-flex">
            <img src={testPic} alt="" className="picture pic1" />
            <img src={testPic} alt="" className="picture pic2" />
            <img src={testPic} alt="" className="picture pic3" />
            <img src={testPic} alt="" className="picture pic4" />
            <img src={testPic} alt="" className="picture pic5" />
          </div>
        </div>
      </div>
    </>
  );
}
