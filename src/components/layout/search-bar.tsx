
"use client"

import * as React from "react"
import { Calculator, File, Search } from "lucide-react"
import Fuse from "fuse.js"
import { useRouter } from "next/navigation"

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
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { navItems } from "./nav-items"
import { articles } from "@/lib/articles"

interface SearchableItem {
  title: string;
  href: string;
  type: 'calculator' | 'article';
  icon: React.ElementType;
}

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  const searchableItems: SearchableItem[] = React.useMemo(() => {
    const calculatorItems = navItems
      .filter(item => item.href.startsWith('/') && !['/articles', '/about', '/contact', '/privacy', '/terms', '/disclaimer', '/faq'].includes(item.href) && !item.href.endsWith('-calculators'))
      .map(item => ({
        title: item.label,
        href: item.href,
        type: 'calculator' as const,
        icon: item.icon,
      }));

    const articleItems = articles.map(article => ({
      title: article.title,
      href: `/articles/${article.slug}`,
      type: 'article' as const,
      icon: File,
    }));
    return [...calculatorItems, ...articleItems];
  }, []);
  
  const fuse = React.useMemo(() => new Fuse(searchableItems, {
    keys: ['title', 'description'],
    includeScore: true,
    threshold: 0.4,
  }), [searchableItems]);

  const results = React.useMemo(() => {
    if (!query) {
      const allCalculators = searchableItems.filter(i => i.type === 'calculator');
      const allArticles = searchableItems.filter(i => i.type === 'article');
      return { calculators: allCalculators.slice(0, 5), articles: allArticles.slice(0, 5), hasResults: true };
    }
    const searchResults = fuse.search(query);
    const calculators = searchResults.filter(r => r.item.type === 'calculator').map(r => r.item);
    const articles = searchResults.filter(r => r.item.type === 'article').map(r => r.item);
    return { calculators, articles, hasResults: calculators.length > 0 || articles.length > 0 };
  }, [query, fuse, searchableItems]);

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
    setQuery("")
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full h-14 justify-start rounded-lg bg-background text-lg text-muted-foreground shadow-sm hover:shadow-md transition-shadow"
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5 mr-4" />
        <span className="inline-flex">Search for a calculator or article...</span>
        <kbd className="pointer-events-none absolute right-[0.5rem] top-[0.5rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Search for calculators and articles</DialogDescription>
          </DialogHeader>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              <CommandInput
                placeholder="Type to search..."
                value={query}
                onValueChange={setQuery}
              />
            <CommandList>
              {!results.hasResults && <CommandEmpty>No results found.</CommandEmpty>}

              {results.calculators.length > 0 && (
                 <CommandGroup heading="Calculators">
                    {results.calculators.map((item) => (
                    <CommandItem
                        key={item.href}
                        value={item.title}
                        onSelect={() => {
                        runCommand(() => router.push(item.href))
                        }}
                    >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                          <item.icon className="h-4 w-4" />
                        </div>
                        {item.title}
                    </CommandItem>
                    ))}
                </CommandGroup>
              )}
              {results.articles.length > 0 && (
                <CommandGroup heading="Articles">
                    {results.articles.map((item) => (
                        <CommandItem
                            key={item.href}
                            value={item.title}
                            onSelect={() => {
                                runCommand(() => router.push(item.href))
                            }}
                        >
                            <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                <item.icon className="h-4 w-4" />
                            </div>
                            {item.title}
                        </CommandItem>
                    ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
