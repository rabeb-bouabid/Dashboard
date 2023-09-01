import { Box, Button, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../../components/Header'
import SrvcService from '../../services/Srvc.service'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const EditSrvc=()=>{
  const {id} =useParams()
    const navigate = useNavigate()
    const [data,setData]=useState({})
        const onChangeHandler=(e)=>{
          setData({
            ...data,
            [e.target.name]:e.target.value
          })
          console.log(data)
        }
     const onSubmitHandler=(e)=>{
      e.preventDefault()
      Swal.fire({
        title: 'Do you want to save updated data!',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          SrvcService.updateSrvc(id,data).then((res)=>{
            console.log(res)
            navigate('/home/ListSrvc')
          }).catch((err)=>{
            console.log(err)
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
     }
     useEffect(()=>{
      SrvcService.getSrvc(id).then((res)=>{
        console.log("dataofcat",res)
        setData(res.data.data)
      })
     },[])
  
  return(
  
     <div>


<div className="col-12">
  <div className="card">
    <div className="card-body">
      <h2 className="text-center mb-4" style={{color:"blue", fontWeight:"bold", fontFamily:"sans-serif"}}>
       Edit Services
      </h2>
      <form className="form-sample" onSubmit={onSubmitHandler}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{color:"blue", fontWeight:"bold", fontFamily:"sans-serif"}}>
              New Service
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="New Service"
              value={data.ServiceName}
              name="ServiceName"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{color:"blue", fontWeight:"bold", fontFamily:"sans-serif"}}>
              Price
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                name="price"
                value={data.price}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{color:"blue", fontWeight:"bold", fontFamily:"sans-serif"}}>
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Description"
            rows="3"
            name="description"
            value={data.description}
            onChange={onChangeHandler}
          />
        </div>
        <br/>
      <button type="submit" style={{ padding: "12px", width:"20%", borderRadius: "10px", background: "#336699", color: "#fff", border: "none", boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
          <b>Add</b>
        </button>
      </form>
    </div>
  </div>
</div>


  


    </div>
  )
}

export default EditSrvc
