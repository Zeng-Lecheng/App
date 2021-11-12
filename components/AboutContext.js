import React from 'react'
import ValueProvider from './ValueContext'
import About from './About'

const Context = () => {
    const data = {text: '1'}
    return (
        <ValueProvider value={data}>
            <About />
        </ValueProvider>
    )
}

export default Context
