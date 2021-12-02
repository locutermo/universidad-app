import React,{useState,useEffect} from 'react'

export default function StudentMain({addStudent,_dni,_name,_lastname,_isCreate}){
    const [isCreate,setIsCreate] = useState(_isCreate)
    const [name,setName] = useState(_name)
    const [dni,setDni] = useState(_dni)
    const [lastname,setLastname] = useState(_lastname)
    useEffect(()=>{
        console.log(isCreate)
    },[])
    const onclickHandler=()=>{
        if(name.trim()!="" && lastname.trim()!="" && dni.trim()!=""){
            fetch('https://api-universidad-jmc.herokuapp.com/students',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify({
                    NOMALU: name,
                    CODALU: dni,
                    APEALU:lastname
                })
            }).then(res=>res.json()).then(data=>{
                if(data.code==201){
                    console.log("Agregando")
                    addStudent({
                        NOMALU: name,
                        CODALU: dni,
                        APEALU:lastname
                    })
                }
            })
        }
    }

    const onClickUpdateHandler=()=>{
        setIsCreate(true)
    }

    return(
        <div className="flex flex-row my-10">
             <div>
                <label className="block text-sm font-medium text-gray-700">DNI</label>
                <div class="mt-1 relative rounded-xs shadow-sm">                
                    <input type="text" onChange={e=>{setDni(e.target.value)}} value={dni} name="dni" id="dni" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 bg-gray-100 p-2 rounded-md" placeholder=""></input>
                </div>
                <label className="block text-sm font-medium text-gray-700">Nombres</label>
                <div class="mt-1 relative rounded-xs shadow-sm">                
                    <input type="text" onChange={e=>{setName(e.target.value)}} value={name} name="name" id="name" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 bg-gray-100 p-2 rounded-md" placeholder=""></input>
                </div>
                <label className="block text-sm font-medium text-gray-700 my-2">Apellidos</label>
                <div class="mt-1 relative rounded-xs shadow-sm">                
                    <input type="text" onChange={e=>{setLastname(e.target.value)}} value={lastname} name="lastname" id="lastname" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 bg-gray-100 p-2 rounded-md" placeholder=""></input>
                </div>
                {isCreate?<button onClick={onclickHandler} className="my-4 bg-blue-500 p-2 rounded-md">Crear</button>:<button onClick={onClickUpdateHandler} className="my-4 bg-blue-500 p-2 rounded-md">Actualizar</button>}
            </div>
        </div>
    )
}
