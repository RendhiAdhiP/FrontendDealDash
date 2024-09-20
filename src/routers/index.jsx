// routes/index.jsx
import { Route, Routes } from 'react-router-dom';
import Login from '../views/Auth/Login/Index.jsx';
import Register from '../views/Auth/Register/Index.jsx';
import AdminDashboard from '../views/Admin/Dashboard/Index.jsx';
import ManajemenUser from '../views/Admin/Dashboard/ManajemenUser/Index.jsx';
import Detail from '../views/Admin/Dashboard/ManajemenUser/Detail.jsx';
import TambahUser from '../views/Admin/Dashboard/ManajemenUser/Tambah.jsx';
import EditUser from '../views/Admin/Dashboard/ManajemenUser/Edit.jsx';
import ManajemenKota from '../views/Admin/Dashboard/ManajemenKota/Index.jsx';
import EditKota from '../views/Admin/Dashboard/ManajemenKota/Edit.jsx';
import TambahKota from '../views/Admin/Dashboard/ManajemenKota/Tambah.jsx';
import ManajemenProduk from '../views/Admin/Dashboard/ManajemenProduk/Index.jsx';
import TambahProduk from '../views/Admin/Dashboard/ManajemenProduk/TambahProduk.jsx';
import HistoryProduks from '../views/Admin/Dashboard/ManajemenProduk/HistoryProduks.jsx';
import EditProduk from '../views/Admin/Dashboard/ManajemenProduk/EditProduk.jsx';
import TambahStok from '../views/Admin/Dashboard/ManajemenProduk/TambahStok.jsx';
import Role from '../views/Admin/Dashboard/Role/Index.jsx'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/admin/dashboard/' element={<AdminDashboard />}>
                <Route path='manajemen-user' element={<ManajemenUser />} />
                <Route path='manajemen-user/user/:id' element={<Detail />} />
                <Route path='manajemen-user/tambah-user' element={<TambahUser />} />
                <Route path='manajemen-user/user-edit/:id' element={<EditUser />} />

                <Route path='manajemen-kota' element={<ManajemenKota />} />
                <Route path='manajemen-kota/tambah-kota' element={<TambahKota />} />
                <Route path='manajemen-kota/kota-edit/:id' element={<EditKota />} />

                <Route path='manajemen-produk' element={<ManajemenProduk/>} />
                <Route path='manajemen-produk/tambah' element={<TambahProduk/>} />
                <Route path='manajemen-produk/edit/:id' element={<EditProduk/>} />
                <Route path='manajemen-produk/history' element={<HistoryProduks/>} />
                <Route path='manajemen-produk/tambah-stok' element={<TambahStok/>} />

                <Route path='role/' element={<Role/>} />

            </Route>

            <Route path='*' element='Not Found 404' />
        </Routes>
    );
};

export default AppRoutes;
