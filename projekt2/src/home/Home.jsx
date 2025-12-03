import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./home.css";
import "../assets/style/fonts.css";
import { IoIosArrowDown } from "react-icons/io";

const data = ["Front-end", "Back-end", "UI/UX", "Mobile", "DevOps"];

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [editableText, setEditableText] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const ref = useRef(null);

  const handleChange = (e) => setKeyword(e.target.value);

  const handleSubmit = async () => {
    if (!keyword || !value) {
      alert("لطفاً کلیدواژه و حوزه را وارد کنید");
      return;
    }
    try {
      const response = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, domain: value }),
      });
      const data = await response.json();
      setResult(data);
      setEditableText(
        typeof data === "string" ? data : JSON.stringify(data, null, 2)
      );
      setImageUrl(data.image);

      setResult(data);
      setKeyword("");
      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="w-full relative">
          <div className="relative">
            <input
              className="input-home "
              type="text"
              placeholder="حوزه مورد نظر را انتخاب کنید"
              readOnly
              value={value}
              onClick={() => setOpen(!open)}
            />
            <IoIosArrowDown className="absolute left-2 top-4.5" />
          </div>

          {open && (
            <ul className="absolute left-0 right-0 top-full mt-1 bg-[#faf5fe] border-[#bdbdbd] border rounded-[8px] shadow-2xl z-10">
              {data.map((item) => (
                <li
                  key={item}
                  className="p-2 hover:bg-[#652583] rounded-[8px] transition-[1s] cursor-pointer"
                  onClick={() => {
                    setValue(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

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
        {imageUrl && (
          <img
            src={imageUrl}
            alt="تصویر"
            className="w-full rounded-[8px] mt-4"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
