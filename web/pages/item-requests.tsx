import React from "react";
import Table from "@components/Table";

function genItemRequestsTab() {
    const getData = () => [
        {
            name: "Hannah Hazel",
            items_requested: "Baby clothing, Formula, Diapers",
            created: "02/06/22",
            updated: "02/06/22",
            status: "Pending"
        },
        {
            name: "Hannah Hazel",
            items_requested: "Diapers",
            created: "02/06/22",
            updated: "02/06/22",
            status: "Pending"
        },
        {
            name: "Hannah Hazel",
            items_requested: "Baby clothing, Diapers",
            created: "02/06/22",
            updated: "02/06/22",
            status: "Approved"
        },
        {
            name: "Hannah Hazel",
            items_requested: "Formula",
            created: "02/06/22",
            updated: "02/06/22",
            status: "Approved"
        },
        {
            name: "Hannah Hazel",
            items_requested: "Formula, Diapers",
            created: "02/06/22",
            updated: "02/06/22",
            status: "Completed"
        },
      ];
      
    const columns = React.useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Items Requested",
            accessor: "items_requested",
          },
          {
            Header: "Created",
            accessor: "created",
          },
          {
            Header: "Updated",
            accessor: "updated",
          },
          {
            Header: "Status",
            accessor: "status",
          }
        ],
        []
      );

    const data = React.useMemo(() => getData(), []);

    return (
        <div className="px-8 flex h-full flex-col justify-left">
            <h1 className="text-2xl mb-5 font-bold">Item Requests</h1>
            <div>
                <Table columns={columns} data={data} />
            </div>
        </div>
    )
}

export default genItemRequestsTab;