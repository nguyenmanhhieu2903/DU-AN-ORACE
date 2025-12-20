import { useState } from "react";
import axios from "axios";

const AddKH = () => {
  const [khachHang, setKhachHang] = useState({
    maKH: "",
    tenKH: "",
    gioiTinh: "",
    sdt: "",
    diaChi: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      maKhachHang: khachHang.maKH,
      hoTen: khachHang.tenKH,
      gioiTinh: khachHang.gioiTinh,
      soDienThoai: khachHang.sdt,
      diaChi: khachHang.diaChi,
    };

    try {
      await axios.post("http://localhost:8080/api/khach-hang", payload);

      // ✅ HIỂN THỊ MOCKUP
      setSuccess(true);

      // Reset form
      setKhachHang({
        maKH: "",
        tenKH: "",
        gioiTinh: "",
        sdt: "",
        diaChi: "",
      });
    } catch (error) {
      console.error("Lỗi thêm khách hàng:", error);
      alert("Thêm khách hàng thất bại!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/img/oto2.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* ===== MOCKUP THÀNH CÔNG ===== */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center animate-scaleIn">
            <div className="text-green-500 text-5xl mb-4">✔️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Thêm thành công!
            </h3>
            <p className="text-gray-500 mb-6">
              Khách hàng đã được lưu vào hệ thống
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:scale-105 transition"
              >
                Thêm tiếp
              </button>

              <a
                href="/listKH"
                className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:scale-105 transition"
              >
                Danh sách
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===== FORM ===== */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[700px]">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
          Thêm Khách Hàng
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Thông tin khách hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mã khách hàng"
                value={khachHang.maKH}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, maKH: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
                required
              />

              <input
                type="text"
                placeholder="Tên khách hàng"
                value={khachHang.tenKH}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, tenKH: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
                required
              />

              <select
                value={khachHang.gioiTinh}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, gioiTinh: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
                required
              >
                <option value="">Giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>

              <input
                type="text"
                placeholder="Số điện thoại"
                value={khachHang.sdt}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, sdt: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
                required
              />

              <select
                value={khachHang.diaChi}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, diaChi: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full md:col-span-2"
                required
              >
                <option value="">-- Chọn tỉnh/thành phố --</option>
                <option>Hà Nội</option>
                <option>TP Hồ Chí Minh</option>
                <option>Hải Phòng</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-44 bg-orange-600 text-white py-3 rounded-lg
                         hover:bg-green-600 hover:scale-105 transition font-semibold"
            >
              Thêm khách hàng
            </button>

            <a
              href="/listKH"
              className="w-32 text-center bg-orange-600 text-white py-3 rounded-lg 
                         hover:bg-yellow-400 hover:scale-105 transition font-semibold"
            >
              Quay Lại
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKH;
