import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from '@chakra-ui/react'
import ReservationService from '../../services/Reservation.service'

const EditResrv=()=>{
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
          ReservationService.updateReservation(id,data).then((res)=>{
            console.log(res)
            navigate('/home/ListRsrv')
          }).catch((err)=>{
            console.log(err)
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
     }
     useEffect(()=>{
      ReservationService.getReservation(id).then((res)=>{
        console.log("dataofcat",res)
        setData(res.data.data)
      })
     },[])
  
  return(
  
     <div>
  

  <div>
       <div className="col-12 grid-margin">
  <div className="card">
    <div className="card-body">
    <h2 className="text-center mb-4" style={{color:"blue"}}><b>Edit Reservation</b></h2>
      <form className="form-sample" onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" style={{color:"blue"}} ><b>Date Début</b></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="Datedébut" name="Datedébut"  value={data.Datedébut}  onChange={onChangeHandler} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
         
        </div>
        <div className="row">
          <div className="col-md-6">
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" style={{color:"blue"}}><b>Date fin	</b></label>
              <div className="col-sm-9">
             <input type="text" className="form-control" placeholder="Datefin	"    value={data.Datefin}  name="Datefin" onChange={onChangeHandler}/><br/>
              </div>
              <label className="col-sm-3 col-form-label" style={{color:"blue"}}><b>Type Etablissement</b></label>
              <div className="col-sm-9">
             <input type="text" className="form-control" placeholder="TypeEtablissement"  value={data.TypeEtablissement}  name="TypeEtablissement" onChange={onChangeHandler}/><br/>
              </div>
              <label className="col-sm-3 col-form-label" style={{color:"blue"}}><b>Type Service	</b></label>
              <div className="col-sm-9">
             <input type="text" className="form-control" placeholder="Type Service"    value={data.TypeService}  name="TypeService" onChange={onChangeHandler}/><br/>
              </div>
              <label className="col-sm-3 col-form-label" style={{color:"blue"}}><b>Montant Total</b></label>
              <div className="col-sm-9">
             <input type="text" className="form-control" placeholder="Montant Total"    value={data.MontantTotal}  name="MontantTotal" onChange={onChangeHandler}/><br/>
              </div>
           
            </div>
          </div>
          <div className="col-md-6">
          </div>
        </div>
        <Button type="submit" colorScheme='blue' size='md' style={{borderRadius: "2.35rem"}} style1={{width:" 400px"}}><b>Save</b></Button>
      </form>
    </div>
  </div>
</div>
    </div>


    </div>
  )
}

export default EditResrv
