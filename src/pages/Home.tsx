import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

// components
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

// types
import { DataItem } from "../types/Data";

const Home = () => {
  const diaryList = useContext<DataItem[]>(DiaryStateContext);
  const [data, setData] = useState<DataItem[]>([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [curDate, diaryList]);

  // methods
  const inCreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const deCreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={deCreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={inCreaseMonth} />}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
};
export default Home;
