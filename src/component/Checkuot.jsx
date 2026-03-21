import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult("");
      setInfo(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;

    setLoading(true);
    setScanning(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Gọi API nhận diện biển số
      const res = await axios.post("http://localhost:5000/scan", formData);
      const plate = res.data.plate;
      setResult(plate);

      // Phát tiếng beep thành công
      if (audioRef.current) audioRef.current.play();

      // Gọi API lấy thông tin xe đang gửi
      const resInfo = await axios.get(`http://localhost:8080/api/xe/dang-gui/${plate}`);
      setInfo(resInfo.data);
    } catch (err) {
      alert("⚠️ Không tìm thấy thông tin xe hoặc lỗi nhận diện!");
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:8080/api/checkout", { bienSo: result });
      alert("✅ Xe đã thanh toán và ra cổng thành công!");
      // Reset form
      setFile(null);
      setPreview(null);
      setResult("");
      setInfo(null);
    } catch (err) {
      alert("❌ Lỗi khi thực hiện Checkout!");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden bg-amber-50">

      {/* 🖼️ BACKGROUND CHÍNH - Tông sáng hơn */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2000"
          alt="Parking Background"
          className="w-full h-full object-cover opacity-30 blur-[4px]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/40 via-white/60 to-yellow-50/40"></div>
      </div>

      {/* 🏠 NÚT HOME */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/80 hover:bg-orange-500 hover:text-white backdrop-blur-md border border-orange-200 text-orange-600 rounded-full transition-all duration-300 shadow-lg font-bold"
      >
        <span>←</span> Trang chủ
      </button>

      {/* Âm thanh */}
      <audio ref={audioRef} src="/beep.mp3" />

      <div className="relative z-10 w-full max-w-[1000px] animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_30px_80px_rgba(249,115,22,0.15)] rounded-[40px] p-6 md:p-12 border border-white transition-all">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent tracking-tight uppercase">
              Vehicle Check-Out
            </h2>
            <p className="text-orange-400 text-sm md:text-base mt-2 font-bold tracking-widest opacity-80 uppercase">Hệ thống thanh toán tự động</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* CỘT 1: SCANNER BOX */}
            <div className="relative group">
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-[350px] md:h-[400px] border-4 border-dashed border-orange-200 rounded-[35px] cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-300">
                  <input type="file" className="hidden" onChange={handleFileChange} />
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 border border-orange-200">
                    <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </div>
                  <span className="text-orange-600 font-black text-lg">CHỌN ẢNH BIỂN SỐ</span>
                </label>
              ) : (
                <div className="relative rounded-[35px] overflow-hidden border-8 border-white shadow-2xl">
                  <img src={preview} className="w-full h-[350px] md:h-[400px] object-cover" alt="Preview" />

                  {scanning && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="scan-bar-orange"></div>
                      <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
                    </div>
                  )}

                  {!loading && (
                    <button
                      onClick={() => { setFile(null); setPreview(null); setResult(""); setInfo(null); }}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CỘT 2: INFO & ACTIONS */}
            <div className="space-y-6">
              {!result ? (
                <div className="bg-orange-50/50 p-8 rounded-[30px] border border-orange-100 min-h-[300px] flex flex-col justify-center text-center">
                  <p className="text-orange-300 text-6xl mb-4">📸</p>
                  <p className="text-orange-800 font-bold text-lg">Vui lòng tải ảnh để hệ thống bắt đầu quét dữ liệu</p>
                  {file && (
                    <button
                      onClick={handleScan}
                      disabled={loading}
                      className="mt-6 w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-orange-600 transition-all active:scale-95"
                    >
                      {loading ? "ĐANG QUÉT..." : "NHẬN DIỆN NGAY"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-right-10 duration-500">
                  {/* Biển số */}
                  <div className="bg-white p-6 rounded-[25px] shadow-sm border border-orange-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px]">Biển số xe</p>
                      <p className="text-4xl font-mono font-black text-slate-800">{result}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                  </div>

                  {/* Thông tin khách hàng */}
                  {info && (
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[30px] text-white shadow-xl relative overflow-hidden">
                      <div className="relative z-10 space-y-3">
                        <div className="flex justify-between border-b border-white/20 pb-2">
                          <span className="opacity-70">Khách hàng:</span>
                          <span className="font-bold">{info.tenKH}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-2">
                          <span className="opacity-70">Giờ vào:</span>
                          <span>{info.gioVao}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/20 pb-2">
                          <span className="opacity-70">Thời gian gửi:</span>
                          <span>{info.thoiGian}</span>
                        </div>
                        <div className="pt-4 flex items-center justify-between">
                          <span className="text-xl font-bold">TỔNG TIỀN:</span>
                          <span className="text-3xl font-black text-yellow-300">{info.tien.toLocaleString()} VNĐ</span>
                        </div>
                      </div>
                      {/* Decor tròn mờ */}
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                  )}

                  {/* Nút Checkout */}
                  {info && (
                    <button
                      onClick={handleCheckout}
                      className="w-full py-5 bg-green-500 text-white rounded-3xl font-black text-xl shadow-xl shadow-green-100 hover:bg-green-600 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                    >
                      Xác nhận thanh toán & Ra cổng
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .scan-bar-orange {
          position: absolute;
          width: 100%;
          height: 6px;
          background: linear-gradient(to bottom, transparent, #f97316, transparent);
          box-shadow: 0 0 25px 3px rgba(249, 115, 22, 0.8);
          top: 0;
          z-index: 10;
          animation: scan-move 2s ease-in-out infinite;
        }

        @keyframes scan-move {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        .animate-in { animation: enter 0.5s ease-out forwards; }
        @keyframes enter { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default Checkout;