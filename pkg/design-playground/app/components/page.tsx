"use client"

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ButtonGroupSeparator,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  ColorInput,
  ClassicDropdown,
  DropdownSelect,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Input,
  Label,
  Pagination,
  Radio,
  Select,
  Switch,
  Tabs,
  TabsWithContainer,
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  ScrollArea,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  RadixTooltip as Tooltip,
  RadixTooltipTrigger as TooltipTrigger,
  RadixTooltipContent as TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  CardDecorator,
  Progress,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  Toggle,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  ResponsiveDialog,
  SelectRoot,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  toast,
} from '@mindtris/design-system'
import { Settings, Check, ChevronRight, Info, ChevronDown, Search, Eye, HelpCircle, Moon, TriangleAlert, User, Plus, Minus, MoreHorizontal, Calendar, AudioLines, Save, BookmarkPlus, LogOut, Bell, CreditCard, Shield, Trash2, Tag, MessageSquareText } from 'lucide-react'

type ComponentNavItem = { id: string; label: string }
const componentNavItems: ComponentNavItem[] = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'alert', label: 'Alert' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'buttons', label: 'Button' },
  { id: 'button-group', label: 'Button group' },
  { id: 'toggle-group', label: 'Toggle group' },
  { id: 'toggle', label: 'Toggle' },
  { id: 'cards', label: 'Card' },
  { id: 'dropdowns', label: 'Dropdown' },
  { id: 'form', label: 'Form controls' },
  { id: 'label', label: 'Label' },
  { id: 'command', label: 'Command' },
  { id: 'scroll-area', label: 'Scroll area' },
  { id: 'resizable', label: 'Resizable' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'drawer', label: 'Drawer' },
  { id: 'sheet', label: 'Sheet' },
  { id: 'popover', label: 'Popover' },
  { id: 'progress', label: 'Progress' },
  { id: 'slider', label: 'Slider' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'table', label: 'Table' },
  { id: 'hover-card', label: 'Hover card' },
  { id: 'card-decorator', label: 'Card decorator' },
  { id: 'select', label: 'Select' },
  { id: 'separator', label: 'Separator' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'sonner', label: 'Sonner' },
  { id: 'tooltip', label: 'Tooltip' },
]

function getComponentName(activeTab: string) {
  const names: Record<string, string> = {
    buttons: 'Buttons',
    'button-group': 'Button group',
    'toggle-group': 'Toggle group',
    toggle: 'Toggle',
    cards: 'Cards',
    dropdowns: 'Dropdowns',
    tabs: 'Tabs',
    accordion: 'Accordion',
    alert: 'Alert',
    avatar: 'Avatar',
    badge: 'Badge',
    breadcrumb: 'Breadcrumb',
    form: 'Form controls',
    label: 'Label',
    command: 'Command',
    'scroll-area': 'Scroll area',
    resizable: 'Resizable',
    dialog: 'Dialog',
    drawer: 'Drawer',
    sheet: 'Sheet',
    popover: 'Popover',
    progress: 'Progress',
    slider: 'Slider',
    pagination: 'Pagination',
    select: 'Select',
    separator: 'Separator',
    skeleton: 'Skeleton',
    sonner: 'Sonner',
    tooltip: 'Tooltip',
    table: 'Table',
    'hover-card': 'Hover card',
    'card-decorator': 'Card decorator',
  }
  return names[activeTab] || 'Components'
}

function ComponentsPageContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'buttons'

  const [query, setQuery] = React.useState('')
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return componentNavItems
    return componentNavItems.filter((i) => i.label.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        {/* Left: Sticky component navigator */}
        <aside className="rounded-xl border border-border bg-card p-4 sm:sticky sm:top-20">
          <div className="text-sm font-semibold text-foreground mb-3">Components</div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
          />

          <div className="mt-4 max-h-[calc(100dvh-180px)] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No matches</div>
            ) : (
              <ul className="space-y-1">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                      render={<Link href={`/components?tab=${item.id}`} />}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Right: Component showcase */}
        <div className="flex flex-col items-start">
          <div className="w-full max-w-[900px] mb-4">
            <h2 className="text-2xl font-semibold text-foreground">{getComponentName(activeTab)}</h2>
          </div>

          <aside className="rounded-xl border border-border bg-card p-6 h-fit w-full max-w-[900px]">
            {activeTab === 'buttons' ? <ButtonsShowcase /> : null}
            {activeTab === 'button-group' ? <ButtonGroupShowcase /> : null}
            {activeTab === 'toggle-group' ? <ToggleGroupShowcase /> : null}
            {activeTab === 'toggle' ? <ToggleShowcase /> : null}
            {activeTab === 'accordion' ? <AccordionShowcase /> : null}
            {activeTab === 'avatar' ? <AvatarShowcase /> : null}
            {activeTab === 'alert' ? <AlertShowcase /> : null}
            {activeTab === 'badge' ? <BadgeShowcase /> : null}
            {activeTab === 'breadcrumb' ? <BreadcrumbShowcase /> : null}
            {activeTab === 'cards' ? <CardsShowcase /> : null}
            {activeTab === 'dropdowns' ? <DropdownsShowcase /> : null}
            {/* Keep backwards compatibility: `tab=inputs` routes to Form controls */}
            {activeTab === 'form' || activeTab === 'inputs' ? <FormControlsShowcase /> : null}
            {activeTab === 'label' ? <LabelShowcase /> : null}
            {activeTab === 'command' ? <CommandShowcase /> : null}
            {activeTab === 'scroll-area' ? <ScrollAreaShowcase /> : null}
            {activeTab === 'resizable' ? <ResizableShowcase /> : null}
            {activeTab === 'dialog' ? <DialogShowcase /> : null}
            {activeTab === 'drawer' ? <DrawerShowcase /> : null}
            {activeTab === 'sheet' ? <SheetShowcase /> : null}
            {activeTab === 'popover' ? <PopoverShowcase /> : null}
            {activeTab === 'progress' ? <ProgressShowcase /> : null}
            {activeTab === 'slider' ? <SliderShowcase /> : null}
            {activeTab === 'pagination' ? <PaginationShowcase /> : null}
            {activeTab === 'tabs' ? <TabsShowcase /> : null}
            {activeTab === 'table' ? <TableShowcase /> : null}
            {activeTab === 'hover-card' ? <HoverCardShowcase /> : null}
            {activeTab === 'card-decorator' ? <CardDecoratorShowcase /> : null}
            {activeTab === 'select' ? <SelectShowcase /> : null}
            {activeTab === 'separator' ? <SeparatorShowcase /> : null}
            {activeTab === 'skeleton' ? <SkeletonShowcase /> : null}
            {activeTab === 'sonner' ? <SonnerShowcase /> : null}
            {activeTab === 'tooltip' ? <TooltipShowcase /> : null}
            {[
              'buttons', 'button-group', 'toggle-group', 'toggle', 'accordion', 'avatar', 'alert', 'badge', 'breadcrumb', 'cards', 'dropdowns',
              'form', 'inputs', 'label', 'command', 'scroll-area', 'resizable', 'dialog', 'drawer', 'sheet', 'popover', 'progress', 'slider', 'pagination', 'tabs', 'table', 'hover-card', 'card-decorator', 'select', 'separator', 'skeleton', 'sonner', 'tooltip',
            ].includes(activeTab) ? null : (
              <div className="text-sm text-muted-foreground">
                Showcase coming soon for: <span className="text-foreground font-medium">{getComponentName(activeTab)}</span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}

function ButtonGroupShowcase() {
  const [sizeTab, setSizeTab] = React.useState<'sm' | 'default' | 'lg'>('default')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Primary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="primary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Secondary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Tertiary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="tertiary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Orientation</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Horizontal (default)</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem aria-pressed>Day</ButtonGroupItem>
                <ButtonGroupItem>Week</ButtonGroupItem>
                <ButtonGroupItem>Month</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Vertical</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup orientation="vertical" variant="secondary">
                <ButtonGroupItem size="icon-sm" aria-label="Increase">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
                <ButtonGroupItem size="icon-sm" aria-label="Decrease">
                  <Minus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Size</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div>
            <div className="text-sm font-medium text-foreground">Small</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="sm">
                <ButtonGroupItem onClick={() => setSizeTab('sm')} aria-pressed={sizeTab === 'sm'}>
                Small
              </ButtonGroupItem>
                <ButtonGroupItem onClick={() => setSizeTab('default')} aria-pressed={sizeTab === 'default'}>
                Button
              </ButtonGroupItem>
                <ButtonGroupItem onClick={() => setSizeTab('lg')} aria-pressed={sizeTab === 'lg'}>
                Group
              </ButtonGroupItem>
                <ButtonGroupItem size="icon-sm" aria-label="Add">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Default</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="default">
                <ButtonGroupItem>Default</ButtonGroupItem>
                <ButtonGroupItem>Button</ButtonGroupItem>
                <ButtonGroupItem>Group</ButtonGroupItem>
                <ButtonGroupItem size="icon" aria-label="Add">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Large</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="lg">
                <ButtonGroupItem>Large</ButtonGroupItem>
                <ButtonGroupItem>Button</ButtonGroupItem>
                <ButtonGroupItem>Group</ButtonGroupItem>
                <ButtonGroupItem size="icon-lg" aria-label="Add">
                  <Plus className="h-5 w-5" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Nested</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="inline-flex max-w-full overflow-hidden rounded-lg border border-border bg-card">
            <Input
              className="border-0 rounded-none focus-visible:ring-0 w-[360px] max-w-full"
              placeholder="Type a message..."
            />
            <ButtonGroup variant="secondary" withSeparator={false} className="border-0 rounded-none">
              <ButtonGroupItem size="icon" aria-label="Voice message">
                <AudioLines className="h-4 w-4" aria-hidden />
              </ButtonGroupItem>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Separator</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Default (auto separators)</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem>Copy</ButtonGroupItem>
                <ButtonGroupItem>Paste</ButtonGroupItem>
                <ButtonGroupItem>Cut</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Manual separator</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" withSeparator={false}>
                <ButtonGroupItem>Copy</ButtonGroupItem>
                <ButtonGroupSeparator />
                <ButtonGroupItem>Paste</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          For outline variants, you can omit separators because the border provides hierarchy.
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Split</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ButtonGroup variant="secondary" withSeparator={false}>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupSeparator />
            <ButtonGroupItem size="icon" aria-label="More">
              <MoreHorizontal className="h-4 w-4" aria-hidden />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Input</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="inline-flex max-w-full overflow-hidden rounded-lg border border-border bg-card">
            <Input className="border-0 rounded-none focus-visible:ring-0 w-[320px] max-w-full" placeholder="Search..." />
            <ButtonGroup variant="secondary" withSeparator={false} className="border-0 rounded-none">
              <ButtonGroupItem size="icon" aria-label="Search">
                <Search className="h-4 w-4" aria-hidden />
              </ButtonGroupItem>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Popover</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <Popover>
            <ButtonGroup variant="secondary" withSeparator={false}>
              <ButtonGroupItem>Copilot</ButtonGroupItem>
              <ButtonGroupSeparator />
              <PopoverTrigger asChild>
                <ButtonGroupItem size="icon" aria-label="Open menu">
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </PopoverTrigger>
            </ButtonGroup>
            <PopoverContent className="w-72 p-3">
              <div className="text-sm font-medium text-foreground mb-1">Start a new task</div>
              <div className="text-sm text-muted-foreground mb-3">Describe your task in natural language.</div>
              <Input placeholder="I need to..." />
              <div className="mt-3 flex justify-end">
                <Button size="sm">View code</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  )
}

