import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from 'yup';
import api from '../routes/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Create() {
    const navigate = useNavigate();
    const {
        handleChange,
        handleBlur,
        handleReset,
        handleSubmit,
        setFieldValue,
        errors,
        values,
        touched,} = useFormik({
            initialValues:{
                name:'',
                title:'',
                description:''
            },
            validationSchema:Yup.object({
                name: Yup.string()
                .required("Name is required!")
                .min(3, "Name must contain atleast 3 characters"),
                title: Yup.string()
                .required("Title is required!")
                .min(3, "Name must contain atleast 3 characters"),
                description: Yup.string()
                .required("Description is required!")
                .min(10, "Description must be atleast 10 characters"),
            }),
            onSubmit: async (values, { resetForm }) => {
                try {
                    const response = await api.post('/todo/create', values, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    console.log('Form submitted successfully:', response);
                    if(response.data.status==='success'){
                        navigate("/");
                    }
                    resetForm();
                } catch (error) {
                    console.error('Error submitting the form:', error.response?.data || error.message);
                }
            },
    })
    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit} method='POST' className="w-50 border px-4 shadow-lg mx-auto" id="todo-form">
                <h1 className="my-4 text-center shadow">Add Todo</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control ps-3"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Name"
                        id="name"
                    />
                    <small className="text-danger">
                        {touched.name && errors.name ? errors.name : null}
                    </small>
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control ps-3"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        placeholder="Title"
                        id="title"
                    />
                    <small className="text-danger">
                        {touched.title && errors.title ? errors.title : null}
                    </small>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control ps-3"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder="Description"
                        id="description"
                    />
                    <small className="text-danger">
                        {touched.description && errors.description ? errors.description : null}
                    </small>
                </div>

                <div className="d-flex justify-content-end mb-5">
                    <button type="submit" className="btn btn-primary px-4 py-2 me-3 rounded shadow">Save</button>
                    <Link to={'/'} className='text-decoration-none'>
                        <button type="button" className="btn btn-primary px-4 py-2 me-3 rounded shadow">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Create
