import React from 'react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName } from '../../../../Utils/Function'


export default function Shadow() {
  const location = useLocation();
  return (
    <div>
      <Nav data={location.state} />
    </div>
  )
}
