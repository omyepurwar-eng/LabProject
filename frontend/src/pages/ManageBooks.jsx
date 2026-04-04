import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

  .mb-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a3a8f 0%, #1e56c0 40%, #3b82e8 75%, #72aaf5 100%);
    font-family: 'Nunito', sans-serif;
    padding: 32px 16px;
    position: relative;
    overflow-x: hidden;
  }

  .mb-page::before {
    content: '';
    position: fixed;
    top: -120px; left: -120px;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .mb-page::after {
    content: '';
    position: fixed;
    bottom: -100px; right: -80px;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* ── Header ── */
  .mb-header {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 20px;
    padding: 22px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }

  .mb-header-title {
    color: #fff;
    font-size: 1.4rem;
    font-weight: 800;
    margin: 0 0 2px 0;
    letter-spacing: -0.3px;
  }

  .mb-header-sub {
    color: rgba(255,255,255,0.75);
    font-size: 0.82rem;
    margin: 0;
    font-weight: 500;
  }

  .mb-btn-add {
    background: #fff;
    color: #1a3a8f;
    border: none;
    border-radius: 12px;
    padding: 10px 22px;
    font-weight: 700;
    font-size: 0.88rem;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }

  .mb-btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }

  /* ── Glass Cards ── */
  .mb-glass {
    background: rgba(255,255,255,0.13);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.13);
    overflow: hidden;
  }

  .mb-card-body {
    padding: 28px;
  }

  .mb-section-title {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.2px;
  }

  .mb-section-title i {
    background: rgba(255,255,255,0.2);
    padding: 6px 8px;
    border-radius: 8px;
    font-size: 0.8rem;
  }

  /* ── Form Controls ── */
  .mb-label {
    display: block;
    color: rgba(255,255,255,0.85);
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .mb-input, .mb-select {
    width: 100%;
    background: rgba(255,255,255,0.88);
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 0.88rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    color: #1a2a5e;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .mb-input:focus, .mb-select:focus {
    background: rgba(255,255,255,0.98);
    border-color: rgba(255,255,255,0.9);
    box-shadow: 0 0 0 3px rgba(255,255,255,0.2);
  }

  .mb-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .mb-form-group {
    margin-bottom: 14px;
  }

  /* ── Image Preview ── */
  .mb-img-preview {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 10px;
    text-align: center;
    background: rgba(255,255,255,0.1);
    padding: 10px;
    border: 1px dashed rgba(255,255,255,0.35);
  }

  .mb-img-preview img {
    max-height: 130px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  }

  /* ── Buttons ── */
  .mb-btn-primary {
    background: linear-gradient(135deg, #fff 0%, #ddeeff 100%);
    color: #1a3a8f;
    border: none;
    border-radius: 12px;
    padding: 11px 0;
    font-weight: 800;
    font-size: 0.88rem;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
  }

  .mb-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.2);
  }

  .mb-btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .mb-btn-ghost {
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.9);
    border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    padding: 11px 0;
    font-weight: 700;
    font-size: 0.88rem;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    width: 100%;
    transition: background 0.15s, border-color 0.15s;
  }

  .mb-btn-ghost:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.5);
  }

  .mb-btn-row {
    display: flex;
    gap: 12px;
    margin-top: 18px;
  }

  /* ── Empty State ── */
  .mb-empty {
    color: rgba(255,255,255,0.65);
    font-size: 0.88rem;
    text-align: center;
    padding: 24px 0;
  }

  .mb-no-edit {
    color: rgba(255,255,255,0.6);
    font-size: 0.85rem;
    text-align: center;
    padding: 32px 16px;
    line-height: 1.7;
  }

  .mb-no-edit i {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  /* ── Table ── */
  .mb-table-wrap {
    overflow-x: auto;
  }

  .mb-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.84rem;
  }

  .mb-table thead tr th {
    color: rgba(255,255,255,0.7);
    font-weight: 700;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    white-space: nowrap;
    background: rgba(255,255,255,0.06);
  }

  .mb-table tbody tr {
    transition: background 0.15s;
  }

  .mb-table tbody tr:hover {
    background: rgba(255,255,255,0.08);
  }

  .mb-table tbody tr td {
    padding: 13px 14px;
    color: rgba(255,255,255,0.88);
    font-weight: 500;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    vertical-align: middle;
  }

  .mb-table tbody tr:last-child td {
    border-bottom: none;
  }

  .mb-book-title {
    font-weight: 700;
    color: #fff;
    font-size: 0.86rem;
    line-height: 1.3;
  }

  .mb-book-img {
    height: 60px;
    width: 46px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.25);
    flex-shrink: 0;
  }

  .mb-badge-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.15);
    color: #fff;
    border-radius: 8px;
    width: 26px;
    height: 26px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  /* ── Action Buttons ── */
  .mb-act-edit {
    background: rgba(255,255,255,0.18);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 8px;
    padding: 6px 13px;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition: background 0.15s, transform 0.12s;
    margin-right: 6px;
  }

  .mb-act-edit:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
  }

  .mb-act-delete {
    background: rgba(255,80,80,0.25);
    color: #ffaaaa;
    border: 1px solid rgba(255,100,100,0.35);
    border-radius: 8px;
    padding: 6px 13px;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    transition: background 0.15s, transform 0.12s;
  }

  .mb-act-delete:hover {
    background: rgba(255,80,80,0.4);
    transform: translateY(-1px);
  }

  /* ── Spinner ── */
  .mb-spinner-wrap {
    text-align: center;
    padding: 40px 0;
  }

  .mb-spinner {
    width: 36px; height: 36px;
    border: 3px solid rgba(255,255,255,0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: mbSpin 0.7s linear infinite;
    display: inline-block;
  }

  @keyframes mbSpin {
    to { transform: rotate(360deg); }
  }

  /* ── Layout ── */
  .mb-grid {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .mb-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editAuthor, setEditAuthor] = useState('');

    const [editPrice, setEditPrice] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    const [editImageFile, setEditImageFile] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const [loadingList, setLoadingList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
        } else {
            fetchAll();
        }
    }, []);

    const fetchAll = async () => {
        setLoadingList(true);
        try {
            const [booksResp, categoriesResp, authorsResp] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/books/'),
                axios.get('http://127.0.0.1:8000/api/categories/'),
                axios.get('http://127.0.0.1:8000/api/authors/')
            ]);
            setBooks(booksResp.data);
            setCategories(categoriesResp.data);
            setAuthors(authorsResp.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load data.");
        } finally {
            setLoadingList(false);
        }
    };

    const startEdit = (book) => {
        setEditId(book.id);
        setEditTitle(book.title);
        setEditCategory(book.category);
        setEditAuthor(book.author);
        setEditPrice(book.price);
        setEditQuantity(book.quantity);
        setEditImagePreview(`http://127.0.0.1:8000${book.cover_image}`);
        setEditImageFile(null);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditTitle("");
        setEditCategory("");
        setEditAuthor("");
        setEditPrice("");
        setEditQuantity("");
        setEditImagePreview(null);
        setEditImageFile(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImageFile(file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('category', editCategory);
            formData.append('author', editAuthor);
            formData.append('price', editPrice);
            formData.append('quantity', editQuantity);
            if (editImageFile) {
                formData.append('cover_image', editImageFile);
            }
            const response = await axios.put(`http://127.0.0.1:8000/api/update_book/${editId}/`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (response.data.success) {
                toast.success(response.data.message || 'Book Updated.');
                cancelEdit();
                fetchAll();
            } else {
                toast.error(response.data.message || 'Failed to update book.');
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update book.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");
        if (!ok) return;
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete_book/${id}/`);
            if (response.data.success) {
                toast.success(response.data.message || "Book deleted successfully.");
                setBooks((prev) => prev.filter((book) => book.id !== id));
                if (editId === id) cancelEdit();
            } else {
                toast.error(response.data.message || "Failed to delete book.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error occurred while deleting.");
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="mb-page">
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                    {/* ── Header ── */}
                    <div className="mb-header">
                        <div>
                            <h4 className="mb-header-title">
                                <i className="fa-solid fa-layer-group" style={{ marginRight: 10, opacity: 0.85 }}></i>
                                Manage Books
                            </h4>
                            <p className="mb-header-sub">View, edit and manage your books inventory</p>
                        </div>
                        <button className="mb-btn-add" onClick={() => navigate("/admin/book/add")}>
                            <i className="fa-solid fa-plus"></i>
                            Add New Book
                        </button>
                    </div>

                    {/* ── Main Grid ── */}
                    <div className="mb-grid">

                        {/* ── Edit Panel ── */}
                        <div className="mb-glass">
                            <div className="mb-card-body">
                                <div className="mb-section-title">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    {editId ? "Edit Book" : "Select Book to Edit"}
                                </div>

                                {editId ? (
                                    <form onSubmit={handleUpdate}>

                                        <div className="mb-form-group">
                                            <label className="mb-label">Book Name</label>
                                            <input
                                                type="text"
                                                className="mb-input"
                                                required
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                placeholder="Enter book title"
                                            />
                                        </div>

                                        <div className="mb-form-group">
                                            <label className="mb-label">Category</label>
                                            <select
                                                className="mb-select"
                                                required
                                                value={editCategory}
                                                onChange={(e) => setEditCategory(e.target.value)}
                                            >
                                                <option value="">-- Select Category --</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-form-group">
                                            <label className="mb-label">Author</label>
                                            <select
                                                className="mb-select"
                                                required
                                                value={editAuthor}
                                                onChange={(e) => setEditAuthor(e.target.value)}
                                            >
                                                <option value="">Select Author</option>
                                                {authors.map((auth) => (
                                                    <option key={auth.id} value={auth.id}>{auth.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-form-row mb-form-group">
                                            <div>
                                                <label className="mb-label">Price</label>
                                                <input
                                                    type="number"
                                                    className="mb-input"
                                                    required
                                                    value={editPrice}
                                                    onChange={(e) => setEditPrice(e.target.value)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-label">Quantity</label>
                                                <input
                                                    type="number"
                                                    className="mb-input"
                                                    required
                                                    value={editQuantity}
                                                    onChange={(e) => setEditQuantity(e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-form-group">
                                            <label className="mb-label">Book Cover</label>
                                            {editImagePreview && (
                                                <div className="mb-img-preview">
                                                    <img src={editImagePreview} alt="Preview" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                className="mb-input"
                                                style={{ padding: '8px 14px', cursor: 'pointer' }}
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                        <div className="mb-btn-row">
                                            <button type="submit" className="mb-btn-primary" disabled={saving}>
                                                {saving ? (
                                                    <>
                                                        <span className="mb-spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></span>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                        Update
                                                    </>
                                                )}
                                            </button>
                                            <button type="button" className="mb-btn-ghost" onClick={cancelEdit}>
                                                Cancel
                                            </button>
                                        </div>

                                    </form>
                                ) : (
                                    <div className="mb-no-edit">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        Click <strong style={{ color: '#fff' }}>Edit</strong> on any book<br />to modify its details here.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Book List ── */}
                        <div className="mb-glass">
                            <div className="mb-card-body">
                                <div className="mb-section-title">
                                    <i className="fa-solid fa-book"></i>
                                    List of Books
                                    {!loadingList && books.length > 0 && (
                                        <span style={{
                                            marginLeft: 'auto',
                                            background: 'rgba(255,255,255,0.2)',
                                            borderRadius: 20,
                                            padding: '2px 12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            color: '#fff'
                                        }}>
                                            {books.length} Books
                                        </span>
                                    )}
                                </div>

                                {loadingList ? (
                                    <div className="mb-spinner-wrap">
                                        <div className="mb-spinner"></div>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12, fontSize: '0.85rem' }}>Loading books...</p>
                                    </div>
                                ) : books.length === 0 ? (
                                    <div className="mb-empty">
                                        <i className="fa-regular fa-folder-open" style={{ fontSize: '2rem', display: 'block', marginBottom: 10, opacity: 0.5 }}></i>
                                        No books found. Try adding a new book.
                                    </div>
                                ) : (
                                    <div className="mb-table-wrap">
                                        <table className="mb-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Book</th>
                                                    <th>Category</th>
                                                    <th>Author</th>
                                                    <th>ISBN</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {books.map((book, index) => (
                                                    <tr key={book.id}>
                                                        <td>
                                                            <span className="mb-badge-num">{index + 1}</span>
                                                        </td>
                                                        <td style={{ maxWidth: 220 }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                                <img
                                                                    src={`http://127.0.0.1:8000${book.cover_image}`}
                                                                    alt={book.title}
                                                                    className="mb-book-img"
                                                                />
                                                                <span className="mb-book-title">{book.title}</span>
                                                            </div>
                                                        </td>
                                                        <td>{book.category_name}</td>
                                                        <td>{book.author_name}</td>
                                                        <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', opacity: 0.75 }}>{book.isbn}</td>
                                                        <td style={{ fontWeight: 700, color: '#fff' }}>${book.price}</td>
                                                        <td>
                                                            <span style={{
                                                                background: book.quantity > 0 ? 'rgba(80,220,130,0.2)' : 'rgba(255,80,80,0.2)',
                                                                color: book.quantity > 0 ? '#7fffb8' : '#ffaaaa',
                                                                borderRadius: 8,
                                                                padding: '3px 10px',
                                                                fontSize: '0.78rem',
                                                                fontWeight: 700
                                                            }}>
                                                                {book.quantity}
                                                            </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                                            <button className="mb-act-edit" onClick={() => startEdit(book)}>
                                                                <i className="fa-solid fa-pen" style={{ marginRight: 5 }}></i>Edit
                                                            </button>
                                                            <button className="mb-act-delete" onClick={() => handleDelete(book.id)}>
                                                                <i className="fa-solid fa-trash" style={{ marginRight: 5 }}></i>Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageBooks;
