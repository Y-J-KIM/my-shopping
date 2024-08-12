const API_BASE_URL = "/reviews";

// // 리뷰 작성
// async function addReview(reviewDTO) {
//   const response = await fetch(API_BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reviewDTO),
//   });
//   if (!response.ok) throw new Error("Failed to add review");
//   const data = await response.json();
//   return data.reviewId;
// }

// // 특정 제품의 리뷰 목록 조회
// async function getReviewsByProductId(productId) {
//   const response = await fetch(`${API_BASE_URL}/product/${productId}`);
//   if (!response.ok) throw new Error("Failed to fetch reviews");
//   return await response.json();
// }

// 리뷰 작성
export async function addReview(reviewDTO) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewDTO),
  });
  if (!response.ok) throw new Error("Failed to add review");
  const data = await response.json();
  return data.reviewId;
}

// 특정 제품의 리뷰 목록 조회
export async function getReviewsByProductId(productId) {
  const response = await fetch(`${API_BASE_URL}/product/${productId}`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  return await response.json();
}

// 특정 리뷰 조회
async function getReview(reviewId) {
  const response = await fetch(`${API_BASE_URL}/${reviewId}`);
  if (!response.ok) throw new Error("Failed to fetch review");
  return await response.json();
}

// 리뷰 수정
async function modifyReview(reviewId, reviewDTO) {
  const response = await fetch(`${API_BASE_URL}/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewDTO),
  });
  if (!response.ok) throw new Error("Failed to modify review");
  const data = await response.json();
  return data.reviewId;
}

// 리뷰 삭제
async function deleteReview(reviewId) {
  const response = await fetch(`${API_BASE_URL}/${reviewId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete review");
  const data = await response.json();
  return data.reviewId;
}

// // 예시 사용법
// (async function () {
//   try {
//     const newReviewId = await addReview({
//       username: "user1",
//       comment: "Great product!",
//       rating: 5,
//       productId: 1,
//     });
//     console.log("New review ID:", newReviewId);

//     const reviews = await getReviewsByProductId(1);
//     console.log("Reviews for product 1:", reviews);

//     const review = await getReview(newReviewId);
//     console.log("Review details:", review);

//     const updatedReviewId = await modifyReview(newReviewId, {
//       comment: "Updated comment",
//       rating: 4,
//     });
//     console.log("Updated review ID:", updatedReviewId);

//     const deletedReviewId = await deleteReview(newReviewId);
//     console.log("Deleted review ID:", deletedReviewId);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
