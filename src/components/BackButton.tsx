import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
  const Navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
