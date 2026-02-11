import { useDroppable } from "@dnd-kit/core";
import Charts from "./charts/charts";
import { useEffect, useState } from "react";

interface DroppedItem {
    instanceId: string;
    widgetId: string;
}

interface WidgetBuilderProps {
    droppedItems: DroppedItem[];
}
function WidgetBuilder({ droppedItems }: WidgetBuilderProps) {
    const {setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const [savedItems,setSavedItems] = useState<DroppedItem[]>([]);  
  const [isEditing,setIsEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem('droppedItems', JSON.stringify(droppedItems));
    setIsEditing(false);
  }

  const handleCancel = () => {
    setIsEditing(false);
  }

  useEffect(() => {
    const savedItems = localStorage.getItem('droppedItems');
    if (savedItems) {
      setSavedItems(JSON.parse(savedItems));
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem('droppedItems');
    setSavedItems([]);
    window.location.reload();
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
          <div className="flex gap-4">
            <button className="button-secondary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="button-secondary" onClick={handleClear}>Clear</button>
          </div>
        )}
      </div>
   <div ref={setNodeRef} className="p-4 full">
    {savedItems.length !== 0 ? (
      <div 
      
        className="full grid grid-cols-3"
      >
        {savedItems.map((item) => (
          <Charts key={item.instanceId} instanceId={item.instanceId} widgetId={Number(item.widgetId)} isEditing={isEditing} />
        ))}
    </div>
    ):(
      <div>
      {droppedItems.length === 0 ? (
            <div className="container full center">
              Drag widgets here to build your dashboard
            </div>
        ) : (
       <div 
      
        className="full grid grid-cols-3"
      >
        {droppedItems.map((item) => (
          <Charts key={item.instanceId} instanceId={item.instanceId} widgetId={Number(item.widgetId)} isEditing={isEditing} />
        ))}
    </div>
     )
   }
      </div>
    )
    }
   </div>
   </div>
  )
}

export default WidgetBuilder