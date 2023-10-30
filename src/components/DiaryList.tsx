import { useState } from "react";
import { DataItem } from "../types/Data";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

interface SortOption {
  value: string;
  name: string;
}
interface ControlMenuProps {
  value: string;
  onChange: (value: string) => void;
  optionList: SortOption[];
}
interface DiaryListProps {
  diaryList: DataItem[];
}

const sortOptionList: SortOption[] = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];
const filterOptionList: SortOption[] = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은감정만" },
  { value: "bad", name: "안좋은감정만" },
];

const ControlMenu: React.FC<ControlMenuProps> = ({
  value,
  onChange,
  optionList,
}) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList = [] }: DiaryListProps) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList: () => DataItem[] = () => {
    const filterCallBack = (item: DataItem) => {
      if (filter === "good") {
        return item.emotion <= 3;
      } else {
        return item.emotion > 3;
      }
    };

    const compare: (a: DataItem, b: DataItem) => number = (a, b) => {
      if (sortType === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };

    const copyList: DataItem[] = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text="새 일기쓰기"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};
export default DiaryList;
