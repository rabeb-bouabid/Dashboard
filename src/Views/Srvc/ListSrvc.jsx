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
import SrvcService from '../../services/Srvc.service';

const ListSrvc = () => {
  
  const getAllServices=()=>{
    SrvcService.getAllServices().then((res)=>{
      console.log(res)
      setService(res.data.data)
      setData(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllServices()
  },[])
  const deleteService=(id)=>{
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
        SrvcService.deleteService(id).then((res)=>{
            getAllServices();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }
 /*  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = service?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.ServiceName.toLowerCase().includes(inputText)
    }
}) */
const [inputText, setInputText] = useState("");
const [service,setService]=useState([])
  const inputHandler = async (e, text) => {
    const { name, value } = e.target

    filter(value)
  };
  const filteredData = service?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        if(el.ServiceName.toLowerCase().includes(inputText)){
          setService(el)
        }
        //return el.Fullname.toLowerCase().includes(inputText)
    }
})
const [data,setData]=useState()

const filter = (param) => {
  if (!param) {
    setData(service);
  } else {
    const array = service.filter((el) =>
      el.ServiceName.toLowerCase().includes(param.toLowerCase())
    );

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
const totalPages = Math.ceil(service?.length / rowsPerPage);
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
      <h2 className="text-center mb-4" font-family="Arial" style={{color:"blue",fontFamily:"times new roman"}}><strong>Liste Services</strong></h2>
      <Box rounded="lg" boxShadow="base" p="4">
        <Box mt="2" gap={'2'} mb="4" display={'flex'}>
          <FormControl>
            <Input type="text" name='search' onChange={(text) => {inputHandler(text)}} placeholder='ServiceName'/>
          </FormControl>
          <Button leftIcon={<AiOutlineSearch />} colorScheme="teal" variant="outline" maxW="300px" minW="150px" style={{color:"blue"}}>Search</Button>
        </Box>
      </Box>
      <table class="table table-hover">
        <thead>
          <tr>
            <th style={{color:"#4e73df"}}><strong>Identifiant</strong></th>
            <th style={{color:"#4e73df"}}><strong>Image</strong></th>
            <th style={{color:"#4e73df"}}><strong>ServiceName</strong></th>
            <th style={{color:"#4e73df"}}><strong>Description</strong></th>
            <th style={{color:"#4e73df"}}><strong>Price</strong></th>
            <th style={{color:"#4e73df"}}><strong>Actions</strong></th>
          </tr>
        </thead>
        <tbody>
        {currentPageData?.map((item, index) => {
            return (
              <tr id="trow_1">
                <td className="text-center"><strong>{index+1}</strong></td>
                <td className="text-center" style={{ display: "flex", justifyContent: "center" }}> <img style={{width:'50px'}} src={"http://localhost:3000/file/imagesService/" + item.file} /></td>
                <td><strong>{item.ServiceName}</strong></td>
                <td><span className="label label-success"><strong>{item.description}</strong></span></td>
                <td><span className="label label-success"><strong>{item.price}</strong></span></td>
                <td className="text-center">
                  <Box display="flex" gap="1" justifyContent="center">
                    <Link to={`/home/EditSrvc/${item._id}`}>
                      <Button colorScheme={'blue'}><AiFillEdit/></Button>
                    </Link>
                    <Button colorScheme={'red'} onClick={(e) => deleteService(item._id)}>
                      <AiFillDelete />
                    </Button>
                  </Box>
                </td>
              </tr>
            )
          })}
            <div className="row justify-content-center pagination-container">
          <div className="col-md-8">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handleClickPrev}>
                    Prev
                  </button>
                </li>
                {totalPages > 0 &&
                  Array.from(Array(totalPages).keys()).map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
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
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>



    )
}
export default ListSrvc