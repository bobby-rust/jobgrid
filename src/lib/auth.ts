import { AuthResponse, User } from "@/types/api";
import { api } from "./api-client";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const getUser = async () => {
  try {
    const response = (await api.get("/auth/me")) as { data: User };
    console.log("User fetched:", response);
    return response.data;
  } catch (error: any) {
    const refresh = (await api.post("/auth/refresh"));
    console.log("Refresh attempt: ", refresh); 
    return null;
  }
}

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
    return queryOptions({
        queryKey: userQueryKey,
        queryFn: getUser
    })
}

export const useUser = () => useQuery(getUserQueryOptions());

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: loginWithEmailAndPassword,
        onSuccess: (data) => {
            queryClient.setQueryData(userQueryKey, data.user)
            onSuccess?.();
        }
    })
}

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};