"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  CalendarIcon,
  Check,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Goal = {
  id: number
  title: string
  amount: number
  completed: boolean
  date: Date
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Buy a new phone for the business",
      amount: 300,
      completed: false,
      date: new Date(),
    },
    {
      id: 2,
      title: "Buy a new TV by the end of the month",
      amount: 500,
      completed: true,
      date: new Date(),
    },
  ])

  const [open, setOpen] = useState(false)

  const [newGoal, setNewGoal] = useState({
    title: "",
    amount: "",
    date: new Date(),
  })

  const toggleComplete = (id: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    )
  }

  const deleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  const updateDate = (id: number, date: Date | undefined) => {
    if (!date) return

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, date } : goal
      )
    )
  }

  const addGoal = () => {
    if (!newGoal.title || !newGoal.amount) return

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      amount: Number(newGoal.amount),
      completed: false,
      date: newGoal.date,
    }

    setGoals((prev) => [...prev, goal])

    setNewGoal({
      title: "",
      amount: "",
      date: new Date(),
    })

    setOpen(false)
  }

  const editGoal = (id: number) => {
    const newTitle = prompt("Edit your goal")

    if (!newTitle) return

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, title: newTitle }
          : goal
      )
    )
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1800px] px-6">
        {/* HEADER */}
        <div className="mb-10 flex md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">My Goals</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your path to building a stronger business
            </p>
          </div>

          {/* ADD GOAL */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 rounded-xl bg-[#0a0a3b] text-white px-6 hover:bg-[#0a0a3b]">
                Add Goal
              </Button>
            </DialogTrigger>

            <DialogContent className="mx-auto w-full max-w-2xl bg-white rounded-2xl shadow-md shadow-gray-100/50 px-10 py-12">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-bold">
                  Create Goal
                </DialogTitle>
                <p className="text-base text-slate-500 mt-0">
                  write your goals details
                </p>
              </DialogHeader>

              <div className="space-y-6 w-full">
                {/* TITLE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Goal detail
                  </label>

                  <Input
                    className="transition-all focus-visible:ring-4 focus-visible:ring-slate-100 focus-visible:border-slate-300"
                    placeholder="What do you want to achieve?"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                {/* AMOUNT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Amount
                  </label>

                  <Input
                    className="transition-all focus-visible:ring-4 focus-visible:ring-slate-100 focus-visible:border-slate-300"
                    type="number"
                    placeholder="Enter amount"
                    value={newGoal.amount}
                    onChange={(e) =>
                      setNewGoal({
                        ...newGoal,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>

                {/* DATE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Target date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-300"
                      >
                        <CalendarIcon className="mr-4 h-6 w-6" />
                        {format(newGoal.date, "PPP")}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-4 bg-blue-50">
                      <Calendar
                        mode="single"
                        selected={newGoal.date}
                        onSelect={(date) =>
                          setNewGoal({
                            ...newGoal,
                            date: date || new Date(),
                          })
                        }

                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex justify-between items-center w-full pt-6">
                  <Button
                    variant="outline"
                    className="text-sm h-10 px-5 rounded-xl border-gray-300 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="bg-[#030326] h-10 px-4  text-white rounded-xl hover:bg-[#0a0a3b]"
                    onClick={addGoal}
                  >
                    Save Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* TABLE */}
        <Card className="min-h-[700px] overflow-hidden rounded-2xl border-b border-gray-100 bg-white">
          {/* HEADERS */}
          <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr_auto] border-b border-gray-100 px-6 py-4 text-sm text-muted-foreground">
            <div className="pl-14">Goals</div>
            <div>Target date</div>
            <div className="text-center-end">Amount</div>
            <div></div>
          </div>

          {/* GOALS */}
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="grid grid-cols-1 gap-4 border-b border-gray-100 px-4 py-5 transition hover:bg-muted/40 md:grid-cols-[4fr_2fr_1fr_auto] md:items-center md:px-6"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4 pl-2">
                {/* COMPLETE BUTTON */}
                <button
                  onClick={() => toggleComplete(goal.id)}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition",
                    goal.completed
                      ? "border-[#030326] bg-[#030326]"
                      : "border-gray-300"
                  )}
                >
                  {goal.completed && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </button>


                {/* TITLE */}
                <p
                  className={cn(
                    "font-medium",
                    goal.completed &&
                    "text-muted-foreground line-through"
                  )}
                >
                  {goal.title}
                </p>
              </div>

              {/* DATE */}
              <div className="flex p-0 justify-start -m-25 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-center font-semibold text-[#000000]",
                        goal.completed && "text-muted-foreground line-through"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(goal.date, "PPP")}
                    </Button>
                  </PopoverTrigger>

                  {/* Modificamos el PopoverContent para centrarlo en la pantalla */}
                  <PopoverContent
                    className="fixed inset-0 m-auto w-fit h-fit p-0 bg-blue-50 z-50 border border-slate-200 shadow-lg rounded-xl"
                    sideOffset={0}
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={goal.date}
                      onSelect={(date) => updateDate(goal.id, date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* AMOUNT */}
              <div
                className={cn(
                  "font-semibold text-[#ff4d3d]",
                  goal.completed &&
                  "text-muted-foreground line-through"
                )}
              >
                ${goal.amount}
              </div>

              {/* MENU */}
              <div className="flex justify-end ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="bg-white rounded-xl border border-slate-200 ">
                    <DropdownMenuItem
                      onClick={() =>
                        toggleComplete(goal.id)
                      }
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Mark completed
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}