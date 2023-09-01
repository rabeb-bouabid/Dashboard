/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, FormControl, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import AdminService from '../../services/Admin.service';
import {  AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'


const ListUser = () => {
  const [user,setUser]=useState()
  const getAllUser=()=>{
    AdminService.getAlluser().then((res)=>{
      console.log(res)
      setUser(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllUser()
  },[])
  const deleteUser=(id)=>{
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
        AdminService.deleteUser(id).then((res)=>{
          getAllUser();
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
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = user?.filter((el) => {
    if (inputText === '') {
        return el;
    } else {
        return el.username.toLowerCase().includes(inputText)
    }
})
  


    return ( 
     
<div>

<div className="container-scroller">
  <div class="card">
    <div class="card-body">
      <br/> <br/>
      <h2 className="text-center mb-4"  style={{color:"blue",fontFamily:"times new roman"}}><strong>Liste Utlisateurs</strong></h2>
      <Box rounded="lg" boxShadow="base" p="4">
        <Box mt="2" gap={'2'} mb="4" display={'flex'}>
          <FormControl>
            <Input type="text" onChange={inputHandler} placeholder='UserName'/>
          </FormControl>
          <Button leftIcon={<AiOutlineSearch />} colorScheme="teal" variant="outline" maxW="300px" minW="150px" style={{color:"blue"}} >Search</Button>
        </Box>
      </Box>
      <table class="table table-hover">
        <thead>
          <tr>
            <th style={{color:"#4e73df"}}><strong>Identifiant</strong></th>
            <th style={{color:"#4e73df"}}><strong>Profile</strong></th>
            <th style={{color:"#4e73df"}}><strong>UserName</strong></th>
            <th style={{color:"#4e73df"}}><strong>Nom</strong></th>
            <th style={{color:"#4e73df"}}><strong>Prenom</strong></th>
            <th style={{color:"#4e73df"}}><strong>Email</strong></th>
            <th style={{color:"#4e73df"}}><strong>Adresse</strong></th>
            <th style={{color:"#4e73df"}} width={50}><strong>Actions</strong></th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => {
            return (
              <tr id="trow_1">
                <td className="text-center"><strong>{index+1}</strong></td>
                <td className="text-center"><img style={{width:'50px',borderRadius: "8px"}} src={"http://localhost:3000/file/imagesUser/" + item.file} /></td>
                <td><span className="label label-success"><strong>{item.username}</strong></span></td>
                <td><strong>{item.nom}</strong></td>
                <td><span className="label label-success"><strong>{item.prenom}</strong></span></td>
                <td><span className="label label-success"><strong>{item.email}</strong></span></td>
                <td><span className="label label-success"><strong>{item.adresse}</strong></span></td>
                <td className="text-center">
                  <Box display="flex" gap="1" justifyContent="center">

                    <Button colorScheme={'red'} onClick={(e) => deleteUser(item._id)}>
                      <AiFillDelete />
                    </Button>
                  </Box>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

</div>



    )
}
export default ListUser