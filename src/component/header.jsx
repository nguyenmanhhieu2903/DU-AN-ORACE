import { useState }  from "react";
// import LoginHeader from './component/login.jsx'


const Header = () =>{
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="p-4 ">
            <div className="flex justify-between items-center px-4 py-4 bg-gray-50 shadow">
                {/* BÊN TRÁI: Tiêu đề */}
                <h2 className="text-2xl font-semibold text-indigo-600">
                    CHÀO MỪNG BẠN ĐẾN VỚI PHẦN MỀM QUẢN LÝ BÃI ĐỖ XE
                </h2>

                {/* BÊN PHẢI: Search + Menu + Login */}
                <div className="flex items-center gap-8">
                    
                    {/* Thanh Search */}
                    <div className="w-96">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="flex-1 px-3 py-2 focus:outline-none"
                            />
                            <button className="bg-indigo-500 text-white px-4 py-2 hover:bg-fuchsia-500">
                                Search
                            </button>
                        </div>
                    </div>
            {/* bg-indigo-500 hover:bg-fuchsia-500 */}
                    {/* Menu */}
                    <div className="flex gap-6 text-lg">
                        <a
                            href="/"
                            className="relative font-medium text-indigo-500
                                after:content-[''] after:absolute after:left-0 after:-bottom-4 
                                after:w-0 after:h-1.5 after:bg-fuchsia-500 
                                after:transition-all after:duration-300
                                hover:after:w-full hover:text-fuchsia-500"
                        >
                            Trang Chủ
                        </a>
                        <a
                            href="/ticketlist"
                            className="relative font-medium text-indigo-500
                                after:content-[''] after:absolute after:left-0 after:-bottom-4 
                                after:w-0 after:h-1.5 after:bg-fuchsia-500 
                                after:transition-all after:duration-300
                                hover:after:w-full hover:text-fuchsia-500"
                        >
                            Quản Lý Hóa Đơn
                        </a>
                        <a
                            href="/listKH"
                            className="relative font-medium text-indigo-500
                                after:content-[''] after:absolute after:left-0 after:-bottom-4 
                                after:w-0 after:h-1.5 after:bg-fuchsia-500 
                                after:transition-all after:duration-300
                                hover:after:w-full hover:text-fuchsia-500"
                        >
                            Khách Hàng
                        </a>
                    </div>

                    {/* Login Icon */}
                    <a
                        href="/login"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-500 font-bold 
                                    transition-all duration-300 hover:text-white hover:bg-fuchsia-500 hover:scale-105"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 transition-colors duration-300"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0M18 12l3 3m0 0l-3 3m3-3h-6"
                            />
                        </svg>
                        <span className="text-lg font-semibold">LOGIN</span>
                    </a>


                </div>
            </div>
            
            <p>
                <img src="/img/oto.jpg" alt="oto" />
            </p>
        </div>
    )
}
export default Header;