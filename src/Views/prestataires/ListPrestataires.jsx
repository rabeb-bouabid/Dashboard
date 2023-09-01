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
import AdminService from '../../services/Admin.service';
import {  AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import Footer from '../../components/Footer';
import PrestatairesService from '../../services/Prestataires.service';

const ListPrestataires= () => {
  const [prestataire,setPrestataire]=useState()
  const [data,setData]=useState()
  const getAllPrestataires=()=>{
    PrestatairesService.getAllPrestataires().then((res)=>{
      console.log(res)
      setPrestataire(res.data.data)
      setData(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllPrestataires()
  },[])
  const deletePrestaire=(id)=>{
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
        PrestatairesService.deletePrestaire(id).then((res)=>{
            getAllPrestataires();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }
  const [inputText, setInputText] = useState("");
 
  const inputHandler = async (e, text) => {
    const { name, value } = e.target

    filter(value)
  };
  const filteredData = prestataire?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        if(el.Fullname.toLowerCase().includes(inputText)){
          setPrestataire(el)
        }
       
    }
})
const filter = (param) => {
  if (!param) {
    setData(prestataire)
  } else {
    const array = prestataire.filter(({ fullname }) => fullname.indexOf(param) > -1)
    if (array.length > 0) {
      setData(array)
      return array
    } else {
      console.log("not found")
    }

  }
}
  
const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  //pagination
const totalPages = Math.ceil(prestataire?.length / rowsPerPage);
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

<div className="container-scroller">
  <div class="card">
    <div class="card-body">
      <br/> <br/>
      <h2 className="text-center mb-4" font-family="Arial" style={{color:"blue",fontFamily:"times new roman"}}><strong>Liste Prestataires</strong></h2>
      <Box rounded="lg" boxShadow="base" p="4">
        <Box mt="2" gap={'2'} mb="4" display={'flex'}>

          <FormControl>
            <Input type="text" name='search' onChange={(text) => {inputHandler(text)}} placeholder='FullName'/>
          </FormControl>
          <Button leftIcon={<AiOutlineSearch />} colorScheme="teal" variant="outline" maxW="300px" minW="150px" style={{color:"blue"}}>Search</Button>
        </Box>
      </Box>
      <table class="table table-hover">
        <thead>
          <tr>
            <th style={{color:"#4e73df"}}><strong>Identifiant</strong></th>
            <th style={{color:"#4e73df"}}><strong>Image</strong></th>
            <th style={{color:"#4e73df"}}><strong>Fullname</strong></th>
            <th style={{color:"#4e73df"}}><strong>Adresse</strong></th>
            <th style={{color:"#4e73df"}}><strong>Certification</strong></th>
            <th style={{color:"#4e73df"}}><strong>Experience</strong></th>
            <th style={{color:"#4e73df"}}><strong>Adresse</strong></th>
            <th style={{color:"#4e73df"}}><strong>Telephone</strong></th>
            <th style={{color:"#4e73df"}}><strong>service Name</strong></th>
            <th style={{color:"#4e73df"}}><strong>Actions</strong></th>
          </tr>
        </thead>
        <tbody>
        {currentPageData?.map((item, index) => {
            return (
              <tr id="trow_1">
                <td className="text-center" ><strong>{index+1}</strong></td>
                <td className="text-center" style={{ display: "flex", justifyContent: "center" }}> <img style={{width:'50px'}} src={"http://localhost:3000/file/imagesPrestataire/" + item.file} /></td>
                <td><strong>{item.fullname}</strong></td>
                <td><strong>{item.adresse}</strong></td>
                <td><strong>{item.certification}</strong></td>
                <td><strong>{item.experience}</strong></td>
                <td><strong>{item.adresse}</strong></td>
                <td><strong>{item.telephone}</strong></td>
                <td><strong>{item.servicename}</strong></td>
                <td className="text-center">
                  <Box display="flex" gap="1" >
                    <Link to={`/home/EditPresta/${item._id}`}>
                      <Button colorScheme={'blue'}><AiFillEdit/></Button>
                    </Link>
                    <Button colorScheme={'red'} onClick={(e) => deletePrestaire(item._id)}>
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

</div>



    )
}
export default ListPrestataires