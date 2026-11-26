import {
  ClipboardClock,
  Mail,
  Phone,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

import type { Customer, CustomerStatus } from "src/types/customerTypes";
import type { StatusBadgeType } from "src/components/status-badge/StatusBadge";

import StatusBadge from "src/components/status-badge/StatusBadge";
import TableActionMenu from "src/components/table-action-menu/TableActionMenu";
import { nameJoiner } from "src/utils/stringUtils";

import "./CustomerCard.sass";

type CustomerCardProps = {
  customer: Customer;
  onRentalHistory: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onSuspend: (customer: Customer) => void;
  onActivate: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

const statusMap: Record<
  CustomerStatus,
  { title: string; status: StatusBadgeType }
> = {
  active: { title: "Active", status: "success" },
  suspended: { title: "Suspended", status: "danger" },
  deleted: { title: "Deleted", status: "warning" },
};

export default function CustomerCard({
  customer,
  onRentalHistory,
  onEdit,
  onSuspend,
  onActivate,
  onDelete,
}: CustomerCardProps) {
  const currentStatus = statusMap[customer.status];

  return (
    <div className="my-card customer-card">
      <div className="customer-card-header">
        <h3 className="customer-card-name">{nameJoiner(customer)}</h3>

        <TableActionMenu
          items={[
            {
              label: "Rental History",
              icon: <ClipboardClock />,
              onClick: () => onRentalHistory(customer),
            },
            {
              label: "Edit",
              type: "edit",
              onClick: () => onEdit(customer),
            },
            {
              label: "Suspend",
              icon: <UserRoundX />,
              hide: customer.status !== "active",
              onClick: () => onSuspend(customer),
            },
            {
              label: "Activate",
              icon: <UserRoundCheck />,
              hide: customer.status !== "suspended",
              onClick: () => onActivate(customer),
            },
            {
              label: "Delete",
              type: "delete",
              onClick: () => onDelete(customer),
            },
          ]}
        />
      </div>

      <div className="customer-card-contact">
        <div className="customer-card-contact-item">
          <Phone size={15} />
          <span>{customer.phone}</span>
        </div>

        <div className="customer-card-contact-item customer-card-email">
          <Mail size={15} />
          <span>{customer.email}</span>
        </div>
      </div>

      <div className="customer-card-footer">
        <StatusBadge
          title={currentStatus.title}
          status={currentStatus.status}
        />

        <div className="customer-card-rentals">
          <span>Active Rentals</span>
          <strong>{customer.activeRental}</strong>
        </div>
      </div>
    </div>
  );
}
