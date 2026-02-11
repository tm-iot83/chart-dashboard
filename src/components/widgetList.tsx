import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';


interface WidgetListProps {
    title:string;
    description:string;
    icon:string;
    id:string;
}   


function WidgetList({title,description,icon,id}:WidgetListProps) {

    const {attributes,listeners,setNodeRef,transform,isDragging} = useDraggable({ id });
    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: 'grab'
    };


 return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className='card m-4'>
            <div className='title flex justify-between'>
                <div className='flex items-center gap-4'>
                    <i className="fa-sharp fa-light fa-grip-dots-vertical"></i>
                    <h3>{title}</h3>
                </div>
                <i className={icon}></i>
            </div>
            <div className='description'>
                <p>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default WidgetList