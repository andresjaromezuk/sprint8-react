import {useEffect, useState} from 'react'

function CategoriesInDb() {
  const[categories,setCategories] = useState("")

    useEffect(() => {

        fetch (`https://arrayces-railway-sprint7-production.up.railway.app/api/products`)
        .then(res=> res.json())
        .then(info => setCategories(info.meta))
      }, [])
     
      let plantas = {
          title: 'Plantas',
          total: categories.plantasLength
      }
      let macetas = {
          title: 'Macetas',
          total: categories.macetasLength
      }
      let cuidados = {
          title: 'Cuidados',
          total: categories.cuidadosLength
      }

      let cardProps = [plantas, macetas, cuidados]

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Cantidad de productos por categoría
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {cardProps.map((category, i) => (
              <div className="col-lg-6 mb-4" key={i}>
                <div className="card bg-dark text-white shadow">
                  <span className="card-body">Total de {category.title}: {category.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesInDb;
