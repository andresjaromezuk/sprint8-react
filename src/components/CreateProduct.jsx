import {useState, useEffect} from 'react'
import '../assets/css/formStyle.css'
import useForm from '../hooks/useForm'
import {Redirect} from 'react-router-dom'
import productCreateValidation from '../validations/productCreateValidation'

export default function CreateProduct(){

    const { load, 
            nameError, 
            descriptionError,
            priceError,
            typeError,
            sizeError,
            feesError,
            categoriesError,
            handleImage,
            handleChange, 
            handleSubmit, 
            handleBlurName,
            handleBlurDescription,
            handleBlurPrice,
            handleBlurType,
            handleBlurFees,
            handleBlurSize,
            handleBlurCategory
        } = useForm(productCreateValidation)
        
    const [types, setTypes] = useState([])
    const [fees, setFees] = useState([])
    const [sizes, setSizes] = useState([])
    const [categories, setCategories] = useState([])
   

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

    return(

        <>
            <h2>Crear producto</h2>
            <form /* action="http://localhost:3000/api/products/" */ className='createForm' onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input name="name" type="text" onChange={handleChange} onBlur={handleBlurName} /* value={values.name || ""} */ />
                {nameError ? <span className="formErrors"> {nameError} </span> : ""}
                <label for="description">Descripción</label>
                <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange}  onBlur={handleBlurDescription}/* value={values.description || ""} *//>
                {descriptionError ? <span className="formErrors"> {descriptionError} </span> : ""}
                <label>Imagen</label>
                <label for="image"> Imagen </label>
                <input type="file" name="image" id="image" multiple onChange={handleImage}/>
                <label>Tipo de producto</label>
                <select name="type" onChange={handleChange} onBlur={handleBlurType} /* value={values.type || ""} */>
                <option value=""> Elegí tipo de producto </option>
                {types?.map(type =>{
                   return  <option value={type.id} key={type.id}> {type.name} </option>
                })}
                </select>
                {typeError ? <span className="formErrors"> {typeError} </span> : ""}
                <label>Tamaño</label>
                <select name="size" onChange={handleChange} onBlur={handleBlurSize} /* value={values.size || ""} */>
                    <option value="">Elegí el tamaño</option>
                {sizes?.map(size => {
                    return <option value={size.id} key={size.id}>{size.name}</option>
                })}
                </select>
                {sizeError ? <span className="formErrors"> {sizeError} </span> : ""}
                <label for="price">Precio</label>
                <input type="number" name="price" id="price" placeholder='Colocá un precio' onChange={handleChange} onBlur={handleBlurPrice}/* value={values.price || ""} *//>
                {priceError ? <span className="formErrors"> {priceError} </span> : ""}
                <label for="fees">Cuotas</label>
                <select name="fees" id="fees" onChange={handleChange} onBlur={handleBlurFees} /* value={values.fees || ""} */>
                    <option value=""> Elegí la cantidad de cuotas</option>
                {fees?.map(fee => {
                    return <option value={fee.id} key={fee.id}>{fee.number} cuotas</option>
                })}
                </select>
                {feesError ? <span className="formErrors"> {feesError} </span> : ""}
                <label>Categoría</label>
                <select name="category" onChange={handleChange} onBlur={handleBlurCategory}/*  value={values.category || ""} */>
                    <option value=""> Elegí la categoría</option>
                {categories?.map(category => {
                    return <option value={category.id} key={category.id}>{category.name}</option>
                })}
                </select>
                {categoriesError ? <span className="formErrors"> {categoriesError} </span> : ""}
                <button type="submit"> Crear producto</button>
            </form>
            {load && <Redirect to="/" />}
        </>
        
    )


}