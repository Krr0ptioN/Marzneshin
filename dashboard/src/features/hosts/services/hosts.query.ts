import { HostType } from "@marzneshin/features/hosts";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@marzneshin/utils";
import {
    FetchEntityReturn,
    UseEntityQueryProps,
    EntitySidebarQueryKeyType
} from "@marzneshin/features/entity-table/hooks";

export async function fetchHosts({ queryKey }: EntitySidebarQueryKeyType): FetchEntityReturn<HostType> {
    const pagination = queryKey[3];
    const primaryFilter = queryKey[4];
    const filters = queryKey[6].filters;
    return fetch(queryKey[1] !== undefined ? `/inbounds/${queryKey[1]}/hosts` : `/inbounds/hosts`, {
        query: {
            ...pagination,
            ...filters,
            remark: primaryFilter,
            descending: queryKey[5].desc,
            order_by: queryKey[5].sortBy,
        }
    }).then((result) => {
        return {
            entity: result.items,
            pageCount: result.pages
        };
    });
}

export const HostsQueryFetchKey = "hosts";

export const useHostsQuery = ({
    page, size, sortBy = "created_at", desc = false, filters = {}, inboundId
}: UseEntityQueryProps & { inboundId?: number }) => {
    return useQuery({
        queryKey: ["inbounds", inboundId, HostsQueryFetchKey, { page, size }, filters?.username ?? "", { sortBy, desc }, { filters }],
        queryFn: fetchHosts,
        initialData: { entity: [], pageCount: 0 }
    })
}
