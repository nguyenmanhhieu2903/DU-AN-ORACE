import { useState } from "react";

const ListKH = () => {

    const [open, setOpen] = useState(false); // bật/tắt hidden panel
    const [selected, setSelected] = useState(null); // thông tin xe

    // p-6 max-w-7xl mx-auto div đầu tiên căn lề giữa

    return (
        <div className="">
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl">DANH SÁCH KHÁCH HÀNG</h1>

                {/* Form tìm kiếm */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-4 gap-4 mb-4">

                        <div>
                            <label className="font-semibold text-gray-700">Tên KH:</label>
                            <input type="text" placeholder="Tên khách hàng" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-700">CMND:</label>
                            <input type="text" placeholder="Chứng minh nhân dân" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-700">SDT:</label>
                            <input type="text" placeholder="Số điện thoại" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div></div>

                        <div>
                            <label className="font-semibold text-gray-700">Ngày sinh:</label>
                            <input type="date" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-700">Đến ngày:</label>
                            <input type="date" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">Tìm kiếm</button>
                        <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">Xem tất cả</button>
                    </div>
                </div>

                {/* Bảng danh sách */}
                <div className="overflow-auto">
                    <div className="border border-orange-400 rounded-lg overflow-hidden shadow-md">
                        <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-orange-500 text-white">
                            <th className="p-2 border border-orange-400">Mã KH</th>
                            <th className="p-2 border border-orange-400">Họ và tên</th>
                            <th className="p-2 border border-orange-400">Ngày sinh</th>
                            <th className="p-2 border border-orange-400">CCCD</th>
                            <th className="p-2 border border-orange-400">Giới tính</th>
                            <th className="p-2 border border-orange-400">Số điện thoại</th>
                            <th className="p-2 border border-orange-400">Sửa</th>
                            <th className="p-2 border border-orange-400">Xóa</th>
                            <th className="p-2 border border-orange-400">Thông tin xe</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1,2,3,4,5].map(id => (
                            <tr key={id} className="text-center bg-white hover:bg-gray-100">
                                <td className="p-2 border border-orange-300">{id}</td>
                                <td className="p-2 border border-orange-300">Tên khách hàng {id}</td>
                                <td className="p-2 border border-orange-300">25-12-1994</td>
                                <td className="p-2 border border-orange-300">123456789</td>
                                <td className="p-2 border border-orange-300">Nữ</td>
                                <td className="p-2 border border-orange-300">0962356988</td>
                                <td className="p-2 border border-orange-300 cursor-pointer">✏️</td>
                                <td className="p-2 border border-orange-300 cursor-pointer">🗑️</td>
                                <td
                                className="p-2 border border-orange-300 cursor-pointer"
                                onClick={() => {
                                    setSelected({
                                    loaiXe: "Ô tô",
                                    mauxe: "Đỏ",
                                    bienSo: "30H-123.45",
                                    maKH: + id,
                                    });
                                    setOpen(true);
                                }}
                                >
                                👁️
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>


                {/* Footer & Pagination */}
                <div> 
                    <div className="flex justify-between items-center mt-6">

                    {/* LEFT BUTTON GROUP */}
                    <div className="flex gap-3">
                        <a
                        href="/addKH"
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

                {/* HIDDEN PANEL - nằm ngay trong trang */}
                {open && selected && (
                    <div className="mt-8 bg-white shadow-lg rounded-lg p-6 border border-orange-400">

                        <h2 className="text-xl font-bold text-orange-600 mb-4">
                            Thông Tin Xe
                        </h2>

                        <p><strong>Loại xe:</strong> {selected.loaiXe}</p>
                        <p><strong>Biển số xe:</strong> {selected.bienSo}</p>
                        <p><strong>Màu xe:</strong> {selected.mauxe}</p>
                        <p><strong>Mã khách hàng:</strong> {selected.maKH}</p>

                        <button
                            onClick={() => setOpen(false)}
                            className="mt-5 bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                        >
                            Ẩn thông tin
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ListKH;
