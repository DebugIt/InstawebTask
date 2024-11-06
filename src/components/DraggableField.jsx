import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DraggableField = ({ type, placeholder }) => {
  const [fieldValue, setFieldValue] = useState(''); // states to manage field values

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFieldValue(value);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { type, placeholder },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    })
  }), [type, placeholder]);

  return (
    <div className="field-container w-full" ref={drag}>
      {type === 'text' && (
        <input
          type="text"
          value={fieldValue}
          disabled={true}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-2 rounded-md border-black p-2 w-full"
        />
      )}
      {type === 'password' && (
        <input
          type="password"
          value={fieldValue}
          disabled={true}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-2 rounded-md border-black p-2 w-full"
        />
      )}
      {type === 'number' && (
        <input
          type="number"
          value={fieldValue}
          disabled={true}
          onChange={handleChange}
          placeholder={placeholder}
          className="border-2 rounded-md border-black p-2 w-full"
        />
      )}
      {type === 'checkbox' && (
        <label className="my-2 flex items-center gap-1">
          <input
            type="checkbox"
            checked={fieldValue === placeholder}  
            onChange={() => setFieldValue(fieldValue === placeholder ? '' : placeholder)} 
          />
          {placeholder}
        </label>
      )}
      {type === 'radio' && (
        <label className="my-2 flex items-center gap-1">
          <input
            type="radio"
            checked={fieldValue === placeholder}
            onChange={() => setFieldValue(fieldValue === placeholder ? '' : placeholder)}  
          />
          <p>
            {placeholder}
          </p>
        </label>
      )}
    </div>
  );
};

export default DraggableField;
