interface MyButtonProps {
  text?: string;
  type?: string;
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  type = "default",
  onClick,
}) => {
  const buttonType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${buttonType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
