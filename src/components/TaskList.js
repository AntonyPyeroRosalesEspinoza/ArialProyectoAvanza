import { useTasks } from "../contexts/TaskContest";
import { useEffect } from "react";
import TaskCard from "./TaskCard";

function TaskList({done = false}) {

    const { tasks, getTasks, loading } = useTasks();
    

    // se obtiene las tareas
    useEffect(() =>{
        getTasks(done);
        
    }, [done]);                 //Si done cambia ejecuta useddect otra vez

    //console.log(tasks);

    function renderTasks(){
        //En caso para ver el loading cuando esta cargando las tareas
        if (loading){
            return <p> Loading... </p>
        } else if(tasks.length == 0) {
            return <p> Tarea no encontrada </p>

        } else {

            return (
                <div>
                    {
                        //Muestra los datos en la pagina segun el key, nombre y done
                        tasks.map(task => (
                        <TaskCard key={task.id} task = {task}/>
                        ))
                    }
                </div>
                    
            )
        }
    }

    return <div>
        {renderTasks()}
    </div>

}

export default TaskList