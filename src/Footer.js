import React from 'react';
import { CDBFooter, CDBBtn, CDBIcon, CDBBox } from 'cdbreact';
import {Heart} from 'react-feather';
import { Link, NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <img
              alt="logo"
              src="https://www.kindpng.com/picc/m/62-624815_transparent-pet-shop-png-pets-shop-logo-png.png"
              width="30px"
            />
            &nbsp;<span className="ml-4 h5 mb-0 font-weight-bold">PetStore</span>
          </a>
        </CDBBox>
        <CDBBox>
          <small className="ml-2">&copy; Copy right to Syrine Ben Hassen <Heart/> . All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex">
<a href='https://www.facebook.com/syrine.benhassen.507'>
          <CDBBtn flat color="dark" className="p-2">
            
            <CDBIcon fab icon="facebook-f" />
        
          </CDBBtn>
          </a>
          <a href='https://github.com/sirinebhsn'>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="github" />
          </CDBBtn>
          </a>
          <a href='https://www.linkedin.com/in/syrine-ben-hassen-4b9b3a161/'>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="linkedin" />

          </CDBBtn>
          </a>
        </CDBBox>
        
      </CDBBox>
    </CDBFooter>
  );
};