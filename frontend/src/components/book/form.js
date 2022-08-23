import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '../form/formControl'
import Input from '../form/input'
import Button from '../form/button'

import axios from '@/lib/axios'

const initialValues = {
    name: '',
    description: '',
    price: 0,
}

const Form = ({ handleAddBook }) => {
    const [form, setForm] = useState(initialValues)
    const {name, description, price} = form

    const handleChangeInput = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const resetForm = () => {
        setForm(initialValues)
    }

    const handleChangeSubmit = async e =>{
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:8000/api/books', form)
            
            handleAddBook({
                book: data.data,
            })

            resetForm()

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleChangeSubmit}>
            <FormControl label="Name" id="name">
                <Input 
                    placeholder="Input Book Name" 
                    id="name" 
                    name="name" 
                    onChange={handleChangeInput} 
                    value={name}
                />
            </FormControl>

            <FormControl label="Description" id="description">
                <Input 
                    placeholder="Input Book Description"
                    name="description" 
                    id="description" 
                    onChange={handleChangeInput} 
                    value={description}
                />
            </FormControl>

            <FormControl label="Price" id="price">
                <Input
                    type="number" 
                    placeholder="Input Book Price" 
                    name="price"
                    id="price" 
                    onChange={handleChangeInput} 
                    value={price}
                 />
            </FormControl>

            <Button type="submit">Submit</Button>
        </form>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </div>

  )
}

Form.propTypes = {}

export default Form