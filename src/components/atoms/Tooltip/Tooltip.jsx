import React from 'react';
import './_style.scss';
import { Tooltip } from 'antd';

const ToolTip = text => {
  return (
    <Tooltip title="prompt text">
      <span>{text}</span>
    </Tooltip>
  );
};

export default ToolTip;
