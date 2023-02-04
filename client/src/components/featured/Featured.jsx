import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

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

  const { data, loading, error} = useFetch("/hotels/countByCity?cities=tirupati,chennai,banglore")  //in package.json we used proxy

  const handleSearch = (destination) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", { state: { destination, dates, options } })
  }

  return (
    <div className="featured">
      {loading ? ("Pls wait... Loading places") : 
      <>
      <div className="featuredItem" onClick={() => handleSearch("banglore")}>
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Banglore</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem" onClick={() => handleSearch("chennai")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Chennai</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem" onClick={() => handleSearch("tirupati")}>
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/0a/38/f1/7e/tirumala-tirupathi-devasthanam.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Tirupati</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      </>}
    </div>
  );
};

export default Featured;
