import { useEffect } from "react";
import { useTasks } from "../contexts/TaskContest"

function TaskCard({ task }) {

    const { deleteTask, updateTask } = useTasks();

    //Ejecuta la eliminacion de task contest
    const handleDelete = () =>{
        deleteTask(task.id)
        
    }

    //Ejecuta la actualizaccion de task contest
    const handleToggleDone = () =>{
        updateTask(task.id, {done: !true.done});
        //console.log(task.id);
    }
    
    //Tienes tu componente TaskCard para tenerlo separado
    //La interfaz cambia a cada uno en vez de hacerlo cada uno por uno
    //1:18:34
    return (

        //Si HAY CAMBIOS aqui se verifica los NOMBRES en las COLUMNAS
        <div key={task.id} className="card card-body mb-2">                 
            <h1 className="h5">
                {/* {task.name} */}
                {`${task.id}. ${task.nombre}`}
            </h1>
            <h2 className="h6">
                {`${task.descripcion}`}
            </h2>
            <h2 className="h6">
                {`S/. ${task.precio}`}
            </h2>
            <h2 className="h6">
                <img id="img" style={{ width: '300px', height: 'auto' }} 
                src={`${task.imagenes}`}/>

            </h2>

            <p>{task.done ? "Hecho✔️" : "No hecho❌"}</p>
            <div className="ms-auto">
                <button 
                    className="btn btn-danger btn-sm me-1"
                    onClick={handleDelete}>
                    Delete
                </button>
                <button 
                    className="btn btn-secondary btn-sm "
                    onClick={handleToggleDone}>
                    Done
                </button>
            </div>
        </div>
            
    )

}

export default TaskCard