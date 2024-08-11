import axios from "axios";
import { apiUrl } from "../../../constants";
import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Link } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";

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
  const [catData, setCatData] = useState("");
  const [noInventoryManagers, setNoInventoryManagers] = useState("");
  const [noServiceRequests, setNoServiceRequests] = useState("");
  const [recentServiceRequests, setRecentServiceRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl+"dashboard");
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
        {catData.length > 0 ? (    
          <div className="col-xl-12">
          <div className="row">
            {catData.map((categoryData, index) => (
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
        ) : (
          <p>Loading...</p>
        )}
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-sm-flex d-block border-0 pb-0">
                  <div className="pe-3 me-auto mb-sm-0 mb-3">
                    <h4 className="fs-20 text-black mb-1 font-w700">
                      Service Requests Overview
                    </h4>
                    <span className="fs-12">Summary of previous week's Service Requests</span>
                  </div>
                </div>
                <div className="card-body">
                  <div id="chartBar" className="chartBar">
                    <ChartBarApex />
                  </div>
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="d-flex"></div>
                    <div>
                      <span className="fs-16 font-w600">
                        <svg
                          className="me-2"
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.639771"
                            width="18.9471"
                            height="19"
                            rx="9.47357"
                            fill="#09BD3C"
                          />
                        </svg>
                        Completed
                      </span>
                      <span className="fs-16 font-w600">
                        <svg
                          className="mx-2"
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.344925"
                            width="18.9471"
                            height="19"
                            rx="9.47357"
                            fill="#FD5353"
                          />
                        </svg>
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-12">
              <Tab.Container defaultActiveKey="Monthly">
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
                  </div>
                  <Tab.Content className="card-body p-0">
                    <Tab.Pane className="tab-pane" eventKey="Monthly">
                      <div className="table-responsive">
                        <table className="table table-responsive-md card-table transactions-table">
                          <tbody>
                            {recentServiceRequests.map((request) => (
                              <tr key={request._id}>
                                {request.status === "pending" ? (
                                  <td>
                                    <svg
                                      width="63"
                                      height="63"
                                      viewBox="0 0 63 63"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="1"
                                        y="1"
                                        width="61"
                                        height="61"
                                        rx="29"
                                        stroke="#FF2E2E"
                                        strokeWidth="2"
                                      />
                                      <g clipPath="">
                                        <path
                                          d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                          fill="#FF2E2E"
                                        />
                                        <path
                                          d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                          fill="#FF2E2E"
                                        />
                                      </g>
                                      <defs></defs>
                                    </svg>
                                  </td>
                                ) : (
                                  <td>
                                    <svg
                                      width="63"
                                      height="63"
                                      viewBox="0 0 63 63"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="1.00002"
                                        y="1"
                                        width="61"
                                        height="61"
                                        rx="29"
                                        stroke="#2BC155"
                                        strokeWidth="2"
                                      />
                                      <g clipPath="">
                                        <path
                                          d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                          fill="#2BC155"
                                        />
                                        <path
                                          d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                          fill="#2BC155"
                                        />
                                      </g>
                                      <defs></defs>
                                    </svg>
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
