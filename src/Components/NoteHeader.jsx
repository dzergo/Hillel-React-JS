const NoteHeader = ({item, setDone, removeTodo}) => {
    return (
        <span>
            <input 
                type="checkbox" 
                checked={item.isDone}  
            />
            {item.date}
            <button 
                type="button"
            >
            x
            </button>
        </span>
    )
}

export default NoteHeader;