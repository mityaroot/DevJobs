import React from 'react'
import {useRouter} from '../hooks/useRouter'

export function Link ({ href, children, ...restOfProps }) {

    const { navigateTo } = useRouter()

    const handleClick = (event) => {
        event.preventDefault()
    
        navigateTo(href)

        // ver Navigation API, lo tienen que añadir proxomamente como una manera nueva de navegar más eficiente.
    }    

    return (
        <a className="link" href={href} {...restOfProps} onClick={handleClick}>
            {children}
        </a>
    )
}