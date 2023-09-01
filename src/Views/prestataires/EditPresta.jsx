import { Box, Button, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PrestatairesService from '../../services/Prestataires.service'

const EditPrsta=()=>{
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
          PrestatairesService.updatePrestataires(id,data).then((res)=>{
            console.log(res)
            navigate('/home/ListPresta')
          }).catch((err)=>{
            console.log(err)
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
     }
     useEffect(()=>{
      PrestatairesService.getPesta(id).then((res)=>{
        console.log("dataofcat",res)
        setData(res.data.data)
      })
     },[])
  
  return(
  
     <div>

<div style={{display: 'flex', justifyContent: 'center'}}>
  <div style={{maxWidth: 500, width: '100%', padding: 20, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: 10}}>
    <div style={{textAlign: 'center'}}>
      <b style={{color:'blue',fontFamily:"Teams New Roman",fontSize:"35px"}}>Edit Prestataires</b> <br/>
    </div>
    <form onSubmit={onSubmitHandler}>
      <div style={{marginBottom: 20}}>
       
       <input type="text" className="form-control form-control-user" style={{color: 'black', marginBottom: 10}} name='fullname' placeholder="Fullname" value={data.fullname} onChange={onChangeHandler}/> 
       <textarea className="form-control form-control-user" style={{color: 'black', marginBottom: 10,height:"120px"}} name='detail' placeholder="Detail" value={data.detail} rows="4" cols="50"onChange={onChangeHandler} />
        <input type="text" className="form-control form-control-user" style={{color: 'black', marginTop: 10}} name='certification' placeholder="Certification " value={data.certification} onChange={onChangeHandler} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        </div>  <br/>
        <input type="text" className="form-control form-control-user" style={{color: 'black', marginBottom: 10}} name='experience' placeholder="Experience" value={data.experience} onChange={onChangeHandler}/>
        <input type="text" className="form-control form-control-user" style={{color: 'black', marginBottom: 10}} name='telephone' placeholder="Telephone" value={data.telephone} onChange={onChangeHandler}/>
        <input type="text" className="form-control form-control-user" style={{color: 'black', marginBottom: 10}} name='servicename' placeholder="ServiceName" value={data.servicename} onChange={onChangeHandler}/>
        <input type="text" className="form-control form-control-user" style={{color: 'black', marginBottom: 10}} name='adresse' placeholder="Adresse" value={data.adresse} onChange={onChangeHandler}/>
        
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{flex: 1, marginRight: 10}}>
          <button className="btn btn-primary submit-btn btn-block" type="submit">Save</button>
        </div>
        <div style={{flex: 1, marginLeft: 10}}>
          <button className="btn btn-primary submit-btn btn-block" style={{backgroundColor: 'red'}} type="reset">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</div>




  


    </div>
  )
}

export default EditPrsta
