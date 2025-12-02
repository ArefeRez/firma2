import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./home.css";
import "../assets/style/fonts.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [editableText, setEditableText] = useState("");

  const handleChange = (e) => setKeyword(e.target.value);

  const handleSubmit = async () => {
    if (!keyword) return;
    try {
      const response = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setResult(data);
      setEditableText(JSON.stringify(data));
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto justify-center border rounded-[16px] w-[30%] px-8 py-8 mt-[32px] items-start bg-[#f6eafd] border-[#989898]">
      <div className="flex flex-col">
        <p className="title">تولید محتوای سئو شده</p>
        <input
          className="input-home"
          type="text"
          placeholder="کلید واژه هارا وارد کنید"
          value={keyword}
          onChange={handleChange}
        />
        <input
          className="input-home"
          type="text"
          placeholder="حوزه مورد نظر را انتخاب کنید"
        />
        <button onClick={handleSubmit} className="button-content">
          شروع تولید محتوا
        </button>
      </div>

      <div>
        <p className="title">محتوای تولید شده</p>
        {result && (
          <textarea
            className="textarea-content"
            placeholder="متن خودرا وارد کنید ..."
            name="عنوان محتوا"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
          />
        )}
        <button className="flex items-center font-[YekanBakhMedium] text-[14px] text-[#3d3d3d] gap-1 cursor-pointer hover:text-[#292929]">
          <FiEdit />
          <p>ویرایش</p>
        </button>

        <p className="title">مدیریت تصاویر</p>
        {/* <img src={} alt="تصویر بک‌اند" className="w-full max-w-sm rounded-[8px]" /> */}
      </div>
    </div>
  );
};

export default Home;
