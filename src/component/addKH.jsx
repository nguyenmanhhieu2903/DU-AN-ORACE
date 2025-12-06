import { useState } from "react";
 
const AddKH = () => {
  const [khachHang, setKhachHang] = useState({
    maKH: "",
    tenKH: "",
    gioiTinh: "",
    sdt: "",
    diaChi: "",
  });

  const [xe, setXe] = useState({
    bienSo: "",
    loaiXe: "",
    mauXe: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin KH: ", khachHang);
    console.log("Thông tin xe: ", xe);

    alert("Thêm khách hàng thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8"
          style={{
          backgroundImage: "url('/img/oto2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[700px]">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
          Thêm Khách Hàng
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* ===== THÔNG TIN KHÁCH HÀNG ===== */}
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
              />

              <input
                type="text"
                placeholder="Tên khách hàng"
                value={khachHang.tenKH}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, tenKH: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />

              <input
                type="text"
                placeholder="Căn Cước Công Dân"
                value={khachHang.CCCDKH}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, tenKH: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />

              <input
                type="date"
                placeholder="Ngày sinh"
                value={khachHang.ngaySinh}
                onChange={(e) =>
                    setKhachHang({ ...khachHang, ngaySinh: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />

              <select
                value={khachHang.gioiTinh}
                onChange={(e) =>
                  setKhachHang({ ...khachHang, gioiTinh: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
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
              />

              <select
                value={khachHang.diaChi}
                onChange={(e) =>
                    setKhachHang({ ...khachHang, diaChi: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full md:col-span-2"
                >
                <option value="">-- Chọn tỉnh/thành phố --</option>

                <option>Hà Nội</option>
                <option>TP Hồ Chí Minh</option>
                <option>Hải Phòng</option>
                <option>Đà Nẵng</option>
                <option>Cần Thơ</option>
                <option>Bắc Giang</option>
                <option>Bắc Kạn</option>
                <option>Bạc Liêu</option>
                <option>Bắc Ninh</option>
                <option>Lai Châu</option>
                <option>Lâm Đồng</option>
                <option>Lạng Sơn</option>
                </select>
            </div>
          </div>

          {/* ===== THÔNG TIN XE ===== */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Thông tin xe
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Biển số xe"
                value={xe.bienSo}
                onChange={(e) =>
                  setXe({ ...xe, bienSo: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />

              <input
                type="text"
                placeholder="Loại xe"
                value={xe.loaiXe}
                onChange={(e) =>
                  setXe({ ...xe, loaiXe: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />

              <input
                type="text"
                placeholder="Màu xe"
                value={xe.mauXe}
                onChange={(e) =>
                  setXe({ ...xe, mauXe: e.target.value })
                }
                className="border border-amber-400 rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* ===== BUTTON ===== */}
          <div className="flex justify-between">
            <button
                type="submit"
                className="mt-3 w-44 flex items-center justify-center gap-2 
                            bg-orange-600 text-white py-3 rounded-lg
                            hover:bg-green-600 hover:scale-105 transition font-semibold"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Thêm khách hàng
            </button>
            <a
                href="/listKH"
                className="mt-3 w-32 block text-center bg-orange-600 text-white py-3 rounded-lg 
                            hover:bg-yellow-400 hover:scale-105 transition font-semibold"
                >
                Quay Lại
            </a>

          </div>
        </form>
      </div>
    </div>
  );
}
export default AddKH;