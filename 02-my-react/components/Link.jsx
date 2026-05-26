export function Link ({ href, children, ...restOfProps }) {

    const handleClick = (event) => {
        event.preventDefault()
    
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))

        // ver Navigation API, lo tienen que añadir proxomamente como una manera nueva de navegar más eficiente.
    }    

    return (
        <a href={href} {...restOfProps} onClick={handleClick}>
            {children}
        </a>
    )
}