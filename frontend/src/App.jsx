import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import AdminLogin from './pages/adminlogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCategory from './pages/AddCategory.jsx';
import ManageCategory from './pages/ManageCategory.jsx';
import AddAuthor from './pages/AddAuthor.jsx';
import ManageAuthors from './pages/ManageAuthors.jsx';
import AddBook from './pages/AddBooks.jsx';
import ManageBooks from './pages/ManageBooks.jsx';
import AdminChangePassword from './pages/AdminChangePassword.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import StudentBooks from './pages/StudentBooks.jsx'
import StudentProfile from './pages/StudentProfile.jsx'
import StudentChangePassword from './pages/StudentChangePassword.jsx'
import ManageStudent from './pages/ManageStudent.jsx'
import IssueBook from './pages/IssueBook.jsx'
import ManageIssuedBoooks from './pages/ManageIssuedBoooks.jsx'
import IssuedBookDetails from './pages/IssuedBookDetails.jsx'
import StudentHistory from './pages/StudentHistory.jsx'
import StudentIssuedBooks from './pages/StudentIssuedBooks.jsx'
import Home from './pages/Home.jsx'


function App() {

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <Routes>
        <Route path = "/admin/login" element={<AdminLogin />}></Route>
        <Route path = "/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path = "/admin/category/add" element={<AddCategory />}></Route>
        <Route path = "/admin/category/manage" element={<ManageCategory />}></Route>
        <Route path = "/admin/author/add" element={<AddAuthor />}></Route>
        <Route path = "/admin/author/manage" element={<ManageAuthors />}></Route>
        <Route path = "/admin/book/add" element={<AddBook />}></Route>
        <Route path = "/admin/book/manage" element={<ManageBooks />}></Route>
        <Route path = "/admin/change_password" element={<AdminChangePassword />}></Route>
        <Route path = "/user/signup" element={<UserSignup />}></Route>
        <Route path = "/user/login" element={<UserLogin />}></Route>
        <Route path = "/user/dashboard" element={<StudentDashboard/>}></Route>
        <Route path = "/user/books" element={<StudentBooks/>}></Route>
        <Route path = "/user/profile" element={<StudentProfile/>}></Route>
        <Route path = "/user/change_password" element={<StudentChangePassword/>}></Route>
        <Route path = "/admin/manage_students" element={<ManageStudent/>}></Route>
        <Route path = "/admin/issue-book" element={<IssueBook/>}></Route>
        <Route path = "/admin/manage-issued-books" element={<ManageIssuedBoooks/>}></Route>
        <Route path = "/admin/issued-books/:id" element={<IssuedBookDetails/>}></Route>
        <Route path = "/admin/students/:studentId/history" element={<StudentHistory/>}></Route>
        <Route path = "/user/issued-books" element={<StudentIssuedBooks/>}></Route>
        <Route path = "/" element={<Home />}></Route>
        
        



      </Routes>
    </>
  )
}

export default App
