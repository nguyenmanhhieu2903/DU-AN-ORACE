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
      alert("⚠️ Vui lòng chọn ảnh trước!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("http://localhost:8080/api/khach-hang/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.plate) {
        setResult(res.data.plate);
      } else {
        alert("🔍 Không tìm thấy biển số trong ảnh, vui lòng chụp rõ hơn!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Lỗi kết nối máy chủ hoặc Backend gặp sự cố!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-12 font-sans overflow-hidden bg-slate-950">

      {/* 🖼️ ẢNH NỀN TOÀN TRANG (Đồng bộ với Login) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src="https://images.unsplash.com/photo-1590674116377-089c1f6b83f3?q=80&w=2000&auto=format&fit=crop"
          alt="Parking Background"
          className="w-full h-full object-cover scale-105 blur-[8px]"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 🏠 NÚT QUAY LẠI TRANG CHỦ (Góc trên bên trái) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white rounded-full transition-all duration-300 group shadow-2xl"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-sm font-bold tracking-wide">Trang chủ</span>
      </button>

      <div className="relative z-10 w-full max-w-[1200px] animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/10 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-[40px] p-6 md:p-14 border border-white/10 transition-all duration-500">

          {/* HEADER */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tighter uppercase">
              Plate Detection AI
            </h2>
            <p className="text-indigo-200 text-base md:text-lg mt-4 font-semibold tracking-widest opacity-80">SMART PARKING MANAGEMENT SYSTEM</p>
          </div>

          {/* BỐ CỤC GRID 2 CỘT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

            {/* CỘT 1: KHU VỰC ẢNH */}
            <div className="relative">
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-[400px] md:h-[500px] border-4 border-dashed border-white/20 rounded-[40px] cursor-pointer hover:border-indigo-400 hover:bg-white/5 transition-all duration-300 group shadow-inner">
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  <div className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-2xl">
                    <svg className="w-14 h-14 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white font-black text-xl tracking-tight">TẢI ẢNH XE LÊN</p>
                  <p className="text-slate-400 text-sm mt-2 font-medium">Hỗ trợ định dạng JPG, PNG, HEIC</p>
                </label>
              ) : (
                <div className="relative rounded-[40px] overflow-hidden border-8 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-500">
                  <img src={preview} alt="preview" className="w-full h-[400px] md:h-[500px] object-cover" />

                  {/* HIỆU ỨNG SCAN KHI LOADING */}
                  {loading && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="scan-bar"></div>
                      <div className="absolute inset-0 bg-indigo-500/30 animate-pulse"></div>
                    </div>
                  )}

                  {/* NÚT XÓA ẢNH */}
                  {!loading && (
                    <button
                      onClick={() => { setFile(null); setPreview(null); setResult(""); }}
                      className="absolute top-6 right-6 w-14 h-14 bg-black/60 backdrop-blur-xl text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 shadow-2xl border border-white/10"
                    >
                      <span className="text-3xl font-light">×</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CỘT 2: ĐIỀU KHIỂN & KẾT QUẢ */}
            <div className="flex flex-col justify-between h-full space-y-8">

              {/* Box Hướng dẫn */}
              <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-xl backdrop-blur-md">
                <h4 className="text-xl font-black text-indigo-300 mb-6 flex items-center gap-3 uppercase tracking-widest">
                  <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                  Quy trình quét
                </h4>
                <div className="space-y-6">
                  {[
                    "Chọn hình ảnh biển số rõ nét nhất.",
                    "Hệ thống AI sẽ tự động phân tích vùng chứa biển số.",
                    "Xác nhận lại thông tin trước khi lưu vào hệ thống."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-300 font-bold border border-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">{i + 1}</span>
                      <p className="text-slate-200 font-medium leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút bấm & Kết quả */}
              <div className="flex-grow flex flex-col justify-end">
                {file && !result && (
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full py-6 rounded-3xl font-black text-white text-xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <div className="w-7 h-7 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span>Bắt đầu quét AI</span>
                      </>
                    )}
                  </button>
                )}

                {result && (
                  <div className="animate-in slide-in-from-bottom-10 duration-700 space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-2xl flex flex-col items-center justify-center border-b-[8px] border-indigo-500">
                      <p className="text-xs text-slate-400 font-black uppercase tracking-[5px] mb-3">Kết quả nhận diện</p>
                      <div className="flex items-center gap-6">
                        <span className="text-6xl md:text-7xl font-mono font-black text-slate-900 tracking-tighter italic">
                          {result}
                        </span>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/addKH", { state: { bienSo: result, image: preview } })}
                      className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-xl hover:bg-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-4"
                    >
                      <span>Tiếp tục đăng ký</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-white/30 text-[10px] mt-12 font-black tracking-[4px] uppercase">
          AI Vision Protocol v2.4.0 • Parking Intelligence
        </p>
      </div>

      <style>{`
        .scan-bar {
          position: absolute;
          width: 100%;
          height: 8px;
          background: linear-gradient(to bottom, transparent, #818cf8, transparent);
          box-shadow: 0 0 40px 6px rgba(129, 140, 248, 0.9);
          top: 0;
          z-index: 10;
          animation: scan-move 2.5s ease-in-out infinite;
        }

        @keyframes scan-move {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        .animate-in { animation: enter 0.5s ease-out forwards; }
        @keyframes enter { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
};

export default QrScanner;