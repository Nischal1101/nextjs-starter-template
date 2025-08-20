import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { ArrowLeft, LucideIcon, RefreshCw } from 'lucide-react'

interface ReusableErrorProps {
  Icon: LucideIcon
  header: string
  description: string
  children?: React.ReactNode
  className?: string
  variant?: 'destructive' | 'warning' | 'empty'
  onRetry?: () => void
  onBack?: () => void
  size?: 'sm' | 'lg'
}

export default function Error(props: ReusableErrorProps) {
  const {
    Icon,
    header,
    description,
    className,
    variant,
    onRetry,
    onBack,
    size = 'lg',
  } = props

  return (
    <div
      className={cn(
        'flex w-full flex-col',
        size === 'sm' && 'h-[80vh]',
        size === 'lg' && 'h-[80vh]',
        className,
      )}
    >
      <div className="flex h-full items-center py-12">
        <div
          className={cn(
            'bg-black-50/10 container flex h-full flex-col items-center justify-center space-y-8 rounded-xl border p-8 shadow-sm backdrop-blur-sm',
            size === 'sm' && 'border-none bg-transparent shadow-none',
          )}
        >
          <div
            className={cn(
              'flex size-20 items-center justify-center rounded-full',
              variant === 'destructive' && 'bg-destructive/10',
              variant === 'warning' && 'bg-[#FFE5E5]',
              variant === 'empty' && 'bg-muted',
              !variant && 'bg-destructive/10',
              size === 'sm' && 'size-16',
            )}
          >
            <Icon
              size={size === 'sm' ? 32 : 40}
              className={cn(
                'text-destructive',
                variant === 'warning' && 'text-[#FF5757]',
                variant === 'empty' && 'text-muted-foreground',
              )}
            />
          </div>

          <div className="space-y-3 text-center">
            <Text
              variant={size === 'sm' ? 'title-3' : 'title-2'}
              className="font-sans font-bold"
            >
              {header}
            </Text>

            <Text
              variant={size === 'sm' ? 'body-4' : 'body-2'}
              className="text-foreground/70 max-w-lg text-center"
            >
              {description}
            </Text>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {onBack && (
              <Button
                className="!px-6"
                size={size === 'sm' ? 'sm' : 'default'}
                variant="outline"
                onClick={onBack}
              >
                <ArrowLeft />
                Go Back
              </Button>
            )}

            {onRetry && (
              <Button
                size={size === 'sm' ? 'sm' : 'default'}
                variant="default"
                className="!px-6"
                onClick={onRetry}
              >
                <RefreshCw />
                Refresh
              </Button>
            )}

            {!!props?.children && props?.children}
          </div>
        </div>
      </div>
    </div>
  )
}