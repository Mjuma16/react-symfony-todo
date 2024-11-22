import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../routes/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Update() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: ''
    })
    const getDataById = async (slug) => {
        try {
            const res = await api.get(`/todo/${slug}`);
            setFormData(res.data.todo);
        } catch (error) {
            console.error("Error fetching data by ID:", error);
        }
    };

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/todo/update/${slug}`, formData);
            if (response.data.status === 'success') {
                navigate('/')
            }
        } catch (error) {
            console.error("Failed to update the todo:", error);
            alert('Failed to update the todo. Please try again.');
        }
    };





    useEffect(() => {
        getDataById(slug)
    }, [])

    return (
        <div className='container mt-5'>
            <form method='PUT' onSubmit={updateTodo} className="w-50 border px-4 shadow-lg mx-auto" id="todo-form">
                <h1 className="my-4 text-center shadow">Update Todo</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control ps-3"
                        name="name"
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }

                        value={formData.name}
                        placeholder="Name"
                        id="name"
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control ps-3"
                        name="title"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }

                        value={formData.title}
                        placeholder="Title"
                        id="title"
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control ps-3"
                        name="description"
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }

                        value={formData.description}
                        placeholder="Description"
                        id="description"
                    />

                </div>

                <div className="d-flex justify-content-end mb-5">
                    <button type="submit"
                        className="btn btn-primary px-4 py-2 me-3 rounded shadow"
                    >Update</button>
                    <Link to={'/'} className='text-decoration-none'>
                        <button type="button" className="btn btn-primary px-4 py-2 me-3 rounded shadow">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Update
