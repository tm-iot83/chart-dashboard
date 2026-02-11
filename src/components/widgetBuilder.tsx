import { useDroppable } from "@dnd-kit/core";
import Charts from "./charts/charts";
import { useEffect, useState } from "react";
import ChartForm from "./charts/chartForm";
import { mockChartData } from "../data/mockChartData";
import type { ChartProps } from "../data/mockChartData";

interface DroppedItem {
    instanceId: string;
    widgetId: string;
}

interface WidgetBuilderProps {
    droppedItems: DroppedItem[];
}

interface ChartConfig {
    [key: string]: ChartProps;
}

function WidgetBuilder({ droppedItems }: WidgetBuilderProps) {
    const {setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const [savedItems, setSavedItems] = useState<DroppedItem[]>([]);
  const [chartConfigs, setChartConfigs] = useState<ChartConfig>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('droppedItems');
    const savedConfigs = localStorage.getItem('chartConfigs');
    
    if (savedItems) {
      setSavedItems(JSON.parse(savedItems));
    }
    
    if (savedConfigs) {
      setChartConfigs(JSON.parse(savedConfigs));
    }
  }, []);

  // Auto-save droppedItems to localStorage whenever they change
  useEffect(() => {
    if (droppedItems.length > 0) {
      localStorage.setItem('droppedItems', JSON.stringify(droppedItems));
      setSavedItems(droppedItems);
    }
  }, [droppedItems]);


  const handleSave = () => {
    setIsEditing(false);
  }

  const handleCancel = () => {
    setIsEditing(false);
  }

  const handleChartConfigUpdate = (instanceId: string, config: ChartProps) => {
    setChartConfigs(prev => ({
      ...prev,
      [instanceId]: config
    }));
  }

  const handleClear = () => {
    localStorage.removeItem('droppedItems');
    localStorage.removeItem('chartConfigs');
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
          <Charts 
            key={item.instanceId} 
            instanceId={item.instanceId} 
            widgetId={Number(item.widgetId)} 
            isEditing={isEditing}
            config={chartConfigs[item.instanceId]}
            onConfigUpdate={handleChartConfigUpdate}
          />
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
          <Charts 
            key={item.instanceId} 
            instanceId={item.instanceId} 
            widgetId={Number(item.widgetId)} 
            isEditing={isEditing}
            config={chartConfigs[item.instanceId]}
            onConfigUpdate={handleChartConfigUpdate}
          />
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