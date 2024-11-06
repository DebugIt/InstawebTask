import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableField from './components/DraggableField';
import DropArea from './components/DropArea';

const App = () => {
  const [fields, setFields] = useState([
    { id: 1, type: 'text', placeholder: 'Enter name value' },
    { id: 2, type: 'password', placeholder: 'Enter password value' },
    { id: 3, type: 'number', placeholder: 'Enter number value' },
    { id: 4, type: 'radio', placeholder: 'Enter radio value' },
    { id: 5, type: 'checkbox', placeholder: 'Enter checkbox value' },
  ]);

  const [addtoForm, setAddtoForm] = useState([]);


  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('formFields'));
    if (savedForm) {
      setAddtoForm(savedForm);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(addtoForm));
  }, [addtoForm]);

  const addNewField = (field) => {
    setAddtoForm((prev) => [
      ...prev,
      {
        ...field,
        type: field.type || "text",
        placeholder: field.placeholder || "Enter some value",
      }
    ]);
  };

  const handlePlaceholderChange = (id, newPlaceholder) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, placeholder: newPlaceholder } : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addtoForm);
  };

  
  const resetFields = () => {
    setAddtoForm([]);
    localStorage.removeItem('formFields');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="md:flex gap-4 p-4">
        <div className="w-full h-full md:pr-4 md:border-r-2 md:w-[35%]">
          <div>
            <div id="label" className="font-bold text-3xl">
              ToolBox
            </div>
            <hr className="my-2 border border-black rounded-full" />
            <div id="infographics" className="flex justify-between text-sm font-semibold mb-2">
              <div>Change Placeholder's here</div>
              <div>Drag from here</div>
            </div>
          </div>

          <div className="field-list w-full">
            {fields.map((field) => (
              <div key={field.id} className="field-container my-1 flex gap-1">
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => handlePlaceholderChange(field.id, e.target.value)}
                  className="placeholder-input border p-1 border-black rounded-md"
                  placeholder="Edit placeholder"
                />
                <DraggableField
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <div id="drop-area" className="w-full h-full">
            <DropArea addNewField={addNewField} />
            <button
              onClick={resetFields}
              className="mt-2 rounded-md px-3 p-2 bg-black text-white"
            >
              Reset Fields
            </button>
          </div>
        </div>

        <div id="form-space" className="md:w-[65%]">
          <form onSubmit={handleSubmit}>
            <div id="form-title" className="p-2 text-2xl font-bold mb-2">
              Form Preview
            </div>
            {addtoForm.map((field, index) => (
              <div key={index} className="form-field my-2">
                {field.type === 'text' && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="border p-2 w-full"
                  />
                )}
                {field.type === 'password' && (
                  <input
                    type="password"
                    placeholder={field.placeholder}
                    className="border p-2 w-full"
                  />
                )}
                {field.type === 'number' && (
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    className="border p-2 w-full"
                  />
                )}
                {field.type === 'checkbox' && (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    {field.placeholder}
                  </label>
                )}
                {field.type === 'radio' && (
                  <label className="flex items-center gap-2">
                    <input type="radio" />
                    {field.placeholder}
                  </label>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="px-4 p-2 border rounded-md font-semibold hover:bg-black hover:text-white transition-all w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
