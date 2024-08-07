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

// 로그인 API 호출
export function loginMember(credentials) {
  return apiClient.post("/member/login", credentials);
}
