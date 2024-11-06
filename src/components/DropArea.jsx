import React from 'react'
import { useDrop } from 'react-dnd'

const DropArea = ({ addNewField }) => {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "field",
        drop: (item) => {
            console.log(item)
            addNewField(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }))

  return (
    <div className='border-2 border-dashed border-black rounded-lg p-5 text-center w-full mt-1' ref={drop}>
        <p className='text-lg font-bold'>Drag and drop a field here</p>
    </div>
  )
}

export default DropArea