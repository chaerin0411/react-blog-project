import React, { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());

  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <div>
      <h3>현재시간 : {time.toLocaleTimeString()}</h3>
      <h3>자기소개</h3>
      <h3>이름 : 전채린</h3>
      <h3>학력</h3>
      <>
        <li>경인고등학교</li>
        <li>동양미래대학교</li>
      </>
      <h3>경력</h3>
      <>
        <li>씨큐프라임 인턴 1개월</li>
      </>
    </div>
  );
}

export default App;
