import { forwardRef, useRef } from 'react'
import { Link, Box, Text } from 'theme-ui'

const defaultPx = [3, 4, 2, 4]

const cursors = {
  dog: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAMAAAD63NUrAAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAFZJREFUeNqdzksKwDAIAFHH+x+6lIYOVPOhs5OHJnES/5UkYKEkU7xjijSIm50iFh4fAXgYDd/yumVVRSwsqq/nRA3xVK0oo06d5U6DpQZ7PV7lMxH7LkaQAbYFwryzAAAAAElFTkSuQmCC),auto',
  cactus: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAaCAMAAABigZc2AAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAFpJREFUeNp9jUEOwEAIAhn+/+imjbs1bC0XzQioSUAAYZs0mcVY051RbGXfFsyxibTVHXhuhXYlbuRGPbe7kz3g0wf679OuizDBdCaberLE4AsjGliD02eNugA+MQFAPqynHQAAAABJRU5ErkJggg==),auto',
  egg: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAEdJREFUeAF90FEKgDAMwFDT+x9awYCRwjL282CM9joFsGie/swYy6oiENW8RaJ5PBvxvCpqxfwetTOqeyo+Rgx3JjnrCxNa3TwuAY6NyoMhAAAAAElFTkSuQmCC),auto',
  paint: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAMAAAB4HKeYAAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAADRJREFUeAFjwAsYsfMYQYgRLsLICKWhskxMTDAmCEMAwhQmEEDho8szUiqPaR+xfIR7sQMAR6QAjICqvMYAAAAASUVORK5CYII=),auto',
  planet: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAMAAAAxmgQeAAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAD5JREFUGNN1j9EKADAIAnP//9GjFq6w7iU4DNRsB06cb44TJ+UzYUcniqnqoA6ag/62JhjKIU0rxx1lKveuXJ5UAQs/G/2vAAAAAElFTkSuQmCC),auto',
  tv: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAEZJREFUeAGt0EEKgDAUA1En9z+0qEENhA+FvlUZQqE9Bnynlmlr2iVkSY66AHrg+MddSUiU6VuxqMhYquzcCvO6PZjhx5oTQ+8Bs3EshqIAAAAASUVORK5CYII=),auto',
}

let latest
function uniqueRand(len) {
  const i = Math.floor(Math.random() * (len))
  if (i === latest) {
    return uniqueRand(len)
  }
  latest = i
  return i
}

function findLink(child) {
  if (!child || !child.props) {
    return null
  }
  const {
    href,
    target,
    mdxType,
    children
  } = child.props
  if (mdxType === 'a') {
    return {
      href,
      target
    }
  }
  const arr = Array.isArray(children) ? children : [children]
  const maybeElem = arr.find(e => findLink(e))
  return findLink(maybeElem)
}

function cursorStyle(children, cursor) {
  if (!children) {
    return null
  }
  return React.Children.map(children, (child) => {
    const { props: { mdxType } = {}} = child
    if (mdxType && mdxType === 'a') {
      return React.cloneElement(child, { ...child.props, style: { cursor } })
    }
    return child
  })
}

export const Serif = ({
  children,
  sx,
  bold,
  ...props
}) => (
  <Text
    {...props}
    sx={{
      fontFamily: 'serif',
      fontWeight: bold ? 600 : 'initial',
      ...sx
    }}
  >
    {children}
  </Text>
)

export const Paragraph = ({
  children,
  px = defaultPx,
  ...props
}) => (
  <Text
    as="p"
    {...props}
    px={px}
  >
    {children}
  </Text>
)

export const AnchorLink = ({
  children,
  sx,
  ...props
}) => {
 
  const onClick = () => {}

  return (
    <Link onClick={onClick} sx={{ color: '#111', ...sx }} {...props}>
      { children }
    </Link>
  )
}

export const Section = forwardRef(({
  children,
  bg,
  p,
  py = 4,
  px = defaultPx,
  sx = {},
  ...props
}, ref) => (
  <Box
    p={p}
    px={px}
    py={py}
    className="section"
    sx={{
      bg,
      borderRight: ['none', '1px solid rgba(146, 146, 146, .2)'],
      width: '100%',
      position: 'relative',
      height: ['auto', 'auto', 'calc(100vh - 48px)', 'calc(100vh - 48px)'],
      overflow: 'auto',
      ...sx,

    }}
    ref={ref}
    {...props}
  >
    { children }
  </Box>
))

export const SectionScroll = (props) => {
  const ref = useRef(null)
  const onAnchorClick = (event) => {
    const { target } = event
    const to = target.getAttribute("href")
    if (to && to.indexOf('#') === 0 && ref.current) {
      const elem = document.querySelector(`div[name^="${to.slice(1)}"]`)
      if (elem) {
        elem.scrollIntoView()
      }
      ref.current.scrollTo(0, 9999)
    }
  }
  return <Section {...props} ref={ref} onClick={onAnchorClick} />
}

export const List = ({
  children
}) => (
  <Box
    as="ul"
    sx={{
      padding: 0,
      listStyle: 'none',
      borderTop: '1px solid rgba(146, 146, 146, .2)',
      '& > li': {
        px: defaultPx,
        py: 2,
        cursor: 'pointer',
        borderBottom: '1px solid rgba(146, 146, 146, .2)',
      },
      '& > li:hover': {
        bg: t => t.colors ? t.colors.muted : '#F7F7F7'
      },
      // 'a': {
      //   color: t => t.colors ? t.colors.text : 'initial'
      // },
      'a:hover': {
        color: t => t.colors ? t.colors.primary : '#111'
      }
    }}
  >
    {React.Children.map(children.props.children, (child) => {
      const maybeLink = findLink(child)
      const i = uniqueRand(Object.keys(cursors).length)
      const cursor = maybeLink ? Object.entries(cursors)[i][1] : 'initial'
      return React.cloneElement(child, {
        ...child.props,
        children: maybeLink ? cursorStyle(child.props.children, cursor) : child.props.children,
        style: {
          cursor: cursor
        },
        ...(maybeLink ? {
          onClick: (e) => {
            if (e.metaKey || (maybeLink.target && maybeLink.target === '_blank')) {
              return window.open(maybeLink.href, '_blank')
            }
            location.assign(maybeLink.href)
          }
        } : {})
      })
    })}
  </Box>
)