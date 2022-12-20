import {useEffect, useState} from "react"

function LastProductInDb() {

  const[lastProduct,setLastProduct] = useState("")

    useEffect(() => {

        fetch (`https://arrayces-railway-sprint7-production.up.railway.app/api/products/lastProduct`)
        .then(res=> res.json())
        .then(info => setLastProduct(info.data))
      }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto en la base de datos
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            {lastProduct &&
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: 40 + "rem" }}
              src={lastProduct.imgUrl[0]}
              alt="Producto"
            />
            }
          </div>
          <p> <strong>Id: {lastProduct?.product?.id}</strong></p>
          <p><strong>Nombre: {lastProduct?.product?.name}</strong></p>
          <p>Precio: $ {lastProduct?.product?.price} </p>
          <p>Descripción: {lastProduct?.product?.description} </p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href={lastProduct?.url}>
            Ver más detalles
          </a>
        </div>
      </div>
    </div>
  );
}

export default LastProductInDb;
