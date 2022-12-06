import {useState, useEffect, useRef} from 'react'
import '../assets/css/formStyle.css'
import useFormEdit from '../hooks/useFormEdit'
import {Redirect} from 'react-router-dom'
import productCreateValidation from '../validations/productCreateValidation'

export default function EditProduct(props){
 
    //Opción de mandar un state como prop
    const productToEdit = props.location.state.product
    const id = productToEdit.id

    //Opción de capturar el id con useParams
    /* const {id} = useParams()
    console.log(id) */
    
    //Valores por default del producto a editar
    const [types, setTypes] = useState([])
    const [fees, setFees] = useState([])
    const [sizes, setSizes] = useState([])
    const [categories, setCategories] = useState([])

    //Valores de inputs
    const nameValue = useRef()
    const descriptionValue = useRef()
    const typeValue = useRef()
    const sizeValue = useRef()
    const priceValue = useRef()
    const feesValue = useRef()
    const categoriesValue = useRef()

    //Nuevos valores y manejo de errores
    const [values, setValues] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [load, setLoad] = useState(false)
    const [totalErrors, setTotalErrors] = useState({})

    //Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setValues({
        name: nameValue.current.value,
        description: descriptionValue.current.value,
        type: typeValue.current.value,
        size: sizeValue.current.value,
        price: priceValue.current.value,
        fees: feesValue.current.value,
        categories: categoriesValue.current.value
        })
        let errors = productCreateValidation(values)
        setTotalErrors(errors)
    }
    
    
    useEffect( ()=> {
        
        async function  fetchData(){
            let infoJson= await fetch('http://localhost:3000/api/products/list') 
            let info =  await infoJson.json()
            
            console.log(infoJson)
            console.log(info)
            
            let data = info.data
            setTypes(data.types)
            setFees(data.fees)
            setSizes(data.sizes)
            setCategories(data.categories)
        }
        fetchData()
        
        
    }, [])

    useEffect(() =>{

        console.log(`El id es ${id}`)
        

        if(Object.keys(totalErrors).length === 0 && isSubmitting ){

            values.id = id

            console.log(values)
    
            fetch('http://localhost:3000/api/products/edit', {
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
    
        
    return(

        <>
            <h2>Editar producto</h2>
            <form /* action="http://localhost:3000/api/products/" */ className='createForm' onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input defaultValue={productToEdit.name} name="name" type="text" ref={nameValue}/>
                {totalErrors.name ? <span className="formErrors"> {totalErrors.name} </span> : ""}
                <label for="description">Descripción</label>
                <textarea defaultValue={productToEdit.description || ""} name="description" id="description" cols="30" rows="10" ref={descriptionValue}/>
                {totalErrors.description ? <span className="formErrors"> {totalErrors.description} </span> : ""}
                <label>Imagen</label>
                <label for="image"> Imagen </label>
                <input type="file" name="image" id="image" multiple/>
                <label>Tipo de producto</label>
                <select name="type" ref={typeValue}>
                <option value=""> Elegí tipo de producto </option>
                {types?.map(type =>{
                   return  <option value={type.id || ""} key={type.id}> {type.name} </option>
                })}
                </select>
                {totalErrors.type ? <span className="formErrors"> {totalErrors.type} </span> : ""}
                <label>Tamaño</label>
                <select name="size" ref={sizeValue}>
                    <option value="">Elegí el tamaño</option>
                {sizes?.map(size => {
                    return <option value={size.id} key={size.id}>{size.name}</option>
                })}
                </select>
                {totalErrors.size ? <span className="formErrors"> {totalErrors.size} </span> : ""}
                <label for="price">Precio</label>
                <input defaultValue={productToEdit.price} type="number" name="price" id="price" placeholder='Colocá un precio' ref={priceValue}/>
                {totalErrors.price ? <span className="formErrors"> {totalErrors.price} </span> : ""}
                <label for="fees">Cuotas</label>
                <select name="fees" id="fees" ref={feesValue}>
                    <option value=""> Elegí la cantidad de cuotas</option>
                {fees?.map(fee => {
                    return <option value={fee.id} key={fee.id}>{fee.number} cuotas</option>
                })}
                </select>
                {totalErrors.fees ? <span className="formErrors"> {totalErrors.fees} </span> : ""}
                <label>Categoría</label>
                <select name="category" ref={categoriesValue}>
                    <option value=""> Elegí la categoría</option>
                {categories?.map(category => {
                    return <option value={category.id} key={category.id}>{category.name}</option>
                })}
                </select>
                {totalErrors.category ? <span className="formErrors"> {totalErrors.category} </span> : ""}
                <button type="submit"> Crear producto</button>
            </form>
            {load && <Redirect to="/" />}
        </>
        
    )


}