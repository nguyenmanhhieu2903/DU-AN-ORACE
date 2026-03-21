import { useState, useRef } from "react";
import axios from "axios";

const Checkout = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [scanning, setScanning] = useState(false);

  const audioRef = useRef(null);

  // chọn ảnh
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult("");
      setInfo(null);
    }
  };

  // scan biển số
  const handleScan = async () => {
    if (!file) return alert("Chọn ảnh trước!");

    setLoading(true);
    setScanning(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("http://localhost:5000/scan", formData);
      const plate = res.data.plate;

      setResult(plate);

      // 🔊 beep
      audioRef.current.play();

      const resInfo = await axios.get(
        `http://localhost:8080/api/xe/dang-gui/${plate}`
      );

      setInfo(resInfo.data);
    } catch {
      alert("Không nhận diện được!");
    }

    setLoading(false);
    setScanning(false);
  };

  // checkout
  const handleCheckout = async () => {
    await axios.post("http://localhost:8080/api/checkout", {
      bienSo: result,
    });

    alert("Xe đã ra!");

    setFile(null);
    setPreview(null);
    setResult("");
    setInfo(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100 p-6">

        {/* âm thanh */}
        <audio ref={audioRef} src="/beep.mp3" />

        <div className="w-[420px] bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl">

            <h2 className="text-center text-2xl font-bold text-orange-600 mb-5">
            🚗 CHECK-OUT XE
            </h2>

            {/* CAMERA BOX */}
            <div className="relative border-2 border-orange-300 rounded-2xl overflow-hidden bg-white shadow-inner">

            {/* chọn ảnh */}
            {!file && (
                <label className="h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition">
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <p className="text-gray-500">📷 Chọn ảnh biển số</p>
                </label>
            )}

            {/* preview */}
            {preview && (
                <img src={preview} className="w-full h-48 object-contain"/>
            )}

            {/* 🔴 LINE SCAN */}
            {scanning && (
                <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-1 bg-red-500 animate-scan shadow-lg"></div>
                </div>
            )}

            {/* khung camera */}
            <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl pointer-events-none"></div>
            </div>

            {/* nút scan */}
            {file && !result && (
            <button
                onClick={handleScan}
                className="mt-5 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
                {loading ? "⏳ Đang quét..." : "🚀 Nhận diện"}
            </button>
            )}

            {/* kết quả */}
            {result && (
            <div className="mt-5 p-4 bg-green-100 border border-green-300 rounded-xl text-center animate-fadeIn">
                <p className="text-sm text-gray-500">Biển số</p>
                <p className="text-2xl font-bold text-green-700 tracking-widest">
                {result}
                </p>
            </div>
            )}

            {/* info */}
            {info && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-xl text-sm space-y-2 animate-fadeIn">
                <p>👤 <b>{info.tenKH}</b></p>
                <p>⏰ {info.gioVao}</p>
                <p>🕒 {info.thoiGian}</p>
                <p className="text-green-600 font-bold text-lg">
                💰 {info.tien} VNĐ
                </p>
            </div>
            )}

            {/* checkout */}
            {info && (
            <button
                onClick={handleCheckout}
                className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
                ✅ XÁC NHẬN XE RA
            </button>
            )}

        </div>

        {/* animation */}
        <style>
            {`
            @keyframes scan {
            0% { transform: translateY(0); }
            100% { transform: translateY(180px); }
            }
            .animate-scan {
            animation: scan 1.5s linear infinite;
            }
            `}
        </style>
        </div>
  );
};

export default Checkout;