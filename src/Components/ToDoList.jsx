import ToDoItem from './ToDoItem';

const TodoList = (props) => {
    
    return (
        <ul>
            {props.items.map(item => 
               <ToDoItem
                item={item}
                onDragStart={props.onDragStart}
                moveLikePointer={props.moveLikePointer}
                onDragEnd={props.onDragEnd}
                key={item.id}
               /> 
            )}
        </ul>
    )
}

export default TodoList;