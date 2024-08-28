"use client"

import * as React from "react"
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="border-none outline-none focus-visible:ring-0">
          <HiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-secondary" />
          <HiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-secondary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-black border-none space-y-1 bg-white p-2 text-base shadow-lg backdrop-blur-lg">
        {themes.map((theme) => (
            <DropdownMenuItem className="cursor-pointer hover:bg-neutral-200/50 hover:dark:bg-neutral-900 rounded-md px-4 py-2" onClick={() => setTheme(`${theme.id}`)}>
                {theme.label}
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const themes = [
    { id: 'system', label: 'System' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
  ];