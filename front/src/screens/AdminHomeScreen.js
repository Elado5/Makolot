import React from 'react'
import AdminSideBar from '../components/AdminSideBar';

const AdminHomeScreen = () => {
    return (
        <div>
            <div>
                <div> Nav admin </div>
                <div>
                    <div>Data section</div>

                    <div>Nav panel admin
                        <AdminSideBar></AdminSideBar>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default AdminHomeScreen;