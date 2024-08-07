import apiClient from "../utils/api-client";

export function getBoardListAPI(page, size, keyword) {
  return apiClient.get("/board/list", {
    params: {
      page: page,
      size: size,
      keyword: keyword || "", // keyword가 undefined인 경우 빈 문자열로 처리
    },
  });
}

export function registerBoardAPI(formData) {
  return apiClient.post("/board/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function readBoardAPI(bno) {
  return apiClient.get(`/board/read`, { params: { bno } });
}

export function modifyBoardAPI(boardDTO) {
  return apiClient.post("/board/modify", boardDTO);
}

export function removeBoardAPI(boardDTO) {
  return apiClient.post("/board/remove", boardDTO);
}

export const removeBoardImageAPI = (fileName) =>
  apiClient.delete(`/remove/${fileName}`);
