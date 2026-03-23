import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ĐỊNH NGHĨA ẢNH NỀN BÃI XE ĐẸP (Blurred Parking Lot)
const backgroundImage = "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=1600&auto=format&fit=crop&blur=10"; // Thêm blur trực tiếp từ URL

const AddTicket = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Lấy thời gian hiện tại chính xác đến phút cho input datetime-local
    const getCurrentDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        maLichSu: `IN-${Date.now().toString().slice(-6)}`,
        nhanVien: { hoTen: "Trần Đăng Khoa" }, // Giả định nhân viên đang login
        lichSu: {
            thoiGianBatDau: getCurrentDateTime(),
            trangThaiSuDung: "DANG_GUI",
            xe: {
                bienSoXe: "",
                tenLoaiXe: "Ô tô"
            },
            khachHang: {
                hoTen: "Khách vãng lai"
            }
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const keys = name.split(".");
            setFormData((prev) => {
                let newData = JSON.parse(JSON.stringify(prev));
                let temp = newData;
                for (let i = 0; i < keys.length - 1; i++) {
                    temp = temp[keys[i]];
                }
                temp[keys[keys.length - 1]] = value;
                return newData;
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post("http://localhost:8080/api/hoa-don", formData)
            .then(() => {
                alert("🚗 XE VÀO BÃI THÀNH CÔNG!");
                navigate("/ticketlist");
            })
            .catch((err) => {
                console.error(err);
                alert("❌ Lỗi kết nối, vui lòng kiểm tra server!");
            })
            .finally(() => setLoading(false));
    };

    return (
        // 1. CONTAINER CHÍNH CÓ ẢNH NỀN
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* 2. LỚP PHỦ MÀU ĐEN (Overlay) ĐỂ LÀM NỔI BẬT FORM */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* 3. FORM CHÍNH (Giữ nguyên logic, chỉ nâng cấp UI) */}
            <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(255,165,0,0.3)] rounded-3xl overflow-hidden border border-white/20 transition-all">

                {/* Header trang trí với Gradient Orange */}
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-white text-center border-b border-orange-200">
                    <div className="text-5xl mb-3">🚗</div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase">Xác nhận xe vào bãi</h2>
                    <p className="opacity-90 text-sm mt-1 font-medium">Quy trình Check-in tự động (Khu A)</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">

                        {/* Khu vực biển số xe (To, rõ, nhấn mạnh) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest text-center">
                                Vui lòng nhập Biển số xe:
                            </label>
                            <input
                                required
                                name="lichSu.xe.bienSoXe"
                                placeholder="29A-123.45"
                                className="w-full text-4xl text-center font-black border-4 border-orange-300 rounded-2xl px-4 py-5 focus:ring-8 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all uppercase tracking-wider shadow-inner placeholder:text-gray-200"
                                value={formData.lichSu.xe.bienSoXe}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Loại xe:</label>
                                <select
                                    name="lichSu.xe.tenLoaiXe"
                                    className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 font-semibold outline-none focus:border-orange-400 transition"
                                    value={formData.lichSu.xe.tenLoaiXe}
                                    onChange={handleChange}
                                >
                                    <option value="🛵 Xe máy">🛵 Xe máy</option>
                                    <option value="🚗 Ô tô">🚗 Ô tô</option>
                                    <option value="🚲 Xe đạp điện">🚲 Xe đạp điện</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Thời gian vào:</label>
                                <input
                                    type="datetime-local"
                                    name="lichSu.thoiGianBatDau"
                                    className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition font-mono"
                                    value={formData.lichSu.thoiGianBatDau}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Tên khách hàng:</label>
                            <input
                                name="lichSu.khachHang.hoTen"
                                placeholder="Khách vãng lai"
                                className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-orange-400 transition"
                                value={formData.lichSu.khachHang.hoTen}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300"
                        >
                            HỦY BỎ (ESC)
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-300/50 hover:from-orange-600 hover:to-orange-700 hover:-translate-y-1 hover:shadow-orange-400/60 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400"
                        >
                            {loading ? "ĐANG TẠO VÉ..." : "XÁC NHẬN VÀO BÃI ✅"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTicket;