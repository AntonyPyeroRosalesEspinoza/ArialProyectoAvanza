import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TaskContextProvider } from './contexts/TaskContest';

import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';

import { supabase } from './supabase/client';

function App() {
  // instanciando useNavigate
  const navigate = useNavigate();

  //Si esta AUTENTIFICADO entonces pasa a la pagina normal SINO pasa al login
  // useEffect(() => {
    
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     console.log(event, session)
  //     if (!session){
  //       navigate('/login')
  //     }else{
  //       navigate('/')
  //     }
  //   })

  // }, [])

  return (
    <div className="App">
    
    {/* Importando Navbar.js */}
    

    {/* Todas las rutas en un taskcontextprovider */}
    <TaskContextProvider>
      
    <Navbar/>
      
    <div className='conteiner'>
      {/* Rutas contenedor de rutas donde donde mostrara la pagina que se requiere */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </div>


      {/*<Login/>*/}               {/* usando el login de la carpeta pages */}     
    
    </TaskContextProvider> 
    
    </div>
  );
}

export default App;
