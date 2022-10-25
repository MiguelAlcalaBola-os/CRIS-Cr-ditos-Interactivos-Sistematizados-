import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Cards from "../../components/Cards";
const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="text-center">
          <br></br>
          <h3>Bienvenido a Cris (Créditos Interactivos Sistematizados)</h3>
          <p>Podrás hacer todas tus diligencias de una manera rápida, eficaz y en tiempo real, sin necesidad de apoyarte en una entidad bancaria</p>
        </div>
        <div className="widgets">
          <Cards />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Ultimas efectuaciones</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
