import React, { useState, useEffect } from "react";

const AddressInput = ({ onSave }) => {
  const [address, setAddress] = useState(""); // 기본 주소 상태
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 상태
  const [fullAddress, setFullAddress] = useState(""); // 전체 주소 상태

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : "";
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setAddress(fullAddress); // 기본 주소 업데이트
        setFullAddress(fullAddress); // 전체 주소 초기화
        setDetailAddress(""); // 상세 주소 초기화
      },
    }).open();
  };

  const handleDetailAddressChange = (e) => {
    const updatedDetailAddress = e.target.value;
    setDetailAddress(updatedDetailAddress);
    setFullAddress(`${address} ${updatedDetailAddress}`); // 전체 주소 업데이트
  };

  useEffect(() => {
    // address 또는 detailAddress가 변경될 때마다 onSave 호출
    if (fullAddress) {
      onSave(fullAddress);
    }
  }, [fullAddress, onSave]);

  return (
    <div>
      <div>
        <label htmlFor="address">주소:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onClick={handleAddressClick}
          readOnly
          required
        />
      </div>

      {address && (
        <div>
          <label htmlFor="detailAddress">상세 주소:</label>
          <input
            type="text"
            id="detailAddress"
            name="detailAddress"
            value={detailAddress}
            onChange={handleDetailAddressChange}
            placeholder="상세 주소를 입력하세요"
            required
          />
        </div>
      )}
    </div>
  );
};

export default AddressInput;
