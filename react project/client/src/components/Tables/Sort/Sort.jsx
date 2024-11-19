// Sort.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const Sort = ({ canSort, isSortedDesc, toggleSortBy }) => {
  const handleSortChange = (isAscending) => {
    toggleSortBy(isAscending, true);
  };

  return (
    <div>
      {canSort && (
        <div>
          <Button variant="none" onClick={() => handleSortChange(true)}>
            Sort Asc
          </Button>
          <Button variant="none" onClick={() => handleSortChange(false)}>
            Sort Desc
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sort;
