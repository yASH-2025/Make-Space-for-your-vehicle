import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_CURR_BOOKING, API_NEW_BOOKING ,API_END_BOOKING} from "../apis/apis";
import { useNavigate } from "react-router-dom";
import HeaderIn from "../components/HeaderIn";
import { Link } from "react-router-dom";

function ViewBooking() {
  // var geocoder = new google.maps.Geocoder()
  // let geolocated = useGeolocated();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toggle = () => {
    if(refresh)
        setRefresh(false);
    else
        setRefresh(true);
  }

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [distance, setDistance] = useState();
  const [time, setTime] = useState();

  const [ways, showWays] = useState("");

  const [latitudeDest, setLatitudeDest] = useState();
  const [longitudeDest, setLongitudeDest] = useState();
  
  useEffect(()=>{
      
    setLoading(true);
    const customer_id = user._id;
        // if(bookings.length()>0){
            axios.post(`${API_CURR_BOOKING}`, {customer_id})
            .then((res)=>{
                // if(res.status === 400){
                //     setBookings([]);
                // }
                // else
                if(res.status!==400)
                    setBookings(res.data);
                setLoading(false);
            })
            .catch((err)=>{
                setBookings([]);
                setLoading(false);
            })
        // }
        },[refresh])

  const handleRemPayment = (_id, price) => {
    setLoading(true);
    console.log(_id)
    // console.log(price);
        axios.put(`${API_END_BOOKING}`, {_id, price})
        .catch((err)=>{
            console.log(err);
            alert('Payment Unsuccessful. Please try again');
            setLoading(false);
        })
        .then((res)=>{
            console.log(res);
            alert('Payment Successful.');
            toggle();
            setLoading(false);
        })
  }

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
    })
  }
  return (
    <div>
        <HeaderIn view={view} pastBookings={pastBookings}></HeaderIn>
        {loading?<center><div className="loadingSpinner"></div></center>:null}
      <section className="heading">
        <p>Dear {user.name}, Here are your Ongoing Bookings:</p>
      </section>

      {bookings.map((data) => {
        return (
          <div className="goals">
            <div className="goal">
              <label className="margin-set">Parking Address: {data._doc.prop_address}</label>
              <button onClick={()=>calculate(data._doc.prop_address, data._doc.prop_id)}>Click to get distance and time to reach</button>
              <br></br>
              {(ways === data._doc.prop_id)? <label>Distance: {distance/1000} km, Time: {time/60} minutes</label>:null}
              <br></br>
              <Link to = {`https://www.google.com/maps/dir/${latitude},${longitude}/${data._doc.prop_address}/`}><b>Get Location Details on Google Map</b></Link>
              <label className="margin-set">Vehicle Registration Number: {data._doc.vehicle_reg_no}</label>
              {/* <br></br> */}
              <button
                className="btn1"
                onClick={() => {
                  handleRemPayment(data._doc._id, data.price);
                }}
              >
                PAY REMAINING AMOUNT ${data.price}
              </button>
            </div>
          </div>
        );
      })}
      <br></br>
      {bookings.length === 0 ? 
        <h1>You don't have any ongoing bookings.</h1>
        :null
      }
    </div>
  );
}

export default ViewBooking;