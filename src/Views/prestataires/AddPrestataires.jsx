import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PrestatairesService from "../../services/Prestataires.service";
import SrvcService from "../../services/Srvc.service";
import Select from 'react-select';
const AddPrestataires =() =>{
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleServiceChange = (event) => {
     const selectedId = event.target.value;
     setSelectedServiceId(selectedId);
   }
  const [service,setService]=useState([])
  const getAllServices=()=>{
    SrvcService.getAllServices().then((res)=>{
      console.log(res.data)
      setService(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllServices()
  },[])
    const navigate = useNavigate()
    const [data,setData]=useState({})
    const [Image,setImage]=useState({})
        const onChangeHandler=(e)=>{
          setData({
            ...data,
            [e.target.name]:e.target.value
          })
          console.log(data)
        }
        const formData = new FormData();
        const onSubmitHandler=(e)=>{
        e.preventDefault()
       ;
        formData.append('fullname', data.fullname);
        formData.append('adresse', data.adresse);
        formData.append('telephone', data.telephone);
        formData.append('experience', data.experience);
        formData.append('certification', data.certification);
        formData.append('detail', data.detail);
        formData.append('servicename', data.servicename);
        formData.append('serviceId',selectedServiceId);
     ;
        for (let i = 0; i <= Image.length; i++){
          formData.append('file',Image[i])
        }


        Swal.fire({
          title: 'Do you want to save a new Prestataire?',
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            PrestatairesService.createPrestataires(formData)
              .then((res) => {
                console.log(res);
                Swal.fire('Prestataire ajouté avec succès', '', 'success').then(() => {
                  navigate('/home/ListSrvc');
              });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
    
        }
        const onChangeHandlerImage=(e)=>{
          e.preventDefault()
          setImage(e.target.files)
        }
  
        
  return (    
    <div class="" style1={{display:"flex"}} style={{height:"900px"}}>
    <div className="container">
 {/* Outer Row */}
 <div className="row justify-content-center">
   <div className="col-xl-10 col-lg-12 col-md-9">
     <div className="card o-hidden border-0 shadow-lg my-5">
       <div className="card-body p-0">
         {/* Nested Row within Card Body */}
       <div className="row">
        
       <img  src='https://thumbs.dreamstime.com/b/constructeur-de-personnes-de-groupe-avec-des-outils-de-construction-35354113.jpg' className="col-lg-5 d-none d-lg-block bg-register-image" style={{backgroundSize:"440px",height:"572px",marginTop:"56px"}}/>
  <div className="col-lg-7">
    <div className="p-5">
      <div className="text-center" >
        <h1 className="h4 text-gray-900 mb-4"><b style={{color:'blue',fontFamily:"Teams New Roman",fontSize:"35px"}}>Add Prestataires</b></h1>
      </div>
      <form className="user" onSubmit={onSubmitHandler}>
      <div className="form-group">
          <input type="text" className="form-control form-control-user" name='fullname'  placeholder="Full Name" onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control form-control-user" name='servicename'  placeholder="servicename" onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control form-control-user" name='adresse'  placeholder="Adresse" onChange={onChangeHandler}/>
        </div>
        <select value={selectedServiceId} className="form-control " style={{borderRadius: "15.35rem",height: "50px",fontSize: "13px",fontWeight: "400"}} onChange={handleServiceChange}>
      <option value="">Select a service</option>
      {service.map(service => (
        <option key={service._id} value={service._id}>{service.ServiceName}</option>
      ))}
    </select>
<br />
        <div className="form-group">
          <input type="text" className="form-control form-control-user" name='detail'  placeholder="Detail" onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control form-control-user"  name='certification' placeholder="Certification " onChange={onChangeHandler} />
        </div>
        
        <div className="form-group row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <input type="text" className="form-control form-control-user" name='experience'  placeholder="Experience" onChange={onChangeHandler}/>
          </div>
          <div className="col-sm-6">
            <input type="Text" className="form-control form-control-user"  name='telephone' placeholder="Telephone" onChange={onChangeHandler}/><br/>
          </div>
        </div>
        <label className="label-cat"  style={{color:"blue"}}> Image : </label>
         <input className="input-cat" type="file" name="file"  onChange={onChangeHandlerImage} /><br/><br/>
         <div className="form-group">
                    <button type="submit" style={{backgroundColor:"rgb(0 80 204)",border: "none",color: "white",textAlign:"center",marginTop:"12px",
                    fontSize:"16px",padding:"9px 107px",transitionDuration:"0.4s",cursor: "pointer",borderRadius:"10px",marginLeft:"0px" }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                    <b style={{color:"white"}}>Register</b>
                  </button>
                    </div><br />
  <div className="custom-control custom-checkbox small">
                      <input type="checkbox" className="custom-control-input" id="customCheck" />
                   
                    </div>
     
        
      </form>
     
      
    </div>
  </div>
</div>
</div>
</div>
 </div>
            </div>
          </div>
        </div>
 )

}

export default AddPrestataires
