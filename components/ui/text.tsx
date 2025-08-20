import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import Balancer from 'react-wrap-balancer'

const textVariants = cva('whitespace-normal', {
  variants: {
    variant: {
      'display-1': 'lg:text-[100px] md:text-[80px] text-[60px] leading-[90%]',
      'display-2': 'lg:text-[80px] md:text-[60px] text-[48px] leading-[90%]',
      'heading-1': 'lg:text-[68px] md:text-[56px] text-[40px] leading-[100%]',
      'heading-2': 'lg:text-[60px] md:text-[48px] text-[36px] leading-[100%]',
      'title-1': 'lg:text-[48px] md:text-[40px] text-[32px] leading-[120%]',
      'title-2': 'lg:text-[40px] md:text-[32px] text-[28px] leading-[120%]',
      'title-3': 'lg:text-[32px] md:text-[28px] text-[24px] leading-[120%]',
      'title-4': 'lg:text-[28px] md:text-[24px] text-[22px] leading-[120%]',
      'title-5': 'lg:text-[26px] md:text-[22px] text-[20px] leading-[120%]',
      'body-1': 'lg:text-[24px] md:text-[20px] text-[18px] leading-[130%]',
      'body-2': 'lg:text-[20px] md:text-[18px] text-[16px] leading-[130%]',
      'body-3': 'lg:text-[18px] text-[16px] leading-[130%]',
      'body-4': 'text-[14px] xsm:text-[16px] leading-[130%]',
      'body-5': 'text-[12px] xsm:text-[14px] leading-[130%]',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    family: {
      sans: 'font-sans',
      heading: 'font-heading',
    },
  },
  defaultVariants: {
    variant: 'body-3',
    weight: 'normal',
    family: 'sans',
  },
})

type TextElement =
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLSpanElement
  | HTMLDivElement

interface TextProps
  extends HTMLAttributes<TextElement>,
    VariantProps<typeof textVariants> {
  balanced?: boolean
  as?: React.ElementType
  ref?: React.Ref<TextElement>
}

function Text({
  as: Component = 'p',
  className,
  children,
  variant,
  weight,
  family,
  balanced = false,
  ref,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, weight, family }), className)}
      ref={ref}
      {...props}
    >
      {balanced ? <Balancer>{children}</Balancer> : children}
    </Component>
  )
}

Text.displayName = 'Text'

export { Text, textVariants }