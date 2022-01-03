import React from 'react';



export const  TodoList = (props:any) => {
    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/><button> + </button>
                </div>
               <ul>
                    <li> <input type = 'checkbox' checked = {true}/> <span> HTML&CSS</span></li>
                    <li> <input type = 'checkbox' checked = {false}/> <span> js</span></li>
                    <li> <input type = 'checkbox' checked = {true}/> <span> REACT</span></li>
               </ul>
                <div>
                    <button>ALL</button>
                    <button>ACTIVE</button>
                    <button>COMPLETED</button>
                </div>
            </div>
    )}

