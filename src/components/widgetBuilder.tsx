import { useDroppable } from "@dnd-kit/core";
import Charts from "./charts/charts";
import { useState } from "react";

interface WidgetBuilderProps {
    droppedItems: string[];
}
function WidgetBuilder({ droppedItems }: WidgetBuilderProps) {
    const {setNodeRef} = useDroppable({
    id: 'droppable',
  });
  
  const [isEditing,setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  }

  const handleCancel = () => {
    setIsEditing(false);
  }

  
  return (
    <div className="full">
      <div className="flex items-center justify-end p-4">
        {isEditing ? (
          <div className="flex gap-4">
          <button className="button-secondary" onClick={handleSave}>Save</button>
            <button className="button-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className="button-secondary" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
   <div ref={setNodeRef} className="p-4 full">
    {droppedItems.length === 0 ? (
            <div className="container full center">
              Drag widgets here to build your dashboard
            </div>
        ) : (
       <div 
      
        className="full grid grid-cols-3"
      >
        {droppedItems.map((id, index) => (
          <Charts key={index} id={Number(id)} />
        ))}
    </div>
     )
   }
   </div>
   </div>
  )
}

export default WidgetBuilder