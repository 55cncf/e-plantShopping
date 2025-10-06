import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/CartSlice'
import CartItem from './CartItem'
import '../styles/ProductList.css'

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState({})
  const dispatch = useDispatch()

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        }
      ]
    },
    // ... (include all other categories from your HTML)
  ]

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
    setAddedToCart(prevState => ({
      ...prevState,
      [plant.name]: true
    }))
    alert(`${plant.name} added to cart!`)
  }

  const handleCartClick = (e) => {
    e.preventDefault()
    setShowCart(true)
  }

  const handlePlantsClick = (e) => {
    e.preventDefault()
    setShowCart(false)
  }

  const handleContinueShopping = (e) => {
    e.preventDefault()
    setShowCart(false)
  }

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" />
            <a href="/" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
              <div>
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div className="nav-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" onClick={handleCartClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="30" width="30">
              {/* Cart SVG icon */}
            </svg>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="plants-container">
                {category.plants.map((plant, index) => (
                  <div key={`${plant.name}-${index}`} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <div className="plant-details">
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-description">{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>
                      <button 
                        className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  )
}

export default ProductList
