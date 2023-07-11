import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderIn from "../components/HeaderIn";
import { API_PAST_BOOKING } from "../apis/apis";

function History() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const [history, setHistory] = useState([]);

//   const [refresh, setRefresh] = useState(false);

//   const toggle = () => {
//     if(refresh)
//         setRefresh(false);
//     else
//         setRefresh(true);
//   }

  useEffect(() => {
    setLoading(true);
    const customer_id = user._id;
        // if(bookings.length()>0){
            axios.post(`${API_PAST_BOOKING}`, {customer_id})
            .then((res)=>{
                // if(res.status === 400){
                //     setBookings([]);
                // }
                // else
                if(res.status!==400)
                    setHistory(res.data);
                
                setLoading(false);
            })
            .catch((err)=>{
                setHistory([]);
                setLoading(false);
            })
        // }
  },[])
  const view = () => {
    navigate('/viewBookings', {state : {user:user}});
  }

  const pastBookings = () => {
    navigate('/pastBookings', {state: {user:user}});
  }
  
  return (
    <div>
        <HeaderIn view={view} pastBookings={pastBookings}></HeaderIn>
        {loading?<center><div className="loadingSpinner"></div></center>:null}
      <section className="heading">
        <p>Dear {user.name}, Here are your Past Bookings:</p>
      </section>

      {history.map((data) => {
        return (
          <div className="goals">
            <div className="goal">
              <div className="history">
              <label className="margin-set">Parking Address: {data.prop_address}</label>
              <label className="margin-set">Vehicle Registration Number: {data.vehicle_reg_no}</label>
              <label className="margin-set">In Date: {data.in_date}</label>
              {/* <br></br> */}
              </div> 
              <label className="margin-set payment">PAYMENT SUCCESSFUL ON {data.out_date}</label>
              <label className="margin-set payment">AMOUNT PAID: ${data.price}</label>
            </div>
          </div>
        );
      })}
      <br></br>
      {history.length === 0 ? 
        <h1>You don't have any past bookings.</h1>
        :null
      }
    </div>
  );
}

export default History;