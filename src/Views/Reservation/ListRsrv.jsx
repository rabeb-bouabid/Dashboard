import React from 'react'


/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, FormControl, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {  AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import ReservationService from '../../services/Reservation.service'
//import Badge from 'react-bootstrap/Badge';




const ListRsrv = () => {
  const [reservation,setReservation]=useState()
  const getAllReservation=()=>{
    ReservationService.getAllReservation().then((res)=>{
      console.log(res)
      setReservation(res.data.data)
      setData(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllReservation('/Reservation')
  },[])
  
  const deleteReservation=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        ReservationService.deleteReservation(id).then((res)=>{
            getAllReservation();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  /* const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = reservation?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.TypeEtablissement.toLowerCase().includes(inputText)
    }
})
   */
const [data,setData]=useState()

const [inputText, setInputText] = useState("");
const inputHandler = async (e, text) => {
  const { name, value } = e.target

  filter(value)
};
const filteredData = reservation?.filter((el) => {
  if (inputText === '') {
      return el;
  } else {
      if(el.username.toLowerCase().includes(inputText)){
        setReservation(el)
      }
    
  }
})
const filter = (param) => {
  if (!param) {
    setData(reservation);
  } else {
    const array = reservation.filter(({ username }) => {
      if (username && username.toLowerCase().includes(param.toLowerCase())) {
        return true;
      }
      return false;
    });

    if (array.length > 0) {
      setData(array);
    } else {
      setData([]);
      console.log("not found");
    }
  }
};

const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  //pagination
const totalPages = Math.ceil(reservation?.length / rowsPerPage);
const handleClickNext = () => {
  setCurrentPage(currentPage + 1);
};

const handleClickPrev = () => {
  setCurrentPage(currentPage - 1);
};

const startIndex = currentPage * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const currentPageData = data?.slice(startIndex, endIndex);

    return ( 
     
<div>
<div class="card">
 <div class="card-body">
   
 <br/> <br/>
 <h2 className="text-center mb-4" style={{color:"blue",fontFamily:"times new roman"}}  ><strong>Liste Réservation</strong></h2>
<Box rounded="lg" boxShadow="base" p="4">
  <Box mt="2" gap={'2'} mb="4" display={'flex'}>
  <FormControl>
   <Input type="text" name='search' onChange={(text) => {inputHandler(text)}} placeholder='UserName'/>
    </FormControl>
    <Button leftIcon={<AiOutlineSearch />}colorScheme="teal"variant="outline" maxW="300px" minW="150px" style={{color:"blue"}}>Search</Button>
</Box>
</Box>

 <table class="table table-hover">
                       <thead>
                        <tr>
                          <th style={{color:"blue"}}>Id<strong></strong></th>
                          <th style={{color:"blue"}}> <strong>UserName</strong></th>
                          <th style={{color:"blue"}}> <strong>Prestataire Name</strong></th>
                          <th style={{color:"blue"}}><strong>Image Prestataire</strong></th>
                          <th style={{color:"blue"}}><strong>Date Réservation</strong></th>
                          <th style={{color:"blue"}}><strong>Heure</strong></th>
                          <th style={{color:"blue"}}><strong>Adresse</strong></th>
                         
                          <th style={{color:"blue"}} width={50}><strong>action</strong></th>
                        </tr>
                      </thead>
                      <tbody>

                      {currentPageData?.map((item,index)=>{
                    return(
                        <tr id="trow_1">
                <td className="text-center"><b>{index+1}</b></td>
                <td><span className="label label-success"><b>{item.userId.username}</b></span></td>
                <td><span className="label label-success"><b>{item.PrestataireId.fullname}</b></span></td>
                <td className="text-center">
  <img
    style={{ width: '90px', textAlign: 'center',marginLeft:"95px" }}
    src={"http://localhost:3000/file/imagesprestataire/" + item.PrestataireId.file}
    alt="Service"
  />
</td>

                <td><span className="label label-success"><b>{new Date(item.datedebut).toLocaleDateString()}</b></span></td>
                <td><span className="label label-success"><b>{item.heure}</b></span></td>
                <td><span className="label label-success"><b>{item.adresse}</b></span></td>
               
                
                
                <td>
      
        <Box display="flex" gap="1">
          <Button colorScheme={'red'} onClick={(e)=>deleteReservation(item._id)}>
             <AiFillDelete />
          </Button>
        </Box>
      </td>
              </tr>
              
                    )
                })}
                      </tbody>
                    </table>
                    <div className="row justify-content-center pagination-container">
        <div className="col-md-8">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handleClickPrev}>
                  Prev
                </button>
              </li>
              {totalPages > 0 &&
                Array.from(Array(totalPages).keys()).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
              <li
                className={`page-item ${
                  currentPage === totalPages - 1 ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={handleClickNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
                  </div>
                </div>
                    
</div>



    )
}


export default ListRsrv
