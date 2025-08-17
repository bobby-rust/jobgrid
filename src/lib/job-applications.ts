import { JobApplication, JobApplicationsResponse } from "@/types/api";
import { api } from "./api-client";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const createJobApplication = (jobApplication: Omit<JobApplication, "userId">): Promise<JobApplication> => {
    return api.post("/job-applications", jobApplication);
}

const createJobQueryKey = ["createJob"];

export const useCreateJobApplication = ({ onSuccess }: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createJobApplication,
        onSuccess: (data: Omit<JobApplication, "userId">) => {
            queryClient.setQueryData(createJobQueryKey, data);
            onSuccess?.();
        }
    })
}