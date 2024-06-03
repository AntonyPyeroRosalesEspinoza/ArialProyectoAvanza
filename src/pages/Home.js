import { supabase } from "../supabase/client"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";


function Home() {

    //showTaskDone es buleano como una variable, [es eñ valor true o false, cambiar valor]
    const [showTaskDone, setshowTaskDone] = useState(false);
    const navigate = useNavigate();

    //Importar datos desde usecontext trae todos los datos del TastContest.js
    //const { tasks } = useTasks()

    //console.log(tasks)


    //console.log(TaskContextProvider);
    //Verificador del Usuario autentificado
    // useEffect(() =>{
    //     if(!supabase.auth.getUser()){
    //         navigate("/login");
    //     }else
    //     {
    //         navigate("/");
    //     }
    // }, [])

    //Campo escrito en la pagina
    return (
        <div className="row pt-4" >

            <div className="col-md-4 offset-md-4">
                {/* <button onClick={() => supabase.auth.signOut()}>
                    Logout
                </button> */}

                {/* lista de formulario y lista de tareas visualizalos */}
                <TaskForm/>

                <header className="d-flex justify-content-between my-3">
                    <span className="h5">
                        {showTaskDone ? "Tareas hechas" : "Tareas por hacer"}
                    </span>
                    <button 
                        className="btn btn-dark btn-sm"
                        onClick={() => setshowTaskDone(!showTaskDone)}>
                        
                        {showTaskDone ? "Tareas por hacer" : "Tareas hechas"}
                    </button>
                </header>

                <TaskList done = {showTaskDone}/>
                
            </div>


        </div>
    )
}

export default Home