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

export default function EditIncomeDialog() {
 return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#05052B] text-white">
            Edit Income
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-[490px] min-h-[500px] bg-[#F8F8F8] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold">
              Edit Income
            </DialogTitle>
          </DialogHeader>
  
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
  
             
              {/* Type */}
              <div className="flex flex-col gap-2 mt-7">
                <label className="text-sm font-medium">
                  Type
                </label>
  
                <Input
                  placeholder="Enter type"
                  className="w-46 h-10 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300"
                />
              </div>
  
              {/* Description*/}
              <div className="flex flex-col gap-2 mt-7">
                <label className="text-sm font-medium">
                  Description
                </label>
  
                <div className="flex">
                  <Input className="w-46 h-10 border-gray-300  focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 "
                  />
                </div>
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
                  className="w-46 h-10 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 "
                />
                <div className="flex flex-col gap-2 mt-18">
                  <Button className="w-34 h-10 px-6 bg-[#05052B] ml-12 text-white">Add changes</Button>
                  </div>
              </div>
  

  
              

            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }