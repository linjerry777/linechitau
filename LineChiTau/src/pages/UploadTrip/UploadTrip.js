export default function UploadTrip() {

    return (
        <>
            <label>
                創建者EMAIL <input name="email"/>
            </label>
            <hr/>
            <label>
                創立行程名字 <input name="tripName"/>
            </label>
            <hr/>
            <label>
                預計販賣日期 <input name="startDate"/>
            </label>
            <hr/>
            <label>
                預計停賣日期 <input name="endDate"/>
            </label>
            <hr/>
            <label>
                行程集合地點或重要景點名稱(限一) <input name="address"/>
            </label>
            <hr/>
            <label>上述地點經度(全球通用座標) <input name="geoLocationX"/></label>
            <label>上述地點緯度(全球通用座標) <input name="geoLocationY"/></label>
            <hr/>
            <label>
                行程主要所屬台灣區域 <input name="area"/>
            </label>
            <hr/>
            <label>
                行程主要所屬地點 <input name="region"/>
            </label>
            <hr/>
            <label>
                行程介紹 <input name="introduction"/>
            </label>
            <hr/>
            <label>行程介紹附加圖片1 <input name="image1"/></label>
            <label>行程介紹附加圖片2 <input name="image2"/></label>
            <label>行程介紹附加圖片3 <input name="image3"/></label>
            <hr/>
            <label>附加圖片介紹1 <input name="imageIntro1"/></label>
            <label>附加圖片介紹2 <input name="imageIntro2"/></label>
            <label>附加圖片介紹3 <input name="imageIntro3"/></label>
            <hr/>
            <label>
                評價等級(公式為grade/amount) <input name="commentGrade"/>
            </label>
            <hr/>
            <label>
                評價過的數量 <input name="commentAmount"/>
            </label>
            <hr/>
        </>
    )
}