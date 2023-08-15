import axios from "axios";
import jwtDecode from "jwt-decode";


const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//tạo api refreshToken
const refreshToken = async () => {
    try {
        const res = await axios.post("http://localhost:8080/api/v1/user/refresh-token", {
            withCredentials: true
        })
        localStorage.setItem("token", res.data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

axiosClient.interceptors.request.use(
    async (config) => {
        let token;
        try {
            let date = new Date() //Tạo ngày giờ hiện tại kiểm tra
            token = await JSON.parse(localStorage.getItem("token"));
            const decodedToken = await jwtDecode(token) //giải mã token
            console.log(decodedToken)
            if (decodedToken.exp < date.getTime() / 1000) { //Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì phải gọi api refresh để nhận token mới
                const data = await refreshToken()
                token = data
            }
        } catch (e) {

        }

        if (token !== null) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
// after send request
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;