import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaLock,
  FaLockOpen,
  FaRegEnvelope,
  FaUnlockAlt,
  FaUserLock,
} from "react-icons/fa";
import styles from "../styles/Home.module.css";
import CreateTicket from "./ticket/create";

// axios.create({
//   baseURL: "http://localhost:3500",
// });
function dashboard() {
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/tickets")
      .then((response) => {
        setTickets(response?.data);
      })
      .catch((err) => console.log(err));
  }, [selectedRows]);
  const handleButtonClick = (row) => {
    console.log("clicked Ticket #" + row.ticket_id);
  };
  const handleChange = useCallback((state) => {
    setSelectedRows(state?.selectedRows);
  }, []);
  
  const columns = useMemo(
    () => [
      {
        name: "Ticket Number",
        selector: (row) => row.ticket_id,
        sortable: true,
        grow: 2,
      },
      {
        name: "Ticket Subject",
        selector: (row) => row.ticket_title,
        sortable: true,
      },
      {
        name: "Ticket Description",
        selector: (row) => row.ticket_description,
        sortable: true,
        right: true,
      },
      {
        name: "Date Created",
        selector: (row) => row.date_created,
        sortable: true,
        right: true,
      },
      {
        name: "Status",
        selector: (row) => row.ticket_status,
        sortable: true,
        right: true,
      },
      // {
      //   cell: (row) => (
      //     <button className="bg-red-700" onClick={() => handleButtonClick(row)}>
      //       Edit
      //     </button>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      // },
      // {
      //   name: "Delete",
      //   cell: (row) => (
      //     <button className="bg-red-700" onClick={() => handleDeleteRow(row)}>
      //       Delete
      //     </button>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      // },
    ],
    []
  );
  const sortedData = tickets?.sort(
    (a, b) => new Date(b.date_created) - new Date(a.date_created)
  );

  //Modal Create component
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreate =() => {
    setShowCreateModal(true);
    console.log(showCreateModal);
  }
  const onCreate = () => {
    onCancelCreate();
  } 
  const onCancelCreate = () => {
    handleChange;
    setShowCreateModal(false);
  }

  const [showViewTicketModal, setShowViewTicketModal] = useState(false);

  const handleRow = () => {
    console.log("on row clicked");
    setShowViewTicketModal(true);
  }

  return (
    <div style={{ background: "white" }}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>

      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: "20px", color: "white" }}>
          <div style={{ background: "#F27B53", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fill-rule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clip-rule="evenodd"></path>
              </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={handleCreate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
            {showCreateModal && <CreateTicket show={showCreateModal} onYes={onCreate} onCancel={onCancelCreate}/>}
          </div>
          <div style={{ background: "#DF577B", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fill-rule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clip-rule="evenodd"></path>
            </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
              router.push("/ticket/create");
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
          <div style={{ background: "#847CC5", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fill-rule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clip-rule="evenodd"></path>
              </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
            router.push("/ticket/create");
          }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
          <div style={{ background: "#28B79B", padding: "20px", borderRadius: "5px", display:'flex', alignItems:'center', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} fill="none">
              <path fill="white" fill-rule="evenodd" d="M3 5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.929-1.542-2.391 1.594a1 1 0 0 1-1.18-.051L12 20.28l-1.875 1.5a1 1 0 0 1-1.18.051l-2.391-1.594-1.93 1.543A1 1 0 0 1 3 21V5zm5 1a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8z" clip-rule="evenodd"></path>
            </svg>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px"}}> {sortedData.length} </div>
            <div style={{ fontSize: "16px" }}>{(sortedData.length>1) ? 'tickets':'ticket'}</div>
            <a onClick={() => {
              router.push("/ticket/create");
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-clipboard-plus" viewBox="0 0 16 16" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> 
                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" fill="white"></path> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" fill="white"></path> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" fill="white"></path> 
              </svg>
            </a>
          </div>
        </div>

        <DataTable
          title="Aging Tickets"
          data={sortedData}
          columns={columns}
          selectableRows
          pagination
          onSelectedRowsChange={handleChange}
          onRowClicked={handleRow}
        />
      </div>
    </div>
  );
}

export default dashboard;


