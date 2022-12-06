import {useRef, useState, useEffect} from 'react'

function ChartRow(props) {

  const[idToDelete, setIdToDelete] = useState("")

  const idValue = useRef()

  const handleDestroy = () =>{
    let alert = prompt('¿Quieres eliminar el elemento? Escribe "si" para confirmar')
    if(alert.toLocaleLowerCase() === 'si'){
      setIdToDelete(idValue.current.value)
    }
  }

  useEffect(()=>{
    if(idToDelete){
      fetch(`http://localhost:3000/api/products/delete/${idToDelete}`, {method: 'DELETE'})
      .then(res =>{
        if(res.status === 200){
          window.location.reload()
        }
      })
      
    }

  }, [idToDelete])
  
  return (
    <tr>
      <td>{props.product.id}</td>
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
      <td>{props.product.Type.name}</td>
      <td>{props.product.Size.name}</td>
      <td>{props.product.Fee.number}</td>
      <td>{props.product.Category.name}</td>
      <td><a href={props.url}>Ver</a></td>
      <td><input type="text" defaultValue={props.product.id} hidden ref={idValue} /> <button className="deleteProduct" onClick={handleDestroy}>x</button></td>
    </tr>
  );
}

export default ChartRow;
