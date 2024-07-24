import axios from "axios";
const BASE_PATH = "http://localhost:8080";


export const SignUp = async (data:any , otp:any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/signup?otp=${otp}`, data , {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data:any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/login`, data , {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const Logout = ()=>{
   localStorage.removeItem("authToken")
}


export const GenerateOtp = async (data:any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/send-otp`, data);
    return res
  } catch (error) {
    console.log(error);
  }
};


