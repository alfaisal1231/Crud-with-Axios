import React from 'react'

const Employee = React.lazy(() => import('./views/dashboard/Employee'))
const EmployeeAdd = React.lazy(() => import('./views/dashboard/EmployeeAdd'))
const EmployeeUpdate = React.lazy(() => import('./views/dashboard/EmployeeUpdate'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Employee', name: 'Employee', element: Employee },
  { path: '/Employee/add', name: 'Add', element: EmployeeAdd },
  { path: '/Employee/update/:id', name: 'Update', element: EmployeeUpdate },
]

export default routes
