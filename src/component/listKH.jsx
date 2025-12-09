import { useState } from "react";
import Header from "./header";

const customers = [
{ id: 1, name: "Nguyễn Văn A", address: "Hà Nội", gender: "Nam", phone: "0912345678" },
{ id: 2, name: "Trần Thị B", address: "Hải Phòng", gender: "Nữ", phone: "0987654321" },
{ id: 3, name: "Lê Văn C", address: "Đà Nẵng", gender: "Nam", phone: "0901122334" },
{ id: 4, name: "Phạm Thị D", address: "Cần Thơ", gender: "Nữ", phone: "0933445566" },
{ id: 5, name: "Hoàng Văn E", address: "Bắc Ninh", gender: "Nam", phone: "0977889900" },
{ id: 6, name: "Vũ Văn F", address: "TPHCM", gender: "Nam", phone: "0911223344" },
{ id: 7, name: "Đỗ Thị G", address: "Hà Nội", gender: "Nữ", phone: "0988112233" },
];

const ListKH = () => {

    const [open, setOpen] = useState(false); // bật/tắt hidden panel
    const [selected, setSelected] = useState(null); // thông tin xe

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirst, indexOfLast);


    const totalPages = Math.ceil(customers.length / itemsPerPage);

    // p-6 max-w-7xl mx-auto div đầu tiên căn lề giữa

    return (
        <div className="">
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold text-center pb-5">DANH SÁCH KHÁCH HÀNG</h1>

                {/* Form tìm kiếm */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-3 gap-3 mb-4">

                        <div>
                            <label className="font-semibold text-gray-700">Tên KH:</label>
                            <input type="text" placeholder="Tên khách hàng" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-700">SDT:</label>
                            <input type="text" placeholder="Số điện thoại" className="w-full border border-orange-400 rounded px-3 py-2 mt-1" />
                        </div>

                        <div></div>

                        <div>
                            <label className="font-semibold text-gray-700">Địa chỉ:</label>
                            <select className="border border-amber-400 rounded px-3 py-2 w-full md:col-span-2">
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
                    <th className="p-2 border border-orange-400">Địa chỉ</th>
                    <th className="p-2 border border-orange-400">Giới tính</th>
                    <th className="p-2 border border-orange-400">Số điện thoại</th>
                    <th className="p-2 border border-orange-400">Sửa</th>
                    <th className="p-2 border border-orange-400">Xóa</th>
                    <th className="p-2 border border-orange-400">Thông tin xe</th>
                    </tr>
                    </thead>


                    <tbody>
                    {currentCustomers.map((kh) => (
                    <tr key={kh.id} className="text-center bg-white hover:bg-gray-100">
                    <td className="p-2 border border-orange-300">{kh.id}</td>
                    <td className="p-2 border border-orange-300">{kh.name}</td>
                    <td className="p-2 border border-orange-300">{kh.address}</td>
                    <td className="p-2 border border-orange-300">{kh.gender}</td>
                    <td className="p-2 border border-orange-300">{kh.phone}</td>
                    <td className="p-2 border border-orange-300 cursor-pointer">✏️</td>
                    <td className="p-2 border border-orange-300 cursor-pointer">🗑️</td>


                    <td
                    className="p-2 border border-orange-300 cursor-pointer"
                    onClick={() => {
                    setSelected({ loaiXe: "Ô tô", mauxe: "Đỏ", bienSo: "30H-123.45", maKH: kh.id });
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
                <div className="flex justify-between items-center mt-6">
                    <div className="flex gap-3">
                    <a href="/addKH" className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition">Thêm khách hàng</a>
                    <a href="/" className="bg-orange-400 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition">Quay lại</a>
                    </div>


                    <div className="flex items-center gap-2">
                    <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-700"
                    >
                    Trước
                    </button>


                    {[...Array(totalPages)].map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                    {index + 1}
                    </button>
                    ))}


                    <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-700"
                    >
                    Sau
                    </button>
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
