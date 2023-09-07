import React, { useState } from 'react';
import '../styles/loader.css'; // Import the CSS file here

const Loader = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleButtonClick = () => {
//     setIsLoading(!isLoading);
//   };

  return (
   <>
<div className="fixed inset-0 flex items-center justify-center flex-col ">
  {/* <button onClick={handleButtonClick} className="mb-4">Toggle Loader</button> */}

  {/* Loader */}
   <div>
   <h1 className='text-4xl mx-10' style={{ color: '#ff7f71' }}>Please wait</h1>

   </div>
   <div id="wifi-loader" className='my-16'>
   <svg class="circle-outer" viewBox="0 0 86 86">
       <circle class="back" cx="43" cy="43" r="40"></circle>
       <circle class="front" cx="43" cy="43" r="40"></circle>
       <circle class="new" cx="43" cy="43" r="40"></circle>
   </svg>
   <svg class="circle-middle" viewBox="0 0 60 60">
       <circle class="back" cx="30" cy="30" r="27"></circle>
       <circle class="front" cx="30" cy="30" r="27"></circle>
   </svg>
   <svg class="circle-inner" viewBox="0 0 34 34">
       <circle class="back" cx="17" cy="17" r="14"></circle>
       <circle class="front" cx="17" cy="17" r="14"></circle>
   </svg>
</div>
</div>



  

   </>
  );
};

export default Loader;
