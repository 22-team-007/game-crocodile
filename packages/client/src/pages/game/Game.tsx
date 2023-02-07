import WithAuth from '../../hoc/withAuth'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [showStart, setShowStart] = useState(false);
  const handleCloseStart = () => setShowStart(false);
  const handleShowStart = () => setShowStart(true);

  const [showEnd, setShowEnd] = useState(false);
  const handleCloseEnd = () => setShowEnd(false);
  const handleShowEnd = () => setShowEnd(true);

  return (
    <>
      <Button variant="primary" onClick={handleShowStart}>Показать начало игры</Button><br/>
      <Button variant="primary" onClick={handleShowEnd}>Показать окончание игры</Button>
      <Modal show={showStart} onHide={handleCloseStart}>
        <Modal.Header closeButton>
          <Modal.Title>Игра началась!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вы должны объяснить слово<br/>
          <h1>Арбуз</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseStart}>Начать</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEnd} onHide={handleCloseEnd}>
        <Modal.Header closeButton>
          <Modal.Title>Игра окончена!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вам начислено<br/>
          <h1>10 баллов!</h1><br/>
          Вы заняли
          <h1>1 место!</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEnd}>Начать новую игру</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function Game() {
  return (
    <div>
      <h1>Game Page!</h1>
      <Example />
    </div>
  )
}

export default WithAuth(Game)
