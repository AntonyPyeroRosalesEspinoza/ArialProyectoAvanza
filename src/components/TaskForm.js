import { useEffect, useState } from "react";
import { useTasks } from "../contexts/TaskContest";
import { supabase } from "../supabase/client";
import { v4 as uuidv4} from 'uuid';

function TaskForm() {

    //Estado de taskname
    const [ taskname, setTaskName] = useState('');
    const [ descripcion, setdescripcion] = useState('');
    const [ precio, setprecio] = useState('');
    const [ imagenes, setimagenes] = useState('');
    const { createTask, adding } = useTasks();

    //IMAGEN OBTENER
    const [ imagensubida, setimagensubida] = useState('');


    const [ images, setImages ] = useState('');
    const CONURL = "https://qbgzljqiakoktnrcnuvb.supabase.co/storage/v1/object/public/productos/";

    //Evento de escucha, funcion handle
    const handleSubmit = async e => {
        e.preventDefault();                                      //cancelar comportamiento por defecto
        createTask(taskname,descripcion,precio,imagenes);
        //uploadImage(imagenes);
        //console.log(adding);

        //INTEGRAR IMAGENES


        setTaskName("");                                        //Limpia datos
        setdescripcion("");                                     // Limpia datos
        setprecio(""); 

    };

    async function getImages(){
        const {data, error} = await supabase
        .storage
        .from('productos')
        .list("/",{
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc"}
        });

        if(data !== null){
            setImages(data);
            console.log("Se cargo la imagen");
        } else {
            alert("error loading image")
            console.log(error);
        }
    }

    //Subir imagenes
    async function uploadImage(e){
        
        
        let file = e.target.files[0];

        //Ingresa el producto en la base de datos
        const {data, error} = await supabase
            .storage
            .from('productos')
            .upload("/"+ uuidv4(), file)

            //Error, si no se encuentra la imagen
            if(data) {
                getImages();
            } else {
                console.log(error);
            }
        
        //Ingresa el producto en la base de datos
        const { error2, data2} = await supabase
        .from('productosgen')
        .insert({ nombre: taskname,
            descripcion: descripcion,
            precio: precio,
            done: 'FALSE',
            imagenes: 'https://qbgzljqiakoktnrcnuvb.supabase.co/storage/v1/object/public/productos/'+data.path,
        //userId: user.id
        });

    }



    
    //Leer Archivos del cliente
    const ManejarImagenes = (event) => {
        
        const defaultfault = 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png';

        const archivofoto = document.getElementById("foto");
        const imagen_mostra = document.getElementById("img");
        //console.log(archivofoto);
        //console.log(event);
        
        archivofoto.addEventListener('change', e =>{
            if(e.target.files[0]){
                
                //Leer archivo del cliente, asincronica prestale atencion al file y luego de procesar has un onload y pasa una funcion
                const reader = new FileReader( );
                reader.onload = function( e){
                    imagen_mostra.src = e.target.result;
                }

                //Leer a data URL
                reader.readAsDataURL(e.target.files[0])

            }else{
                imagen_mostra.src = defaultfault;
            }
            
        });



        
      };


    return (
        //Evento de React
        <div>
            <form onSubmit={handleSubmit} className="card card-body">                      {/* ejecutando el handle */}                    
                <input 
                    type="text" 
                    name="taskName" 
                    placeholder="Escribe titulo"
                    onChange={e => setTaskName(e.target.value)}
                    value={taskname}
                    className="form-control mb-2"
                ></input>

                {/* descripcion del dato */}
                <input 
                    type="text" 
                    name="descripcion" 
                    placeholder="Escribe descripcion"
                    onChange={e => setdescripcion(e.target.value)}
                    value={descripcion}
                    className="form-control mb-2"
                ></input>

                {/* precio del dato */}
                <input 
                    type="number" 
                    name="precio" 
                    placeholder="Escribe precio"
                    onChange={e => setprecio(e.target.value)}
                    value={precio}
                    className="form-control mb-2"
                ></input>

                {/* imagenes del dato */}
                <input 
                    type="file" 
                    name="foto" 
                    id="foto" 
                    accept="image/*"
                    onChange={e => {
                        ManejarImagenes(e);
                        uploadImage(e);
                    }}
                    className="form-control mb-2"
                    //placeholder="Introduce la imagen"
                    //onChange={e => uploadImage(e.target.value)}
                    //onChange={e => ManejarImagenes(e.target.value)}
                    //value={imagensubida}
                    //className="form-control mb-2"
                    
                ></input>


            <div>
                <img id="img" style={{ width: '300px', height: 'auto' }} 
                //src={`${CONURL}Teclado_1.PNG`}/>
                //src={`${CONURL}${imagenes.name}`}/>
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIiXhCizYHxLJuAxRBMcbjxkISSQ8o_NRLA3JcBeVx-rr6NVUmd-9C7enrOM6qNvEIpI&usqp=CAU"/>
                
            </div>

            <div className="ms-auto">
                <button className="btn btn-primary btn-sm" 
                //onClick={(e) => uploadImage(e)}
                >                                        {/* <button disabled = {adding}> 1:15:20 */}
                    {adding ? "Agregando..." : "Agregar"}
                </button>
            </div>

            </form>
            {/* {images.map((images) =>{
                return(
                    <Card.Img variant="top" src={CONURL+"/"+imagenes.name} />

                )
            })} */}
            
        </div>
    )

}

export default TaskForm
