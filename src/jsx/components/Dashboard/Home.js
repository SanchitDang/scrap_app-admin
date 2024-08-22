import axios from "axios";
import { apiUrl } from "../../../constants";
import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import HomeDatatable from "../HomeDatatable";
import TickSvg from "../TickSvg";
import CrossSvg from "../CrossSvg";

const TotalInvoices = loadable(() =>
  pMinDelay(import("./Dashboard/TotalInvoices"), 1000)
);
const Paidinvoices = loadable(() =>
  pMinDelay(import("./Dashboard/Paidinvoices"), 1000)
);
const Unpaidinvoices = loadable(() =>
  pMinDelay(import("./Dashboard/Unpaidinvoices"), 1000)
);
const Totalinvoicessent = loadable(() =>
  pMinDelay(import("./Dashboard/Totalinvoicessent"), 1000)
);
const ChartBarApex = loadable(() =>
  pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);

  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, [changeBackground]);

  const [noUsers, setNoUsers] = useState("");
  const [noAgents, setNoAgents] = useState("");
  const [catData, setCatData] = useState([]);
  const [noInventoryManagers, setNoInventoryManagers] = useState("");
  const [noServiceRequests, setNoServiceRequests] = useState("");
  const [recentServiceRequests, setRecentServiceRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "dashboard");
        const data = response.data;
        console.log(data);
        setNoUsers(data.users);
        setNoAgents(data.agents);
        setNoInventoryManagers(data.inventory_managers);
        setNoServiceRequests(data.service_requests);
        setRecentServiceRequests(data.recent_service_requests);
        setCatData(data.service_requests_by_category);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const CategoryData = ({ dashboardData }) => {
    return (
      <div className="col-xl-12">
        <div className="row">
          {dashboardData.map((categoryData, index) => (
            <div className="col-xl-3 col-sm-6" key={index}>
              <div className="card overflow-hidden">
                <div className="card-header border-0">
                  <div className="d-flex">
                    <span className="mt-2">
                      <svg
                        width="32"
                        height="40"
                        viewBox="0 0 32 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.812 34.64L3.2 39.6C2.594 40.054 1.784 40.128 1.106 39.788C0.428 39.45 0 38.758 0 38V2C0 0.896 0.896 0 2 0H30C31.104 0 32 0.896 32 2V38C32 38.758 31.572 39.45 30.894 39.788C30.216 40.128 29.406 40.054 28.8 39.6L22.188 34.64L17.414 39.414C16.634 40.196 15.366 40.196 14.586 39.414L9.812 34.64ZM28 34V4H4V34L8.8 30.4C9.596 29.802 10.71 29.882 11.414 30.586L16 35.172L20.586 30.586C21.29 29.882 22.404 29.802 23.2 30.4L28 34ZM14 20H18C19.104 20 20 19.104 20 18C20 16.896 19.104 16 18 16H14C12.896 16 12 16.896 12 18C12 19.104 12.896 20 14 20ZM10 12H22C23.104 12 24 11.104 24 10C24 8.896 23.104 8 22 8H10C8.896 8 8 8.896 8 10C8 11.104 8.896 12 10 12Z"
                          fill="#717579"
                        />
                      </svg>
                    </span>
                    <div className="invoices">
                      <h4>Rs.{categoryData.totalAmount}</h4>
                      <span>{categoryData._id}</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div id="totalInvoices">
                    <TotalInvoices />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-3 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0">
                  <div className="d-flex">
                    <span className="mt-2">
                      <svg
                        width="32"
                        height="40"
                        viewBox="0 0 32 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.812 34.64L3.2 39.6C2.594 40.054 1.784 40.128 1.106 39.788C0.428 39.45 0 38.758 0 38V2C0 0.896 0.896 0 2 0H30C31.104 0 32 0.896 32 2V38C32 38.758 31.572 39.45 30.894 39.788C30.216 40.128 29.406 40.054 28.8 39.6L22.188 34.64L17.414 39.414C16.634 40.196 15.366 40.196 14.586 39.414L9.812 34.64ZM28 34V4H4V34L8.8 30.4C9.596 29.802 10.71 29.882 11.414 30.586L16 35.172L20.586 30.586C21.29 29.882 22.404 29.802 23.2 30.4L28 34ZM14 20H18C19.104 20 20 19.104 20 18C20 16.896 19.104 16 18 16H14C12.896 16 12 16.896 12 18C12 19.104 12.896 20 14 20ZM10 12H22C23.104 12 24 11.104 24 10C24 8.896 23.104 8 22 8H10C8.896 8 8 8.896 8 10C8 11.104 8.896 12 10 12Z"
                          fill="#717579"
                        />
                      </svg>
                    </span>
                    <div className="invoices">
                      <h4>{noUsers}</h4>
                      <span>Users</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div id="totalInvoices">
                    <TotalInvoices />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0">
                  <div className="d-flex">
                    <span className="mt-1">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z"
                          fill="#44814E"
                        />
                        <circle
                          cx="43.5"
                          cy="14.5"
                          r="12.5"
                          fill="#09BD3C"
                          stroke="white"
                          strokeWidth="4"
                        />
                      </svg>
                    </span>
                    <div className="invoices">
                      <h4>{noAgents}</h4>
                      <span>Agents</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div id="paidinvoices">
                    <Paidinvoices />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0">
                  <div className="d-flex">
                    <span className="mt-1">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z"
                          fill="#44814E"
                        />
                        <circle
                          cx="43.5"
                          cy="14.5"
                          r="12.5"
                          fill="#FD5353"
                          stroke="white"
                          strokeWidth="4"
                        />
                      </svg>
                    </span>
                    <div className="invoices">
                      <h4>{noInventoryManagers}</h4>
                      <span>Inventory Managers</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div id="unpaidinvoices">
                    <Unpaidinvoices />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0">
                  <div className="d-flex">
                    <span className="mt-1">
                      <svg
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z"
                          fill="#44814E"
                        />
                        <circle
                          cx="43.5"
                          cy="14.5"
                          r="12.5"
                          fill="#FFAA2B"
                          stroke="white"
                          strokeWidth="4"
                        />
                      </svg>
                    </span>
                    <div className="invoices">
                      <h4>{noServiceRequests}</h4>
                      <span>Service Requests</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div id="totalinvoicessent">
                    <Totalinvoicessent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <HomeDatatable data={catData} />
        </div>
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-12">
              <Tab.Container defaultActiveKey="Buy">
                <div className="card">
                  <div className="card-header d-block d-sm-flex border-0 flex-wrap transactions-tab">
                    <div className="me-3 mb-3">
                      <h4 className="card-title mb-2">
                        Recent Service Requests
                      </h4>
                      <span className="fs-12">
                        List of latest Service Requests
                      </span>
                    </div>

                    <div className="card-tabs mt-3 mt-sm-0 mb-3">
                      <Nav as="ul" className="nav nav-tabs">
                        <Nav.Item as="li" className="nav-item">
                          <Nav.Link eventKey="Buy">Buy</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                          <Nav.Link eventKey="Sell">Sell</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item">
                          <Nav.Link eventKey="Waste">Waste</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </div>

                  <Tab.Content className="card-body p-0">
                    <Tab.Pane eventKey="Buy">
                      <div className="table-responsive">
                        <table className="table table-responsive-md card-table transactions-table">
                          <tbody>
                            {recentServiceRequests
                              .filter(
                                (request) => request.type === "buy-request"
                              )
                              .map((request) => (
                                <tr key={request._id}>
                                  {request.status === "pending" ? (
                                    <td>
                                      <CrossSvg />
                                    </td>
                                  ) : (
                                    <td>
                                      <TickSvg />
                                    </td>
                                  )}
                                  <td>
                                    <h6 className="fs-16 font-w600 mb-0">
                                      <Link to={"#"} className="text-black">
                                        {request.user_id}
                                      </Link>
                                    </h6>
                                    <span className="fs-14">
                                      {request.category}
                                    </span>
                                  </td>
                                  <td>
                                    <h6 className="fs-16 text-black font-w600 mb-0">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleDateString()}
                                    </h6>
                                    <span className="fs-14">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleTimeString()}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="fs-16 text-black font-w600">
                                      {request.product}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      className={`${
                                        request.status === "pending"
                                          ? "text-danger"
                                          : "text-success"
                                      } fs-16 font-w500 text-end d-block`}
                                    >
                                      {request.status.charAt(0).toUpperCase() +
                                        request.status.slice(1)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Sell">
                      <div className="table-responsive">
                        <table className="table table-responsive-md card-table transactions-table">
                          <tbody>
                            {recentServiceRequests
                              .filter(
                                (request) => request.type === "sell-request"
                              )
                              .map((request) => (
                                <tr key={request._id}>
                                  {request.status === "pending" ? (
                                    <td>
                                      <CrossSvg />
                                    </td>
                                  ) : (
                                    <td>
                                      <TickSvg />
                                    </td>
                                  )}
                                  <td>
                                    <h6 className="fs-16 font-w600 mb-0">
                                      <Link to={"#"} className="text-black">
                                        {request.user_id}
                                      </Link>
                                    </h6>
                                    <span className="fs-14">
                                      {request.category}
                                    </span>
                                  </td>
                                  <td>
                                    <h6 className="fs-16 text-black font-w600 mb-0">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleDateString()}
                                    </h6>
                                    <span className="fs-14">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleTimeString()}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="fs-16 text-black font-w600">
                                      {request.product}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      className={`${
                                        request.status === "pending"
                                          ? "text-danger"
                                          : "text-success"
                                      } fs-16 font-w500 text-end d-block`}
                                    >
                                      {request.status.charAt(0).toUpperCase() +
                                        request.status.slice(1)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Waste">
                      <div className="table-responsive">
                        <table className="table table-responsive-md card-table transactions-table">
                          <tbody>
                            {recentServiceRequests
                              .filter(
                                (request) => request.type === "waste-collection"
                              )
                              .map((request) => (
                                <tr key={request._id}>
                                  {request.status === "pending" ? (
                                    <td>
                                      <CrossSvg />
                                    </td>
                                  ) : (
                                    <td>
                                      <TickSvg />
                                    </td>
                                  )}
                                  <td>
                                    <h6 className="fs-16 font-w600 mb-0">
                                      <Link to={"#"} className="text-black">
                                        {request.user_id}
                                      </Link>
                                    </h6>
                                    <span className="fs-14">
                                      {request.category}
                                    </span>
                                  </td>
                                  <td>
                                    <h6 className="fs-16 text-black font-w600 mb-0">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleDateString()}
                                    </h6>
                                    <span className="fs-14">
                                      {new Date(
                                        request.createdAt
                                      ).toLocaleTimeString()}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="fs-16 text-black font-w600">
                                      {request.product}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      className={`${
                                        request.status === "pending"
                                          ? "text-danger"
                                          : "text-success"
                                      } fs-16 font-w500 text-end d-block`}
                                    >
                                      {request.status.charAt(0).toUpperCase() +
                                        request.status.slice(1)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
