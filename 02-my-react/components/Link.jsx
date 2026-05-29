import React from 'react'
import {useRouter} from '../hooks/useRouter'

export function Link ({ href, children, className: userClassName = '', ...restOfProps }) {

    const { navigateTo, currentPath } = useRouter()

    const isActive = currentPath === href 
    console.log(isActive ? 'activo' : 'no activo')

    const className = `${userClassName} link${isActive ? 'activo' : ''}`.trim()
    

    const handleClick = (event) => {
        event.preventDefault()
    
        navigateTo(href)

        // ver Navigation API, lo tienen que añadir proximamente como una manera nueva de navegar más eficiente.
    }    

    return (
        <a className={className} href={href} aria-current={isActive ? 'page' : undefined} {...restOfProps} onClick={handleClick}>
            {children}
        </a>
    )
}