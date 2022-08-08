import React from 'react'

const Todolist = ({title,status,id,handleDelete}) => {
  return (
    <div style={{display:"flex",justifyContent:"space-evenly",width:"600px"}}>
      <li>{title}</li> {status?"DONE":"NOTDONE"} 
     
      <button onClick={()=> handleDelete(id)}>delete</button>
    </div>
  )
}

export default Todolist
