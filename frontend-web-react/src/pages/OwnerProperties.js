import { useEffect, useState } from "react";
import * as variables from "../apis/apis";
import {useLocation} from 'react-router-dom';
import HeaderOwn from '../components/HeaderOwn'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function OwnerProperties() {
    let navigate = useNavigate();
    const location = useLocation()
    const phone = location.state.phone
    const[properties, setProperties] = useState([])
    const[propAdd, setPropAdd] = useState(false)
    const[address, setAddress] = useState('')
    const[pincode, setPincode] = useState('')
    const[slots, setSlots] = useState(0)
    const[refresh, setRefresh] = useState(false)
    const[owner, setOwner] = useState()

    const handle = () => {
        if(refresh) setRefresh(false);
        else setRefresh(true)
    }

    const propFormHandler = () => {
        if(propAdd) setPropAdd(false);
        else setPropAdd(true)
    }

    const addProperty = () => {
        const owner_id = owner._id
        const prop_address = address
        const payload = {
            owner_id,
            prop_address,
            pincode,
            slots
        };
        fetch(`${variables.API_PROP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            const jsonRes = await res.json();
            if (res.status == 201 || res.status == 200) {
                console.log('Property added successfully!!')
                setPropAdd(false)
                setAddress('')
                setPincode('')
                setSlots(0)
                handle();

            } else {
                console.log('property not added')
                alert(jsonRes.message)
            }
            console.log(res.status)
        })
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const GetCookie = () => {
        return [Cookies.get("tokenOwner"), Cookies.get("phoneOwner")];
      };

    useEffect(() => {
        console.log(phone)
        const f = async() => {
            await delay(1000);
          const session = GetCookie();
          // console.log(session);
          const phone = session[1];
          if (session[1] === undefined) {
            console.log(session[1]);
            navigate("/owner");
          } else {
            fetch(`${variables.API_GET_OWNER}/${phone}`).then((response)=>{
                return response.json();
            }).then((data)=>{
                setOwner(data);
                fetch(`${variables.API_PROP}/get/${data._id}`).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    setProperties(data);
                    console.log(data)
                })
            })
        }
        }
        f();
      }, [refresh, propAdd])

    const deleteProperty = (id) => {
        console.log(id)
        fetch(`${variables.API_PROP_DELETE}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async res => { 
            const jsonRes = await res.json();
            if (res.status == 201 || res.status == 200) {
                console.log('Property deleted successfully!!')
                handle();
            } else {
                console.log('Property not deleted!!')
                alert(jsonRes.message)
            }
            console.log(res.status)
        })
    }
    return(
        <div>
            <HeaderOwn />
            <div style={{display:'flex', justifyContent: 'center', margin:'20px'}}>
                <button className="btn" onClick = {propFormHandler} >Add Property</button>
            </div>
            {propAdd && 
                <section className='form'>
                <form>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      value={address}
                        placeholder={"Address"}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      value={pincode}
                        placeholder={"Pincode"}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      value={slots}
                        placeholder={"Slots"}
                        onChange={(e) => setSlots(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                </div>
                </form>
                <div style={{display:'flex', justifyContent: 'center', margin:'20px'}}>
                    <button className='btn' onClick={addProperty}>
                        Add
                    </button>
                </div>
                </section>

            }
            <div className="list">
                <div className="listItem" style={{backgroundColor:'white', fontWeight:"bolder"}}>
                    <p>Address</p>
                    <p>Slots</p>
                    <p>Delete</p>
                </div>
            {properties.map((property) => (
                <div key={property._id} className="listItem">
                    <p>{property.prop_address}</p>
                    <p>{property.slots}</p>
                    <button className="btn" onClick={() => deleteProperty(property._id)}>del</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default OwnerProperties