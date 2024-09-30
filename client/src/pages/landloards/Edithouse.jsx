

import React, { useState ,useEffect} from 'react';
import { Col, Row, Form, Input,Edit } from 'antd';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import {toast } from 'react-toastify';
function Edithouse() {
   const { id } = useParams();
   const navigate =useNavigate();

 const [houseDetails, setHouseDetails] = useState({
    id: id,
    rentPerMonth:''
  });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is needed for authorization
                const response = await axios.get(`http://localhost:5000/api/property/singlehouse/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setHouseDetails(response.data.data); // Store the booking data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [id]);




const handleupdate = (e) => {
  e.preventDefault();
  axios
    .put(`http://localhost:5000/api/property/owner-edit-room/${id}`, houseDetails)
    .then((res) => {
      toast.success('Class updated successfully');
      navigate('/myroomPosted');
    })
    .catch((err) => {
      console.error(err);
      toast.error('Error updating class: ' + err.message);
    });
};

  


  return (
    <div>
  <Row justify='center mt-5'>
        <Col lg={12} sm={20} md={20}>

        <form onSubmit={handleupdate} className='bs1 p-2' layout='vertical'> 
        <h2>Owner Update House Rent/Month</h2>
        
           <div className="form-group row">
            <label  className="col-sm-3 col-form-label col-form-label-sm">Rent Per Month:</label>
            <input   onChange={e=>setHouseDetails({...houseDetails,rentPerMonth:e.target.value})} className="form-control form-control-lg" type='text' value={houseDetails.rentPerMonth}/>
          </div>
           <div className='text-right'>
          <button type='submit'  className='btn1'> Update</button> <br/>

            </div>
        </form>
        </Col>
      </Row>

    </div>
  );
}

export default Edithouse;

