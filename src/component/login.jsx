import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [currentImage, setCurrentImage] = useState(0);

    // Danh sách 3 ảnh cho Slider
    const sliderImages = [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1000",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=1000",
        "https://images.unsplash.com/photo-1590674116377-089c1f6b83f3?q=80&w=1000"
    ];

    // Tự động chạy Slider sau mỗi 4 giây
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login với:", username, password);
        navigate("/");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-slate-950">

            {/* 🖼️ BACKGROUND CHÍNH (LÀM MỜ) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img
                    src={sliderImages[currentImage]}
                    alt="bg"
                    className="w-full h-full object-cover blur-sm transition-all duration-1000"
                />
            </div>

            {/* 📦 LOGIN CONTAINER */}
            <div className="relative z-10 w-full max-w-[1100px] animate-in fade-in zoom-in-95 duration-700">
                <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden flex flex-col md:flex-row min-h-[650px]">

                    {/* 📸 CỘT TRÁI: SLIDER 3 ẢNH */}
                    <div className="relative w-full md:w-1/2 overflow-hidden bg-indigo-900">
                        {sliderImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`slide-${index}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                    }`}
                            />
                        ))}

                        {/* Overlay nội dung đè lên ảnh slider */}
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent p-12 flex flex-col justify-end">
                            <h1 className="text-4xl font-black text-white mb-4 leading-tight">
                                Giải pháp <br /> Smart Parking AI
                            </h1>
                            <p className="text-indigo-100 text-base font-medium opacity-90">
                                Quản lý thông minh, nhận diện chính xác, vận hành tối ưu.
                            </p>

                            {/* Chỉ số Slider (Dấu chấm) */}
                            <div className="mt-8 flex gap-2">
                                {sliderImages.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentImage ? "w-8 bg-white" : "w-2 bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 📝 CỘT PHẢI: FORM ĐĂNG NHẬP */}
                    <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
                        <div className="mb-10">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Đăng Nhập</h2>
                            <p className="text-slate-500 font-medium">Chào mừng bạn quay trở lại hệ thống!</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 tracking-widest ml-1 uppercase">Tài khoản</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 tracking-widest ml-1 uppercase">Mật khẩu</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm py-2">
                                <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span>Ghi nhớ</span>
                                </label>
                                <a href="#" className="text-indigo-600 font-bold hover:underline">Quên mật khẩu?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-wider"
                            >
                                Đăng nhập
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                            <button
                                onClick={() => navigate("/")}
                                className="text-slate-400 font-bold hover:text-indigo-600 transition-all flex items-center justify-center gap-2 mx-auto"
                            >
                                <span>←</span> Quay lại trang chủ
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .animate-in { animation: enter 0.6s ease-out; }
                @keyframes enter { from { opacity: 0; transform: scale(0.98) translateY(10px); } }
            `}</style>
        </div>
    );
};

export default LoginHeader;