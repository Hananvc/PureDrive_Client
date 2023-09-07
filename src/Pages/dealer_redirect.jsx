import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'


function DealerRedirect() {
    const hoverStyle = {
        color: '#ff4d30', // Define your custom color here
      };
  return (
        <>

        <Navbar/>
        <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-12 px-8"> {/* Increase padding */}
      <div className="mail__wrapper max-w-2xl mx-auto"> {/* Increase max-width */}
        <div className="mail__content bg-white p-12 shadow-lg"> {/* Increase padding and shadow */}
          <div className="content__header text-center tracking-wide border-b">
            
            <h1 className="text-4xl h-52 flex items-center justify-center font-extrabold" style={{ color: '#ff4d30' }}>Welcome to PureDrive</h1> {/* Increase font size */}
          </div>

          <div className="content__body py-12 border-b"> {/* Increase padding */}
            <p className="text-2xl font-bold" > {/* Increase font size */}
              Hey, <br /><br />It looks like you just signed up for Our website, that’s awesome! We will let you know after verification process to access the Dealer Side of the Website.
            </p>
            <button className="text-white text-lg tracking-wide bg-red rounded-full w-full my-6 p-6">CONFIRM EMAIL ADDRESS</button> {/* Increase font size and padding */}
            <Link
                className="text-xl font-bold"
                to='/'
                style={hoverStyle}
                onMouseEnter={(e) => { e.target.style.color = hoverStyle.color; }}
                onMouseLeave={(e) => { e.target.style.color = ''; }}
            >   
              Untill then!<br /> check out our user side pages.
            </Link>
          </div>

          <div className="content__footer mt-12 text-center text-grey-darker"> {/* Increase padding and font size */}
            <h3 className="text-xl sm:text-2xl mb-6">Thanks for showing interset in us!</h3> {/* Increase font size */}
            
          </div>
        </div>

        {/* <div className="mail__meta text-center text-lg text-grey-darker mt-12">
          <div className="meta__social flex justify-center my-6">
            <a href="#" className="flex items-center justify-center mr-6 bg-black text-white rounded-full w-10 h-10 no-underline"><i className="fab fa-facebook-f"></i></a> 
            <a href="#" className="flex items-center justify-center mr-6 bg-black text-white rounded-full w-10 h-10 no-underline"><i className="fab fa-instagram"></i></a> 
            <a href="#" className="flex items-center justify-center bg-black text-white rounded-full w-10 h-10 no-underline"><i className="fab fa-twitter"></i></a> 
          </div>

          <div className="meta__help">
            <p className="leading-loose">
              Questions or concerns? <a href="#" className="text-grey-darkest">help@theapp.io</a><br />
              Want to quit getting updates? <a href="#" className="text-grey-darkest">Unsubscribe</a>
            </p>
          </div>
        </div> */}
      </div>
    </div>
        </>

  )
}

export default DealerRedirect
