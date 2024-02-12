import React from 'react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Online Ordering', href: '#/orderOnline/PlaceOrder' },
  { name: 'View Documents', href: '#/orderOnline/viewDocuments' },
  // { name: 'Todays ETA', href: '#/orderOnline/TodayETA' },
  { name: 'Ordering Schedules', href: '#/orderOnline/OrderingSchedules' },
]

export default function Navigation() {
  return (
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
          </div>\
        </nav>
      </header>
  )
}
