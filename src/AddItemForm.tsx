import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addTask: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTitleFor = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13)
            addTitleFor()
    }
    return (
        <div>
            <TextField variant="outlined"
                       size='small'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       error={!!error}
                       helperText={error}
                       label='Title'
            />
            <IconButton  color="primary" onClick={addTitleFor}>
                <AddBox />
            </IconButton>
        </div>
    )
} )

