import { useCallback, useMemo, useState } from "react"

export const Diff = () =>{
    const [count , setCount] = useState(10);
    const [item , setItem]  = useState(10)

    const multiplyBy10 = () =>{
        console.log("multiply by 10")
        setItem( prev => prev * 10)
    }
    // const multiplyBy5 = () =>{
    //      console.log("working uselessly")
    //      return  item*5
    // }
    
    const multiplyBy5 = useMemo(() => {
         console.log("multiply By 5 working uselessly")
         return  item*5       
    } , [item])

    const multiplyBy2 = useCallback( () => {
         console.log("multiply by 2 working uselessly")
         return  count + 2
         
    } , [item])
    



    const add1 = () =>{
         console.log("add by 1")
        setCount( prev => prev + 1)
    }
    return <div>
                <h1>usememo </h1>
                <h1>add 1 to => {count}</h1>
                <h1>mull 10 to => {multiplyBy5 }</h1>
                 <h1>mull 10 to => {multiplyBy2()}</h1>
                <h1>mull 10 to => {item }</h1>
                     <button onClick={ multiplyBy10 }> Multiply 10 </button>
                     <button onClick={ add1 }> add 1 </button>
           </div>
}