import React from 'react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName } from '../../../../Utils/Function'
import Weeks from './Weeks'
import { usePDF } from 'react-to-pdf';

export default function Matrix() {
  const location = useLocation();
  return (
    <div className=' bg-gray-800' >
       
        <Nav data={location.state} />
        <div>
          <Weeks />
        </div>
    </div>
  )
}
