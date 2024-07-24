import axios from "axios";
const BASE_PATH = "http://localhost:8080";

export const createVideo = async (data: any) => {
  try {
    try {
      const res = await axios.post(`${BASE_PATH}/api/create-video`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};

export const fetchVideos = async () => {
  try {
    const res = await axios.get(`${BASE_PATH}/api/allVideos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoFromId = async (id: string | null) => {
  try {
    const res = await axios.get(`${BASE_PATH}/api/videoDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likeVideo = async (id: number | null | undefined) => {
  try {
    const res = await axios.post(
      `${BASE_PATH}/api/likeVideo/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const unlikeVideo = async (id: number | null | undefined) => {
  try {
    const res = await axios.post(
      `${BASE_PATH}/api/unlikeVideo/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (
  id: number | undefined,
  message: string,
  parentCommentId: number | null = null
) => {
  console.log(id, message);
  try {
    const res = await axios.post(
      `${BASE_PATH}/api/createComment`,
      { videoId: id, content: message, parentCommentId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentForVideo = async (id: number | null |undefined) => {
  try {
    const res = await axios.get(`${BASE_PATH}/api/video/${id}/getAllComments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPasswordToken = async (email: string) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/reset-password-token`, {
      email,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async ({
  password,
  confirmPassword,
  token,
}: any) => {
  try {
    const res = await axios.post(`${BASE_PATH}/auth/reset-password`, {
      password,
      confirmPassword,
      token,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
