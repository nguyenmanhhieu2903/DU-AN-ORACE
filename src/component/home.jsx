import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

const Home = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Quét Biển Số", path: "/scan-qr" },
        { name: "Check Out", path: "/checkout" }
    ];

    const posts = [
        { id: 1, title: "Bãi đỗ xe thông minh hiện đại 1", desc: "Giải pháp tối ưu cho doanh nghiệp", date: "20/03/2026", views: 1200, isNew: true },
        { id: 2, title: "Bãi đỗ xe thông minh hiện đại 2", desc: "Giải pháp tối ưu cho doanh nghiệp", date: "18/03/2026", views: 980, isNew: false },
        { id: 3, title: "Bãi đỗ xe thông minh hiện đại 3", desc: "Giải pháp tối ưu cho doanh nghiệp", date: "15/03/2026", views: 760, isNew: true },
        { id: 4, title: "Bãi đỗ xe thông minh hiện đại 4", desc: "Giải pháp tối ưu cho doanh nghiệp", date: "10/03/2026", views: 540, isNew: false }
    ];

    const services = [
        { title: "Văn phòng", desc: "Quản lý bãi xe cho tòa nhà", icon: "🏢", path: "/office" },
        { title: "Nhà máy", desc: "Kiểm soát xe ra vào", icon: "🏭", path: "/factory" },
        { title: "Chuỗi cửa hàng", desc: "Đồng bộ nhiều chi nhánh", icon: "🏬", path: "/store" }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* HEADER */}
            <nav className="bg-white shadow-md sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h2
                        className="text-2xl font-bold text-orange-600 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        SMART PARKING
                    </h2>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* SEARCH */}
                        <div className="flex border border-indigo-200 rounded-lg overflow-hidden bg-gray-50">
                            <input placeholder="Tìm kiếm..." className="px-3 py-1.5 outline-none bg-transparent w-60" />
                            <button className="bg-orange-500 text-white px-4 hover:bg-orange-600 transition">
                                Sreach
                            </button>
                        </div>

                        {/* MENU LINKS */}
                        <div className="flex gap-6 items-center">
                            {/* DỊCH VỤ DROPDOWN */}
                            <div className="relative group py-2">
                                <span className="cursor-pointer text-orange-600 font-medium hover:text-indigo-600 transition">
                                    Dịch Vụ ▼
                                </span>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[450px] bg-white rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                                    <div className="grid grid-cols-2 gap-3">
                                        {services.map((item, i) => (
                                            <div key={i} onClick={() => navigate(item.path)} className="p-3 cursor-pointer hover:bg-indigo-50 rounded-xl flex items-center gap-3 transition">
                                                <span className="text-2xl">{item.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-sm">{item.title}</p>
                                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* DYNAMIC MENU ITEMS danh sach menu */}
                            {menuItems.map((item, i) => (
                                <span
                                    key={i}
                                    onClick={() => navigate(item.path)}
                                    className="cursor-pointer font-medium text-orange-500 hover:text-indigo-600 transition relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all"
                                >
                                    {item.name}
                                </span>
                            ))}

                            <button
                                onClick={() => navigate("/login")}
                                className="ml-4 px-5 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
                            >
                                ĐĂNG NHẬP
                            </button>
                        </div>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button className="md:hidden text-2xl p-2" onClick={() => setOpenMenu(!openMenu)}>
                        {openMenu ? "✕" : "☰"}
                    </button>
                </div>

                {/* MOBILE MENU CONTENT */}
                {openMenu && (
                    <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-xl">
                        {menuItems.map((item, i) => (
                            <div key={i} onClick={() => { navigate(item.path); setOpenMenu(false); }} className="block py-2 text-gray-700 font-medium border-b border-gray-50">
                                {item.name}
                            </div>
                        ))}
                        <button onClick={() => navigate("/login")} className="w-full py-3 bg-indigo-600 text-white rounded-lg">Đăng nhập</button>
                    </div>
                )}
            </nav>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* LEFT CONTENT (BÀI VIẾT) */}
                <div className="col-span-8 bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-4">
                        Hệ thống quản lý bãi đỗ xe thông minh: Cấu tạo, nguyên lý hoạt động
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Trong kỷ nguyên số, hệ thống smart parking giúp quản lý bãi xe tự động, tiết kiệm chi phí và nâng cao trải nghiệm người dùng.
                    </p>
                    <img src="/img/oto.jpg" alt="Parking lot with multiple vehicles parked in organized rows under covered structure" className="w-full rounded-lg mb-4" />
                    <h2 className="text-xl font-semibold mt-4 mb-2">
                        1. Hệ thống quản lý bãi đỗ xe là gì?
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Hệ thống quản lý bãi đỗ xe thông minh (smart parking management system) là giải pháp tích hợp công nghệ tự động và phần mềm quản lý nhằm kiểm soát toàn bộ quy trình xe ra vào, lưu trữ thông tin phương tiện, điều phối vị trí đỗ xe, và tối ưu hóa việc thu phí vận hành.
                        <img className="p-6" src="/img/xe.jpg" alt="Digital control panel displaying parking management system interface with vehicle status indicators and real-time occupancy data" />
                        Khác với cách quản lý thủ công truyền thống, mô hình này ứng dụng IoT, cảm biến, camera giám sát, phần mềm nhận diện biển số, quẹt thẻ RFID và các cơ chế điều khiển tự động, giúp quản lý bãi đỗ xe một cách minh bạch, chính xác và an toàn.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Giảm chi phí vận hành</li>
                        <li>Tăng độ chính xác</li>
                        <li>Tối ưu không gian</li>
                        <li>Nâng cao trải nghiệm khách hàng</li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-6 mb-2">
                        2. Các thành phần chính trong hệ thống quản lý bãi đỗ xe thông minh
                    </h2>
                    <p>
                        Một hệ thống hoàn chỉnh thường gồm các hạng mục thiết bị và phần mềm như sau:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Thiết bị kiểm soát ra vào: Bao gồm barrier tự động, cổng quẹt thẻ từ, máy quét mã QR hoặc RFID. Đây là điểm đầu tiên kiểm tra quyền truy cập của phương tiện và người dùng.</li>
                        <li>Cảm biến phát hiện phương tiện: Cảm biến từ hoặc siêu âm gắn tại cổng và các vị trí đỗ xe để phát hiện xe ra/vào và báo hiệu trạng thái chỗ trống.</li>
                        <li>Camera nhận diện biển số: Hệ thống LPR (License Plate Recognition) tự động ghi nhận thông tin xe để đối chiếu dữ liệu, kiểm soát an ninh và hỗ trợ thu phí.</li>
                        <li>Phần mềm quản lý bãi đỗ xe: Giao diện điều hành trung tâm, lưu trữ dữ liệu, thống kê báo cáo, quản lý doanh thu và hỗ trợ kết nối với các thiết bị phần cứng.</li>
                        <li>Hệ thống thu phí tự động: Thiết bị in vé, đầu đọc thẻ, thiết bị thanh toán tự động, kết nối phần mềm quản lý doanh thu.</li>
                    </ul>
                    <p className="text-gray-700">
                        Tất cả các thành phần trên phối hợp nhịp nhàng giúp quy trình gửi xe diễn ra chính xác, nhanh chóng và minh bạch.
                    </p>
                    <p className="">
                        <img src="/img/xe2.jpg" alt="Automated barrier gate system at parking lot entrance with vehicle detection sensors and access control mechanism" />
                    </p>
                </div>

                {/* RIGHT SIDEBAR (BÀI VIẾT LIÊN QUAN) */}
                <aside className="md:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                                Bài viết mới nhất
                            </h3>

                            <div className="space-y-6">
                                {posts.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/post/${item.id}`)}
                                        className="group flex gap-4 cursor-pointer transition-all"
                                    >
                                        <div className="relative shrink-0">
                                            <img src="/img/oto.jpg" className="w-24 h-20 rounded-xl object-cover group-hover:ring-2 ring-indigo-500 transition-all" alt="" />
                                            {item.isNew && (
                                                <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                                                    NEW
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-between py-1">
                                            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-indigo-600 transition">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                                                <span>👁 {item.views}</span>
                                                <span>•</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 py-3 text-indigo-600 font-semibold text-sm border border-indigo-100 rounded-xl hover:bg-indigo-50 transition">
                                Xem tất cả bài viết
                            </button>
                        </div>
                    </div>
                </aside>

            </main>
            <Footer />
        </div>
    );
};

export default Home;