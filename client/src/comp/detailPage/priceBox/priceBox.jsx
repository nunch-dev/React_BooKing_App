import React, { useState } from "react";
import styled from "@emotion/styled";
/*differenceInCalendarDays()는 date-fns 라이브러리에서 제공하는 함수 중
      하나로, 두 날짜(date) 간의 캘린더 일 수 차이를 계산하는 함수입니다. 이
      함수는 두 날짜가 시간, 분, 초, 밀리초를 포함한 모든 부분이 일치하지
      않더라도, 날짜 차이를 계산합니다. 따라서 두 날짜가 같은 날에 있는지 여부를
      알 수 있습니다. */
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useAtom } from "jotai";
import { loginStates, loginModals } from "../../store/global";
function PriceBox(props) {
  const {
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    type,
    hostName,
    city,
    price,
    country,
  } = props.detailData;

  const { id } = props;

  /*
checkInState:체크인 스테이트
checkOutState:체크아웃 스테이트
maxGuestsState : 인원 셀렉트 스테이트
inputName: 예약할때 쓸 이름
inputPhone: 예약할때 쓸 폰 번호
*/

  const [checkInState, setCheckInState] = useState("");
  const [checkOutState, setCheckOutState] = useState("");
  const [maxGuestsState, setMaxGuestsState] = useState(1);
  const [numberOfNight, setNumberOfNight] = useState(0);
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInpuPhone] = useState("");
  const [loginState, setLoginState] = useAtom(loginStates);
  const [loginModal, setLoginModal] = useAtom(loginModals);

  // select 만들어주는 함수
  const generateSelectOptions = (n) => {
    const options = [];
    for (let i = 1; i <= n; i++) {
      options.push(
        <option key={`option-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  // 숙박비 계산 버튼 클릭 시 실행될 함수
  const handleNumberOfNight = () => {
    if (!loginState) {
      setLoginModal(true);
      return;
    }

    if (!checkInState || !checkOutState) {
      alert("날짜를 입력해주세요.");
      return;
    }

    const daysDiff = differenceDays(checkInState, checkOutState);

    if (daysDiff <= 0) {
      alert(
        "유효하지 않는 날짜입니다. 체크인 하는 날과 체크 아웃하는 날짜가 최소 하루 차이가 나야합니다."
      );
      return;
    }

    setNumberOfNight(parseFloat(daysDiff));
  };

  // 두 날짜 간의 일 수 차이를 계산하는 함수
  const differenceDays = (checkIn, checkOut) => {
    const daysDiff = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    return daysDiff;
  };
  const checkHyphen = (inputValue) => {
    //@NOTE alert이후에 return를 해주는게 더 좋지 않을까?
    if (inputValue.includes("-")) {
      alert("- 를 빼고 입력해주세요.");
    }
    setInpuPhone(inputValue);
  };

  // 예약버튼 함수
  const booking = async () => {
    // 로그인이 되어 있는 지 확인
    if (!loginState) {
      setLoginModal(true);
      return;
    }
    // 예외처리 했다.
    if (
      !checkInState ||
      !checkOutState ||
      !numberOfNight ||
      !inputName ||
      !inputPhone
    ) {
      alert("빈칸을 채워주세요.");
      return;
    }
    const response = await axios.post(`http://127.0.0.1:4000/booking`, {
      place: id,
      name: inputName,
      checkIn: checkInState,
      checkOut: checkOutState,
      guests: maxGuestsState,
      numberOfNight: numberOfNight,
      phone: inputPhone,
      prices: parseFloat(price) * parseFloat(numberOfNight),
    });

    //@NOTE 예약이 되었으면 예약 이후 처리가 되면 좋을듯 함. HOME으로 간다던가 등등
  };

  return (
    <PriceBoxContainer numberOfNight={numberOfNight}>
      <H2>
        <div>₩ {parseInt(price).toLocaleString()}/ 박</div>
      </H2>
      <CheckInBox>
        <CheckInputBox>
          <div>
            <label>Check in : </label>
            <input
              value={checkInState}
              type="date"
              onChange={(e) => {
                setCheckInState(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label>Check out : </label>
            <input
              value={checkOutState}
              type="date"
              onChange={(e) => {
                setCheckOutState(e.target.value);
              }}
            ></input>
          </div>
        </CheckInputBox>
        <div>
          <H2>숙박 인원 </H2>
          <Select
            value={maxGuestsState}
            onChange={(e) => {
              setMaxGuestsState(e.target.value);
            }}
          >
            {generateSelectOptions(maxGuests)}
          </Select>
        </div>
      </CheckInBox>

      <PriceButton onClick={handleNumberOfNight}>숙박비 계산</PriceButton>

      {numberOfNight > 0 ? (
        <div>
          <CostBox>
            <Section>
              ₩ {price} x {numberOfNight} 박
            </Section>

            <Section>
              합계 ₩{parseFloat(price) * parseFloat(numberOfNight)}
            </Section>
          </CostBox>

          <Section>
            <H2> 이름 </H2>
            <input
              value={inputName}
              type="text"
              onChange={(e) => {
                setInputName(e.target.value);
              }}
              placeholder=" 이름을 입력해주세요."
            ></input>
          </Section>

          <Section>
            <H2> 폰 넘버</H2>
            <input
              value={inputPhone}
              type="text"
              onChange={(e) => {
                checkHyphen(e.target.value);
              }}
              placeholder=" 핸드폰 넘버를 입력해주세요. -뺴고"
            ></input>
          </Section>
          <PriceButton onClick={booking}> 예약하기 </PriceButton>
        </div>
      ) : (
        ""
      )}
    </PriceBoxContainer>
  );
}

export default PriceBox;

const PriceBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 330px;
  height: ${(props) => (props.numberOfNight > 0 ? "750px" : "350px")};
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  align-items: center; //@NOTE 중복 삭제
`;

const PriceButton = styled.button`
  margin: 10px;
  margin-left: 40px; //@NOTE 이런건 같이 붙여놔야 좋음
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background: rgb(238, 18, 89);
  background: linear-gradient(
    90deg,
    rgba(238, 18, 89, 1) 0%,
    rgba(118, 9, 121, 1) 37%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const H2 = styled.h2`
  font-size: 20px;
  margin: 10px;
`;

const CheckInBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 100px;
`;
const CheckInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
`;

const Select = styled.select`
  width: 300px;
  height: 40px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
`;

const CostBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  border-bottom: 1px solid #dcdcdc;
  1px 1px #c0c0c0; //@NOTE 잘못된 코드는 정리할것
  padding: 20px;
  `;
