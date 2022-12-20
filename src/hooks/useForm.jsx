import {useState, useEffect} from 'react'
import productCreateValidation from '../validations/productCreateValidation'


const useForm = () => {
    const [values, setValues] = useState({})
    /* const [images, setImages] = useState({}) */
    const [totalErrors, setTotalErrors] = useState({})
    const [nameError, setNameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [sizeError, setSizesError] = useState("")
    const [feesError, setFeesError] = useState("")
    const [categoriesError, setcategoriesError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [load, setLoad] = useState(false)
    
    /* const handleImage = (e) =>{
        setImages(e.target.files)
    } */

    const handleBlurName = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setNameError(errors.name)
    }
    
    const handleBlurDescription = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setDescriptionError(errors.description)
    }
    
    const handleBlurPrice = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setPriceError(errors.price)
    }

    const handleBlurType = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setTypeError(errors.type)
    }
    
    const handleBlurSize = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setSizesError(errors.size)
    }
    
    const handleBlurFees = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setFeesError(errors.fees)
    }
    
    const handleBlurCategory = (e)=>{
        handleChange(e)
        let errors = productCreateValidation(values)
        setcategoriesError(errors.category)
    }

    const handleChange = (e) => {
        /* e.persist() */
        const {name, value} = e.target
        setValues({ 
            ...values, 
            [name]: value})
            /* if(value === ""){
                setErrors({[name] : "El campo no puede estar vacío"})
                console.log("hay un error")
            } */

    }

    
    useEffect(() =>{
        if(Object.keys(totalErrors).length === 0 && isSubmitting ){
    
            fetch('https://arrayces-railway-sprint7-production.up.railway.app/api/products/', {
                method: 'POST', 
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        let errors = productCreateValidation(values)
        setTotalErrors(errors)
        setNameError(errors.name) 
        setDescriptionError(errors.description)
        setPriceError(errors.price)
        setTypeError(errors.type)
        setSizesError(errors.size)
        setFeesError(errors.fees)
        setcategoriesError(errors.category)
    }

    return {values, 
            load, 
            nameError, 
            descriptionError,
            priceError,
            typeError,
            sizeError,
            feesError,
            categoriesError,
            handleSubmit, 
            /* handleImage, */
            handleChange, 
            handleBlurName,
            handleBlurDescription,
            handleBlurPrice,
            handleBlurType,
            handleBlurFees,
            handleBlurSize,
            handleBlurCategory
        }
}

export default useForm 