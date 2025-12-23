import { useState , useEffect} from "react";
import Header from "./header";
import axios from "axios";


const TicketList = () => {
  const [search, setSearch] = useState({ code: "", plate: "" });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    axios
      .get("http://localhost:8080/api/hoa-don")
      .then((res) => {
        console.log("DATA API:", res.data);

        // ✅ Nếu backend trả Page
        if (res.data.content) {
          setTickets(res.data.content);
        } 
        // ✅ Nếu backend trả List
        else {
          setTickets(res.data);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi gọi API:", err);
        setLoading(false);
      });
  }, []);



  // Lọc tìm kiếm
  const filtered = tickets.filter(
    (t) =>
      (t.maLichSu || "")
        .toLowerCase()
        .includes(search.code.toLowerCase()) &&
      (t.lichSu?.xe?.bienSoXe || "")
        .toLowerCase()
        .includes(search.plate.toLowerCase())
  );

  // ------------ PHÂN TRANG -------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentTickets = filtered.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Khi search → reset trang về 1
  const handleSearchChange = (field, value) => {
    setSearch({ ...search, [field]: value });
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-5">DANH SÁCH HÓA ĐƠN</h1>

      {/* Search */}
      <div className="px-4">
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-gray-700 ">Mã vé:</label>
              <input
                type="text"
                placeholder="Nhập mã vé"
                className="border rounded px-3 py-2 w-full mt-1 border-orange-400"
                value={search.code}
                onChange={(e) => handleSearchChange("code", e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 ">Biển số xe:</label>
              <input
                type="text"
                placeholder="Nhập biển số xe"
                className="border rounded px-3 py-2 w-full mt-1 border-orange-400"
                value={search.plate}
                onChange={(e) => handleSearchChange("plate", e.target.value)}
              />
            </div>

            <div className="flex items-end gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold w-full md:w-auto">
                Tìm kiếm
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold w-full md:w-auto"
                onClick={() => {
                  setSearch({ code: "", plate: "" });
                  setCurrentPage(1);
                }}
              >
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-4">
        <div className="border border-orange-400 rounded-lg overflow-hidden shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-500 border border-orange-400 text-white text-center">
                <th className="p-3 border border-orange-400">Mã Hóa Đơn</th>
                <th className="p-3 border border-orange-400">Tên Khách Hàng</th>
                <th className="p-3 border border-orange-400">Biển số xe</th>
                <th className="p-3 border border-orange-400">Loại xe</th>
                <th className="p-3 border border-orange-400">Thời gian vào</th>
                <th className="p-3 border border-orange-400">Thời gian ra</th>
                <th className="p-3 border border-orange-400">Ngày thanh toán</th>
                <th className="p-3 border border-orange-400">Nhân viên thu tiền</th>
                <th className="p-3 border border-orange-400">Tổng thời gian</th>
                <th className="p-3 border border-orange-400">Trạng thái</th>
                <th className="p-3 border border-orange-400">Tiền phí</th>
                <th className="p-3 border border-orange-400">Sửa</th>
                <th className="p-3 border border-orange-400">Xóa</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="text-center p-4">Đang tải dữ liệu...</td>
                </tr>
              ) : currentTickets.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center text-gray-500 p-4">Không có dữ liệu</td>
                </tr>
              ) : (
                currentTickets.map((t, index) => (
                  <tr key={t.maLichSu || index} className="text-center hover:bg-gray-50 border-b">
                    {/* Mã vé: Lấy trực tiếp từ maLichSu ở cấp ngoài cùng */}
                    <td className="p-3 border border-orange-400">
                      <span className="font-mono text-xs  bg-gray-100 px-1 py-0.5 rounded">
                        {t.maLichSu ? t.maLichSu.substring(0, 8).toUpperCase() : "N/A"}
                      </span>
                    </td>

                    {/* Khu vực: Mặc định là Khu A (vì JSON chưa có trường này) */}
                    {/* <td className="p-3 border">
                      {t.maKhuVuc || " - - - "}
                    </td> */}
  {/* Biển số xe: Trỏ vào lichSu -> xe -> bienSoXe */}
                    <td className="p-3 border border-orange-400 font-bold">
                      {t.lichSu?.khachHang?.hoTen || "---"}
                    </td>

                    {/* Biển số xe: Trỏ vào lichSu -> xe -> bienSoXe */}
                    <td className="p-3 border border-orange-400 font-bold">
                      {t.lichSu?.xe?.bienSoXe || "---"}
                    </td>

                    {/* Loại xe: Trỏ vào lichSu -> xe -> tenLoaiXe */}
                    <td className="p-3 border border-orange-400">
                      {t.lichSu?.xe?.tenLoaiXe || "Xe máy"}
                    </td>

                    {/* Thời gian vào: lichSu -> thoiGianBatDau */}
                    <td className="p-3 border border-orange-400 text-sm">
                      {t.lichSu?.thoiGianBatDau 
                        ? new Date(t.lichSu.thoiGianBatDau).toLocaleString('vi-VN') 
                        : "—"}
                    </td>

                    {/* Thời gian ra: lichSu -> thoiGianKetThuc */}
                    <td className="p-3 border border-orange-400 text-sm">
                      {t.lichSu?.thoiGianKetThuc 
                        ? new Date(t.lichSu.thoiGianKetThuc).toLocaleString('vi-VN') 
                        : "—"}
                    </td>
                     <td className="p-3 border border-orange-400 text-sm">
                      {t.ngayThanhToan 
                        ? new Date(t.ngayThanhToan).toLocaleString('vi-VN') 
                        : "—"}
                    </td>
                      {/* Người thu */}
                    <td className="p-3 border border-orange-400">
                      {t.nhanVien.hoTen !== undefined ? `${t.nhanVien.hoTen}` : "—"}
                    </td>
                    {/* Tổng thời gian: Lấy trường thoiGianGui cấp ngoài */}
                    <td className="p-3 border border-orange-400">
                      {t.thoiGianGui !== undefined ? `${t.thoiGianGui} Giờ` : "—"}
                    </td>

                    {/* Trạng thái: Dựa vào lichSu -> trangThaiSuDung */}
                    <td className="p-3 border border-orange-400">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        t.lichSu?.trangThaiSuDung === 'DA_RA' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {t.lichSu?.trangThaiSuDung === 'DA_RA' ? "Đã ra" : "Đang gửi"}
                      </span>
                    </td>

                    {/* Tiền phí: Lấy trường phi cấp ngoài */}
                    <td className="p-3 border border-orange-400 font-semibold text-red-600">
                      {t.phi !== undefined ? t.phi.toLocaleString('vi-VN') + "đ" : "0đ"}
                    </td>

                    {/* Nút thao tác */}
                    <td className="p-3 border border-orange-400">
                      <button className="text-blue-500 hover:text-blue-700 transition">✏️</button>
                    </td>
                    <td className="p-3 border border-orange-400">
                      <button className="text-red-500 hover:text-red-700 transition">🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-3">
            <a
              href=""
              className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Thêm vé
            </a>
            <a
              href="/ticketlist"
              className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Quay lại
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              onClick={handlePrev}
            >
              Trước
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
              onClick={handleNext}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
