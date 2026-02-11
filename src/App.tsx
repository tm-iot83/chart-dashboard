import { DndContext } from "@dnd-kit/core"
import WidgetList from "./components/widgetList"
import {WidgetListData} from "./data/mockData"
import WidgetBuilder from "./components/widgetBuilder"
import { useState } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

interface DroppedItem {
  instanceId: string;
  widgetId: string;
}

function App() {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    
    if (!over) return;
    const activeItem = droppedItems.find(item => item.instanceId === String(active.id));
    const overItem = droppedItems.find(item => item.instanceId === String(over.id));

    if (activeItem && overItem && active.id !== over.id) {
      setDroppedItems((items) => {
        const oldIndex = items.findIndex(item => item.instanceId === String(active.id));
        const newIndex = items.findIndex(item => item.instanceId === String(over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    } 
    else if (over.id === 'droppable') {
      const newItem: DroppedItem = {
        instanceId: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        widgetId: String(active.id)
      };
      setDroppedItems((prev) => [...prev, newItem]);
    }
  }

  console.log(droppedItems);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className='container-3'>
          <SortableContext items={droppedItems.map(item => item.instanceId)}>
            <WidgetBuilder droppedItems={droppedItems} />
          </SortableContext>
        </div>
        <hr />
        <div className='container-4'>
          <h2 className="flex justify-center items-center mt-4 mb-4">Widget List</h2>
          {WidgetListData.map((item, index) => {
            return (
              <WidgetList id={item.id} key={index} title={item.title} description={item.description} icon={item.icon} />
            )
          })}
        </div>
      </div>
    </DndContext>
  )
}

export default App
