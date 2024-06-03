import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom';

// Componente basico de Login
function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    //Funcion para ver el correo y enviarlo
    const handleSubmit = async (e) =>{
        e.preventDefault();

        //Funcion asincrona ya que va al backend y va a procesar para eso es async y await
        try{
            await supabase.auth.signUp({
                email,
                password,
                
            });
        console.log(supabase.auth.getSession);

        } catch (error){
            console.error(error);
        }
    };

    //Funcion en caso de que quieras entrar necesitas autentificarte
    useEffect(() =>{
        if(!supabase.auth.getUser()){
            navigate("/");
        }
    }, [navigate]);

    //Ventana principal del Login
    return(
        <div>
            <form onSubmit={handleSubmit} className='card card-body'>
                <input 
                type="email" 
                name="email" 
                placeholder="youremail@site.com"
                onChange={e =>setEmail(e.target.value)}         //lo que se tipee se guarda
                />

                <input 
                type="password" 
                name="password" 
                placeholder="********"
                onChange={e =>setPassword(e.target.value)}         //lo que se tipee se guarda
                />

                <button>
                Enviar
                </button>
            </form>

        </div>
    );
}


export default Login