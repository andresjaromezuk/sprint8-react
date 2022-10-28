import { useEffect, useState, useRef } from 'react';
import ChartRow from './ChartRow';

function Chart (){

    const keywordA= useRef()
    const keywordB= useRef()

    const[products, setProducts] = useState([])
    const [keyword1, setKeyword1] = useState("")
    const [keyword2, setKeyword2] = useState("")

    useEffect(() => {
        fetch (`https://arrayces-sprint-7.herokuapp.com/api/products/filter?keyword1=${keyword1}&&keyword2=${keyword2}`)
        .then(res=> res.json())
        .then(info => {setProducts(info.data)})
        }, [keyword1, keyword2]);


        const filterProducts = (e) => {
            e.preventDefault()
            setKeyword1(keywordA.current.value)
            setKeyword2(keywordB.current.value) 
          }

    return (
        
        <div className="card shadow mb-4">
            <div className="col-12 col-md-6">
              <form onSubmit={filterProducts}>  
                <div className="form-group">
                  <label htmlFor="">Filtrar productos:</label>
                  <select className="form-control" ref={keywordA}>
                        <option value=""> Elige un producto: </option>
                        <option value="1"> Planta </option>
                        <option value="2"> Maceta</option>
                        <option value="3"> Cuidados </option>
                    </select>
                    <select className="form-control" ref={keywordB}>                  
                        <option value=""> Ordenar por: </option>
                        <option value="lowest" > Precio más bajo </option>
                        <option value="highest" > Precio más alto </option>
                        <option value="2"> Ofertas </option>
                        <option value="3"> Destacados </option>
                    </select>
                </div>
                <button className="btn btn-info">Filtrar</button>
              </form>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Tipo</th>
                                <th>Tamaño</th>
                                <th>Cantidad de cuotas</th>
                                <th>Categoría</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;