import React, {ChangeEvent, useState} from 'react';


export type EditableSpanPropsType = {
    value: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {


    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState (props.value)


    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ?
            <input value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
            :
            <>
                <span onDoubleClick={activateEditMode}>{title}</span>
            </>

    )
}

