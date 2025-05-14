import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataGridWithPadding({ rows, columns }) {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            sx={{
                fontSize: "15px",
                "& .MuiDataGrid-cell": {
                    padding: "10px",
                },
            }}
            slots={{ toolbar: GridToolbar }}
            showToolbar
            getRowHeight={() => "auto"}
            pagination
            pageSizeOptions={[5, 10]}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}
        />
    );
}