function ToggleGroupShowcase() {
  const [single, setSingle] = React.useState<string | null>('left')
  const [multi, setMulti] = React.useState<readonly string[]>(['bold'])

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Toggle group</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Single selection</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when exactly one option should be active (similar to segmented controls).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" value={single} onValueChange={setSingle} variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Multiple selection</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when multiple options can be toggled on/off (formatting, filters, preferences).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="multiple" value={multi} onValueChange={setMulti} variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <span className="font-bold">B</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <span className="italic">I</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <span className="underline">U</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Orientation</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Switch between horizontal and vertical layouts depending on available space.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" orientation="vertical" defaultValue="plus" variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="plus" size="icon-sm" aria-label="Plus">
                  <Plus className="h-4 w-4" aria-hidden />
                </ToggleGroupItem>
                <ToggleGroupItem value="minus" size="icon-sm" aria-label="Minus">
                  <Minus className="h-4 w-4" aria-hidden />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">size</span> to match density across UI surfaces.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                <ToggleGroup type="single" defaultValue="sm" size="sm" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Default</div>
                <ToggleGroup type="single" defaultValue="md" size="default" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <ToggleGroup type="single" defaultValue="lg" size="lg" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Outline</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Outline style for dense toolbars and secondary controls.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" defaultValue="month" variant="outline" activeVariant="outline-strong">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AlertShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Alerts</h2>
        <div className="space-y-3">
          <Alert
            title="Default alert"
            description="This is a neutral message block using token colors."
            icon={<Info className="h-4 w-4" aria-hidden />}
          />
          <Alert
            variant="accent"
            title="Accent alert"
            description="Use for highlighted informational content."
            icon={<Info className="h-4 w-4" aria-hidden />}
          />
          <Alert
            variant="destructive"
            title="Destructive alert"
            description="Use for errors and blocking issues."
            icon={<TriangleAlert className="h-4 w-4" aria-hidden />}
            action={<Button size="sm" variant="outline">Action</Button>}
          />
        </div>
      </section>
    </div>
  )
}

function BadgeShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Basic Small</h2>
        <div className="flex flex-wrap items-center -m-1.5">
          <div className="m-1.5"><Badge variant="accent" size="sm">Working on</Badge></div>
          <div className="m-1.5"><Badge variant="secondary" size="sm">Exciting news</Badge></div>
          <div className="m-1.5"><Badge variant="muted" size="sm">Product</Badge></div>
          <div className="m-1.5"><Badge variant="outline" size="sm">Announcement</Badge></div>
          <div className="m-1.5"><Badge variant="destructive" size="sm">Bug Fix</Badge></div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Basic Large</h2>
        <div className="flex flex-wrap items-center -m-1.5">
          <div className="m-1.5"><Badge variant="accent" size="md">Working on</Badge></div>
          <div className="m-1.5"><Badge variant="secondary" size="md">Exciting news</Badge></div>
          <div className="m-1.5"><Badge variant="muted" size="md">Product</Badge></div>
          <div className="m-1.5"><Badge variant="outline" size="md">Announcement</Badge></div>
          <div className="m-1.5"><Badge variant="destructive" size="md">Bug Fix</Badge></div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Icon</h2>
        <div className="flex flex-wrap items-center -m-1.5">
          <div className="m-1.5">
            <Badge variant="inverse" size="sm" leadingIcon={<ChevronRight className="h-3 w-3" aria-hidden />}>
              Special Offer
            </Badge>
          </div>
        </div>
      </section>
    </div>
  )
}

