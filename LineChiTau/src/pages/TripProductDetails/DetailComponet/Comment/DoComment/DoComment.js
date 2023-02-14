import { Button } from 'bootstrap';
import './DoComment.scss';
import testPic from './dohpins_hotel.jpg';

export default function DoComment() {

    return (
        <>
            <div className='comment-wrapper'>
                <div className="profile-wrapper d-flex justify-content-center aligm-items-center">
                    <div className="profile-container">
                        <img src={testPic} alt="" className="profile-pic" />
                    </div>
                </div>
                <div className='comment-input'>
                    <div className='input'>

                    </div>
                </div>
            </div>
            <div className='comment-controll d-flex'>
                <p className='words-limit my-heading'><span>{`300\t`}</span>characters left</p>
                <p className='giving-grade my-heading'>{`評價：\t`}
                    <span className='material-symbols-outlined'>grade</span>
                    <span className='material-symbols-outlined'>grade</span>
                    <span className='material-symbols-outlined'>grade</span>
                    <span className='material-symbols-outlined'>grade</span>
                    <span className='material-symbols-outlined'>grade</span>
                </p>
                <p className='attach-files my-heading'>
                    <span className='material-symbols-outlined'>attach_file</span>
                    {'上傳圖片'}
                </p>
                <div className='my-btn my-heading'>Comment</div>
            </div>
        </>
    )
}