import { useState } from "react";

const TicketList = () => {
  const [search, setSearch] = useState({ code: "", plate: "" });

  // ---- Dữ liệu cứng (2–3 vé) ----
  const tickets = [
    {
      code: "VE001",
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
      plate: "30H-45678",
      type: "Xe máy",
      timeIn: "2025-01-12 07:45",
      timeOut: "2025-01-12 09:15",
      totalTime: "1 giờ 30 phút",
      status: "OUT",
      fee: "10.000đ",
    },
  ];

  const filtered = tickets.filter(
    (t) =>
      t.code.toLowerCase().includes(search.code.toLowerCase()) &&
      t.plate.toLowerCase().includes(search.plate.toLowerCase())
  );


  // p-6 max-w-7xl mx-auto div đầu tiên căn lề giữa
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">DANH SÁCH VÉ</h1>

      {/* Search area */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-gray-700 ">Mã vé:</label>
            <input
              type="text"
              placeholder="Nhập mã vé"
              className="border rounded px-3 py-2 w-full mt-1 border-orange-400"
              value={search.code}
              onChange={(e) => setSearch({ ...search, code: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 ">Biển số xe:</label>
            <input
              type="text"
              placeholder="Nhập biển số xe"
              className="border rounded px-3 py-2 w-full mt-1 border-orange-400"
              value={search.plate}
              onChange={(e) => setSearch({ ...search, plate: e.target.value })}
            />
          </div>

          <div className="flex items-end gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold w-full md:w-auto">
              Tìm kiếm
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold w-full md:w-auto"
              onClick={() => setSearch({ code: "", plate: "" })}
            >
              Xem tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-orange-400 rounded-lg overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="bg-orange-500 border border-orange-400 text-white text-center">
              <th className="p-3 border border-orange-400">Mã vé</th>
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
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 border text-center text-gray-500" colSpan="8">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.code} className="text-center hover:bg-gray-50">
                  <td className="p-3 border border-orange-400">{t.code}</td>
                  <td className="p-3 border border-orange-400">{t.plate}</td>
                  <td className="p-3 border border-orange-400">{t.type}</td>
                  <td className="p-3 border border-orange-400">{t.timeIn}</td>
                  <td className="p-3 border border-orange-400">{t.timeOut}</td>
                  <td className="p-3 border border-orange-400">{t.totalTime}</td>
                  <td className="p-3 border border-orange-400 font-bold text-blue-600">{t.status}</td>
                  <td className="p-3 border border-orange-400 font-semibold text-green-700">{t.fee}</td>
                  <td className="p-3 border border-orange-300 cursor-pointer justify-center">✏️</td>
                  <td className="p-3 border border-orange-300 cursor-pointer justify-center">🗑️</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div> 
        <div className="flex justify-between items-center mt-6">

          {/* LEFT BUTTON GROUP */}
          <div className="flex gap-3">
            <a
              href=""
              className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Thêm vé
            </a>

            <a
              href="/"
              className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Quay lại
            </a>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-2">

            <button className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
              Trước
            </button>

            <button className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
              1
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
              2
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
              3
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
              4
            </button>

            <button className="px-3 py-1 rounded-lg bg-gray-300 text-black">
              ...
            </button>

            <button className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
              Sau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketList;
