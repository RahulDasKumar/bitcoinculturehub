import React, { createContext, useContext, useState, useEffect } from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const SheetContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
} | null>(null)

export const Sheet = ({ children }: { children?: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    )
}

export const SheetTrigger = ({
    children,
    asChild,
    className,
}: {
    children?: React.ReactNode
    asChild?: boolean
    className?: string
}) => {
    const context = useContext(SheetContext)
    if (!context) throw new Error("SheetTrigger must be used within a Sheet")

    const handleClick = () => context.setOpen(true)

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: handleClick,
            className: cn(className, (children.props as any).className)
        })
    }

    return <button onClick={handleClick} className={className}>{children}</button>
}

const sheetVariants = cva(
    "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom:
                    "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                right:
                    "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
)

interface SheetContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> { }

export const SheetContent = ({
    children,
    side = "right",
    className,
    ...props
}: SheetContentProps) => {
    const context = useContext(SheetContext)
    if (!context) throw new Error("SheetContent must be used within a Sheet")
    const { open, setOpen } = context

    // Prevent scrolling on body when sheet is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [open])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                onClick={() => setOpen(false)}
                data-state={open ? 'open' : 'closed'}
            />

            {/* Content */}
            <div
                className={cn(sheetVariants({ side }), className)}
                data-state={open ? 'open' : 'closed'}
                {...props}
            >
                <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100"
                    onClick={() => setOpen(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
                {children}
            </div>
        </div>
    )
}

export const SheetHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)

export const SheetTitle = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
        className={cn(
            "text-lg font-semibold text-slate-950",
            className
        )}
        {...props}
    />
)

export const SheetDescription = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn("text-sm text-slate-500", className)}
        {...props}
    />
)