import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Signup.css'
import image from '../../image/banner.jpg'
function SignUp() {

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow className='mx-3'>

        <MDBCol col='10' md='6'>
          {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" /> */}
          <img src={image} class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='3' md='5' className='mx-3'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <h3 className="stylingText">Welcome To Engineering Of catalyst And Reaction Kinetics Research Laboratory Resource Management Dashboard </h3>


          </div>

          <div className="divider  my-4">
            {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */} Already have an account ? 
             <a href="" className='py-3 px-3'>LogIn</a>
          </div>
<form>
  
  <div class="row mb-4">
    <div class="col-6">
      <div data-mdb-input-init class="form-outline">
        <input type="text" id="form3Example1" class="form-control" />
        <label class="form-label" for="form3Example1">First name</label>
      </div>
    </div>
    <div class="col-6">
      <div data-mdb-input-init class="form-outline">
        <input type="text" id="form3Example2" class="form-control" />
        <label class="form-label" for="form3Example2">Last name</label>
      </div>
    </div>
  </div>

  <div data-mdb-input-init class="form-outline mb-4">
    <input type="email" id="form3Example3" class="form-control" />
    <label class="form-label" for="form3Example3">Email address</label>
  </div>

  
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form3Example4" class="form-control" />
    <label class="form-label" for="form3Example4">Password</label>
  </div>
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form3Example5" class="form-control" />
    <label class="form-label" for="form3Example5">Confirm Password</label>
  </div>

  
 

 
  <button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4">Sign up</button>

</form>

        </MDBCol>

      </MDBRow>

      

    </MDBContainer>
  );
}

export default SignUp;