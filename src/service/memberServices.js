// src/service/memberService.js
import apiClient from "../utils/api-client";
import axios from "axios";

// 회원 가입 API 호출
export function registerMember(memberDTO) {
  return apiClient.post("/member/join", memberDTO);
}

// 로그인 페이지 및 회원 가입 페이지를 위한 API 호출 (실제 사용 시 필요에 따라 추가 가능)
export function getLoginPage() {
  return apiClient.get("/member/login");
}

export function getJoinPage() {
  return apiClient.get("/member/join");
}

// 로그인 API 호출 함수
export function loginMember(credentials) {
  let formData = new FormData();
  console.log(credentials.mid, credentials.mpw);
  formData.append("mid", credentials.mid);
  formData.append("mpw", credentials.mpw);
  //console.log(formData);

  // return apiClient.post("/member/login", formData).then(
  //   (response) => console.log(response)
  //   //return apiClient.get("/member/loginOk"); // 로그인 후 사용자 정보를 가져옴
  // );
  return axios({
    method: "post",
    url: "http://localhost:8080/api/member/login",
    data: formData,
  }).then((response) => console.log(response));
}

export const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get("/member/loginOk");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const logoutMember = async () => {
  try {
    await apiClient.post("/member/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
