import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios'

const MapContainer = () => {

  const [OrderItem, setOrderItem] = useState([]);
  
  useEffect(() => {
    axios
          .get(`http://10.0.0.52:5000/onlineOrdering/ordering/ETA/UF1784518`)
          .then((res) => {
            setOrderItem(res.data)
          }
          ).catch((err) => (document.body.innerHTML = err));
  }, []);
  console.log(OrderItem)

  const mapStyles = {
    height: "40vh",
    width: "100%",
  };
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  
  return (
    <div>
      <img className='mx-auto rounded-md' alt='logo' src={require('../../Image/email_logo.jpg')} />
      <h1 className='text-center font-bold text-xl text-white mt-3' >Hungry Jack Aberfoyle Park</h1>
      <div className='mx-auto mt-5'>
      <LoadScript
        googleMapsApiKey='AIzaSyAIDsxUam-GUvAvvf4a5hWtP_Bh7HY2zNQ'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
            />
      </LoadScript>
      </div>
      
      <div className="flow-root">
        <div className="mx-auto">
          <div className="inline-block w-2/4 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Item
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      QTY
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {
                  OrderItem.map((r) => (
                    <tr>
                      <td>{r.DESC}</td>
                      <td>{r.QTY}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     </div>
  )
}

export default MapContainer;