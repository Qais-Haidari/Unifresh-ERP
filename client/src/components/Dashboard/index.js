import React, { useState, useEffect } from 'react'
import Layout from "../../Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
const [state, setstate] = useState();
const [Loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true)
    setstate([])
  }, []);
  if (!state) {
    return (<p>Loading</p>)
  }else {
    return (
      <Layout>
      <div>
        <h1 className='text-left text-white font-bold text-xl ml-2 my-2'>Customer Web Orders</h1>
        
      </div>
      </Layout>
    )
  }
}