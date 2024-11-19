import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import filt from '../../../img/filter_cell.png';

const Filter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonCoordinates, setButtonCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const applyFilter = (value) => {
    setFilter(value || undefined);
    toggleModal();
  };
  

  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const handleButtonClick = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonCoordinates({ x: buttonRect.x, y: buttonRect.bottom });
    toggleModal();
  };

  const modalElement = isOpen ? (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      centered
      backdrop={false}
      transition={false}
      style={{
        position: 'absolute',
        top: buttonCoordinates.y,
        left: buttonCoordinates.x,
        maxWidth: 'none',
        width: '200px',
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Фильтр</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="select"
          value={filterValue}
          onChange={(e) => applyFilter(e.target.value)}
        >
          <option value="">All</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={() => applyFilter(filterValue)}>
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;

  return (
    <>
      <Button variant="none" onClick={handleButtonClick}>
        <img src={filt} width={25} height={25} alt="Фильтр" />
      </Button>
      {createPortal(modalElement, document.body)}
    </>
  );
};

export default Filter;
