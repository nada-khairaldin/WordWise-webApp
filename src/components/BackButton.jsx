import { useNavigate } from "react-router-dom";
import Button from "./Button";
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault(); // by default all buttons inside form has a type of submit, so we have to prevent this default behavior from submitting the form :)
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
