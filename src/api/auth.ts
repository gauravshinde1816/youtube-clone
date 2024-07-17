import axios from "axios";
const BASE_PATH = "http://localhost:8080";
const VALID_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnYXVyYXZzaGluZGUxODE2QGdtYWlsLmNvbSIsImlhdCI6MTcyMDk2NDI1MywiZXhwIjoxNzIwOTgyMjUzfQ.ATdovi-ttXSmeQu2g0LSOqgtHxYvwSiYldrBJD7K-dT3ySXpgfWtUR2c--j-rTuv0o4BN_sKc1V3vMWodNO8lw"

export const SignUp = async (data:any , otp:any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/signup/?otp=${otp}`, data , {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const GenerateOtp = async (data:any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/send-otp`, data);
    return res
  } catch (error) {
    console.log(error);
  }
};


export const uploadVideo = async (data:any)=>{
  try {
    const res = await axios.post(`${BASE_PATH}/api/create-video`, data , {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${VALID_TOKEN}`,
      }
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}