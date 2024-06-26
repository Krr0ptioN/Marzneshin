import type { FC } from "react";
import {
  ServicesQueryFetchKey,
  fetchServices,
  ServiceType
} from "@marzneshin/features/services";
import { columns } from "./columns";
import { EntityTable } from "@marzneshin/features/entity-table";
import { useNavigate } from "@tanstack/react-router";

export const ServicesTable: FC = () => {
  const navigate = useNavigate({ from: "/services" });
  return (
    <EntityTable
      fetchEntity={fetchServices}
      columnsFn={columns}
      filteredColumn="name"
      entityKey={ServicesQueryFetchKey}
      onCreate={() => navigate({ to: "/services/create" })}
      onOpen={(entity: ServiceType) =>
        navigate({
          to: "/services/$serviceId",
          params: { serviceId: String(entity.id) },
        })
      }
      onEdit={(entity: ServiceType) =>
        navigate({
          to: "/services/$serviceId/edit",
          params: { serviceId: String(entity.id) },
        })
      }
      onDelete={(entity: ServiceType) =>
        navigate({
          to: "/services/$serviceId/delete",
          params: { serviceId: String(entity.id) },
        })
      }
    />
  );
};
