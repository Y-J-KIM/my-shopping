import apiClient from "../utils/api-client";

export function getBoardListAPI(pageRequestDTO) {
  return apiClient.get("/board/list", { params: pageRequestDTO });
}

export function registerBoardAPI(boardDTO) {
  return apiClient.post("/board/register", boardDTO);
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
