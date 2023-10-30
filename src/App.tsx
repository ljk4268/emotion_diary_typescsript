import { Routes, Route } from "react-router-dom";
import { createContext, useReducer, useRef } from "react";
import "./App.css";

// pages
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// types
import { DataItem, Action } from "./types/Data";

// reducer
const reducer = (state: DataItem[], action: Action): DataItem[] => {
  let newState: DataItem[] = [];
  switch (action.type) {
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = newState.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

// context
export const DiaryStateContext = createContext(undefined);
export const DiaryDispatchContext = createContext(undefined);

// dummyData
const dummyData: DataItem[] = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date: 1698648561916,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1698648561917,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date: 1698648561918,
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    date: 1698648561919,
  },
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기 5번',
    date: 1698648561920,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date: number, content: string, emotion: number) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (
    targetId: number,
    date: number,
    content: string,
    emotion: number
  ) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
  };

  
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
export default App;
