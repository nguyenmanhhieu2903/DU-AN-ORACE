import { useNavigate, useLocation } from "react-router-dom";

const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại để làm nổi bật Menu

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        alert("Đã đăng xuất quyền Quản trị viên!");
        navigate("/login");
    };

    // Danh sách menu quản lý
    const adminMenus = [
        { name: "Quản lý Hóa Đơn", path: "/ticketlist", icon: "🎟️" },
        { name: "Quản lý Khách Hàng", path: "/listKH", icon: "👥" },
        { name: "Thêm vé xe", path: "/addticket", icon: "➕" },
    ];

    return (
        <nav className="bg-slate-900 shadow-xl sticky top-0 z-[100] border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO & BRAND */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <span className="text-xl">🛡️</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black leading-tight tracking-wider text-lg uppercase">
                                Admin Panel
                            </span>
                            <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Smart Parking System
                            </span>
                        </div>
                    </div>

                    {/* NAVIGATION LINKS */}
                    <div className="hidden md:flex items-center space-x-2">
                        {adminMenus.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${location.pathname === item.path
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* USER ACTIONS */}
                    <div className="flex items-center gap-4 border-l border-slate-700 pl-6 ml-2">
                        <div className="hidden lg:flex flex-col text-right">
                            <span className="text-white text-xs font-bold uppercase">Administrator</span>
                            <span className="text-emerald-400 text-[10px] flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                Online
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-500 p-2 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all group"
                            title="Đăng xuất"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 group-hover:translate-x-0.5 transition-transform"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default AdminHeader;