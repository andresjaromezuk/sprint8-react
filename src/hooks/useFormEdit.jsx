import {useState, useEffect} from 'react'
import productCreateValidation from '../validations/productCreateValidation'


const useFormEdit = (productCreateValidation, id, product) => {
    const [values, setValues] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [load, setLoad] = useState(false)
    const [totalErrors, setTotalErrors] = useState({})
    

    useEffect(() =>{

        console.log(`El id es ${id}`)
        

        if(Object.keys(totalErrors).length === 0 && isSubmitting ){

            values.id = id

            console.log(values)
    
            fetch('https://arrayces-railway-sprint7-production.up.railway.app/api/products/edit', {
                method: 'PUT', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
              })
              .then((response) => {
                response.json()
                console.log(response)
                if(response.status === 200){
                    setLoad(true)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })

            /* if(Object.keys(images).length > 0){

                console.log(images)
    
                let files = new FormData()
                files.append('image', images[0])
                files.append('image', images[1])
                
    
                fetch('http://localhost:3000/api/products/image', {
                    method: 'POST', 
                    body: files
                  })
                  .then((response) => {
                    response.json()
                    console.log(response)
                    if(response.status === 200){
                        setLoad(true)
                    }
                })
        
               
            }
 */
            
        }
    }, [totalErrors])

    

    return {
            load, 
            totalErrors
        }
}

export default useFormEdit 