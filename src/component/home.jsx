import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

const Home = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [user, setUser] = useState(null); // Lưu trạng thái người dùng
    const navigate = useNavigate();

    // 1. Kiểm tra trạng thái đăng nhập khi tải trang
    useEffect(() => {
        const savedUser = localStorage.getItem("userRole");
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    // 2. Hàm đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("userRole");
        setUser(null);
        navigate("/"); // Chuyển hướng về trang chủ
    };

    //Hàm kiểm tra quyền truy cập
    const handleProtectedNavigation = (path) => {
        if (!user) {
            alert("Vui lòng đăng nhập để sử dụng tính năng này!");
            navigate("/login");
        } else {
            navigate(path);
        }
    };

    const menuItems = [
        { name: "Check In", path: "/scan-qr" },
        { name: "Check Out", path: "/checkout" }
    ];

    const posts = [
        {
            id: 1,
            title: "Hệ thống nhận diện biển số AI thế hệ mới",
            desc: "Giải pháp tối ưu cho doanh nghiệp với độ chính xác 99.9%",
            date: "20/03/2026",
            views: 1200,
            isNew: true,
            image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Xu hướng bãi đỗ xe thông minh năm 2026",
            desc: "Tích hợp thanh toán không chạm và điều hướng tự động",
            date: "18/03/2026",
            views: 980,
            isNew: false,
            image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=400&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Tối ưu hóa không gian đỗ xe trong đô thị",
            desc: "Sử dụng cảm biến siêu âm để quản lý mật độ xe",
            date: "15/03/2026",
            views: 760,
            isNew: true,
            image: "/img/xe.jpg"
        },
        {
            id: 4,
            title: "An ninh bãi xe: Bảo vệ tài sản bằng Camera AI",
            desc: "Hệ thống cảnh báo xâm nhập và nhận diện khuôn mặt",
            date: "10/03/2026",
            views: 540,
            isNew: false,
            image: "/img/xe2.jpg"
        }

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
                        <div className="flex border border-indigo-200 rounded-lg overflow-hidden bg-gray-50">
                            <input placeholder="Tìm kiếm..." className="px-3 py-1.5 outline-none bg-transparent w-60" />
                            <button className="bg-orange-500 text-white px-4 hover:bg-indigo-600 transition">
                                Search
                            </button>
                        </div>

                        <div className="flex gap-6 items-center">
                            {/* DỊCH VỤ */}
                            <div className="relative group py-2">
                                <span className="cursor-pointer text-orange-600 font-medium hover:text-indigo-600 transition">
                                    Dịch Vụ ▼
                                </span>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[400px] bg-white rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                                    <div className="grid grid-cols-2 gap-3">
                                        {services.map((item, i) => (
                                            <div key={i} onClick={() => navigate(item.path)} className="p-3 cursor-pointer hover:bg-indigo-50 rounded-xl flex items-center gap-3 transition">
                                                <span className="text-2xl">{item.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-xs">{item.title}</p>
                                                    <p className="text-[10px] text-gray-500">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* PHẦN MENU ĐÃ ĐƯỢC BẢO VỆ */}
                            {menuItems.map((item, i) => (
                                <span
                                    key={i}
                                    // Gọi hàm kiểm tra thay vì navigate trực tiếp
                                    onClick={() => handleProtectedNavigation(item.path)}
                                    className={`cursor-pointer font-medium transition flex items-center gap-1 ${!user
                                        ? "text-gray-400 hover:text-orange-400" // Khi chưa đăng nhập (màu xám)
                                        : "text-orange-500 hover:text-indigo-600" // Khi đã đăng nhập (màu cam)
                                        }`}
                                >
                                    {!user && <span className="text-[10px]">🔒</span>} {item.name}
                                </span>
                            ))}

                            {/* LOGIC HIỂN THỊ ADMIN */}
                            {user === 'admin' ? (
                                <div className="flex items-center gap-3 ml-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                                            🛡️ ADMIN
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-red-500 text-xl font-bold"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="ml-4 px-5 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    ĐĂNG NHẬP
                                </button>
                            )}
                        </div>
                    </div>

                    <button className="md:hidden text-2xl" onClick={() => setOpenMenu(!openMenu)}>
                        {openMenu ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
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
                                            {/* Sửa src="/img/oto.jpg" thành item.image */}
                                            <img
                                                src={item.image || "/img/oto.jpg"}
                                                className="w-24 h-20 rounded-xl object-cover group-hover:ring-2 ring-indigo-500 transition-all"
                                                alt={item.title}
                                            />

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

