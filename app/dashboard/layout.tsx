

import type { Metadata } from "next";
import React from 'react'
import AuthGuard from "../guards/AuthGuard";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
 "../guards/AuthGuard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Fitness partner dashboard",
  };

type layoutProps = {
    children: React.ReactNode
}

const layout = ({children}:layoutProps) => {
  return (
    <>
    <AuthGuard>
       <main className="flex min-h-[100vh]">
          <Sidebar/>
          <div className="flex-1">
            <Header/>
            <div className="px-10 py-5">
             {children}
            </div>
          </div>
      </main>
    </AuthGuard>
    </>
  )
}

export default layout