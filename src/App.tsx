import { useRecoilState } from "recoil";
import { minuteState, hourSelector } from "./atoms";


function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector); // [selector의 get property 함수에서 반환하는 값, seletor의 set property를 실행시키는 함수]

  console.log(hours);
  
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + 붙여 string을 number로 형변환
  }

  const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  }

  return <div>
    <input type="number" placeholder="Minutes" value={minutes} onChange={onMinutesChange} />
    <input type="number" placeholder="Hours" value={hours} onChange={onHourChange} />
  </div>
}

export default App;