import { Link } from "react-router-dom";

import image from "../assets/images/LOGO_white.png";

function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/*<!-- Sidebar - Brand -->*/}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img className="w-100" src={image} alt="Digital House" />
        </div>
      </a>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider my-0" />

      {/*<!-- Nav Item - Dashboard -->*/}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider" />

      {/*<!-- Heading -->*/}
      <div className="sidebar-heading">Opciones</div>

      {/*<!-- Nav Item - Search Movies -->*/}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/search">
          <i className="fas fa-fw fa-search"></i>
          <span>Buscar producto</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/products">
          {/* <i className="fas fa-fw fa-search"></i> */}
          <span>Todos los productos</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/lastProduct">
          <span>Último producto ingresado</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/statistics">
          <span>Estadísticas</span>
        </Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;
