import { Box } from '@mui/material'
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Typing = () => {
    const [Letter, setLatter] = useState("");

    const handleTyping = (e) => {
        setLatter(e.target.value);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing</title></Helmet>
                <h1 className="text-center text-white mt-10 lg:text-4xl md:text-2xl">Typing</h1>
                <Box className="border-transparent border-2 h-[70vh] m-10 mx-14 rounded-lg " >
                    <textarea className="rounded-lg bg-red-200 text-red-600 focus:outline-none text-5xl p-10 w-[100%] h-[100%] resize-none select-none" name="typing" id="typing" spellcheck="false" onChange={handleTyping} value={Letter} autoFocus></textarea>
                    <textarea className="rounded-lg bg-red-200 focus:outline-none text-5xl p-10 w-[100%] h-[100%] resize-none select-none placeholder:text-black relative top-[-70vh] opacity-50" name="not-hidden-placeholder" id="not-hidden-placeholder" spellcheck="false" placeholder='The quick brown fox jumps over the lazy dog' ></textarea>
                </Box>
            </HelmetProvider>
        </>
    )
}

export default Typing;
