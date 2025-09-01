import styled from '@emotion/styled'

const DEFAULT_SIZE = '3px'
const DEFAULT_COLOR = 'rgba(256, 256, 256, 1)'

type LineType = 'vertical' | 'horizontal'

type LineProps = {
  className?: string
  size?: string
  color?: string
}

export const VerticalLine = function ({
  className,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
}: LineProps) {
  return (
    <Line className={className} type="vertical" color={color} size={size} />
  )
}

export const HorizontalLine = function ({
  className,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
}: LineProps) {
  return (
    <Line className={className} type="horizontal" color={color} size={size} />
  )
}

const Line = styled.div<{ size: string; color: string; type: LineType }>`
  ${({ type, size }) => type === 'horizontal' && `height: ${size};`}
  ${({ type, size }) => type === 'vertical' && `width: ${size};`}

    background-color: ${({ color }) => color};
  flex-shrink: 0;
`
