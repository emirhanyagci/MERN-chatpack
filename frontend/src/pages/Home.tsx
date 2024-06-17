import MainNavBar from "@/components/MainNavBar";
import SideBar from "@/components/SideBar";

import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div className="grid h-svh grid-cols-12 bg-card">
      <div className="col-span-5 hidden h-full md:block xl:col-span-3">
        <SideBar />
      </div>
      <main className="col-span-12 md:col-span-7 xl:col-span-9">
        <MainNavBar />
        <Outlet />
      </main>
    </div>
  );
}
