import { useState } from "react";
import Header from "./header";

const TicketList = () => {
  const [search, setSearch] = useState({ code: "", plate: "" });

  const tickets = [
    {
      code: "VE001",
      khuvuc: "Khu A",
      plate: "29A-12345",
      type: "Xe máy",
      timeIn: "2025-01-12 08:00",
      timeOut: "2025-01-12 10:30",
      totalTime: "2 giờ 30 phút",
      status: "OUT",
      fee: "15.000đ",
    },
    {
      code: "VE002",
      khuvuc: "Khu B",
      plate: "51F-88888",
      type: "Ô tô",
      timeIn: "2025-01-12 09:00",
      timeOut: "—",
      totalTime: "—",
      status: "IN",
      fee: "—",
    },
    {
      code: "VE003",
      khuvuc: "Khu C",
      plate: "30H-45678",
      type: "Xe máy",
      timeIn: "2025-01-12 07:45",
      timeOut: "2025-01-12 09:15",
      totalTime: "1 giờ 30 phút",
      status: "OUT",
      fee: "10.000đ",
    },
    {
      code: "VE004",
      khuvuc: "Khu A",
      plate: "29H-33333",
      type: "Xe máy",
      timeIn: "2025-01-12 06:30",
      timeOut: "2025-01-12 08:00",
      totalTime: "1 giờ 30 phút",
      status: "OUT",
      fee: "10.000đ",
    },
    {
      code: "VE005",
      khuvuc: "Khu B",
      plate: "88A-88888",
      type: "Ô tô",
      timeIn: "2025-01-12 11:00",
      timeOut: "—",
      totalTime: "—",
      status: "IN",
      fee: "—",
    },
    {
      code: "VE006",
      khuvuc: "Khu C",
      plate: "30F-67890",
      type: "Xe máy",
      timeIn: "2025-01-12 05:00",
      timeOut: "2025-01-12 06:15",
      totalTime: "1 giờ 15 phút",
      status: "OUT",
      fee: "8.000đ",
    },
  ];

  // Lọc tìm kiếm
  const filtered = tickets.filter(
    (t) =>
      t.code.toLowerCase().includes(search.code.toLowerCase()) &&
      t.plate.toLowerCase().includes(search.plate.toLowerCase())
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
      <h1 className="text-4xl font-bold text-center mb-5">DANH SÁCH VÉ</h1>

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
                <th className="p-3 border border-orange-400">Mã vé</th>
                <th className="p-3 border border-orange-400">Khu vực</th>
                <th className="p-3 border border-orange-400">Biển số xe</th>
                <th className="p-3 border border-orange-400">Loại xe</th>
                <th className="p-3 border border-orange-400">Thời gian vào</th>
                <th className="p-3 border border-orange-400">Thời gian ra</th>
                <th className="p-3 border border-orange-400">Tổng thời gian</th>
                <th className="p-3 border border-orange-400">Trạng thái</th>
                <th className="p-3 border border-orange-400">Tiền phí</th>
                <th className="p-3 border border-orange-400">Sửa</th>
                <th className="p-3 border border-orange-400">Xóa</th>
              </tr>
            </thead>

            <tbody>
              {currentTickets.length === 0 ? (
                <tr>
                  <td className="p-3 border text-center text-gray-500" colSpan="11">
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              ) : (
                currentTickets.map((t) => (
                  <tr key={t.code} className="text-center hover:bg-gray-50">
                    <td className="p-3 border border-orange-400">{t.code}</td>
                    <td className="p-3 border border-orange-400">{t.khuvuc}</td>
                    <td className="p-3 border border-orange-400">{t.plate}</td>
                    <td className="p-3 border border-orange-400">{t.type}</td>
                    <td className="p-3 border border-orange-400">{t.timeIn}</td>
                    <td className="p-3 border border-orange-400">{t.timeOut}</td>
                    <td className="p-3 border border-orange-400">{t.totalTime}</td>
                    <td className="p-3 border border-orange-400 font-bold text-blue-600">{t.status}</td>
                    <td className="p-3 border border-orange-400 font-semibold text-green-700">{t.fee}</td>
                    <td className="p-3 border border-orange-300 cursor-pointer">✏️</td>
                    <td className="p-3 border border-orange-300 cursor-pointer">🗑️</td>
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
