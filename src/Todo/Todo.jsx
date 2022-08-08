import React, { useEffect, useState } from "react";
import Addtodo from "./Addtodo";
import Todolist from "./Todolist";
 const getTodos = (props={}) => {
  const {page, }=props;
  return fetch(`http://localhost:5000/tasks?_page=${page}&_limit=3`).then((res) => res.json());

};
export const addtodo = (todo) => {
  return fetch(`http://localhost:5000/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());
};

 export const Deletetodo = (id) => {
    return fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
     
    }).then((res) => res.json());
  };

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    handleGetdata();
  }, [ page,]);
 
  const handleGetdata = () => {
    setLoading(true);
    return getTodos({  page, })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setTodos(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
 
  const handleadd = (text) => {
    const item = {
      title: text,
      status: false,
    };
    setLoading(true);
    addtodo(item)
      .then((res) => {
        console.log(res);
        handleGetdata();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  
  
  const handleDelete = (id) => {
    setLoading(true);
    Deletetodo(id)
      .then((res) => {
        handleGetdata();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
 
  return (
    <div>
      <Addtodo handleadd={handleadd} />
      <div>{loading && <h1>loading....</h1>}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >  
      </div>
      {todos.map((el) => (
        <Todolist
          key={el.id}
          title={el.title}
          status={el.status}
          id={el.id}
      
          handleDelete={handleDelete}
        />
      ))}
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        prev
      </button>
      <button>{page}</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      
    </div>
  );
};

export default Todo;
