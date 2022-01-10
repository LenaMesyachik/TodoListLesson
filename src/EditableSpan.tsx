import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";


export type EditableSpanPropsType = {
    value: string
    onChange:(title:string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan call')

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState (props.value)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = useCallback((e:ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    },[])
    return (
        editMode
            ?
            <TextField  variant="outlined"  size='small' value={title} autoFocus onBlur={activateViewMode} onChange={changeTitle}/>
            :
            <>
                <span onDoubleClick={activateEditMode}>{title}</span>
            </>

    )
})

