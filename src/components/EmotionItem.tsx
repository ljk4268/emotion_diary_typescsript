import { EmotionI } from '../types/emotion'

interface Emotion extends EmotionI {
  onClick: (emotion: number) => void
  isSeleted: Boolean
}

const EmotionItem: React.FC<Emotion> = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSeleted,
}) => {
  return (
    <div
      className={[
        'EmotionItem',
        isSeleted ? `EmotionItem_on_${emotion_id}` : 'EmotionItem_off',
      ].join(' ')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt="emotion" />
      <span>{emotion_descript}</span>
    </div>
  )
}
export default EmotionItem
