import { useEffect, useState } from "react"


export const useGetLocation = () =>{

    const [location , setLocation ] = useState(
        {
            loaded : false,
            coordinates : {
                lat : "",
                long : ""
            }
        }
    )

    const onSuccess = (pos) =>{
        setLocation({
            loaded : true,
            coordinates : {
                lat : pos.coords.latitude,
                long : pos.coords.longitude
            }
        })
    }

    const onError = (error) =>{
        setLocation({
            loaded : true,
            error
        })
    }

    useEffect( () =>{
        if(!navigator.geolocation) onError({message : "location not supported "});
        else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

    }, [])
    
    return location
}