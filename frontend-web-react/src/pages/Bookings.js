import { useEffect, useState } from "react";
import axios from "axios";
import { API_CUST_GET, API_PROPCUST_GET } from "../apis/apis";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HeaderIn from "../components/HeaderIn";

function Bookings() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState([]);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [distance, setDistance] = useState();
  const [time, setTime] = useState();

  const [ways, showWays] = useState("");

  const [latitudeDest, setLatitudeDest] = useState();
  const [longitudeDest, setLongitudeDest] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  let navigate = useNavigate();

  const GetCookie = () => {
    return [Cookies.get("tokenCust"), Cookies.get("phoneCust")];
  };

  useEffect(() => {
    setLoading(true);
    // console.log("aa")
    const f = async() => {
      await delay(1000);
    const session = GetCookie();
    // console.log(session);
    const phone = session[1];
    if (session[1] === undefined) {
      console.log(session[1]);
      navigate("/customer");
    } else {
        // console.log(phone);
        axios.post(`${API_CUST_GET}`, { phone })
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          setUser(res.data);
          const d = res.data.pincode;
          // console.log(d);
          axios.post(`${API_PROPCUST_GET}`, { pincode: d }).then((res) => {
            setProperties(res.data);
            // console.log(res.data);
          });
        });
    }
    setLoading(false);
  }
  f();
  }, []);

  const view = () => {
    navigate('/viewBookings', {state : {user:user}});
  }

  const pastBookings = () => {
    navigate('/pastBookings', {state: {user:user}});
  }

  const calculate = (address, prop_id) => {
    console.log("click");
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=a381c1bb743f48afaa65d2b8a586ea20`).then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setLongitudeDest(data.features[0].properties.lon);
      setLatitudeDest(data.features[0].properties.lat);
      console.log(data.features[0].properties.lon);
      console.log(data.features[0].properties.lat);
      return [data.features[0].properties.lon, data.features[0].properties.lat];
    })
    .then((loc)=>{
      navigator.geolocation.getCurrentPosition(function(position) {

        setLatitude(position.coords.latitude);
  
        setLongitude(position.coords.longitude);

        console.log(position.coords.latitude)

        console.log(`https://api.geoapify.com/v1/routing?waypoints=${position.coords.latitude},${position.coords.longitude}|${loc[0]},${loc[1]}&mode=drive&apiKey=a381c1bb743f48afaa65d2b8a586ea20`);

        fetch(`https://api.geoapify.com/v1/routing?waypoints=${position.coords.latitude},${position.coords.longitude}|${loc[1]},${loc[0]}&mode=drive&apiKey=a381c1bb743f48afaa65d2b8a586ea20`)
        .then((response)=>{
          return response.json();
        }).then((data)=>{
          showWays(prop_id);
          console.log(data.features[0].properties.distance);
          console.log(data.features[0].properties.time);
          setDistance(data.features[0].properties.distance);
          setTime(data.features[0].properties.time);
        })
  
      });
    })}

  return (
    <>
      <HeaderIn view = {view} pastBookings={pastBookings}></HeaderIn>
      {loading?
      <center><div className='loadingSpinner'></div></center>
      :null}
      <section className="heading">
        <p>Available Parking Slots, {user.pincode}</p>
      </section>
      {properties.map((data) => {
        return (
          <div className="goals">
            <div className="goal">
              <label className="margin-set">Parking Address: {data.prop_address}</label>
              <label className="margin-set">Slots: {data.slots}</label>
              {/* <br></br> */}
              <button onClick={()=>calculate(data.prop_address, data.prop_address)}>Click to get distance and time to reach</button>
              <br></br>
              {(ways === data.prop_address)? <label>Distance: {distance/1000} km, Time: {time/60} minutes</label>:null}
              <br></br>
              <button
                className="btn1"
                onClick={() => {
                  console.log("rr")
                  navigate("/bookingSlot", {state : {
                    user: user,
                    slotDetails: data
                  }});
                }}
              >
                BOOK
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Bookings;
