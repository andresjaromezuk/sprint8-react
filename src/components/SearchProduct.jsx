import {useState, useEffect, useRef} from "react";

function SearchProduct() {
  
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState("")
  
  const search = useRef()

  useEffect(() => {
    /* let getProduct = () =>{ */
      fetch (`https://arrayces-railway-sprint7-production.up.railway.app/api/products/search?keyword=${keyword}`)
      .then(res=> res.json())
      .then(products => setProducts(products.data))
    /* }
    if (keyword){
      getProduct()
    } */
  }, [keyword])

  const searchProduct = (e) => {
    e.preventDefault()
    /* if(search.current.value){ */
      setKeyword(search.current.value)
   /*  } */
    
  }
  
  return (
    <div className="container-fluid">
          <div className="row my-4">
            <div className="col-12 col-md-6">
              <form onSubmit={searchProduct}>  
                <div className="form-group">
                  <label htmlFor="">Buscar producto por nombre:</label>
                  <input ref={search} type="text" className="form-control"  />
                </div>
                <button className="btn btn-info">Búsqueda</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Productos encontrados</h2>
            </div>
            {products.length > 0 ? (
              products.map(product => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" >
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="text-center m-0 font-weight-bold text-gray-800">
                          {product.product.name}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          
                          {product &&
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            // Si existe movie.Poster y si es distinto "N/A", mostramos movie.Poster y si no mostramos la imagen local noPoster importada de los assets
                            src={product.imgUrl[0]}
                            alt={product.product.name}
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                          }
                        </div>
                        <p className="text-center">Precio: ${product.product.price}</p>
                        <p className="text-center"> <strong>Id: {product.product.id}</strong> </p>
                        <a href={product.url}>  <p className="text-center">Ver detalle </p> </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="alert alert-warning text-center">
                No se encontraron productos
              </div>
            )}
          </div>
    </div>
  );
}

export default SearchProduct;