function BreadcrumbShowcase() {
  const base = [
    { label: 'Home', href: '#0' },
    { label: 'Settings', href: '#0' },
    { label: 'Notifications', current: true },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Slashes</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="slash" className="inline-flex" />
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Dots</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="dot" className="inline-flex" />
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Chevrons</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="chevron" className="inline-flex" />
        </div>
      </section>
    </div>
  )
}

function CardsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Short supporting description using token colors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Card content goes here.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function DropdownsShowcase() {
  const [value, setValue] = React.useState('account')
  const [notifications, setNotifications] = React.useState(true)
  const [newsletter, setNewsletter] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'invoice'>('card')
  const options = [
    { value: 'account', label: 'Account' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'integrations', label: 'Integrations' },
  ] as const

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Dropdown</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Select dropdown</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when the user needs to pick a single option (compact trigger + list of options).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <DropdownSelect value={value} options={options} onChange={setValue} />
                  <ClassicDropdown value={value} options={options} onChange={setValue} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Dropdown menu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for contextual actions, commands, and multi-step menus (submenu, shortcuts, toggles).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Basic actions</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <User className="h-4 w-4" aria-hidden />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="h-4 w-4" aria-hidden />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4" aria-hidden />
                          Settings
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Submenu</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <User className="h-4 w-4" aria-hidden />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Shield className="h-4 w-4" aria-hidden />
                          Security
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Password</DropdownMenuItem>
                          <DropdownMenuItem>Sessions</DropdownMenuItem>
                          <DropdownMenuItem>2FA</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="h-4 w-4" aria-hidden />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Shortcuts</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>
                        <Save className="h-4 w-4" aria-hidden />
                        Save
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BookmarkPlus className="h-4 w-4" aria-hidden />
                        Bookmark
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Toggles</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuCheckboxItem
                        checked={notifications}
                        onCheckedChange={(v) => setNotifications(v === true)}
                      >
                        <Bell className="h-4 w-4" aria-hidden />
                        Notifications
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={newsletter}
                        onCheckedChange={(v) => setNewsletter(v === true)}
                      >
                        <Check className="h-4 w-4" aria-hidden />
                        Newsletter
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Single-choice</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Payment method</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'invoice')}>
                        <DropdownMenuRadioItem value="card">Card</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="invoice">Invoice</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Destructive action</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline">Open</Button>
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem variant="destructive">
                        <Trash2 className="h-4 w-4" aria-hidden />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TriangleAlert className="h-4 w-4" aria-hidden />
                        Report issue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <div className="text-sm font-medium text-foreground">Mega menu</div>
                  <div className="flex flex-wrap items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="inline-flex">
                          <Button variant="outline" className="gap-2">
                            <span className="inline-flex items-center gap-2">
                              <span className="h-4 w-4 grid place-items-center">
                                <MoreHorizontal className="h-4 w-4" aria-hidden />
                              </span>
                              More
                            </span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
                          </Button>
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[min(36rem,calc(100vw-2rem))] p-4">
                        <div className="text-sm font-medium text-muted-foreground mb-4">All products &amp; services</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            className="group rounded-lg p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="h-12 w-12 rounded-full border border-border bg-background grid place-items-center">
                                <Tag className="h-5 w-5 text-muted-foreground group-hover:text-foreground" aria-hidden />
                              </div>
                              <div className="text-sm font-medium text-foreground">Rewards</div>
                            </div>
                          </button>
                          <button
                            type="button"
                            className="group rounded-lg p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="h-12 w-12 rounded-full border border-border bg-background grid place-items-center">
                                <MessageSquareText className="h-5 w-5 text-muted-foreground group-hover:text-foreground" aria-hidden />
                              </div>
                              <div className="text-sm font-medium text-foreground text-center">Communication center</div>
                            </div>
                          </button>
                          <button
                            type="button"
                            className="group rounded-lg p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="h-12 w-12 rounded-full border border-border bg-background grid place-items-center">
                                <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" aria-hidden />
                              </div>
                              <div className="text-sm font-medium text-foreground">Support</div>
                            </div>
                          </button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FormControlsShowcase() {
  const [enabled, setEnabled] = React.useState(false)
  const [country, setCountry] = React.useState('us')
  const [radio, setRadio] = React.useState<'a' | 'b'>('a')
  const [chipSelected, setChipSelected] = React.useState(false)
  const [chipRemovable, setChipRemovable] = React.useState(true)
  const [primaryHex, setPrimaryHex] = React.useState('#1b1b1b')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Form controls</h2>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input types</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Default</div>
                  <Input placeholder="Type here..." />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">W/ Tooltip</div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-muted-foreground">Label + helper</div>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex items-center">
                          <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={6}>
                        Just a tip
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Mandatory</div>
                  <Input placeholder="Required" aria-required />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">With Prefix</div>
                  <div className="relative">
                    <Input className="pl-12" placeholder="0.00" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <span className="text-sm text-muted-foreground font-medium px-3">USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Search</div>
                  <div className="relative">
                    <Input className="pl-9" type="search" placeholder="Search..." />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground ml-3" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input sizes</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Small</div>
                  <Input size="sm" placeholder="Small" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Default</div>
                  <Input size="md" placeholder="Default" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Large</div>
                  <Input size="lg" placeholder="Large" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input states</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Disabled</div>
                  <Input disabled placeholder="Disabled" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Error</div>
                  <Input className="border-destructive focus-visible:ring-destructive" placeholder="Required" />
                  <div className="text-xs mt-1 text-destructive">This field is required.</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Success</div>
                  <Input className="border-border focus-visible:ring-ring" defaultValue="Looks good" />
                  <div className="text-xs mt-1 text-muted-foreground">Saved.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Select + Switch</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Select</div>
                  <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="mx">Mexico</option>
                  </Select>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Switch</div>
                  <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} label="Enable" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Checkbox + Radio</div>
              <div className="space-y-3 sm:w-[520px]">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox defaultChecked /> Checkbox
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Radio checked={radio === 'a'} onChange={() => setRadio('a')} /> Option A
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Radio checked={radio === 'b'} onChange={() => setRadio('b')} /> Option B
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Chip</div>
              <div className="flex flex-wrap items-center gap-2 sm:w-[520px]">
                <Chip selected={chipSelected} onSelectedChange={setChipSelected} leadingIcon={<Check className="h-4 w-4" aria-hidden />}>
                  Filter
                </Chip>
                <Chip
                  variant="outline"
                  leadingIcon={<Eye className="h-4 w-4" aria-hidden />}
                  onRemove={chipRemovable ? () => setChipRemovable(false) : undefined}
                >
                  Removable
                </Chip>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">ColorInput</div>
              <div className="sm:w-[520px]">
                <ColorInput
                  label="Primary"
                  cssVar="--primary"
                  value={primaryHex}
                  onChange={(_, v) => setPrimaryHex(v)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DialogShowcase() {
  // Primitive example
  const [primitiveOpen, setPrimitiveOpen] = React.useState(false)

  // Dialog patterns (previously in the separate "Modal" tab)
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [scrollOpen, setScrollOpen] = React.useState(false)
  const [dangerOpen, setDangerOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [responsiveOpen, setResponsiveOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Dialog</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Radix dialog primitives with token-driven styling.
          </div>

          <Dialog open={primitiveOpen} onOpenChange={setPrimitiveOpen}>
            <DialogTrigger asChild>
              <span className="inline-flex">
                <Button>Open dialog</Button>
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogDescription>
                  Short description goes here.
                </DialogDescription>
              </DialogHeader>

              <div className="text-sm text-muted-foreground">
                Dialog body content. Keep UI-only; apps provide business logic.
              </div>

              <DialogFooter>
                <Button variant="secondary" onClick={() => setPrimitiveOpen(false)}>Cancel</Button>
                <Button onClick={() => setPrimitiveOpen(false)}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Dialog patterns</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A standard centered dialog with header, body, and footer.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={() => setBasicOpen(true)}>Open dialog</Button>

              <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
                  <div className="px-5 py-4">
                    <DialogTitle className="text-base font-semibold text-foreground">Basic dialog</DialogTitle>
                    <DialogDescription className="mt-1">Short description goes here.</DialogDescription>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 text-sm text-muted-foreground">
                    Dialog body content. Keep it UI-only; apps provide business logic.
                  </div>

                  <Separator />

                  <div className="px-5 py-4 flex items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setBasicOpen(false)}>Cancel</Button>
                    <Button onClick={() => setBasicOpen(false)}>Confirm</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scrollable</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Long content with an internal scroll area and footer actions.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={() => setScrollOpen(true)}>Open scrollable</Button>

              <Dialog open={scrollOpen} onOpenChange={setScrollOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-2xl">
                  <div className="px-5 py-4">
                    <DialogTitle className="text-base font-semibold text-foreground">Dialog with scroll</DialogTitle>
                    <DialogDescription className="mt-1">Demonstrates a scrollable body area.</DialogDescription>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 max-h-[60vh] overflow-y-auto text-sm text-muted-foreground space-y-3">
                    <div className="text-foreground font-medium">Let’s Talk Paragraph</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nec sagittis aliquam malesuada bibendum arcu vitae.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nec sagittis aliquam malesuada bibendum arcu vitae.</p>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 flex items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setScrollOpen(false)}>Close</Button>
                    <Button onClick={() => setScrollOpen(false)}>I Understand</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Danger</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Destructive confirmation dialog.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="danger" onClick={() => setDangerOpen(true)}>Delete item</Button>

              <Dialog open={dangerOpen} onOpenChange={setDangerOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
                  <div className="px-5 py-4">
                    <DialogTitle className="text-base font-semibold text-foreground">Delete 1 item?</DialogTitle>
                    <DialogDescription className="mt-1">This action cannot be undone.</DialogDescription>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 text-sm text-muted-foreground">
                    Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus interdum.
                  </div>

                  <Separator />

                  <div className="px-5 py-4 flex items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDangerOpen(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => setDangerOpen(false)}>Yes, delete</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Side sheet (Drawer)</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A modal-like panel from the side (best for dense/long content).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open side sheet</Button>

              <Drawer open={sheetOpen} onOpenChange={setSheetOpen} direction="right">
                <DrawerContent className="p-0">
                  <div className="px-5 py-4">
                    <DrawerTitle className="text-base">Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 overflow-y-auto max-h-[70vh] space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  </div>

                  <Separator />

                  <DrawerFooter className="px-5 py-4">
                    <Button onClick={() => setSheetOpen(false)} className="w-full">Submit</Button>
                    <Button variant="secondary" onClick={() => setSheetOpen(false)} className="w-full">Cancel</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Responsive dialog</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Uses a centered dialog on desktop and a drawer on mobile.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={() => setResponsiveOpen(true)}>Edit profile</Button>

              <ResponsiveDialog
                open={responsiveOpen}
                onOpenChange={setResponsiveOpen}
                title="Edit profile"
                description="Make changes to your profile here. Click save when you're done."
                footer={
                  <div className="flex w-full items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setResponsiveOpen(false)}>Cancel</Button>
                    <Button onClick={() => setResponsiveOpen(false)}>Save changes</Button>
                  </div>
                }
              >
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <div className="text-sm font-medium text-foreground">Email</div>
                    <Input defaultValue="shadcn@example.com" aria-label="Email" />
                  </div>
                  <div className="grid gap-1.5">
                    <div className="text-sm font-medium text-foreground">Username</div>
                    <Input defaultValue="@shadcn" aria-label="Username" />
                  </div>
                </div>
              </ResponsiveDialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DrawerShowcase() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Drawer</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Vaul drawer primitives with token-driven styling.
          </div>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <span className="inline-flex">
                <Button>Open drawer</Button>
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer title</DrawerTitle>
                <DrawerDescription>Short description goes here.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                Drawer content.
              </div>
              <DrawerFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Done</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </div>
  )
}

function SheetShowcase() {
  const [open, setOpen] = React.useState(false)
  const [side, setSide] = React.useState<'top' | 'right' | 'bottom' | 'left'>('right')
  const [noCloseOpen, setNoCloseOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Sheet</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Side</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">side</span> to control where the sheet appears. Sheets are inset (not edge-to-edge) and can be wider than a small drawer.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ['Top', 'top'],
                    ['Right', 'right'],
                    ['Bottom', 'bottom'],
                    ['Left', 'left'],
                  ] as const
                ).map(([label, nextSide]) => (
                  <Button
                    key={nextSide}
                    variant="outline"
                    onClick={() => {
                      setSide(nextSide)
                      setOpen(true)
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine results without leaving the page.</SheetDescription>
                  </SheetHeader>

                  <div className="px-6 pb-6 space-y-4 overflow-y-auto">
                    <div className="text-sm font-medium text-foreground">Status</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Draft</Badge>
                      <Badge variant="accent">Active</Badge>
                      <Badge variant="muted">Archived</Badge>
                    </div>

                    <div className="text-sm font-medium text-foreground pt-2">Assignee</div>
                    <Input placeholder="Search people..." />
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button>Apply</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No close button</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">showCloseButton={'{false}'}</span> when you provide a primary action inside the sheet.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Sheet open={noCloseOpen} onOpenChange={setNoCloseOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open sheet</Button>
                </SheetTrigger>
                <SheetContent side="right" showCloseButton={false}>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="px-6 pb-6 space-y-4 overflow-y-auto">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input defaultValue="@peduarte" />
                    </div>
                  </div>
                  <SheetFooter className="flex-col gap-2 sm:flex-col sm:justify-start">
                    <SheetClose asChild>
                      <Button className="w-full">Save changes</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="tertiary" className="w-full">
                        Cancel
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TableShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Table</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for dense data. Prefer server-side pagination and filtering for large datasets.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Table>
                <TableCaption>Showing 4 items</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Worker Verification Letter", status: "Active", badge: "accent" as const },
                    { name: "Demo", status: "Locked", badge: "secondary" as const },
                    { name: "Demo", status: "Locked", badge: "secondary" as const },
                    { name: "Demo", status: "Draft", badge: "muted" as const },
                  ].map((row, idx) => (
                    <TableRow key={`${row.name}-${idx}`}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <Badge variant={row.badge}>{row.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" aria-hidden />
                          Preview
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HoverCardShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Hover card</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Profile preview</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for lightweight previews (don’t hide critical actions behind hover).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button type="button" className="text-sm font-medium text-primary underline underline-offset-4">
                    Hover me
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted grid place-items-center">
                      <User className="h-5 w-5 text-muted-foreground" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">Mindtris Inc.</div>
                      <div className="text-sm text-muted-foreground">admin@mindtris.com</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Typically used for quick context and lightweight previews.
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CardDecoratorShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Card decorator</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon callout</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for empty states, feature callouts, and lightweight visual hierarchy.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <CardDecorator>
                <BookmarkPlus className="h-5 w-5 text-foreground" aria-hidden />
              </CardDecorator>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PopoverShowcase() {
  const [openAlign, setOpenAlign] = React.useState<'start' | 'center' | 'end' | null>(null)
  const [openForm, setOpenForm] = React.useState<'top' | 'bottom' | null>(null)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Popover</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A simple popover with a header, title, and description.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Popover>
                <PopoverTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary">Open Popover</Button>
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                  <div className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Align</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the <span className="text-foreground font-medium">align</span> prop on{" "}
              <span className="text-foreground font-medium">PopoverContent</span> to control the horizontal alignment.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Popover open={openAlign === 'start'} onOpenChange={(o) => setOpenAlign(o ? 'start' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('start')}>Start</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to start.</div>
                  </PopoverContent>
                </Popover>

                <Popover open={openAlign === 'center'} onOpenChange={(o) => setOpenAlign(o ? 'center' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('center')}>Center</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="center" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to center.</div>
                  </PopoverContent>
                </Popover>

                <Popover open={openAlign === 'end'} onOpenChange={(o) => setOpenAlign(o ? 'end' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('end')}>End</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to end.</div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With Form</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A popover with form fields inside.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Popover open={openForm === 'top'} onOpenChange={(o) => setOpenForm(o ? 'top' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenForm('top')}>Top</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-[340px]">
                  <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Set the dimensions for the layer.
                  </div>

                  <div className="grid gap-3">
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Width</div>
                      <Input defaultValue="100%" aria-label="Width" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Max. width</div>
                      <Input defaultValue="300px" aria-label="Max width" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Height</div>
                      <Input defaultValue="25px" aria-label="Height" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Max. height</div>
                      <Input defaultValue="none" aria-label="Max height" />
                    </div>
                  </div>
                  </PopoverContent>
                </Popover>

                <Popover open={openForm === 'bottom'} onOpenChange={(o) => setOpenForm(o ? 'bottom' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenForm('bottom')}>Bottom</Button>
                    </span>
                  </PopoverTrigger>
                  {/* For the demo, force the requested side (no auto-flip). */}
                  <PopoverContent side="bottom" avoidCollisions={false} className="w-[340px]">
                    <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Set the dimensions for the layer.
                    </div>

                    <div className="grid gap-3">
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Width</div>
                        <Input defaultValue="100%" aria-label="Width" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Max. width</div>
                        <Input defaultValue="300px" aria-label="Max width" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Height</div>
                        <Input defaultValue="25px" aria-label="Height" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Max. height</div>
                        <Input defaultValue="none" aria-label="Max height" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProgressShowcase() {
  const [value, setValue] = React.useState(20)
  const [upload, setUpload] = React.useState(66)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Progress</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Label</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pair the progress bar with a label and percentage.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-foreground">Upload progress</div>
                  <div className="text-sm font-medium text-foreground">{upload}%</div>
                </div>
              <Progress value={upload} variant="foreground" size="lg" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controlled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A progress bar that can be controlled by a slider.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Progress value={value} variant="foreground" size="lg" />
                <Slider
                  value={[value]}
                  onValueChange={(v) => setValue(v[0] ?? 0)}
                  max={100}
                  step={1}
                  size="lg"
                  variant="foreground"
                  aria-label="Progress value"
                />
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{value}%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Token Variants</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Demonstrates semantic token colors (not hardcoded palette values).
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              {(
                [
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["accent", "Accent"],
                  ["destructive", "Destructive"],
                  ["muted", "Muted"],
                  ["tertiary", "Tertiary"],
                  ["foreground", "Foreground"],
                ] as const
              ).map(([variant, label]) => (
                <div key={variant}>
                  <div className="text-sm font-medium text-foreground mb-2">{label}</div>
                  <Progress value={66} variant={variant} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Explicit sizing via <span className="text-foreground font-medium">size</span> (can still be overridden with <span className="text-foreground font-medium">className</span>).
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                {/* Note: keep explicit `h-1` here so Tailwind generates the class (workspace package classes may not be scanned). */}
                <Progress value={66} variant="foreground" size="sm" className="h-1" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Medium</div>
                <Progress value={66} variant="foreground" size="md" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <Progress value={66} variant="foreground" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SliderShowcase() {
  const [value, setValue] = React.useState<number[]>([40])
  const [range, setRange] = React.useState<number[]>([20, 80])
  const [vertical, setVertical] = React.useState<number[]>([60])

  const stepMarks = React.useMemo(
    () =>
      [0, 25, 50, 75, 100].map((v) => ({
        value: v,
        label: `${v}`,
      })),
    []
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Slider</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controlled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A controlled slider for interactive values.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={100}
                  step={1}
                  size="md"
                  variant="foreground"
                  marks={stepMarks}
                  showMarkLabels
                  thumbStyle="outline"
                  aria-label="Slider value"
                />
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{value[0] ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Range</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multiple thumbs using an array value.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Slider
                  value={range}
                  onValueChange={setRange}
                  max={100}
                  step={1}
                  size="md"
                  variant="foreground"
                  marks={stepMarks}
                  showMarkLabels
                  aria-label="Slider range"
                />
                <div className="text-sm text-muted-foreground">
                  Range:{' '}
                  <span className="text-foreground font-medium">
                    {range[0] ?? 0} – {range[1] ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Radix supports <span className="text-foreground font-medium">orientation="vertical"</span> with token styling.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-10">
                <div className="h-56">
                  <Slider
                    orientation="vertical"
                    value={vertical}
                    onValueChange={setVertical}
                    min={0}
                    max={100}
                    step={1}
                    size="md"
                    variant="primary"
                    thumbStyle="solid"
                    marks={stepMarks}
                    showMarkLabels
                    aria-label="Vertical slider"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{vertical[0] ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Variants</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Semantic token variants for the filled range and thumb.
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              {(
                [
                  ['foreground', 'Foreground'],
                  ['tertiary', 'Tertiary'],
                  ['primary', 'Primary'],
                  ['secondary', 'Secondary'],
                  ['accent', 'Accent'],
                  ['destructive', 'Destructive'],
                  ['muted', 'Muted'],
                ] as const
              ).map(([variant, label]) => (
                <div key={variant}>
                  <div className="text-sm font-medium text-foreground mb-2">{label}</div>
                  <div className="max-w-[520px]">
                    <Slider
                      defaultValue={[40]}
                      max={100}
                      step={1}
                      variant={variant}
                      thumbStyle="solid"
                      aria-label={`${label} slider`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Explicit sizing via <span className="text-foreground font-medium">size</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="sm" aria-label="Small slider" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Medium</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="md" aria-label="Medium slider" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="lg" aria-label="Large slider" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disabled state (non-interactive).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <Slider defaultValue={[50]} max={100} step={1} size="md" disabled aria-label="Disabled slider" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PaginationShowcase() {
  const [page, setPage] = React.useState(1)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Numeric</h2>
        <Pagination page={page} totalPages={9} onPageChange={setPage} />
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Classic</h2>
        <Pagination
          variant="classic"
          page={page}
          totalPages={47}
          onPageChange={setPage}
          summary={
            <>Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">10</span> of <span className="font-medium text-foreground">467</span> results</>
          }
        />
      </section>
    </div>
  )
}

function ToggleShowcase() {
  const [on, setOn] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Toggle</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With icon</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Icons can be used alongside text or on their own (toolbar actions).
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle defaultPressed aria-label="Bookmark">
                <BookmarkPlus aria-hidden />
                Bookmark
              </Toggle>
              <Toggle variant="outline" defaultPressed aria-label="Save">
                <Save aria-hidden />
                Save
              </Toggle>
              <Toggle variant="outline" size="sm" defaultPressed aria-label="Audio">
                <AudioLines aria-hidden />
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With text</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A two-state button that can be either on or off.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle pressed={on} onPressedChange={setOn} aria-label="Bookmark">
                Bookmark
              </Toggle>
              <Toggle pressed={!on} onPressedChange={(v) => setOn(!v)} aria-label="Italic" variant="outline">
                <span className="italic">Italic</span>
              </Toggle>
              <Toggle pressed={on} onPressedChange={setOn} aria-label="Bold" variant="outline">
                <span className="font-semibold">Bold</span>
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Active colors</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">activeVariant</span> to match the semantic tone (no accent/violet by default).
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle defaultPressed activeVariant="primary" aria-label="Primary active">
                Primary
              </Toggle>
              <Toggle defaultPressed activeVariant="secondary" aria-label="Secondary active">
                Secondary
              </Toggle>
              <Toggle defaultPressed activeVariant="tertiary" aria-label="Tertiary active">
                Tertiary
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Size</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Match the surrounding density by setting <span className="text-foreground font-medium">size</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle size="sm" defaultPressed aria-label="Small toggle">
                Small
              </Toggle>
              <Toggle size="default" defaultPressed aria-label="Default toggle">
                Default
              </Toggle>
              <Toggle size="lg" defaultPressed aria-label="Large toggle">
                Large
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disabled toggles can’t be interacted with and should clearly communicate state.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle disabled aria-label="Disabled off">
                Disabled
              </Toggle>
              <Toggle disabled defaultPressed aria-label="Disabled on">
                Disabled
              </Toggle>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SelectShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Select (Radix)</h2>
        <div className="rounded-xl border border-border bg-card p-8 flex items-center justify-center">
          <SelectRoot defaultValue="account">
            <SelectTrigger className="min-w-[14rem]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pages</SelectLabel>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="notifications">Notifications</SelectItem>
                <SelectItem value="integrations">Integrations</SelectItem>
                <SelectSeparator />
                <SelectItem value="billing">Billing</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectRoot>
        </div>
      </section>
    </div>
  )
}

function SeparatorShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Separator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Horizontal</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Default separator between stacked content.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="text-sm text-foreground">Section A</div>
              <Separator className="my-4" />
              <div className="text-sm text-foreground">Section B</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">orientation="vertical"</span> for vertical separators.
            </div>
            <div className="rounded-xl border border-border bg-card p-8 flex items-center justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Blog</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Docs</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Source</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Menu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Vertical separators between menu items with descriptions.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              {/* Desktop: single row with vertical separators */}
              <div className="hidden sm:flex items-center justify-center text-center">
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Settings</div>
                  <div className="text-sm text-muted-foreground">Manage preferences</div>
                </div>
                <Separator orientation="vertical" className="mx-8 h-10 self-center" />
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Account</div>
                  <div className="text-sm text-muted-foreground">Profile &amp; security</div>
                </div>
                <Separator orientation="vertical" className="mx-8 h-10 self-center" />
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Help</div>
                  <div className="text-sm text-muted-foreground">Support &amp; docs</div>
                </div>
              </div>

              {/* Mobile: stacked items (no vertical separators) */}
              <div className="sm:hidden space-y-4 text-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Settings</div>
                  <div className="text-sm text-muted-foreground">Manage preferences</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Account</div>
                  <div className="text-sm text-muted-foreground">Profile &amp; security</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Help</div>
                  <div className="text-sm text-muted-foreground">Support &amp; docs</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">List</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Horizontal separators between list items.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto">
                <div className="text-sm">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 1</div>
                    <div className="text-muted-foreground">Value 1</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 2</div>
                    <div className="text-muted-foreground">Value 2</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 3</div>
                    <div className="text-muted-foreground">Value 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Semantic vs Decorative</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Default is decorative (presentation). Set <span className="text-foreground font-medium">decorative={'{false}'}</span> when the separator conveys meaning.
            </div>
            <div className="rounded-xl border border-border bg-card p-8 space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Decorative (default)</div>
                <div className="text-sm text-muted-foreground">No announcement to assistive tech.</div>
                <Separator className="mt-3" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Semantic</div>
                <div className="text-sm text-muted-foreground">Acts as a real separator.</div>
                <Separator decorative={false} className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SkeletonShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Skeleton</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Avatar</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Common “user row” placeholder (circle + text).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-4 max-w-[520px] mx-auto" aria-busy="true">
                <Skeleton className="h-10 w-10" radius="full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2 mt-2" tone="accent" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Card</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Image + content skeleton (composition-first).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[560px] mx-auto">
                <CardSkeleton />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Text</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multi-line placeholder using <span className="text-foreground font-medium">lines</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto" aria-busy="true">
                <Skeleton lines={3} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Form</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Label + input + button placeholders (mobile-first layout).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto space-y-5" aria-busy="true">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-full" radius="md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-full" radius="md" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Skeleton className="h-9 w-20" radius="md" tone="accent" />
                  <Skeleton className="h-9 w-28" radius="md" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Table</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Dense rows/columns placeholder.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[820px] mx-auto" aria-busy="true">
                <TableSkeleton rows={5} columns={4} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SonnerShowcase() {
  const searchParams = useSearchParams()

  const currentPosition =
    (searchParams.get('toasterPosition') as
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
      | null) ?? 'bottom-right'

  const makePositionHref = (position: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'sonner')
    params.set('toasterPosition', position)
    return `/components?${params.toString()}`
  }

  const v = searchParams.get('toasterVariant')
  const currentVariant = v === 'solid' || v === 'soft' ? v : 'default'
  const makeVariantHref = (variant: 'default' | 'soft' | 'solid') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'sonner')
    params.set('toasterVariant', variant)
    return `/components?${params.toString()}`
  }

  type NotificationTone = 'success' | 'info' | 'warning' | 'error' | 'neutral'

  const notify = (tone: NotificationTone, withDescription: boolean) => {
    const description = withDescription
      ? tone === 'neutral'
        ? 'We’ll notify you when processing completes.'
        : tone === 'success'
          ? 'Your changes have been saved successfully.'
          : tone === 'info'
            ? 'You have a new notification waiting.'
            : tone === 'warning'
              ? 'You are running low on space. Consider cleaning up files.'
              : 'Please try again. If the problem persists, contact support.'
      : undefined

    // Use the toaster's token-driven type colors + Lucide icons (configured globally).
    // Neutral intentionally shows no icon.
    switch (tone) {
      case 'success':
        toast.success('Saved', { description })
        return
      case 'info':
        toast.info('New message', { description })
        return
      case 'warning':
        toast.warning('Low storage', { description })
        return
      case 'error':
        toast.error('Something went wrong', { description })
        return
      default:
        toast('Event has been created.', { description })
    }
  }

  const showEdgeCases = () => {
    toast('A very long notification title that should wrap cleanly without looking bold or cramped', {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      closeButton: true,
    })

    window.setTimeout(() => notify('success', false), 150)
    window.setTimeout(() => notify('info', false), 300)
    window.setTimeout(() => notify('warning', false), 450)
    window.setTimeout(() => notify('error', false), 600)
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Sonner</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Notifications</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Token-driven tones for common notification states (success, info, warning, error).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={currentVariant === 'default' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('default')} />}
                  >
                    Default
                  </Button>
                  <Button
                    size="sm"
                    variant={currentVariant === 'soft' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('soft')} />}
                  >
                    Soft
                  </Button>
                  <Button
                    size="sm"
                    variant={currentVariant === 'solid' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('solid')} />}
                  >
                    Solid
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" onClick={() => notify('neutral', false)}>Neutral</Button>
                <Button variant="secondary" onClick={() => notify('success', false)}>Success</Button>
                <Button variant="secondary" onClick={() => notify('info', false)}>Info</Button>
                <Button variant="secondary" onClick={() => notify('warning', false)}>Warning</Button>
                <Button variant="secondary" onClick={() => notify('error', false)}>Error</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With description</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Notification-style copy (title + body), with tight title/description spacing.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" onClick={() => notify('neutral', true)}>Neutral</Button>
                <Button variant="secondary" onClick={() => notify('success', true)}>Success</Button>
                <Button variant="secondary" onClick={() => notify('info', true)}>Info</Button>
                <Button variant="secondary" onClick={() => notify('warning', true)}>Warning</Button>
                <Button variant="secondary" onClick={() => notify('error', true)}>Error</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Closable</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Optional close button on the right (use <span className="text-foreground font-medium">closeButton: true</span>).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast('Saved', {
                      closeButton: true,
                    })
                  }
                >
                  Without description
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast('Merged Pull Request', {
                      description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod tempor incididunt ut labore et dolore.',
                      closeButton: true,
                    })
                  }
                >
                  With description
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Position</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Uses the <span className="text-foreground font-medium">position</span> prop on the Toaster.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ['top-left', 'Top Left'],
                    ['top-center', 'Top Center'],
                    ['top-right', 'Top Right'],
                    ['bottom-left', 'Bottom Left'],
                    ['bottom-center', 'Bottom Center'],
                    ['bottom-right', 'Bottom Right'],
                  ] as const
                ).map(([pos, label]) => (
                  <Button
                    key={pos}
                    variant={currentPosition === pos ? 'primary' : 'secondary'}
                    size="sm"
                    render={<Link href={makePositionHref(pos)} />}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  Current: <span className="text-foreground font-medium">{currentPosition}</span>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => toast('Position test')}
                >
                  Show toast
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real‑world behavior</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Long titles, stacking, and rapid updates.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={showEdgeCases}>Run edge cases</Button>
            </div>
          </div>

          {/* Presets removed per request (keep Sonner-focused demos). */}
        </div>
      </section>
    </div>
  )
}

function TabsShowcase() {
  const [pill, setPill] = React.useState('settings')
  const [underline, setUnderline] = React.useState('reports')
  const [underlineSeparator, setUnderlineSeparator] = React.useState('overview')
  const [iconTabs, setIconTabs] = React.useState('account')
  const [iconUnderline, setIconUnderline] = React.useState('account')
  const [pillContainer, setPillContainer] = React.useState('colors')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Tabs</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Segmented</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for switching between closely related views. The tab strip and content should feel like one component.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot value={pill} onValueChange={setPill} className="w-full max-w-[720px] gap-1">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="settings">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Settings</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Manage your account preferences and options. Customize your experience to fit your needs.
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="overview">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Overview</div>
                    <div className="text-sm text-muted-foreground mt-1">Key metrics and high-level summaries.</div>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Analytics</div>
                    <div className="text-sm text-muted-foreground mt-1">Trends, charts, and deeper insights.</div>
                  </div>
                </TabsContent>
                <TabsContent value="reports">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Reports</div>
                    <div className="text-sm text-muted-foreground mt-1">Exportable reports and scheduled summaries.</div>
                  </div>
                </TabsContent>
              </TabsRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Pills</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pill-style tabs for switching contexts (billing sections, settings categories, step groups).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Basic</div>
                  <Tabs
                    items={[
                      { id: 'account', label: 'Account' },
                      { id: 'notifications', label: 'Notifications' },
                      { id: 'integrations', label: 'Integrations' },
                      { id: 'plans', label: 'Plans' },
                      { id: 'billing', label: 'Billing' },
                    ]}
                    value={iconTabs}
                    onValueChange={setIconTabs}
                    variant="container"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Inside container</div>
                  <div className="p-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <TabsWithContainer
                        items={[
                          { id: 'colors', label: 'Colors' },
                          { id: 'typography', label: 'Typography' },
                          { id: 'others', label: 'Others' },
                        ]}
                        value={pillContainer}
                        onValueChange={setPillContainer}
                      />
                    </div>
                    <div className="mt-4 border-t border-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Underline</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when tabs behave like top-level navigation within a page.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Clean underline</div>
                  <TabsRoot value={underline} onValueChange={setUnderline} className="w-fit">
                    <TabsList variant="line">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Underline + separator</div>
                  <TabsRoot value={underlineSeparator} onValueChange={setUnderlineSeparator} className="w-full max-w-[720px]">
                    <TabsList variant="line-separator" className="justify-start">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon tabs</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Icon + label tabs for compact dashboards and toolbars.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Underline with icons</div>
                  <TabsRoot value={iconUnderline} onValueChange={setIconUnderline} className="w-full">
                    <TabsList variant="line-separator" className="justify-start gap-10">
                      <TabsTrigger
                        value="account"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <User className="h-4 w-4" aria-hidden />
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <Bell className="h-4 w-4" aria-hidden />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="integrations"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden />
                        Integrations
                      </TabsTrigger>
                      <TabsTrigger
                        value="plans"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <BookmarkPlus className="h-4 w-4" aria-hidden />
                        Plans
                      </TabsTrigger>
                      <TabsTrigger
                        value="billing"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <CreditCard className="h-4 w-4" aria-hidden />
                        Billing
                      </TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Pills with icons</div>
                  <Tabs
                    items={[
                      { id: 'account', label: 'Account', icon: <User className="h-4 w-4" aria-hidden /> },
                      { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" aria-hidden /> },
                      { id: 'integrations', label: 'Integrations', icon: <ChevronRight className="h-4 w-4" aria-hidden /> },
                      { id: 'plans', label: 'Plans', icon: <BookmarkPlus className="h-4 w-4" aria-hidden /> },
                      { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" aria-hidden /> },
                    ]}
                    value={iconTabs}
                    onValueChange={setIconTabs}
                    variant="container"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Orientation controls layout. Alignment can be controlled via container styles.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot defaultValue="account" orientation="vertical" className="flex-row gap-4">
                <TabsList className="flex-col h-auto bg-muted p-1 rounded-lg items-start">
                  <TabsTrigger className="w-full justify-start" value="account">
                    Account
                  </TabsTrigger>
                  <TabsTrigger className="w-full justify-start" value="password">
                    Password
                  </TabsTrigger>
                  <TabsTrigger className="w-full justify-start" value="notifications">
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </TabsRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use disabled tabs to communicate unavailable sections (permissions, plan limits).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot defaultValue="home">
                <TabsList>
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    Disabled
                  </TabsTrigger>
                </TabsList>
              </TabsRoot>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function LabelShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Label</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="label-email">Email</Label>
              <Input id="label-email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label-disabled">Disabled</Label>
              <Input id="label-disabled" placeholder="Disabled input" disabled />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CommandShowcase() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k'
      const isMod = e.ctrlKey || e.metaKey
      if (isMod && isK) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl text-foreground font-semibold">Command</h2>
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Open dialog
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="text-sm text-muted-foreground">
            Type to filter items. Use arrow keys and enter to select. Shortcut: <span className="text-foreground font-medium">Ctrl K</span>.
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <span>Calendar</span>
                    <CommandShortcut>Ctrl K</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <span>Settings</span>
                    <CommandShortcut>Ctrl S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem onSelect={() => toast('Created')}>
                    <span>Create</span>
                  </CommandItem>
                  <CommandItem onSelect={() => toast('Saved')}>
                    <span>Save</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => setOpen(false)}>
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <span>Components</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>
    </div>
  )
}

function ScrollAreaShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Scroll area</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <ScrollArea className="h-56 w-full rounded-xl border border-border">
            <div className="p-4 space-y-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-3">
                  <div className="text-sm font-medium text-foreground">Row {i + 1}</div>
                  <div className="text-sm text-muted-foreground">
                    This is scrollable content inside a token-styled scroll area.
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
    </div>
  )
}

function ResizableShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Resizable</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="h-64 rounded-xl border border-border overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full p-4">
                  <div className="text-sm font-medium text-foreground">Panel A</div>
                  <div className="text-sm text-muted-foreground mt-1">Drag the handle to resize.</div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60} minSize={20}>
                <div className="h-full p-4">
                  <div className="text-sm font-medium text-foreground">Panel B</div>
                  <div className="text-sm text-muted-foreground mt-1">This panel can grow and shrink.</div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </section>
    </div>
  )
}

function TooltipShowcase() {
  const [previewVariant, setPreviewVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Tooltip Types</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start gap-10">
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Label</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  Just a tip
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Basic</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="max-w-[18rem] whitespace-normal">
                  Excepteur sint occaecat cupidatat non proident, sunt in.
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Large</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="px-4 py-2 text-sm font-medium">
                  Excepteur sint occaecat cupidatat non proident, sunt in.
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Rich</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="max-w-[22rem] whitespace-normal">
                  <div className="text-xs space-y-1">
                    <div className="font-medium">Let's Talk Paragraph</div>
                    <div className="opacity-80">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Side</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="primary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Primary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="primary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="secondary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Secondary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="secondary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="tertiary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Tertiary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="tertiary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            {/* Side demos (inline) */}
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Left
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={8}>
                  Left
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Top
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  Top
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Bottom
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Bottom
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Right
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Right
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Keyboard Shortcut</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button variant="secondary" size="icon" aria-label="Save changes">
                  <Save className="h-4 w-4" aria-hidden />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className="flex items-center gap-3 px-3 py-2">
              <span className="text-sm font-medium">Save Changes</span>
              <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-md bg-background/10 text-primary-foreground border border-primary-foreground/20">
                <span className="text-xs font-semibold leading-none">S</span>
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Disabled Button</h2>
        <div className="text-sm text-muted-foreground mb-3">
          Show a tooltip on a disabled button by wrapping it with a <span className="text-foreground font-medium">span</span>.
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              This feature is currently unavailable
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </div>
  )
}

function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Avatar</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Core</div>
              <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                <Avatar size="lg" src="/images/avatar-01.jpg" alt="Profile photo" fallback="P" />
                <Avatar size="lg" alt="Q" fallback="Q" />
                <Avatar size="lg" alt="User" fallback={<User className="h-4 w-4" aria-hidden />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Avatars with Status</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Avatar size="xs" alt="Q" fallback="Q" status="destructive" />
            <Avatar size="sm" alt="Q" fallback="Q" status="primary" />
            <Avatar size="md" alt="Q" fallback="Q" status="destructive" />
            <Avatar size="lg" alt="Q" fallback="Q" status="primary" />
            <Avatar size="xl" alt="Q" fallback="Q" status="destructive" />
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Status colors use semantic tokens (e.g. <span className="font-medium text-foreground">primary</span>,{' '}
          <span className="font-medium text-foreground">destructive</span>) — no hardcoded colors.
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Avatar Groups</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Small</div>
            <AvatarGroup overlap="sm">
              <Avatar size="sm" alt="AC" fallback="AC" />
              <Avatar size="sm" alt="BK" fallback="BK" />
              <Avatar size="sm" alt="CM" fallback="CM" />
              <Avatar size="sm" alt="DT" fallback="DT" />
              <Avatar size="sm" alt="EV" fallback="EV" />
            </AvatarGroup>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Medium</div>
            <AvatarGroup overlap="md">
              <Avatar size="md" alt="AC" fallback="AC" />
              <Avatar size="md" alt="BK" fallback="BK" />
              <Avatar size="md" alt="CM" fallback="CM" />
              <Avatar size="md" alt="DT" fallback="DT" />
              <Avatar size="md" alt="EV" fallback="EV" />
            </AvatarGroup>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Large</div>
            <AvatarGroup overlap="lg">
              <Avatar size="xl" alt="AC" fallback="AC" />
              <Avatar size="xl" alt="BK" fallback="BK" />
              <Avatar size="xl" alt="CM" fallback="CM" />
              <Avatar size="xl" alt="DT" fallback="DT" />
              <Avatar size="xl" alt="EV" fallback="EV" />
            </AvatarGroup>
          </div>
        </div>
      </section>
    </div>
  )
}

function AccordionShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Basic Accordion</h2>
        <Accordion title="Accordion Title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionTableRowExample />
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Rich Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionRichTableRowExample />
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

function AccordionTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left tabular-nums font-medium text-foreground">$129.00</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted/70 text-foreground border border-border">
            Refunded
          </span>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-center text-muted-foreground">1</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">New Mexico, MX</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">Subscription</td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={7} className="px-3 pb-3">
          <div className="mt-2 bg-muted/30 p-3 rounded-lg text-muted-foreground">
            <div className="italic">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function AccordionRichTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">mark.cameron@app.com</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">London, UK</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">22/01/2024</td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-foreground">+249.88</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={6} className="px-3 pb-3">
          <div className="mt-2 bg-muted/30 p-3 rounded-lg text-muted-foreground">
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">Excepteur sint occaecat cupidatat.</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="mt-3">
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function ButtonsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div>
              <div className="text-sm font-medium text-foreground">Core</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Outline</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="outline">Outline</Button>
                <Button variant="outline-strong">Border</Button>
                <Button variant="menu">Menu</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Danger</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Danger Outline</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="danger-outline">Danger</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Icons</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Icons</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button leadingIcon={<Check className="h-4 w-4" aria-hidden />}>Confirm</Button>
            <Button trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>Next</Button>
            <Button
              leadingIcon={<Info className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}
            >
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Sizes</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Text</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Icon</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="icon-xs" aria-label="Settings (xs)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-sm" aria-label="Settings (sm)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon" aria-label="Settings (md)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-lg" aria-label="Settings (lg)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-xl" aria-label="Settings (xl)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Text Weight</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Text weight</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button variant="outline">Default</Button>
            <Button variant="outline" weight="strong">
              Strong
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Fill width</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Width</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <div className="w-full sm:w-[320px]">
              <Button fullWidth>
                Filled
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Loading</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Loading</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button isLoading>Loading</Button>
            <Button variant="secondary" isLoading>
              Processing
            </Button>
            <Button variant="tertiary" isLoading>
              Saving
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Animations</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Animations</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button arrowIcon>Arrow</Button>
            <Button motion="lift">Lift</Button>
            <Button arrowIcon motion="lift">
              Arrow + Lift
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Horizontal alignment</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-3">
            <Button fullWidth align="left" leadingIcon={<Check className="h-4 w-4" aria-hidden />}>
              Left Aligned
            </Button>
            <Button fullWidth align="center">Center Aligned</Button>
            <Button fullWidth align="right" trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}>
              Right Aligned
            </Button>
            <Button
              fullWidth
              align="between"
              leadingIcon={<Check className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}
            >
              Space Between
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Pill Buttons</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Pill styles</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button shape="pill">Primary</Button>
              <Button variant="secondary" shape="pill">
                Secondary
              </Button>
              <Button variant="outline-strong" shape="pill">
                Outline
              </Button>
              <Button variant="secondary" shape="pill" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Search pill</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="md"
                shape="pill"
                align="between"
                className="w-[260px] max-w-full"
                leadingIcon={<Search className="h-4 w-4" aria-hidden />}
                trailingIcon={
                  <span className="text-xs px-3 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground">
                    Ctrl + K
                  </span>
                }
              >
                Search
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Pill icons</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="icon-ghost" size="icon-sm" shape="pill" aria-label="Help (ghost)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Preview">
                <Eye className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Help">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                size="icon-sm"
                shape="pill"
                aria-label="Theme toggle style"
                className="bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Theme toggle style</span>
                <Moon className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" disabled aria-label="Help (disabled)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComponentsPageContent />
    </React.Suspense>
  )
}

