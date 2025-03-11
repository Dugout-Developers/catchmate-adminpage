import React from 'react';
import { colors } from '../constants/colors.js';
export const ButtonType = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
};
const buttonStyles = {
  [ButtonType.FILLED]: {
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
  },
  [ButtonType.OUTLINED]: {
    backgroundColor: 'white',
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
};
const CMButton = ({ title, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...buttonStyles[type],
        borderRadius: '8px',
        width: '100%',
        height: '52px',
      }}
    >
      {title}
    </button>
  );
};

export default CMButton;
