import {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import "../assets/css/pagination.css"

function ShowAllProducts() {
  
  const [data, setData] = useState("")
  const [page, setPage] = useState(0)
  
  const pageNumber = useRef()

  useEffect(() => {
      fetch (`https://arrayces-railway-sprint7-production.up.railway.app/api/products/list?page=${page}`)
      .then(res=> res.json())
      .then(element => setData(element.data))
      
    
  }, [page])

  console.log(data)

  const nextPage = () => {

    Number(pageNumber.current.value) < data.totalPages
    ? 
    setPage(Number(pageNumber.current.value))
    :
    setPage(Number(pageNumber.current.value)-1)
  

  }

  const previousPage = () => {

    Number(pageNumber.current.value)-1 > 0 ? 
    setPage(Number(pageNumber.current.value) - 2)
    :
    setPage(Number(pageNumber.current.value)-1)

  }
  
  return (
    <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>Productos en la base de datos</h2>
            </div>
            
            {data && data.products.length > 0 ? (
              <>
              {data.products.map(product => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" >
                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h5 className="text-center m-0 font-weight-bold text-gray-800">
                            {product.name}
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="text-center">
                            
                            {product &&
                            <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            // Si existe movie.Poster y si es distinto "N/A", mostramos movie.Poster y si no mostramos la imagen local noPoster importada de los assets
                            src={product?.urlImg}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                            }}
                            />
                          }
                          </div>
                          <p className="text-center">Precio: ${product.price}</p>
                          <p className="text-center"> <strong>Id: {product.id}</strong> </p>
                          <a href={product.url}>  <p className="text-center">Ver detalle </p> </a>
                          <p className="text-center"><Link to={  {pathname: "/edit", state:{product}} } >Editar </Link> </p>
                        </div>
                      </div>
                    </div>
                );
              })}
                <div className="pageWrapper"> 
                    {data.currentPage >0 ? (
                      <button className="pageButton" onClick={previousPage}>{'<'}</button>
                    ):(
                      <></>
                    )
                  }
                    <input className="pageSpan" ref={pageNumber} value={data.currentPage +1} />  
                    {data.currentPage < data.totalPages-1 ? (
                      <button className="pageButton" onClick={nextPage}>{'>'}</button>
                    ):(
                      <></>
                    )}
                </div>
              </>

            ) : (
            <div className="col-12">
              <h2>CARGANDO...</h2>
            </div>
            )}
          </div>
    </div>
  );
}

export default ShowAllProducts;