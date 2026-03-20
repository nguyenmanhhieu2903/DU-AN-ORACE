import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QrScanner = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("⚠️ Vui lòng chọn ảnh!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("http://localhost:8080/api/khach-hang/scan", formData);

      if (res.data && res.data.plate) {
        setResult(res.data.plate);
      } else {
        alert("Không tìm thấy biển số!");
      }
    } catch (error) {
      alert("Lỗi server!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoAddKH = () => {
    if (!result) {
      alert("Bạn chưa nhận diện!");
      return;
    }

    navigate("/addKH", {
      state: {
        bienSo: result,
        image: preview,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100 flex items-center justify-center p-4">

      {/* 🔥 LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center shadow-2xl">
            <div className="animate-spin text-4xl mb-3">🔄</div>
            <p className="font-semibold text-orange-600">
              Đang quét biển số...
            </p>
          </div>
        </div>
      )}

      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-6 w-full max-w-[400px] transition hover:scale-[1.02]">

        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          🚗 Nhận diện biển số
        </h2>

        {/* CHỌN ẢNH */}
        {!file && (
          <label className="cursor-pointer block border-2 border-dashed border-orange-400 rounded-2xl p-8 text-center hover:bg-orange-50 transition shadow-inner">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="text-orange-500 text-4xl mb-2">📂</div>
            <p className="text-gray-600 font-medium">Quét ảnh biển số</p>
          </label>
        )}

        {/* PREVIEW + ANIMATION SCAN */}
        {preview && (
          <div className="relative mt-2 rounded-2xl overflow-hidden">
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-contain rounded-2xl shadow-md border-2 border-white"
            />

            {/* 🔥 TIA QUÉT */}
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="scan-line"></div>
              </div>
            )}

            {/* Nút xóa */}
            {!loading && (
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setResult("");
                }}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* NÚT NHẬN DIỆN */}
        {file && !result && (
          <button
            onClick={handleUpload}
            className="mt-6 w-full py-3 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 transition"
          >
            🚀 Bắt đầu nhận diện
          </button>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 bg-white border border-green-200 rounded-2xl text-center shadow-sm animate-fadeIn">
            <p className="text-xs text-gray-400 uppercase">
              Kết quả
            </p>
            <p className="text-3xl font-black text-green-600 my-2">
              {result}
            </p>

            <button
              onClick={handleGoAddKH}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition"
            >
              Tiếp tục ➡️
            </button>
          </div>
        )}
      </div>

      {/* 🔥 CSS ANIMATION */}
      <style>{`
        .scan-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: red;
          animation: scan 1.5s linear infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default QrScanner;