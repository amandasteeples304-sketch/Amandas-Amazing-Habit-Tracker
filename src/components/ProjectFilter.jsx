"use client";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      <Filter className="w-4 h-4 opacity-50" />
      <Select.Root onValueChange={handleFilterChange} defaultValue="all">
        <Select.Trigger className="inline-flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all outline-none min-w-[140px]">
          <Select.Value placeholder="Filter by Status" />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50">
            <Select.Viewport className="p-1">
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
function SelectItem({ children, value }) {
  return (
    <Select.Item
      value={value}
      className="text-sm px-8 py-2 rounded-md hover:bg-white/10 outline-none cursor-pointer relative select-none"
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
