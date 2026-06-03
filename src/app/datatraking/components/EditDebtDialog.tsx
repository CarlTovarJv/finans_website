"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditDebtDialog() {
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#05052B] text-white">
            Edit Debt
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-[490px] min-h-[500px] bg-[#F8F8F8] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold">
              Edit Debt
            </DialogTitle>
          </DialogHeader>
  
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
  
             
              {/* Creditor */}
              <div className="flex flex-col gap-2 mt-7">
                <label className="text-sm font-medium">
                  Creditor
                </label>
  
                <Input
                  placeholder="Enter creditor"
                  className="w-46 h-10 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300"
                />
              </div>
  
              {/* Amount*/}
              <div className="flex flex-col gap-2 mt-7">
                <label className="text-sm font-medium">
                  Amount
                </label>
  
                <div className="flex">
                  <div className="flex items-center justify-center px-3 border border-gray-300 border-r-0 rounded-l-md bg-white">
                    $
                  </div>
  
                  <Input
                    placeholder="0.00"
                    className="w-46 h-10 rounded-l-none border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 "
                  />
                </div>
              </div>

               {/* Date */}
              <div className="flex flex-col gap-2 mt-7">
                <label className="text-sm font-medium">
                  Date
                </label>
  
                <Input
                  type="date"
                  className="w-46 h-10 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 "/>
               </div>

              <div className="flex items-end justify-end mt-30">
              <Button className="h-10 px-6 bg-[#05052B] text-white ml-12 mt-12">Add changes</Button>
              </div>

  

  
              

            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
