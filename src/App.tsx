import { DndContext } from "@dnd-kit/core"
import WidgetList from "./components/widgetList"
import {WidgetListData} from "./data/mockData"
import WidgetBuilder from "./components/widgetBuilder"
import { useState } from "react";

function App() {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over && over.id === 'droppable') {
      setDroppedItems((prev) => [...prev, String(active.id)]);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className='container-3'>
          <WidgetBuilder droppedItems={droppedItems} />
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
