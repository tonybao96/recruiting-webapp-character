import React from 'react';

const AttributeControl = ({ attributeName, value, onIncrement, onDecrement, totalAttributes }) => {
  const modifier = Math.floor((value - 10) / 2);

  return (
    <div className="attribute-control">
      <div className="attribute-info">
        <span className="attribute-name">{attributeName}</span>
        <span className="attribute-value">Value: {value}</span>
        <span className="attribute-modifier">Modifier: {modifier}</span>
      </div>
      <div className="attribute-actions">
        <button onClick={onIncrement} disabled={value >= 20 || totalAttributes >= 70}>+</button>
        <button onClick={onDecrement} disabled={value <= 1}>-</button>
      </div>
    </div>
  );
};

export default AttributeControl;
