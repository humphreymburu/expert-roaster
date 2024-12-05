interface ErrorProps {
  message?: string
}

export function Error({ message = 'Something went wrong' }: ErrorProps) {
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <div className="text-center">
        <p className="text-destructive">{message}</p>
      </div>
    </div>
  )
}