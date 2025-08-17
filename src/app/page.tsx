"use client";

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import { useJobApplications } from "@/lib/job-applications";
import { CirclePlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ApplicationStatus } from "@/types/enums";
import JobApplicationGrid from "./components/ui/job-application-grid/job-application-grid";
import JobApplicationTable from "./components/ui/job-application-table/job-application-table";

enum View {
  GRID = "grid",
  TABLE = "table"
}

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const [view, setView] = useState<View>(View.GRID);

  const jobApplicationsData = useJobApplications();


  useEffect(() => {
    if (!user.data) {
      router.replace(decodeURIComponent(paths.auth.login.getHref()));
    }
  }, [user.data, router])

  useEffect(() => {
    console.log(jobApplicationsData);
  }, [jobApplicationsData.data])

  return (
    <div className="min-w-full h-full flex flex-col items-center p-10 gap-5">
      <div className="flex flex-col justify-center items-center gap-5 w-full">
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
                <TabsTrigger value="grid" onClick={() => setView(View.GRID)}>Grid View</TabsTrigger>
                <TabsTrigger value="table" onClick={() => setView(View.TABLE)}>Table View</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="lg" onClick={() => { router.replace(decodeURIComponent(paths.home.applications.new.getHref())) }}>
              <CirclePlus className="size-6" /> <span className="-translate-y-[1px] -translate-x-1">New Application</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {view === View.GRID && jobApplicationsData.data && <JobApplicationGrid data={jobApplicationsData.data} />}
          {view === View.TABLE && jobApplicationsData.data && <JobApplicationTable data={jobApplicationsData.data} />}
        </div>

      </div>
    </div >
  );
}