import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeDatatable = ({ data }) => {
  const sort = 5; // Items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination logic
  const start = currentPage * sort;
  const end = start + sort;
  const paginatedData = data.slice(start, end);

  const totalPages = Math.ceil(data.length / sort);

  // Change page
  const onClick = (i) => {
    setCurrentPage(i);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Basic Datatable</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="display w-100 dataTable" role="grid">
            <thead>
              <tr role="row">
                <th className="sorting_asc">Name</th>
                <th className="sorting">Inward</th>
                <th className="sorting">Outward</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                  <td className="sorting_1">{item._id}</td>
                  <td>{item.totalRequests}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-md-0 mb-2">
            <div className="dataTables_info">
              Showing {start + 1} to {end > data.length ? data.length : end} of{" "}
              {data.length} entries
            </div>
            <div className="dataTables_paginate paging_simple_numbers mb-0">
              <Link
                className={`paginate_button previous ${
                  currentPage === 0 ? "disabled" : ""
                }`}
                to="#"
                onClick={() => currentPage > 0 && onClick(currentPage - 1)}
              >
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
              </Link>
              <span>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Link
                    key={i}
                    to="#"
                    className={`paginate_button ${
                      currentPage === i ? "current" : ""
                    }`}
                    onClick={() => onClick(i)}
                  >
                    {i + 1}
                  </Link>
                ))}
              </span>
              <Link
                className={`paginate_button next ${
                  currentPage + 1 === totalPages ? "disabled" : ""
                }`}
                to="#"
                onClick={() =>
                  currentPage + 1 < totalPages && onClick(currentPage + 1)
                }
              >
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDatatable;
