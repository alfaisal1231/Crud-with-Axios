import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CContainer, CForm, CFormInput, CAlert, CButton } from '@coreui/react'
import { useParams, useLocation } from 'react-router-dom'
import Axios from 'axios'

const UpdateEmployee = () => {
  const [pageName, setPageName] = useState('')
  const { id } = useParams()
  const [nik, setNik] = useState('')
  const [fullname, setName] = useState('')
  const [join_date, setJoinDate] = useState('')
  const [salary, setSalary] = useState('')
  const [showAlertPositive, setShowAlertPositive] = useState(false)
  const [showAlertNegative, setShowAlertNegative] = useState(false)
  const [readStatus, setReadStatus] = useState(false)
  const [validated, setValidated] = useState(false)

  const data = {
    nik: nik,
    fullname: fullname,
    join_date: join_date,
    salary: salary,
  }

  const currentLocation = useLocation().pathname

  //handle validation
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      if (readStatus) {
        console.log('update')
        Update()
      } else {
        SaveEmployee()
      }
    }
    setValidated(true)
  }

  //get data employee for update
  useEffect(() => {
    {
        setReadStatus(true)
        setNik(id)
        Axios.get(`https://63929998b750c8d178e16014.mockapi.io/api/employee/${id}`)
          .then((res) => {
            console.log('Getting from ::::', res.data)
            setName(res.data.fullname)
            setJoinDate(res.data.join_date)
            setSalary(res.data.salary)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }, [])

  function Update() {
    Axios.put(`https://63929998b750c8d178e16014.mockapi.io/api/employee/${id}`, data)
      .then((res) => {
        console.log(res.status)
        setShowAlertPositive(true)
        setTimeout(() => {
          setShowAlertPositive(false)
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
        setShowAlertNegative(true)
        setTimeout(() => {
          setShowAlertNegative(false)
        }, 3000)
      })
  }

  //alert
  const showAlert = () => {
    if (showAlertPositive === true) {
      return (
        <CAlert className="cAlertFont cFont cAlertSuccess" visible={true}>
          Success!
        </CAlert>
      )
    } else if (showAlertPositive === false) {
      return (
        <CAlert className="cAlertFont cFont cAlertSuccess" visible={false}>
          Success!
        </CAlert>
      )
    } else if (showAlertNegative === true) {
      return (
        <CAlert className="cAlertFont cFont cAlertFailed" visible={true}>
          Failed!
        </CAlert>
      )
    } else if (showAlertNegative === false) {
      return (
        <CAlert className="cAlertFont cFont cAlertFailed" visible={false}>
          Failed!
        </CAlert>
      )
    }
  }

  return (
    <CCard className="mb-4 cFont cCardAdd">
      <CCard className="cCardHeaderCustom flex">
        <CCardBody>
          <CContainer style={{ float: 'left' }}>
            <div className="cCardTitle" style={{ float: 'left' }}>
              <b>{pageName}</b> Employee
            </div>
          </CContainer>
        </CCardBody>
      </CCard>
      <CCardBody>
        <CContainer style={{ float: 'left' }}>{showAlert()}</CContainer>
        <CContainer style={{ float: 'left' }}>
          <CForm validated={validated} onSubmit={handleSubmit}>
            <CFormInput
              className="cForm cFont"
              type="text"
              id="nik"
              name="nik"
              value={nik}
              minLength={16}
              maxLength={16}
              placeholder="NIK"
              feedbackInvalid="NIK is required!"
              onChange={(e) => setNik(e.target.value)}
              style={
                readStatus
                  ? { backgroundColor: '#CBD0D6', color: '#000000', width: '100%' }
                  : { width: '100%' }
              }
              readOnly={readStatus}
              required
            />
            <CFormInput
              className="cForm cFont"
              type="text"
              placeholder="Fullname"
              id="fullname"
              name="fullname"
              maxLength={50}
              style={{ width: '100%' }}
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <CFormInput
              className="cForm cFont"
              type="date"
              placeholder="Join Date"
              id="joinDate"
              name="joinDate"
              max={new Date().toISOString().split('T')[0]}
              style={{ width: '100%' }}
              value={join_date}
              onChange={(e) => setJoinDate(e.target.value)}
              required
            />
            <CFormInput
              className="cForm cFont"
              type="number"
              placeholder="Salary"
              id="salary"
              name="salary"
              min={3000000}
              max={30000000}
              style={{ width: '100%' }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <CContainer style={{ textAlign: 'right' }}>
              <CButton
                className="btn cBtn text-white"
                color="secondary"
                style={{
                  marginRight: '12px',
                }}
                href="#/employee"
              >
                CANCEL
              </CButton>
              <CButton className="btn cBtn" color="dark" type="submit">
                SAVE
              </CButton>
            </CContainer>
          </CForm>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}

export default UpdateEmployee
