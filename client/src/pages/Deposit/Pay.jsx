
import React from 'react';
function Pay({fname,email, amount, tx_ref, public_key}) {

  return (
    <div>
      {/* <form method="POST" action="https://api.chapa.co/v1/hosted/pay" onSubmit={(e) => onToken(e)}> */}
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >  
        {/* Your hidden input fields go here */}
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email}/>
        <input type="hidden" name="first_name" value={fname}/>
        {/* <input type="hidden" name="last_name" value={lname} /> */}
        <input type="hidden" name="title" value="Let us do this" />
        <input type="hidden" name="description" value="Paying with Confidence with cha" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value="http://localhost:5000/api/transaction/addbalance" />
         {/* this the above end point the  link of  the backend code connection*/}

         <input type="hidden" name="return_url" value={`http://localhost:3000/thanks?status=success&tx_ref=${tx_ref}&amount=${amount}`} />
         {/*this 3000 is the value at which  the frontend is run on */}
    
        <input type="hidden" name="meta[title]" value="test" />   

        <button type="submit">Pay For Booking </button>
      </form>
    </div>
  );
}

export default Pay;
