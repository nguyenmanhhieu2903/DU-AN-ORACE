import { useState, useEffect, useCallback } from "react";
import Header from "./header";
import axios from "axios";

const ListKH = () => {
  // ----- STATE QUẢN LÝ DỮ LIỆU --------
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [xeList, setXeList] = useState([]);

  // ----- STATE TÌM KIẾM --------
  const [search, setSearch] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // --- ĐỊNH NGHĨA HÀM TRƯỚC ---
const fetchXe = useCallback(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/xe");
    if (Array.isArray(response.data)) {
      const activeXe = response.data.filter(xe => (xe.deleteFlag ?? xe.DELETE_FLAG) !== 1);
      setXeList(activeXe);
    }
  } catch (err) {
    console.error("API Xe Error:", err);
  }
}, []);

  // 1. CẬP NHẬT HÀM LẤY DỮ LIỆU KHÁCH HÀNG
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/khach-hang");
      
      // Kiểm tra nếu response.data là mảng mới filter
      if (Array.isArray(response.data)) {
        const activeCustomers = response.data.filter(c => c.DELETE_FLAG !== 1);
        setCustomers(activeCustomers);
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ API.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- GỌI TRONG USEEFFECT SAU CÙNG ---
useEffect(() => {
  fetchCustomers();
  fetchXe();
}, [fetchCustomers, fetchXe]);

  // 2. SỬA HÀM XÓA
  const handleDelete = async (maKH) => {
  if (!maKH) {
    alert("Mã khách hàng không hợp lệ!");
    return;
  }

  const confirmDelete = window.confirm(
    "Bạn có chắc chắn muốn xóa khách hàng này không?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:8080/api/khach-hang/${maKH}`
    );

    // ✅ Reload lại danh sách khách hàng
    await fetchCustomers();

    // ✅ HIỂN THỊ MOCKUP XÓA THÀNH CÔNG
    setDeleteSuccess(true);

  } catch (error) {
    console.error("Lỗi xóa khách hàng:", error);
    alert("Xóa khách hàng thất bại! Vui lòng kiểm tra Server.");
  }
};

  // ----- FILTER --------
  const filtered = customers.filter(c =>
  (c.hoTen || "").toLowerCase().includes(search.name.toLowerCase()) &&
  (c.soDienThoai || "").includes(search.phone) &&
  (search.address === "" || c.diaChi === search.address)
);

  // ----- PHÂN TRANG -------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCustomers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleSearchChange = (field, value) => {
    setSearch({ ...search, [field]: value });
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />

      <div className="p-6 bg-gray-100 min-h-screen font-sans">
        <h1 className="text-4xl font-bold text-center pb-5 text-orange-600">
          DANH SÁCH KHÁCH HÀNG
        </h1>

        {/* FORM TÌM KIẾM */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-t-4 border-orange-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="font-semibold text-gray-700">
                Tên khách hàng:
              </label>
              <input
                type="text"
                className="w-full border border-orange-400 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Nhập họ tên..."
                value={search.name}
                onChange={e =>
                  handleSearchChange("name", e.target.value) 
                }
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Số điện thoại:
              </label>
              <input
                type="text"
                className="w-full border border-orange-400 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Nhập SĐT..."
                value={search.phone}
                onChange={e =>
                  handleSearchChange("phone", e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Địa chỉ:
              </label>
              <select
                className="w-full border border-orange-400 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
                value={search.address}
                onChange={e =>
                  handleSearchChange("address", e.target.value)
                }
              >
                <option value="">-- Tất cả địa chỉ --</option>

                {[...new Set(customers.map(c => c.diaChi).filter(Boolean))]
                  .map((addr, index) => (
                    <option
                      key={`addr-${index}`}
                      value={addr}
                    >
                      {addr}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600 transition">
              Tìm kiếm
            </button>

            <button
              className="bg-orange-500 text-white px-6 py-2 rounded shadow hover:bg-orange-600 transition"
              onClick={() =>
                setSearch({ name: "", phone: "", address: "" })
              }
            >
              Làm mới
            </button>
          </div>
        </div>

        {/* BẢNG DANH SÁCH */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {loading ? (
            <div className="text-center py-20 text-orange-500 font-medium">
              Đang tải dữ liệu khách hàng...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-400">
            <table className="w-full text-sm text-left border-collapse">
              <thead className=" text-white uppercase bg-orange-500">
                <tr className="text-center">
                  {/* Thêm border-x và border-white để phân tách rõ các cột tiêu đề */}
                  <th className="p-4 border border-orange-400 border-r-white/30">Mã KH</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Họ và tên</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Số điện thoại</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Giới tính</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Địa chỉ</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Sửa</th>
                  <th className="p-4 border border-orange-400 border-r-white/30">Xóa</th>
                  <th className="p-4 border border-orange-400">Thông Tin Xe</th>
                </tr>
              </thead>

              <tbody>
                {currentCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500 border border-orange-400"
                    >
                      Không tìm thấy khách hàng nào
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((kh, index) => (
                    <tr
                      key={`kh-${kh.maKhachHang ?? index}`}
                      className="hover:bg-orange-50 transition text-center"
                    >
                      {/* Thêm border border-orange-500 vào từng ô td */}
                      <td className="p-4 font-medium text-gray-900 border border-orange-400">
                        {kh.maKhachHang.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="p-4 text-center border border-orange-400">
                        {kh.hoTen}
                      </td>
                      <td className="p-4 border border-orange-400">
                        {kh.soDienThoai}
                      </td>
                      <td className="p-4 border border-orange-400">
                        {kh.gioiTinh}
                      </td>
                      <td className="p-4 text-center border border-orange-400">
                        {kh.diaChi}
                      </td>
                      <td className="p-4 border border-orange-400">
                        <a href={`/updateKH/${kh.maKhachHang}`} title="Sửa">
                          <span className="inline-block hover:scale-125 transition-transform duration-300">
                            ✏️
                          </span>
                        </a>
                      </td>
                      <td className="p-4 border border-orange-400">
                        <button
                          title="Xóa"
                          className="hover:scale-125 transition-transform"
                          onClick={() => handleDelete(kh.maKhachHang)}
                        >
                          🗑️
                        </button>
                      </td>
                      <td className="p-4 border border-orange-400">
                        <button
                          title="Xem chi tiết xe"
                          className="hover:scale-125 transition-transform"
                          onClick={() => {
                          // 1. Lọc xe ngay lập tức dựa trên dữ liệu khách hàng (kh) đang được map
                          const xeTheoKH = xeList.filter(xe => {
                            // Truy cập vào khachHang theo Entity Java (chữ k thường)
                            const maKhTrongXe = xe?.khachHang?.maKhachHang || xe?.maKhachHang || xe?.makhachhang;
                            const maKhHienTai = kh?.maKhachHang;
                            
                            return String(maKhTrongXe || "").trim() === String(maKhHienTai || "").trim();
                          });

                          console.log("🚗 Danh sách xe tìm thấy cho " + kh.maKhachHang + ":", xeTheoKH);

                          // 2. Cập nhật dữ liệu vào state selected để hiển thị lên Modal
                          if (xeTheoKH.length > 0) {
                            const xeInfo = xeTheoKH[0];
                            setSelected({
                              loaiXe: xeInfo.tenXe || xeInfo.tenxe || "Không rõ loại xe",
                              bienSo: xeInfo.bienSo || xeInfo.bienso || "Không biển số",
                              maKH: kh.maKhachHang,
                              tenKH: kh.hoTen
                            });
                          } else {
                            setSelected({
                              loaiXe: "N/A",
                              bienSo: "N/A",
                              maKH: kh.maKhachHang,
                              tenKH: kh.hoTen,
                            });
                          }

                          setOpen(true);
                        }}

                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>

        {/* PHÂN TRANG */}
        {!loading && totalPages >= 1 && (
          <div className="flex justify-between items-center gap-4 mt-8 pb-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-orange-400 border border-orange-400 rounded-xl shadow-sm text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:border-orange-600 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 disabled:active:scale-100"
            >
              Trình trước
            </button>

            <div className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-full shadow-inner font-bold border-2 border-orange-400">
              Trang {currentPage} / {totalPages}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2  bg-orange-400 border border-orange-400 rounded-xl shadow-sm text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:border-orange-600 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 disabled:active:scale-100"
            >
              Kế tiếp
            </button>
          </div>
        )}

        {/* MODAL */}
        {open && selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-4 border-b pb-2">
                Thông Tin Phương Tiện
              </h2>

              <p><b>Khách hàng:</b> {selected.tenKH}</p>
              <p><b>Mã KH:</b> {selected.maKH}</p>
              <p><b>Loại xe:</b> {selected.loaiXe}</p>
              <p><b>Biển số:</b> {selected.bienSo}</p>

              <button
                onClick={() => setOpen(false)}
                className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        <div className="flex">
          <a
            href="/addKH"
            className="
              px-6 py-3 
              bg-orange-500 text-white font-semibold 
              rounded-lg shadow-md
              transition-all duration-300
              hover:bg-green-600 hover:scale-110
              active:scale-95
            "
          >
            + Thêm Khách Hàng
          </a>
        </div>
        {/* ===== MOCKUP XÓA THÀNH CÔNG ===== */}
        {deleteSuccess && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] text-center animate-scaleIn">
              <div className="text-green-500 text-5xl mb-4">✔️</div>

              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Xóa khách hàng thành công!
              </h3>

              <p className="text-gray-500 mb-6">
                Khách hàng đã được xóa khỏi hệ thống
              </p>

              <button
                onClick={() => setDeleteSuccess(false)}
                className="
                  px-6 py-3 
                  bg-orange-600 text-white font-semibold 
                  rounded-lg shadow-md
                  hover:bg-orange-700 hover:scale-105
                  transition
                "
              >
                Đóng
              </button>
            </div>
          </div>
)}
      </div>
    </div>
  );
};

export default ListKH;
