"use client"

import {BarChart} from "@tremor/react"

  import {
  Card,
  Metric,
  Text,
  AreaChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"

import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Package,
  Wallet,
  Target,
  MessageSquare,
  ScanText,
  Shield,
  Menu,
  Search,
  UserCircle2,
  TrendingUp,
  WalletCards,
  BriefcaseBusiness,
} from "lucide-react"

const chartData = [
  {
    week: "WEEK1",
    Income: 800,
  },
  {
    week: "WEEK2",
    Income: 950,
  },
  {
    week: "WEEK3",
    Income: 1100,
  },
  {
    week: "WEEK4",
    Income: 1300,
  },
]

const movementData = [
  {
    transaction: "Venta del día",
    category: "Venta",
    date: "Feb 12, 2026",
    amount: "+$320.00",
    status: "Registered",
  },
  {
    transaction: "Compra de insumos",
    category: "Gasto",
    date: "Feb 14, 2026",
    amount: "-$150.00",
    status: "Registered",
  },
  {
    transaction: "Pago a proveedor",
    category: "Proveedor",
    date: "Feb 15, 2026",
    amount: "-$85.00",
    status: "Pending",
  },
]

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[#f6f6f7] text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[240px] border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#171d4b]" />
            <span className="text-xl font-semibold">Finans</span>
          </div>

          <Menu className="h-5 w-5 text-gray-500" />
        </div>

        {/* NAV */}
        <div className="px-4 py-6">
          <SidebarSection title="ANALYTICS">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Analytics"
              active
            />

            <SidebarItem
              icon={<FileText size={18} />}
              label="Reports"
            />

            <SidebarItem
              icon={<Sparkles size={18} />}
              label="AI Reports"
            />
          </SidebarSection>

          <SidebarSection title="MANAGEMENT">
            <SidebarItem
              icon={<Package size={18} />}
              label="Inventory"
            />

            <SidebarItem
              icon={<Wallet size={18} />}
              label="Budget"
            />

            <SidebarItem
              icon={<Target size={18} />}
              label="Goals"
            />
          </SidebarSection>

          <SidebarSection title="TOOLS">
            <SidebarItem
              icon={<MessageSquare size={18} />}
              label="AI Chat"
            />

            <SidebarItem
              icon={<ScanText size={18} />}
              label="OCR"
            />
          </SidebarSection>

          <SidebarSection title="OTHERS">
            <SidebarItem
              icon={<Shield size={18} />}
              label="Get Premium"
            />
          </SidebarSection>
        </div>
      </aside>

      {/* CONTENT */}
      <section className="flex-1">
        {/* TOPBAR */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-9 py-6">
          <div className="relative w-[390px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none"
            />
          </div>

          <UserCircle2 className="h-10 w-10 text-gray-400" />
        </header>

        {/* MAIN */}
        <div className="space-y-6 p-8">
          {/* STATS */}
          <div className="grid grid-cols-3 gap-6">
            <StatCard
              title="Income"
              value="$12,450"
              subtitle="+12% vs last month"
              icon={<TrendingUp className="h-3 w-3" />}
            />

            <StatCard
              title="Expenses"
              value="$5,240"
              subtitle="-5% vs last month"
              icon={<WalletCards className="h-3 w-3" />}
            />

            <StatCard
              title="Profit"
              value="$7,210"
              subtitle="The best return"
              icon={<BriefcaseBusiness className="h-3 w-3" />}
            />
          </div>

          {/* CHART */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-semibold">
                  Monthly Performance
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Monthly Income Trends
                </p>
              </div>

              <button className="rounded-lg bg-[#cfd3ff] px-4 py-2 text-sm font-medium text-[#171d4b]">
                + Create report
              </button>
            </div>

           <BarChart
        data={[
       {
         date: "Jan 23",
         SolarPanels: 2890,
         Inverters: 2338,
       },
       {
          date: "Feb 23",
          SolarPanels: 2756,
          Inverters: 2103,
       },
       {
          date: "Mar 23",
          SolarPanels: 3322,
          Inverters: 2194,
       },
       {
          date: "Apr 23",
          SolarPanels: 3470,
          Inverters: 2108,
       },
       {
          date: "May 23",
          SolarPanels: 3475,
          Inverters: 1812,
        },
        {
           date: "Jun 23",
           SolarPanels: 3129,
           Inverters: 1726,
        },
        {
            date: "Jul 23",
            SolarPanels: 3490,
            Inverters: 1982,
        },
        {
            date: "Aug 23",
            SolarPanels: 2903,
            Inverters: 2012,
        },
        {
             date: "Sep 23",
             SolarPanels: 2643,
             Inverters: 2342,
        },
        {
             date: "Oct 23",
             SolarPanels: 2837,
             Inverters: 2473,
        },
        {
             date: "Nov 23",
             SolarPanels: 2954,
             Inverters: 3848,
        },
        {
             date: "Dec 23",
             SolarPanels: 3239,
             Inverters: 3736,
        },
        ]}
            index="date"
            categories={["SolarPanels", "Inverters"]}
            className="h-90"
        />
          
           
          </Card>

          {/* TABLE */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-semibold">
                  Movement history
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Real-time history of all your financial movements
                </p>
              </div>

              <div className="flex gap-3">
                <button className="rounded-lg bg-[#cfd3ff] px-4 py-2 text-sm font-medium text-[#171d4b]">
                  Date range +
                </button>

                <button className="rounded-lg bg-[#cfd3ff] px-4 py-2 text-sm font-medium text-[#171d4b]">
                  Export
                </button>
              </div>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="text-left pl-1">Transaction</TableHeaderCell>
                  <TableHeaderCell className="text-left pl-1">Category</TableHeaderCell>
                  <TableHeaderCell className="text-left pl-1">Date</TableHeaderCell>
                  <TableHeaderCell className="text-left pl-1">Amount</TableHeaderCell>
                  <TableHeaderCell className="text-left pl-1" >Status</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {movementData.map((item) => (
                  <TableRow key={item.transaction}>
                    <TableCell >{item.transaction}</TableCell>

                    <TableCell>{item.category}</TableCell>

                    <TableCell>{item.date}</TableCell>

                    <TableCell>{item.amount}</TableCell>

                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </main>
  )
}

/* SIDEBAR SECTION */
function SidebarSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <p className="mb-4 text-xs font-semibold tracking-wide text-gray-400">
        {title}
      </p>

      <div className="space-y-2">{children}</div>
    </div>
  )
}

/* SIDEBAR ITEM */
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
          ? "bg-[#eef1ff] text-[#171d4b]"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/* STAT CARD */
function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-3xl border border-gray-200 p-6 shadow-md min-h-[200px]">
      <div className="mb- flex items-start justify-between">
        <Text className="text-2xl font-bold text-gray-900">
          {title}
        </Text>

        <div className="text-[#171d4b] scale-125">
          {icon}
        </div>
      </div>

      <Metric className="text-5xl font-bold">
        {value}
      </Metric>

      <Text className="mt-4 text-base text-gray-400">
        {subtitle}
      </Text>
    </Card>
  )
}
  

