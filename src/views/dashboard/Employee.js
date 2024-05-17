import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

function Employee() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ name: '' });
  const [selectedData, setSelectedData] = useState(null);
  const currentLocation = '#' + useLocation().pathname

  useEffect(() => {
    dataFetching();
  }, []);

  function dataFetching() {
    axios.get('https://63929998b750c8d178e16014.mockapi.io/api/employee')
      .then((response) => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }
  function deleteData(id) {
    axios.delete(`https://63929998b750c8d178e16014.mockapi.io/api/employee/${id}`)
      .then(() => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>
      <CCard >
        <CCardBody>
          <CRow>
            <CCol xs={10}>List Employee</CCol>
            <CCol xs={2}>
              <CButton color="secondary" href={currentLocation + '/add'}>Add</CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormInput type="input" placeholder="NIK" />
            </CCol>
            <CCol>
              <CFormInput type="input" placeholder="Fullname" />
            </CCol>
            <CCol>
              <CButton color="secondary">Search</CButton>
            </CCol>
          </CRow>
          <CTable striped hover>
            <CTableHead>
              <CTableHeaderCell scope="col" style={{ width: '18%' }}>NIK</CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ width: '18%' }}>Nama</CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ width: '18%' }}>Tanggal Join</CTableHeaderCell>
              <CTableHeaderCell scope="col" style={{ width: '18%' }}>Salary</CTableHeaderCell>
              <CTableHeaderCell scope="col" >Action</CTableHeaderCell>
            </CTableHead>
            <CTableBody>
              {data.map(item => (
                <CTableRow key={item.nik}>
                  <CTableDataCell >{item.id}</CTableDataCell>
                  <CTableDataCell >{item.name}</CTableDataCell>
                  <CTableDataCell >{item.join_date}</CTableDataCell>
                  <CTableDataCell >{item.salary}</CTableDataCell>
                  
                  <CTableDataCell style={{ textAlign: 'center' }}>
                  <CButton
                className="btn cBtn text-white"
                color="info"
                style={{ margin: '2px' }}
                href={currentLocation + '/update/' + item.id}
              >
                UPDATE
              </CButton>
                    <CButton
                      className="btn cBtn text-white"
                      color="danger"
                      style={{ margin: '2px' }}
                      onClick={() => {
                        deleteData(item.nik)
                      }}
                    >
                      DELETE
                    </CButton></CTableDataCell>
                </CTableRow>))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Employee
