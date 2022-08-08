import React, { useState } from 'react'

const Addtodo = ({ handleadd}) => {
    const [text,setText]=useState("");
    const handlechange=(e)=>{
        setText(e.target.value);

    }
    const handlesubmit=()=>{
        handleadd(text);
     
    }
  return (
    <div>
       <div>
        <h1>{text}</h1>
        <input onChange={handlechange} placeholder='add somthing'/>
        <button onClick={handlesubmit}>ADD</button>
       </div>
    </div>
  )
}

export default Addtodo
