import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div className="grid h-svh grid-cols-12 bg-card">
      <SideBar />
      <main className="col-span-7 xl:col-span-9">
        <Outlet />
      </main>
    </div>
  );
}
