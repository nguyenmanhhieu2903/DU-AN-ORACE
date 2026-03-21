import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Xử lý login với backend / validation
        console.log("Username:", username, "Password:", password);
        // Sau khi login thành công, có thể redirect về home
        navigate("/");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-blue-500 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/oto1.jpg" }}
        >
            {/* Container form */}
            <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-[500px]">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    Đăng nhập
                </h2>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Tài khoản"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 rounded hover:bg-fuchsia-500 transition-colors font-semibold"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-500">Quay lại </span>
                    <button
                        className="relative font-medium text-indigo-500
                            after:content-[''] after:absolute after:left-0 after:-bottom-4 
                            after:w-0 after:h-1.5 after:bg-fuchsia-500 
                            after:transition-all after:duration-300
                            hover:after:w-full hover:text-fuchsia-500"
                        onClick={() => navigate("/")}
                    >
                        Trang chủ
                    </button>
                </div>
            </div>
        </div>




    );
};

export default LoginHeader;
