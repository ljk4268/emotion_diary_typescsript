import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// components
import MyButton from './MyButton'
import MyHeader from './MyHeader'

// type
import { EmotionI } from '../types/emotion'
import EmotionItem from './EmotionItem'

const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

const emotionList: EmotionI[] = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_descript: '완전좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_descript: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_descript: '보통',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_descript: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_descript: '완전나쁨',
  },
]

const DiartEditor = () => {
  const navigatae = useNavigate()
  const [date, setDate] = useState<string>(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3)
  const handleClickemote = (emotion:number) => {
    setEmotion(emotion)
  }
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText="새 일기쓰기"
        leftChild={
          <MyButton
            text="< 뒤로가기"
            onClick={() => {
              navigatae(-1)
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickemote}
                isSeleted={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiartEditor
