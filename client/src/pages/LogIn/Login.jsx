import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css'
import image from '../../image/banner.jpg'
function LogIn() {

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" /> */}
          <img src={image} class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='3' md='5'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <h3 className="stylingText">Welcome To Engineering Of catalyst And Reaction Kinetics Research Laboratory Resource Management Dashboard </h3>


          </div>
           
          <div className="divider  my-4">
            {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */} Don't have an account ? 
             <a href="" className='py-3 px-3'>Create a new account</a>
          </div>

          <MDBInput wrapperClass='mb-4' className='custom-width' label='Email address' id='formControlLg' type='email' size="sm"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="sm"/>

          <div className="d-flex  mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            {/* <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p> */}
          </div>

        </MDBCol>

      </MDBRow>

      

    </MDBContainer>
  );
}

export default LogIn;