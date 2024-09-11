import React from 'react'
import Nav from './Nav'
import {useLocation} from 'react-router-dom';

export default function Dashboard() {
    const location = useLocation();
  return (
    <div>
      <Nav data={location.state} />
    </div>
  )
}
