import React from 'react'
import { useState, useEffect } from 'react';
import api from '../routes/api'
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    api.get('/todo').
      then(res => setData(res.data.todo)).
      then(err => console.log(err));
  }, [])


  // this function willl delete the todo
  const deleteTodo = async (id) => {
    // console.log('deleted id is: ',id);
    const response = await api.delete(`/todo/delete/${id}`)
    console.log(response);
    if (response.data.status === 'success') {
      alert("Todo has been deleted successfully");
      window.location.reload();
    }
  }

  return (
    <div>
      <div className='container'>
        <h1 className='text-center mb-4 mt-5 text-primary'>
          Todo List
        </h1>
        <div className="d-flex justify-content-end my-3 ">
          <Link to={'/api/todo/create/'} className='text-decoration-none'><button className="btn btn-primary px-4 py-2 me-3 rounded shadow">Add Item</button></Link>
        </div>

        <table className="table table-striped shadow-lg rounded border">
          <thead className='text-center px-5'>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center px-5'>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/api/todo/update/${item.id}`}> <button className="btn btn-primary rounded px-4 py-2 text-light me-2 shadow">
                    Edit
                  </button></Link>


                  <button className="btn btn-danger rounded px-3 py-2 shadow" onClick={() => deleteTodo(item.id)}>
                    <a className="text-white text-decoration-none">Delete</a>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* form to todo */}
        <form method="post" className="w-50 border px-4 shadow-lg d-none mx-auto" id="todo-form">
          <h1 className="my-4 text-center shadow">Add Todo</h1>
          <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control ps-3" name="name" placeholder="Name" id="name" />
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Title</label>
            <input type="text" className="form-control ps-3" name="title" placeholder="Title" id="title" />
          </div>
          <div className="mb-3">
            <label for="descripton" className="form-label">Name</label>
            <input type="text" className="form-control ps-3" name="description" placeholder="Description" id="descripton" />
          </div>
          <div className="d-flex justify-content-end mb-5">
            <button type="submit" name="submit" className="btn btn-primary px-4 py-2 me-3 rounded shadow">Save</button>
            <button className="btn btn-primary px-4 py-2 me-3 rounded shadow">Cancle</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Home
