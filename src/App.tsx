import React from 'react';
import './App.css';


export const  App = () => {
    return (
        <div className='App'>
            <div>
                <h3>What to learn</h3>
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


    </div>
    )}

export default App;
