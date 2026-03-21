import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddKH = () => {
  const location = useLocation();

  const [khachHang, setKhachHang] = useState({
    maKH: "",
    tenKH: "",
    gioiTinh: "",
    sdt: "",
    diaChi: "",
    bienSo: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setKhachHang((prev) => ({
        ...prev,
        bienSo: location.state.bienSo || "",
      }));
      setPreview(location.state.image || null);
    }
  }, [location.state]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleScanPlate = async () => {
    if (!file) {
      alert("Chọn ảnh trước!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:5000/scan", formData);
      setKhachHang({ ...khachHang, bienSo: res.data.plate });
    } catch {
      alert("Lỗi nhận diện biển số!");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      maKhachHang: khachHang.maKH,
      hoTen: khachHang.tenKH,
      gioiTinh: khachHang.gioiTinh,
      soDienThoai: khachHang.sdt,
      diaChi: khachHang.diaChi,
      bienSo: khachHang.bienSo,
      maQR: khachHang.maQR,
    };

    try {
      await axios.post("http://localhost:8080/api/khach-hang", payload);
      setSuccess(true);
      setKhachHang({
        maKH: "", tenKH: "", gioiTinh: "", sdt: "", diaChi: "", bienSo: "",
      });
      setPreview(null);
      setFile(null);
    } catch {
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100">
      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center shadow-2xl animate-scaleIn">
            <h2 className="text-green-600 text-xl font-bold">✔ Thành công</h2>
            <button
              onClick={() => setSuccess(false)}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition hover:scale-105"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-[700px] transition hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6 flex items-center justify-center gap-2">
          🚗 Thêm khách hàng
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            placeholder="Mã KH TỰ ĐỘNG"
            value={khachHang.maKH}
            onChange={(e) => setKhachHang({ ...khachHang, maKH: e.target.value })}
            className="input-cam border p-2 rounded-lg"
          />

          <input
            placeholder="Tên KH"
            value={khachHang.tenKH}
            onChange={(e) => setKhachHang({ ...khachHang, tenKH: e.target.value })}
            className="input-cam border p-2 rounded-lg"
          />

          <input
            placeholder="SĐT"
            value={khachHang.sdt}
            onChange={(e) => setKhachHang({ ...khachHang, sdt: e.target.value })}
            className="input-cam border p-2 rounded-lg"
          />

          <input
            placeholder="Địa chỉ"
            value={khachHang.diaChi}
            onChange={(e) => setKhachHang({ ...khachHang, diaChi: e.target.value })}
            className="input-cam border p-2 rounded-lg"
          />

          {/* ===== BIỂN SỐ & UPLOAD ===== */}
          <div className="border-2 border-orange-300 p-4 rounded-xl bg-orange-50/50 hover:shadow-md transition">
            <p className="font-semibold text-orange-600 mb-2">📷 Nhận diện biển số</p>

            {khachHang.bienSo && (
              <p className="text-green-600 text-sm mb-2">✔ Đã nhận diện: {khachHang.bienSo}</p>
            )}

            <div className="flex flex-col gap-3">
              {/* Input file ẩn hoàn toàn */}
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex gap-2">
                {/* 1. NÚT CHỌN ẢNH: Chỉ hiện khi CHƯA có file */}
                {!file && (
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm shadow-md flex items-center gap-2"
                  >
                    <span>📁 Chọn ảnh biển số</span>
                  </label>
                )}

                {/* 2. NÚT QUÉT ẢNH: Chỉ hiện khi ĐÃ CÓ file và CHƯA quét xong biển số */}
                {file && !khachHang.bienSo && (
                  <button
                    type="button"
                    onClick={handleScanPlate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm shadow-md"
                  >
                    {loading ? "Đang quét..." : "🔍 Bắt đầu nhận diện"}
                  </button>
                )}

                {/* 3. NÚT CHỌN LẠI: Hiện khi đã có file (để người dùng đổi ảnh nếu chọn nhầm) */}
                {file && (
                  <button
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition text-xs shadow-sm"
                  >
                    ✕ Hủy ảnh
                  </button>
                )}
              </div>

              {/* Hiển thị ảnh đã chọn */}
              {preview && (
                <div className="relative mt-2 w-fit">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 rounded-lg border-2 border-orange-200 object-cover shadow-sm"
                  />
                </div>
              )}

              <input
                placeholder="Biển số"
                value={khachHang.bienSo}
                onChange={(e) => setKhachHang({ ...khachHang, bienSo: e.target.value })}
                className="input-cam border p-2 rounded-lg w-full"
              />
            </div>
          </div>

          <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:scale-105 transition font-semibold shadow-lg">
            🚀 Thêm khách hàng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKH;