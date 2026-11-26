import DataTable, { type TableColumn } from "react-data-table-component";

import type { Customer, CustomerStatus } from "src/types/customerTypes";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  deleteCustomerAPI,
  updateCustomerStatusAPI,
} from "src/api/customersApi";
import apiWithToast from "src/api/toastifiedApi";
import { useState } from "react";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import { BiLinkExternal } from "react-icons/bi";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION_OPTIONS,
} from "src/utils/constants";
import TableActionMenu from "src/components/table-action-menu/TableActionMenu";
import { FiEdit } from "react-icons/fi";
import CustomerRentalHistory from "./customer-modals/rental-history/CustomerRentalHistory";
import type { StatusBadgeType } from "src/components/status-badge/StatusBadge";
import StatusBadge from "src/components/status-badge/StatusBadge";
import EditCustomerModal from "./customer-modals/EditCustomerModal";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import Loading from "src/components/loading/Loading";
import useMediaQuery from "src/utils/custom-hooks/useMediaQuery";
import { nameJoiner } from "src/utils/stringUtils";
import CustomerCard from "./customer-card/CustomerCard";

export default function CustomersTable({
  customers,
  getCustomers,
  paginationTotalRows,
  paginationPerPage = DEFAULT_PAGE_SIZE,
  onChangePage,
  onChangeRowsPerPage,
  resetDefaultPage,
  tableLoading,
}: {
  customers: Customer[];
  getCustomers: () => void;
  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  resetDefaultPage?: boolean;
  tableLoading?: boolean;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<null | Customer>(
    null,
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Customer>(
    null,
  );

  const isFirstResize = useMediaQuery("(max-width: 1000px)");
  const isSecondResize = useMediaQuery("(max-width: 768px)");

  const onSuspendCustomer = (customer: Customer) => {
    apiWithToast(updateCustomerStatusAPI(customer.id, "suspended")).then(() => {
      getCustomers();
      setSelectedCustomer(null);
      setOpenSuspend(false);
    });
  };

  const onActivateCustomer = (customer: Customer) => {
    apiWithToast(updateCustomerStatusAPI(customer.id, "active")).then(() => {
      getCustomers();
      setSelectedCustomer(null);
      setOpenActivate(false);
    });
  };
  const onDeleteCustomer = (customer: Customer) => {
    apiWithToast(deleteCustomerAPI(customer.id)).then(() => {
      getCustomers();
      setRecordToBeDeleted(null);
      setOpenDelete(false);
    });
  };
  const onClickViewRentalHistory = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenViewModal(true);
  };
  const onClickEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenEditModal(true);
  };
  const onClickSuspendCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenSuspend(true);
  };
  const onClickActivateCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpenActivate(true);
  };
  const onClickDeleteCustomer = (customer: Customer) => {
    setRecordToBeDeleted(customer);
    setOpenDelete(true);
  };

  const setupStatus = (row: Customer) => {
    const status = row.status;
    const statusMap: Record<
      CustomerStatus,
      { title: string; status: StatusBadgeType }
    > = {
      active: {
        title: "Active",
        status: "success",
      },
      suspended: {
        title: "Suspended",
        status: "danger",
      },
      deleted: {
        title: "Deleted",
        status: "warning",
      },
    };

    const currentStatus = statusMap[status];

    return StatusBadge(currentStatus);
    //<StatusBadge title={currentStatus.title} status={currentStatus.status} />
  };
  const columns: TableColumn<Customer>[] = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      omit: isFirstResize,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      omit: isFirstResize,
    },
    {
      name: "Full Name",
      selector: (row) => nameJoiner(row),
      grow: 2,
      omit: !isFirstResize,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      grow: 1.5,
      omit: isFirstResize,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,
      omit: isFirstResize,
    },
    {
      name: "Contact",
      cell: (row) => (
        <div>
          <div className="">{row.phone}</div>
          <div className="">{row.email}</div>
        </div>
      ),
      grow: 4,
      omit: !isFirstResize,
    },
    {
      name: "Current",
      selector: (row) => row.activeRental,
      cell: (row) => <div className="info-color bold">{row.activeRental}</div>,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => setupStatus(row),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex justify-around text-2xl">
            <TableActionMenu
              items={[
                {
                  label: "All Rentals",
                  icon: <BiLinkExternal />,
                  standAlone: !isFirstResize,
                  onClick: () => onClickViewRentalHistory(row),
                },
                {
                  label: "Edit",
                  icon: <FiEdit />,
                  standAlone: !isFirstResize,
                  onClick: () => onClickEditCustomer(row),
                },

                {
                  label: "Suspend",
                  hide: row.status !== "active",
                  icon: <UserRoundX />,
                  onClick: () => onClickSuspendCustomer(row),
                },
                {
                  label: "Activate",
                  icon: <UserRoundCheck />,
                  hide: row.status !== "suspended",
                  onClick: () => onClickActivateCustomer(row),
                },
                {
                  label: "Delete",
                  icon: <RiDeleteBin2Line />,
                  onClick: () => onClickDeleteCustomer(row),
                },
              ]}
            />
          </div>
        );
      },
      right: true,
    },
  ];

  return (
    <div>
      {!isSecondResize ? (
        <DataTable
          data={customers}
          columns={columns}
          pagination
          paginationTotalRows={paginationTotalRows}
          paginationPerPage={paginationPerPage}
          onChangePage={onChangePage}
          paginationServer
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationRowsPerPageOptions={DEFAULT_PAGINATION_OPTIONS}
          paginationResetDefaultPage={resetDefaultPage}
          progressPending={tableLoading}
          progressComponent={<Loading />}
        />
      ) : (
        <>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onRentalHistory={() => onClickViewRentalHistory(customer)}
              onEdit={() => onClickEditCustomer(customer)}
              onSuspend={() => onClickSuspendCustomer(customer)}
              onActivate={() => onClickActivateCustomer(customer)}
              onDelete={() => onClickDeleteCustomer(customer)}
            />
          ))}
        </>
      )}
      {openDelete && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpenDelete(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onDeleteCustomer(recordToBeDeleted)}
        />
      )}
      {openSuspend && selectedCustomer && (
        <ConfirmationModal
          onClose={() => {
            setOpenSuspend(false);
            setSelectedCustomer(null);
          }}
          onConfirm={() => onSuspendCustomer(selectedCustomer)}
          content="Are you sure you want to suspend this customer?"
        />
      )}
      {openActivate && selectedCustomer && (
        <ConfirmationModal
          onClose={() => {
            setOpenActivate(false);
            setSelectedCustomer(null);
          }}
          onConfirm={() => onActivateCustomer(selectedCustomer)}
          content="Are you sure you want to activate this customer?"
        />
      )}
      {openEditModal && selectedCustomer && (
        <EditCustomerModal
          onClose={() => {
            setOpenEditModal(false);
            setSelectedCustomer(null);
          }}
          selectedCustomer={selectedCustomer}
          callBack={() => getCustomers()}
        />
      )}

      {openViewModal && selectedCustomer && (
        <CustomerRentalHistory
          customer={selectedCustomer}
          onClose={() => {
            setOpenViewModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}
