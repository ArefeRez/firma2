import React from 'react';
import "./home.css";
const Home = () => {
    return (
        <>
        <div className='flex flex-col mx-auto items-center justify-center border rounded-[16px] w-fit px-8 py-8'>
            <div className='flex flex-col'>
            <p className='title'>تولید محتوای سئو شده</p>
            <input type="text" placeholder='کلید واژه هارا وارد کنید'/>
            <input type="text" placeholder='حوزه مورد نظر را انتخاب کنید'/>
            <button>شروع تولید محتوا</button>
        </div>
        <div>
            <p className='title'>محتوای تولید شده</p>
            <textarea name="" id=""></textarea>
            <p className='title'>مدریت تصاویر</p>
            {/* <img src="" alt="" /> */}
        </div>
        </div>
        
        </>
        
    );
}

export default Home;
