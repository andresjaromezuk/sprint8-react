
import { useState, useEffect } from 'react'
import SmallCard from "./SmallCard";


function ContentRowElements() {

  const [products, setProducts] = useState("")
  const [users, setUsers] = useState("")
  const [categories, setCategories] = useState("")
  
  
  useEffect(() => {
  
      fetch (`http://localhost:3000/api/products`)
      .then(res=> res.json())
      .then(data => {setProducts(data.meta.length)
                    setCategories(data.meta.categoriesLength)
                    console.log(data)})
    }, [])
  
    useEffect(() => {
  
      fetch (`https://arrayces-sprint-7.herokuapp.com/api/users`)
      .then(res=> res.json())
      .then(data => setUsers(data.meta.length))
    }, [])
  
    let productCard = {
      title: 'productos',
      total: products,
      color:   "primary",
      icono: "fa-film"
    }
  
    let userCard = {
      title: 'usuarios',
      total: users,
      color:   "success",
      icono: "fa-award",
    }
  
    let categoriesCard = {
      title: 'categorías',
      total: categories,
      color:   "warning",
      icono: "fa-user",
    }
  
    let cardProps = [productCard, userCard, categoriesCard]

  return (
    <div className="row">
      {cardProps.map((item, i) => {
        return <SmallCard {...item} key={i} />;
      })}
    </div>
  );
}

export default ContentRowElements;
