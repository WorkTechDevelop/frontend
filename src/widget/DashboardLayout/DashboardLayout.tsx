import styled from '@emotion/styled'
import { Header } from './component/Header'
import { Sidebar } from './component/Sidebar'
import { HorizontalLine, VerticalLine } from '../../shared/ui/Line'
import { blockBorderWidthPx } from './constant'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <PageWrapper>
      <Header />
      <HorizontalLine size={blockBorderWidthPx} />
      <MainBlock>
        <Sidebar />
        <VerticalLine size={blockBorderWidthPx} />
        <ContentBlock>{children}</ContentBlock>
      </MainBlock>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
`

const MainBlock = styled.div`
  display: flex;
`

const ContentBlock = styled.main`
  flex-grow: 1;
  background-color: rgba(224, 228, 234, 1);
`
