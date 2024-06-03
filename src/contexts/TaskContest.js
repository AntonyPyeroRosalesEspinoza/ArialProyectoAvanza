import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { v4 as uuidv4} from 'uuid';

//Creando el contexto
export const TaskContext = createContext();


//Creando Hook para no repetir las 2 importaciones de useContext
export const useTasks = () => {
    const context = useContext(TaskContext)

    //En caso de error
    if(!context) throw new Error('Hay un error en el TaskContextProvider')

    return context
}

//Provider para contener los componenetes pequeños
export const TaskContextProvider = ({ children }) => {             //Contienen un monton de hijos o componentes ({children})
    
    //Arreglo de tareas con usestate
    const [tasks, setTasks] = useState([]) 
    const [adding, setAdding] = useState([false]) 
    const [loading, setLoading] = useState([false])

    //Obtener datos dependiendo de la tabla y condiciones, done = true o done = false
    const getTasks = async (done = false) => {

        setLoading(true);

        //Extrae con condiciones
        const {error, data } = await supabase
        .from("productosgen")
        .select('*')
        .eq("done", done);
        //const result = await supabase.from("tasks").select().eq("userId", user.id).order("id",{ascending: true});           //En caso que quieras hacer un "si" si el usuario que lo publico es A entonces que solo A pueda publicar
        
        if (error) throw error;                                     //Si existe un error entonces lanza un error

        setTasks(data);
        //Verifica si esta cargando
        setLoading(false);
    }




    //Funcion para reutilizarlo en cada parte
    const createTask = async (taskName,descripcion,precio,imagenes) => {
        setAdding(true);
        
        //Ingresando datos al supabase
        try {

            //const user = supabase.auth.getUser();
            //Para insertar datos y darle id
            
            const { error, data} = await supabase
            .from('productosgen')
            .insert({ nombre: taskName,
                descripcion: descripcion,
                precio: precio,

                done: 'FALSE',
            //userId: user.id
            });
            console.log (taskName);
            console.log (descripcion);
            console.log (precio);
            console.log (imagenes);
            if (error) throw error;

            //Obten los datos nuevamente
            await getTasks();

        } catch (error) {
            console.error(error)
        } finally {
            setAdding(false);
            
        }
        
    }



    //Eliminacion de los datos
    const deleteTask = async (id) => {
        
        //const user = supabase.auth.getUser();

        const {error, data} = await supabase.from('productosgen')
            .delete()
            .eq("id", id);
        if (error) throw error;

        //Reinicia la lista de tarea o mejor dicho limpia (si la tarea ya fue eliminada entonces muestra las tareas actuales)
        setTasks(tasks.filter(task => task.id != id));

        console.log (id);

    }

    //Actualizacion de los datos
    const updateTask = async (id, updateFields) => {
        

        const {error, data} = await supabase.from('productosgen')
            .update(updateFields)
            .eq('id',id);

        if (error) throw error;
        
        //Obten los datos nuevamente
        await getTasks();
        
        console.log(id, updateFields);
        console.log(data);
    }

    //Regresa las funciones de valores de tasks, gettasks
    return <TaskContext.Provider value={{ tasks, getTasks, deleteTask, createTask, updateTask, adding, loading}}>                  {/* envia un componente llamado provider */}
        {children}
        
    </TaskContext.Provider>

    
};
