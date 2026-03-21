import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./home";

const UpdateKH = () => {
  const { maKH } = useParams();
  const navigate = useNavigate();

  const [khachHang, setKhachHang] = useState({
    maKH: "",
    tenKH: "",
    gioiTinh: "",
    sdt: "",
    diaChi: "",
  });

  const [success, setSuccess] = useState(false);

  // ===== LOAD KH =====
  useEffect(() => {
    const fetchKH = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/khach-hang/${maKH}`
        );

        const kh = res.data;

        setKhachHang({
          maKH: kh.maKhachHang,
          tenKH: kh.hoTen,
          gioiTinh: kh.gioiTinh,
          sdt: kh.soDienThoai,
          diaChi: kh.diaChi,
        });
      } catch (error) {
        console.error("Lỗi load khách hàng:", error);
        alert("Không tải được thông tin khách hàng");
      }
    };

    fetchKH();
  }, [maKH]);

  // ===== UPDATE =====
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
      await axios.put(
        `http://localhost:8080/api/khach-hang/${maKH}`,
        payload
      );

      // ✅ HIỂN THỊ MOCKUP
      setSuccess(true);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div>
      {/* ===== MOCKUP THÀNH CÔNG ===== */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] text-center animate-scaleIn">
            <div className="text-green-500 text-5xl mb-4">✔️</div>

            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Cập nhật thành công!
            </h3>

            <p className="text-gray-500 mb-6">
              Thông tin khách hàng đã được cập nhật
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/listKH")}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:scale-105 transition"
              >
                Danh sách KH
              </button>

              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:scale-105 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== FORM ===== */}
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{
          backgroundImage: "url('/img/oto2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[700px]">
          <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
            Cập Nhật Khách Hàng
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Thông tin khách hàng
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={khachHang.maKH}
                  disabled
                  className="border border-amber-400 rounded px-3 py-2 w-full bg-gray-100"
                />

                <input
                  type="text"
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
                Cập nhật
              </button>

              <button
                type="button"
                onClick={() => navigate("/listKH")}
                className="w-32 bg-orange-600 text-white py-3 rounded-lg
                           hover:bg-yellow-400 hover:scale-105 transition font-semibold"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateKH;
