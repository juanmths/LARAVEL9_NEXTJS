import {useEffect, useState} from 'react'

import AppLayout from "@/components/Layouts/AppLayout"
import Head from "next/head"
import axios from "@/lib/axios"
import BookForm from "@/components/book/form"

const BookPage = () => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBooks = async () => {
        
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:8000/api/books')
        
            setBooks(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect (() => {
        fetchBooks()
    }, [])

    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

    if (error) return error

    return(
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }>

            <Head>
                <title>Laravel - Books</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <BookForm handleAddBook={handleAddBook}/>
                    <div className="bg-white overflow-hidden shadow-md  sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">Name</th>
                                        <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">Description</th>
                                        <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">Price</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {loading ? 'Loading...' : books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book.price}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage