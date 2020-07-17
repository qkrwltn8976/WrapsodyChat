import React, {useState, useEffect} from 'react';

function getPayload(){
    const [payload, setPayload] = useState(null)

    useEffect(()=>{
        function handleStatusChange(cl:any){
            setPayload(cl)
        }

        
    })
}