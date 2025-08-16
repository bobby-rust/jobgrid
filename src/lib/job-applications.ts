import { JobApplicationsResponse } from "@/types/api";
import { api } from "./api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getJobApplications = async () => {
    try {
        const response = (await api.get("/job-applications")) as JobApplicationsResponse;
        console.log("Job applications fetched: ", response);
        return response.data;
    } catch (e: any) {
        return null;
    }
}

const jobsQueryKey = ["jobs"];

export const getJobApplicationsQueryOptions = () => {
    return queryOptions({
        queryKey: jobsQueryKey,
        queryFn: getJobApplications
    })
}

export const useJobApplications = () => useQuery(getJobApplicationsQueryOptions());

