import React , {useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate , useParams } from 'react-router-dom';

const StudentHistory = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        }
        
        fetchHistory();
        
    },[]);

    const fetchHistory = async () => {
        setLoading(true);
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/student-history/${studentId}/`);
            setStudent(response.data.student);
            setIssues(response.data.issues);
        }
        catch(err){
            console.error(err);
            toast.error("Failed to load students history.");
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <div className='py-5' style={{background:"linear-gradient(135deg, #f8f9fa, #e9ecef)"}}>
        <div className='container justify-flex-auto '>
            <div className='row mb-4'>
                <div className='col-md-8 mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-auto'>
                            <i className="bi bi-layer-group text-primary"></i>Book Issued History.</h4>
                            <p className='text-muted small'>
                                {student ? `History of ${student.full_name}(ID: ${student.student_id})` : 'Loading student details...'}
                            </p>
                    </div>
                    <button className='btn btn-outline-primary btn-sm mb-3'
                    onClick={()=>navigate("/admin/manage_students")}>
                        Students
                    </button>
                </div>
            </div>

            <div className='card border-0 shadow-sm rounded-4'>
                                <div className='card-body p-4'>
                                    
                                    {loading ? (
                                        <div className='text-center py-4'>
                                            <div className='spinner-border text-primary'>
                                            </div>
                                        </div>
                                    ):issues.length === 0 ? (
                                        <p className='text-muted small'>No issued books found for this student.</p>

                                    ):(

                                        (
                                        <div className='table-responsive'>
                                            <table className='table'>
                                                <thead className='small text-muted'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Student Id</th>
                                                    <th>Student Name</th>
                                                    <th>Issued Book</th>
                                                    <th>Issued Date </th>
                                                    <th>Returned Date</th>
                                                    <th>Fine(₹)</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {issues.map((issue,index) =>(
                                                <tr key = {issue.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{issue.student_id}</td>
                                                    <td>{student.full_name}</td>
                                                    <td>{issue.book_title}</td>
                                                    <td>{issue.issued_at}</td>
                                                    <td>{issue.is_returned ?
                                                     (
                                                        new Date(issue.returned_at).toLocaleDateString()
                                                    ) :
                                                    (
                                                    "Not returned yet"

                                                    )
                                                    }</td>
                                                    <td>₹{issue.fine_amount || 0}</td>
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

export default StudentHistory