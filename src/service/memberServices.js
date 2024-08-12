// src/service/memberService.js
import apiClient from "../utils/api-client";

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

// // 로그인 API 호출 함수
// export async function loginMember(credentials) {
//   let formData = new FormData();
//   console.log(credentials.mid, credentials.mpw);
//   formData.append("mid", credentials.mid);
//   formData.append("mpw", credentials.mpw);
//   //console.log(formData);

//   // return apiClient.post("/member/login", formData).then(
//   //   (response) => console.log(response)
//   //   //return apiClient.get("/member/loginOk"); // 로그인 후 사용자 정보를 가져옴
//   // );
//   // return axios({
//   //   method: "POST",
//   //   url: `http://localhost:8080/api/member/login?mid=${credentials.mid}&mpw=${credentials.mpw}`,
//   // }).then((response) => console.log(response));

//   const response = await fetch(`http://localhost:8080/api/member/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: formData.toString(),
//     //body: new URLSearchParams(formData),
//   });
//   const result = await response.json();

//   return result;
// }

/**
 * 사용자 로그인
 * @param {string} mid - 사용자 아이디
 * @param {string} mpw - 사용자 비밀번호
 * @returns {Promise<Object>}
 */
export const loginMember = async (mid, mpw) => {
  try {
    const response = await apiClient.post("/member/login", null, {
      params: { mid, mpw },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

export async function fetchUserInfo() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("사용자 토큰이 없습니다. 로그인 상태가 아닙니다.");
  }

  const response = await fetch("http://localhost:8080/api/member/loginOk", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`사용자 정보를 가져오는 데 실패했습니다: ${errorText}`);
  }

  // 응답 Content-Type 확인
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      throw new Error("응답 JSON 파싱 실패");
    }
  } else {
    const responseText = await response.text();
    throw new Error(`응답이 JSON 형식이 아닙니다: ${responseText}`);
  }
}

export const logoutMember = async () => {
  try {
    await apiClient.get("/member/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
