import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import "./featuredProperties.css"

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4") // we can also pass limits like ?featured=true&limit=4

  const { dispatch } = useContext(SearchContext)
  const navigate = useNavigate()

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const handleSearch = (item,destination) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate(`/hotels/${item}`, { state: { destination, dates, options } })
  }

  return (
    <div className="fp">
      {loading ? (
        "Loading Featured Properties"
      ) : (
        <>
          {data.map((item) => (
              <div className="fpItem" key={item._id} onClick={() => handleSearch(item._id,item.city)}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from Rs.{item.cheapestPrice}
                </span>

                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
          ))}
        </>
      )}
    </div>
  )
}

export default FeaturedProperties
