import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex relative duration-300 items-center cursor-pointer active:scale-[0.95] justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 aria-invalid:ring-red-300 dark:aria-invalid:ring-red-500 aria-invalid:border-red-400",
  {
    variants: {
      variant: {
        default:
          'bg-blue-600 text-white shadow hover:bg-blue-700',
        destructive:
          'bg-red-600 text-white shadow hover:bg-red-700 focus-visible:ring-red-300 dark:focus-visible:ring-red-500 dark:bg-red-700',
        outline:
          'border border-gray-300 bg-white shadow hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700',
        secondary:
          'bg-gray-100 text-gray-900 shadow hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        ghost:
          'bg-transparent hover:bg-gray-100 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800',
        link: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400',
      },
      size: {
        default: 'px-4 py-2 has-[>svg]:px-3',
        sm: 'py-1 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'rounded-md px-6 has-[>svg]:px-4',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

const Button = ({
  className,
  variant,
  size,
  loading,
  asChild = false,
  ...props
}: ButtonProps): React.ReactElement => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      disabled={props.disabled || loading}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && 'text-white/0'
      )}
      {...props}
    >
      {loading !== null && (
        <div
          className={cn(
            'absolute inset-0 duration-300 opacity-0 z-10 grid place-items-center pointer-events-none p-0',
            loading && 'opacity-100 scale-100'
          )}
        >
          <div className="mui-spinner"></div>
        </div>
      )}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
