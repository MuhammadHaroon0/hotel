import React from 'react'

const Button = ({ content, type }) => {
    return (
        <button type={type} className='bg-[#FF4820] block px-8 py-2 transition ease-in duration-200 rounded-md bg-transparent border-2 border-black
    hover:bg-black hover:border-2 hover:text-white'>{content}</button>


    )
}

export default Button