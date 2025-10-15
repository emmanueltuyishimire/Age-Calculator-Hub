
"use client"

import * as React from "react"
import {
  Calculator,
  File,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { navItems } from "./nav-items"
import { articles } from "@/lib/articles"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const searchableNavItems = navItems.filter(
      item => item.href.startsWith('/') && !['/','/articles', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/faq'].includes(item.href) && !item.href.includes('calculators')
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Calculators">
                {searchableNavItems.map((navItem) => (
                  <CommandItem
                    key={navItem.href}
                    value={navItem.label}
                    onSelect={() => {
                      runCommand(() => router.push(navItem.href as string))
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <Calculator className="h-4 w-4" />
                    </div>
                    {navItem.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Articles">
                {articles.map((article) => (
                    <CommandItem
                        key={article.slug}
                        value={article.title}
                        onSelect={() => {
                            runCommand(() => router.push(`/articles/${article.slug}`))
                        }}
                    >
                         <div className="mr-2 flex h-4 w-4 items-center justify-center">
                            <File className="h-4 w-4" />
                        </div>
                        {article.title}
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
