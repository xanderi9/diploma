import React from 'react';
import { OverlayTrigger, Tooltip} from 'react-bootstrap';

const CustomTooltip = ({ children, text }) => (
  <OverlayTrigger
      placement="top-end"
      overlay={<Tooltip id="tooltip">{text}</Tooltip>}
    >
      <div>{children}</div>
    </OverlayTrigger>
);

export default CustomTooltip;
