import React from 'react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName } from '../../../../Utils/Function'
import Weeks from './Weeks'

export default function Matrix() {
  const location = useLocation();
  return (
    <div>
        <Nav data={location.state} />
        <Weeks />
    </div>
  )
}
