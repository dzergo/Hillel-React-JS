import NoteHeader from "./NoteHeader";
import { useState, useEffect } from 'react';

const ToDoItem = ({item, onDragStart, onDragEnd, moveLikePointer}) => {

    const [isMoving, setMoving] = useState(false);

    return (
        <li 
            className={item.isDone ? 'done' : ''}
            onMouseDown={(e) => onDragStart(e, item)} 
            onPointerMove={item.isMoving ? (e) => moveLikePointer(e, item) : null} 
            onMouseUp={(e) => onDragEnd(e, item)} 
            style={getPosition(item)}
        >
            <NoteHeader 
                item={item}
            />
            <p>{item.title}</p>
        </li>
    )
}

export default ToDoItem;

const getPosition = (item) => {
    return ({
        left: item.positionX,
        top: item.positionY 
    })
}
