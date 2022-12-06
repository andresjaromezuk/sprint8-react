
const productCreateValidation = (values) =>{

    let errors = {}

    if(!values.name){
        errors.name = 'Debes ingresar un nombre de producto'
    }

    if(!values.description){
        errors.description = 'Debes ingresar una descripción'
    }

    if(!values.category){
        errors.category = 'Debes ingresar la categoría del producto'
    }

    if(!values.type){
        errors.type = 'Debes ingresar el tipo de producto'
    }

    if(!values.fees){
        errors.fees = 'Debes ingresar la cantidad de cuotas'
    }

    if(!values.price){
        errors.price = 'Debes ingresar el precio del producto'
    }

    if(!values.size){
            errors.size = 'Debes ingresar el tamaño del producto'
    }

    return errors
}

export default productCreateValidation