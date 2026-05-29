import {useState, useId, useEffect} from 'react'

import Switch_1 from '../components/Switch_1.jsx'

const useContactSubmit = ({idName, idEmail, idTlf, idMensaje}) => {

    const [errors, setErrors] = useState({})

    const handleContactSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const nombre = form.elements[idName].value
        const email = form.elements[idEmail].value
        const tlf = form.elements[idTlf].value

        const validateErrors = validate(nombre, email, tlf)

        setErrors(validateErrors)

        if (Object.keys(validateErrors).length === 0) {
            console.log(`TODO CORRECTO: ${nombre}, ${email}, ${tlf}`)
            alert(`TODO CORRECTO: ${nombre}, ${email}, ${tlf}`)
        } else {
            console.log(`Errores:`, validateErrors)
            alert(`Errores: ${Object.values(validateErrors).join(', ')}`)
        }
    }

    return {
        handleContactSubmit,
        errors,
        setErrors
    }
}

const validate = (nombre, email, tlf) => {
    const newErrors = {}
    const nombreRegex = /^[A-Za-zÁ-Úá-ú\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const tlfRegex = /^[0-9]{9}$/

    if (!nombre.trim()) {
        newErrors.nombre = 'El nombre es obligatorio'
    } else if (!nombreRegex.test(nombre)) {
        newErrors.nombre = 'Solo letras y espacios'
    }

    const dominioValido = (email) => {
        const dominio = email.split('@')[1]
        return dominio === 'gmail.com' || dominio === 'hotmail.com' || dominio === 'outlook.com'
    }

    if (!email.trim()) {
        newErrors.email = 'El email es obligatorio'
    } else if (!emailRegex.test(email)) {
        newErrors.email = 'Email inválido'
    } else if (!dominioValido(email)) {
        newErrors.email = 'Solo gmail, hotmail u outlook'
    }

    if (!tlf.trim()) {
        newErrors.tlf = 'El teléfono es obligatorio'
    } else if (!tlfRegex.test(tlf)) {
        newErrors.tlf = 'Debe tener 9 dígitos'
    } else if (!tlf.startsWith('6')) {
        newErrors.tlf = 'Debe empezar con 6'
    }

    return newErrors
}

const useSwitch = () => {

    // para el hook del switch hacems un useState propio, antes lo teniamos fuera del custom hook
    const [auto, setAuto] = useState(false)

    const [datosForm, setDatosForm] = useState({
        nombre: '',
        email: '',
        tlf: '',
        mensaje: ''
    })

        
    useEffect(() => {
        if (auto) {
            setDatosForm({
                nombre: 'David',
                email: 'david@gmail.com',
                tlf: '622444555',
                mensaje: 'Hola, este es un mensaje de prueba.'
            })
        } else {
            setDatosForm({
                nombre: '',
                email: '',
                tlf: '',
                mensaje: ''
            })
        }
    }, [auto])

    return {
        auto,
        setAuto,
        datosForm,
        setDatosForm
    }
}


export function ContactPage() {
    const idName = useId()
    const idEmail = useId()
    const idTlf = useId()
    const idMensaje = useId()

    const {handleContactSubmit, errors, setErrors} = useContactSubmit({idName, idEmail, idTlf, idMensaje})

    const {auto, setAuto, datosForm, setDatosForm} = useSwitch(false)

    const validateField = (field, value) => {
        const full = validate(
            field === 'nombre' ? value : datosForm.nombre,
            field === 'email' ? value : datosForm.email,
            field === 'tlf' ? value : datosForm.tlf
        )
        return full[field] || null // Si full[field] es undefined, devuelve null, si no, devuelve el error. 
    }

    const handleChange = (field, value) => {
        setDatosForm({ ...datosForm, [field]: value })
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }))
    }

    return (
        <>
            <style>{`
                #${idName}::placeholder { color: #ff8181a2 !important; }
                #${idEmail}::placeholder { color: #81ffa7a2 !important; }
                #${idTlf}::placeholder { color: #f581ffa2 !important; }
                #${idMensaje}::placeholder { color: #e9447b !important; }
                input:focus, textarea:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.2) !important; }
                button:hover { opacity: 0.9; }
                button:active { transform: scale(0.98); }
            `}</style>

            <h1 style={{ color: '#09f', fontSize: '32px', fontWeight: 'bold', 
                textAlign: 'center', display: 'flex', justifyContent: 'center' , flexDirection: 'column'}}>
                <span style={{ fontSize: '64px', marginBottom: '5px' }}>👋📧</span>Contacto
            </h1>

            <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '1.5rem' }}>¿Tienes alguna pregunta? Contáctanos.</p>

            <div style={{ display: 'flex', justifyContent: 'center',
                marginTop: '10px', backgroundColor: '#0a0e14',
                padding: '24px', maxWidth: '600px', margin: '0 auto',
                borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem',
                         fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'}}
                    >
                        {"Autorellenado y borrado".split("").map((letra, i) => (
                            <span key={i} style={{ color: `hsl(${Math.random() * 360}, 80%, 60%)` }}>
                                {letra === " " ? "\u00A0" : letra}
                            </span>
                        ))}
                    </span>
                    
                    <Switch_1 checked={auto} onChange={() => setAuto(!auto)}/>
                </div>

                <div style={{ marginLeft: '20px', marginRight: '20px',
                    backgroundColor: '#334155',
                    width: '1px', alignSelf: 'stretch' }}>
                </div>

                <form onSubmit={handleContactSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Nombre</label>
                    <input
                        id={idName} type="text"
                        placeholder="Introduce tu nombre"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px',
                            border: `1px solid ${errors.nombre ? '#f87171' : '#334155'}`,
                            background: '#0f172a', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
                            transition: 'border 0.2s' }}
                        value={datosForm.nombre}
                        onChange={(e) => handleChange('nombre', e.target.value)}
                    />
                    {errors.nombre && <span style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '4px' }}>{errors.nombre}</span>}

                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Email</label>
                    <input id={idEmail} type="email" placeholder="tucorreoejemplo@gmail.com"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px',
                            border: `1px solid ${errors.email ? '#f87171' : '#334155'}`,
                            background: '#0f172a', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
                            transition: 'border 0.2s' }}
                        value={datosForm.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    {errors.email && <span style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '4px' }}>{errors.email}</span>}

                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Teléfono</label>
                    <input id={idTlf} type="tel" placeholder="622 444 555"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px',
                            border: `1px solid ${errors.tlf ? '#f87171' : '#334155'}`,
                            background: '#0f172a', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
                            transition: 'border 0.2s' }}
                        value={datosForm.tlf}
                        onChange={(e) => handleChange('tlf', e.target.value)}
                    />
                    {errors.tlf && <span style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '4px' }}>{errors.tlf}</span>}

                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>Mensaje</label>
                    <textarea id={idMensaje} placeholder="Escribe tu mensaje aquí..."
                        style={{ width: '100%', height: '90px', padding: '10px 12px', borderRadius: '8px',
                            border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9',
                            fontSize: '0.9rem', outline: 'none', transition: 'border 0.2s', resize: 'vertical' }}
                        value={datosForm.mensaje}
                        onChange={(e) => setDatosForm({ ...datosForm, mensaje: e.target.value })}
                    />

                    <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', fontSize: '1rem',
                        fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '8px' }}>
                        Enviar
                    </button>

                </form>
            </div>

        </>
    )
}