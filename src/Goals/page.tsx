"use client"

import {
  Search,
  Menu,
  LayoutDashboard,
  FileText,
  Sparkles,
  Package,
  Wallet,
  Target,
  MessageSquare,
  ScanText,
  Shield,
  Plus,
  CalendarDays,
  ChevronDown,
  Goal,
  ClipboardList,
  TrendingUp,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GoalsPage() {
  return (
    <main className="flex min-h-screen bg-[#f5f6f8] text-[#111827]">
      
      <aside className="hidden w-[290px] border-r border-gray-200 bg-white lg:block">
        
        
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center -top-14 gap-2">
          </div>

          <Menu className="relative -top-14 h-8 w-7 text-gray-400" />
        </div>

        
        <div className="space-y-10 px-5 py-8">

          <div>
            <p className="mb-4 text-xs font-semibold text-gray-400">
              ANALYTICS
            </p>

            <div className="space-y-3">
              <SidebarItem
                icon={<LayoutDashboard size={16} />}
                label="Analytics"
              />

              <SidebarItem
                icon={<FileText size={16} />}
                label="Reports"
              />

              <SidebarItem
                icon={<Sparkles size={16} />}
                label="AI Reports"
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold text-gray-400">
              MANAGEMENT
            </p>

            <div className="space-y-3">
              <SidebarItem
                icon={<Package size={16} />}
                label="Inventory"
              />

              <SidebarItem
                icon={<Wallet size={16} />}
                label="Budget"
              />

              
              <SidebarItem
                icon={<Target size={16} />}
                label="Goals"
                active
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold text-gray-400">
              TOOLS
            </p>

            <div className="space-y-3">
              <SidebarItem
                icon={<MessageSquare size={16} />}
                label="AI Chat"
              />

              <SidebarItem
                icon={<ScanText size={16} />}
                label="OCR"
              />
            </div>
          </div>

          
          <div>
            <p className="mb-4 text-xs font-semibold text-gray-400">
              OTHERS
            </p>

            <SidebarItem
              icon={<Shield size={16} />}
              label="Get Premium"
            />
          </div>
        </div>
      </aside>
      
      <section className="flex-1 max-w-[1800px]">

        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-8">
          
          
          <div className="relative w-full max-w-[440px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              placeholder="Search"
              className="pl-10"
            />
          </div>
        </header>

        <div className="space-y-6 p-4 sm:p-8">

          <div>
            <h1 className="text-3xl font-bold">
              My Goals
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Your path to building a stronger business
            </p>
          </div>

          {/* =========================
              CREATE GOAL CARD
          ========================= */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">

             
              <div className="flex items-center gap-4">
                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff]">
                  <Goal className="h-6 w-6 text-[#101540]" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Create a Goal
                  </h2>

                  <p className="text-sm text-gray-400">
                    Define what you want to achieve
                    for your business.
                  </p>
                </div>
              </div>

              
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f123d] text-white">
                <Plus className="h-5 w-5" />
              </button>
            </CardContent>
          </Card>

          {/* =========================
              HOW TO CREATE GOAL
          ========================= */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="p-5">

              
              <div className="flex items-start gap-4">

                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff]">
                  <ClipboardList className="h-6 w-6 text-[#101540]" />
                </div>

               
                <div>
                  <h2 className="text-xl font-semibold">
                    How to Create a Goal
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    We guide you step by step to make
                    it simple and effective.
                  </p>
                </div>
              </div>

              
              <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:justify-center">

                
                <Step
                  number="1"
                  text="Choose your objective"
                />

                <div className="hidden h-px w-24 border-t border-dashed border-gray-400 md:block" />

               
                <Step
                  number="2"
                  text="Add the details"
                />

               
                <div className="hidden h-px w-24 border-t border-dashed border-gray-400 md:block" />

               
                <Step
                  number="3"
                  text="You're all set!"
                />
              </div>
            </CardContent>
          </Card>

          {/*=========================
              GOAL FORM
          ========================= */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="space-y-6 p-5">

              
              <div className="flex items-center gap-4">

               
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff]">
                  <Target className="h-6 w-6 text-[#101540]" />
                </div>

               
                <div>
                  <h2 className="text-xl font-semibold">
                    Create Your Goal
                  </h2>

                  <p className="text-sm text-gray-400">
                    Write your goal and add some detail
                    to get started.
                  </p>
                </div>
              </div>

              
              <Input placeholder="What do you want to achieve?" 
              className="h-12 text-base px-4 rounded-xl"
              />
             
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Target date
                  </label>

                  <div className="relative">
                    <Input placeholder="Select date" 
                    className="h-12 text-base px-4 rounded-xl"
                    />

                    <CalendarDays className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Category
                  </label>

                  <div className="relative">
                    <Input placeholder="Select category" 
                    className="h-12 text-base px-4 rounded-xl"
                    />

                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <Button className="h-11 w-full rounded-xl bg-[#0f123d] text-white hover:bg-[#1b215e]">
                Save Goal
              </Button>
            </CardContent>
          </Card>

          {/* =========================
              GOALS LIST
          ========================= */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <CardContent className="p-5">

              
              <div className="mb-6 flex items-center gap-4">

                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef1ff]">
                  <TrendingUp className="h-6 w-6 text-[#101540]" />
                </div>
               
                <div>
                  <h2 className="text-xl font-semibold">
                    My Goals
                  </h2>

                  <p className="text-sm text-gray-400">
                    Track your goals and your progress.
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                <GoalProgress
                  text="Increase Sales by 10%"
                  progress="60%"
                  width="w-[60%]"
                />

                <GoalProgress
                  text="Reduce operational cost by 5%"
                  progress="45%"
                  width="w-[45%]"
                />

                <GoalProgress
                  text="Set aside 30% of sales for emergencies"
                  progress="50%"
                  width="w-[50%]"
                />

                <GoalProgress
                  text="Get 5 new customers during the month"
                  progress="80%"
                  width="w-[80%]"
                />

                <GoalProgress
                  text="Lower basic service bills by 5%"
                  progress="30%"
                  width="w-[30%]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

/* =========================
   SIDEBAR ITEM
========================= */
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-[#eef1ff] text-[#101540]"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/* =========================
   STEP COMPONENT
========================= */
function Step({
  number,
  text,
}: {
  number: string
  text: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      
      
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f123d] text-sm font-bold text-white">
        {number}
      </div>

      
      <p className="mt-3 text-sm text-gray-500">
        {text}
      </p>
    </div>
  )
}

/* =========================
   GOAL PROGRESS COMPONENT
========================= */
function GoalProgress({
  text,
  progress,
  width,
}: {
  text: string
  progress: string
  width: string
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      
      
      <div>
        <p className="mb-2 text-sm text-gray-600">
          {text}
        </p>

        
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full bg-[#0f123d] ${width}`}
          />
        </div>
      </div>

      
      <span className="text-sm font-semibold text-gray-500">
        {progress}
      </span>
    </div>
  )
}