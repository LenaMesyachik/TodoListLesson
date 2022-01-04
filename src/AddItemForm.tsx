import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@material-ui/core";

export type AddItemFormType = {
    addTask: (title:string) => void
}
export const AddItemForm = (props: AddItemFormType) => {

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
                <input value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       className={error ? 'error' : ''}
                />
                <Button variant="contained" color="primary"  onClick={addTitleFor}>
                    +
                </Button>
                {error && <div className='error-message'>{error}</div>}
            </div>
    )
}

