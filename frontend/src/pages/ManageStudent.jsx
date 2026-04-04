import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageStudent = () => {
    const [students, setStudents] = useState([]);

    const [loadingList, setLoadingList] = useState(false);
  
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        
        fetchStudents();
        
    },[]);

    const fetchStudents = async () => {
        setLoadingList(true);
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/admin/students/`);
            setStudents(response.data);  
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load students.");
        }
        finally{
            setLoadingList(false);
        }
    }

    const handleToggleStatus = async (student) =>{
        const isCurrentlyActive = student.is_active;
        const url = isCurrentlyActive ? 
            `${import.meta.env.VITE_API}/admin/block_student/${student.id}/`  : 
            `${import.meta.env.VITE_API}/admin/activate_student/${student.id}/`;
        const confirmMessage = isCurrentlyActive ?
            `Are you sure you want to block ${student.full_name}?` :
            `Are you sure you want to activate ${student.full_name}?`;
        
        if (!window.confirm(confirmMessage)){
            return;
        }
        try {
            await axios.post(url);
            fetchStudents();
        }catch(err){
            console.error(err);
            toast.error("Failed to updaate studnet status");
        }


    }


   
  return (
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)"}}>
        <div className='container justify-flex-auto '>
            <div className='row mb-4'>
                <div className='col-md-8 mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="bi bi-layer-group text-primary"></i>Manage Students</h4>
                            <p className='text-muted small'>View and manage studnets from here</p>
                    </div>
                    <button className='btn btn-outline-primary btn-sm mb-3'
                    onClick={()=>navigate("/admin/issued-book")}>
                        issued book
                    </button>
                </div>
            </div>
         

                            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    
                                    {loadingList ? (
                                        <div className='text-center py-4'>
                                            <div className='spinner-border text-primary'>
                                            </div>
                                        </div>
                                    ):students.length === 0 ? (
                                        <p className='text-muted small'>No registered students found.</p>

                                    ):(

                                        (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead className='small text-muted'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Student Id</th>
                                                    <th>Student Name</th>
                                                    <th>Email </th>
                                                    <th>Contact </th>
                                                    <th>Reg. Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {students.map((student,index) =>(
                                                <tr key = {student.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{student.student_id}</td>
                                                    <td>{student.full_name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.mobile}</td>
                                                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                                                    <td>{student.is_active ?
                                                     (
                                                        <span className="badge bg-success-subtle text-success">
                                                            Active</span>
                                                    ) :
                                                    (
                                                    <span className="badge bg-danger-subtle text-danger">Inactive</span>

                                                    )
                                                    }</td>
                                                    
                                                    <td className='text-center d-flex'>
                                                        <button className={student.is_active ? "btn btn-small btn-outline-danger me-2 ": "btn btn-small btn-outline-success me-2"}
                                                        onClick={()=>handleToggleStatus(student)}>
                                                        {student.is_active ? "Block": "Activate"}
                                                        </button>
                                                        <button className="btn btn-small btn-success me-2"
                                                        onClick={()=>navigate(`/admin/students/${student.student_id}/history`)}>
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                                ))} 

                                                </tbody>
                                            </table>

                                        </div>

                                    )

                                    )
                                    }

                                      
                                    
                                </div>
                            </div>

                        </div>

                    </div>
                    

                

           

        
  )
}

export default ManageStudent