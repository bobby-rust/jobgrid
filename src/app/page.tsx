"use client";

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import { useJobApplications } from "@/lib/job-applications";
import { cn } from "@/lib/utils";
import { CirclePlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import JobApplicationCard from "./components/ui/job-application-card/job-application-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ApplicationStatus } from "@/types/enums";
import App from "next/app";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  const jobApplications = useJobApplications();


  useEffect(() => {
    if (!user.data) {
      router.replace(decodeURIComponent(paths.auth.login.getHref()));
    }
  }, [user.data, router])

  useEffect(() => {
    console.log(jobApplications);
  }, [jobApplications.data])

  return (
    <div className="w-full h-full flex flex-col items-center p-10 gap-5">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex w-full justify-between">
          <div>
            <Tabs defaultValue="overview" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="Overview">Overview</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.RECEIVED_OFFER}>Offers</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.REJECTED}>Rejections</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.UNDER_CONSIDERATION}>Under Consideration</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.INTERVIEWING}>Interviewing</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.INTERVIEWED}>Interviewed</TabsTrigger>
                <TabsTrigger value={ApplicationStatus.SHORTLISTED}>Shortlisted</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex gap-5">
            <Tabs defaultValue="grid">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="lg" onClick={() => { router.replace(decodeURIComponent(paths.home.applications.new.getHref())) }}>
              <CirclePlus className="size-6" /> <span className="-translate-y-[1px] -translate-x-1">New Application</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {jobApplications.isLoading ? (
            <div>Loading...</div>
          ) : jobApplications.data?.length ? (
            <div className="grid grid-cols-3 gap-5">
              {jobApplications.data.map((job, i) => (
                <JobApplicationCard key={i} jobData={job} />
              ))}
            </div>
          ) : (
            <h2 className="text-3xl font-semibold">No jobs yet</h2>
          )}
        </div>

      </div>
    </div >
  );
}