import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Ensure you import useSelector from react-redux
import Pay from './Pay';
import {jwtDecode} from 'jwt-decode'; // Remove destructuring

function Paydonate() {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(150);

    // Get the user from Redux state
    const userFromRedux = useSelector((state) => state.users.user);

    useEffect(() => {
        // If user exists in Redux, use it, otherwise check local storage
        if (userFromRedux) {
            setFname(userFromRedux.name || "");
            setEmail(userFromRedux.email || "");
        } else {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedUser = jwtDecode(token);
                    setFname(decodedUser?.username || "");
                    setEmail(decodedUser?.email || "");
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            }
        }
    }, [userFromRedux]); // Depend on userFromRedux so it updates correctly

    // Function to get current date and time for tx_ref
    const generateTxRef = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}${minutes}${seconds}`; // Current time formatted as HHMMSS

        return `${fname}-tx-${formattedTime}`;
    };

    // Generate tx_ref with current time
    const tx_ref = generateTxRef();

    console.log("the pay id is: " , tx_ref)

    const public_key = "CHAPUBK_TEST-MpebGxPZFUjHLlRuyxzZxF7QQtW1Vy6p";

    return (
        <div style={{ alignItems: 'center', backgroundColor: 'whitesmoke' }}>
            <center style={{ display: 'flex', marginLeft: '30%', flexDirection: 'column', width: '50%', alignContent: 'center', textAlign: 'center' }}>
                {/* <label>Fname</label>
                <input type='text' value={fname} onChange={(e) => setFname(e.target.value)} />
                
                <label>Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                
                <label>Amount</label>
                <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </center>

            <Pay fname={fname} email={email} amount={amount} tx_ref={tx_ref} public_key={public_key} />
            <p>Current Balance:</p>
        </div>
    );
}

export default Paydonate;
