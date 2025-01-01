import { Button } from "@mui/material";

interface BaseButtonProps {
  onClick: () => void;
  text: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({ onClick, text }) => {
  return (
    <Button
      variant="contained"
      onClick={() => onClick()}
      style={{ marginLeft: "10px" }}
    >
      {text}
    </Button>
  );
};

export default BaseButton;
