import Button from '@/components/ui/button'
import { makeStyles } from '@/theme/makeStyles'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const useStyles = makeStyles<{ orientation: 'horizontal' | 'vertical' }>()(
  (_theme, { orientation }) => ({
    root: {
      position: 'relative',
    },
    viewportWrapper: {
      overflow: 'hidden',
    },
    content: {
      display: 'flex',
      ...(orientation === 'horizontal'
        ? { marginLeft: '-1rem' }
        : { marginTop: '-1rem', flexDirection: 'column' }),
    },
    item: {
      minWidth: 0,
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: '100%',
      ...(orientation === 'horizontal'
        ? { paddingLeft: '1rem' }
        : { paddingTop: '1rem' }),
    },
    prevButton: {
      position: 'absolute',
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      ...(orientation === 'horizontal'
        ? { left: '-3rem', top: '50%', transform: 'translateY(-50%)' }
        : {
            top: '-3rem',
            left: '50%',
            transform: 'translateX(-50%) rotate(90deg)',
          }),
    },
    nextButton: {
      position: 'absolute',
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      ...(orientation === 'horizontal'
        ? { right: '-3rem', top: '50%', transform: 'translateY(-50%)' }
        : {
            bottom: '-3rem',
            left: '50%',
            transform: 'translateX(-50%) rotate(90deg)',
          }),
    },
  }),
)

const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & CarouselProps) => {
  const { classes, cx } = useStyles({ orientation })
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])
  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  const contextValue = React.useMemo(
    () => ({
      carouselRef,
      api,
      opts,
      orientation:
        orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [
      carouselRef,
      api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    ],
  )

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        aria-roledescription="carousel"
        className={cx(classes.root, className)}
        role="region"
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

const CarouselContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { carouselRef, orientation } = useCarousel()
  const { classes, cx } = useStyles({
    orientation: orientation ?? 'horizontal',
  })
  return (
    <div ref={carouselRef} className={classes.viewportWrapper}>
      <div className={cx(classes.content, className)} {...props} />
    </div>
  )
}

const CarouselItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { orientation } = useCarousel()
  const { classes, cx } = useStyles({
    orientation: orientation ?? 'horizontal',
  })
  return (
    <div
      aria-roledescription="slide"
      className={cx(classes.item, className)}
      role="group"
      {...props}
    />
  )
}

const CarouselPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  const { classes, cx } = useStyles({
    orientation: orientation ?? 'horizontal',
  })
  return (
    <Button
      className={cx(
        classes.prevButton,
        typeof className === 'string' ? className : undefined,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
      >
        Previous slide
      </span>
    </Button>
  )
}

const CarouselNext = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  const { classes, cx } = useStyles({
    orientation: orientation ?? 'horizontal',
  })
  return (
    <Button
      className={cx(
        classes.nextButton,
        typeof className === 'string' ? className : undefined,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight style={{ width: '1rem', height: '1rem' }} />
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
      >
        Next slide
      </span>
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
