import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


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
            <TextField  variant="outlined"  size='small' value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
            :
            <>
                <span onDoubleClick={activateEditMode}>{title}</span>
            </>

    )
}

