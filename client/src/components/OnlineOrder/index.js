import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  height: "55vh",
  width: "100%",
};

let center = {};

const navigation = [
  { name: 'Online Ordering', href: '#/orderOnline/PlaceOrder' },
  { name: 'View Documents', href: '#/orderOnline/viewDocuments' },
  // { name: 'Todays ETA', href: '#/orderOnline/TodayETA' },
  { name: 'Ordering Schedules', href: '#/orderOnline/OrderingSchedules' },
]
export default function Example() {

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [OrderItem, setOrderItem] = useState([]);
  const [Delivery, setDelivery] = useState([]);

  const [lat, setlat] = useState(0);
  const [lon, setlon] = useState(0);

  const [DeliveryAddr, setDeliveryAddr] = useState('');
  const [cordinates, setcordinates] = useState({});

  useEffect(() => {
    center = {
      lat: -34.8621,
      lng: 138.5405
    };
    setcordinates({ lat: -34.94916, lng: 138.64265 })
    axios
          .get(`${URL}/Users/User/TodayOrder/${localStorage.getItem('!@#!@#asdacas!@#')}`)
          .then((res) => {
            if (res.data[0].ORDERNUMBER) {
                axios
                .get(`${URL}/onlineOrdering/ordering/ETA/${res.data[0].ORDERNUMBER}`)
                .then((res) => {
                  setOrderItem(res.data)
                }
                ).catch((err) => (document.body.innerHTML = err));
                axios
                .get(`${URL}/Users/User/FourJourney/${res.data[0].ORDERNUMBER}`)
                .then((res) => {
                  console.log(res.data)
                  setlat(res.data[0].driver_position[0])
                  setlon(res.data[0].driver_position[1])
                  setDeliveryAddr(res.data[0].delivery_address)
                }
                ).catch((err) => (document.body.innerHTML = err));
            }
          }
          ).catch((err) => (document.body.innerHTML = err));
  }, []);
  if (!Delivery ) {
    return (
      <p>Loading</p>
    ) 
  }else {
    return (
      <div className="bg-white h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <div>
                <span className="sr-only">Your Company</span>
                <img
                  className="h-12 rounded-lg"
                  src={require('../../logo (1).jpg')}
                  alt=""
                />
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden -mt-5 lg:flex lg:flex-1 lg:justify-end">
              {!localStorage.getItem('!@#!@#asdacas!@#') ? (<p>{localStorage.getItem('!@#!@#asdacas!@#')}</p>) : (<button onClick={() => { localStorage.clear(); window.location.reload() }} >Log out</button>)}
              <button></button>
            </div>
          </nav>
        </header>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl lg:mt-10">
            <div className="text-center">
              {/* <h1 className="text-4xl font-semibold tracking-tight font-sans text-gray-900 sm:text-6xl">
                Unifresh
              </h1> */}
              <div className="mt-10 flex items-center justify-between">
                <a
                  href="#/orderOnline/PlaceOrder"
                  className="rounded-md bg-indigo-600 px-6 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Order Online
                </a>
                <h1 className="text-lg font-bold leading-6 text-gray-900">
                  Welcome  {localStorage.getItem('!@#!@#asdacas!@#')}
                </h1>
              </div>
            </div>
          </div>
          <div className='mx-auto mt-5 w-3/4 rounded-md'>
          <h1 className='text-md font-semibold text-left mb-2' >Delivery Address: <span className=' text-blue-600' >{DeliveryAddr}</span></h1>
          <GoogleMap
          mapContainerStyle={containerStyle}
          center={cordinates}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
           {/* {coordinates.map(({ lat, lng, name }, index) => ( */}
            <Marker
              // key={index}
              position={{lat: lat, lng: lon}}
              lat={lat}
              lng={lon}
              // markerId={name
              // onClick={onMarkerClick} // you need to manage this prop on your Marker component!
              // draggable={true}
              // onDragStart={(e, { latLng }) => {}}
              // onDrag={(e, { latLng }) => {}}
              // onDragEnd={(e, { latLng }) => {}}
            />
          <></>
        </GoogleMap>
        </div>
        <div>
          {/* <p>Delivery Add: {Delivery[0].driver_position[0]}</p>
          <p>Delivery Add: {Delivery[0].delivery_position[1]}</p> */}
        </div>
        <table className="mx-auto divide-y bg-yellow-300 w-3/4 mt-2">
                  <thead className="">
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
                      <tr className='text-md' >
                        <td>{r.DESC}</td>
                        <td>{r.QTY}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
        </div>
      </div>
    )
  }
}
