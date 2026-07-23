import AdminSidebar from "../../pages/admin/AdminSidebar";
import Topbar from "../../pages/admin/Topbar";

function AdminLayout({ children }) {

  return (

    <div
      className="d-flex"
      style={{
        background: "#F3F4F6",
        minHeight: "100vh"
      }}
    >

      <AdminSidebar />

      <div
        className="flex-grow-1 p-4"
      >

        <Topbar />

        {children}

      </div>

    </div>

  );

}

export default AdminLayout;