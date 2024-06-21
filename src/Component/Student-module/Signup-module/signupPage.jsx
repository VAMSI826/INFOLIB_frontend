import React from 'react'
import Signup from './signup'
import './signupPage.css'

export default function SignupPage() {
  return (
          <div class='container-fluid'>
              <div className='white-side'>
                <Signup></Signup>
              </div>
              <div className='blue-sided'>
              <img src="http://surl.li/tnzld" className='sign-image' alt="hd" />
            </div>
          </div>
        )
      }