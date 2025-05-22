import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function MyDataGrid({ rows, columns }) {
  return (
    // <div className="h-full w-full">
    <DataGrid
      rows={rows}
      columns={columns}
      // getRowId={(row) => row.id ?? row?.phone ?? row?.emp_code ?? row?.pno}
      getRowId={(row) => row.id || row.pno || row.phone || row.emp_code}
      showToolbar
      slots={{ toolbar: GridToolbar }}
      pagination
      pageSizeOptions={[5, 10]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
    />
    // </div>
  );
}
