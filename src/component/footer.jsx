import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-20 w-full mt-auto">
            {/* Đường kẻ gradient mờ phía trên */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-30"></div>

            <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 py-10 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

                    {/* CỘT 1: THƯƠNG HIỆU */}
                    <div className="text-center md:text-left space-y-3">
                        <h3 className="text-2xl font-black bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-tighter uppercase">
                            Smart Parking AI
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
                            Giải pháp quản lý bãi xe thông minh ứng dụng công nghệ nhận diện biển số (ALPR) độ chính xác cao.
                        </p>
                    </div>

                    {/* CỘT 2: TRẠNG THÁI HỆ THỐNG */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full shadow-inner">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Hệ thống đang trực tuyến</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500 hover:text-orange-400 cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">Tài liệu</span>
                            <span className="text-slate-500 hover:text-orange-400 cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">Hỗ trợ</span>
                            <span className="text-slate-500 hover:text-orange-400 cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest">Liên hệ</span>
                        </div>
                    </div>

                    {/* CỘT 3: BẢN QUYỀN */}
                    <div className="text-center md:text-right space-y-2">
                        <p className="text-slate-300 text-sm font-black tracking-widest uppercase">
                            © {currentYear} Vision AI Tech
                        </p>
                        <p className="text-slate-500 text-[10px] font-medium tracking-[2px] uppercase">
                            Phiên bản 2.4.0 • Build 2026
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;