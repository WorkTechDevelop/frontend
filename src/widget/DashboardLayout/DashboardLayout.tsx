import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'

import styled from '@emotion/styled'

const leftSideWidthPx = '224px'
const blockBorderWidthPx = '3px'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;

  gap: ${blockBorderWidthPx};
`

const TopBlock = styled.header`
  height: 120px;
  width: 100%;
  display: flex;
  gap: ${blockBorderWidthPx};
`

const HeaderSideBlock = styled.div`
  width: ${leftSideWidthPx};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(224, 228, 234, 1);
`
const HeaderMainBlock = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 60px;
  padding-right: 20px;
  gap: 16px;

  background-color: rgba(224, 228, 234, 1);
`

const MainBlock = styled.div`
  display: flex;
  gap: ${blockBorderWidthPx};
`

const ContentBlock = styled.main`
  flex-grow: 1;
  background-color: rgba(224, 228, 234, 1);
`

const Spacer = styled.div`
  flex-grow: 1;
`

const Sidebar = styled.aside`
  width: ${leftSideWidthPx};

  flex-shrink: 0;
  background-color: rgba(224, 228, 234, 1);
`

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <PageWrapper>
      <TopBlock>
        <HeaderSideBlock>
          <WorkTaskLogo />
        </HeaderSideBlock>
        <HeaderMainBlock>
          <CreateNewTaskButton />
          <ProjectName />
          <Spacer />
          <UserProfile />
        </HeaderMainBlock>
      </TopBlock>
      <MainBlock>
        <Sidebar />
        <ContentBlock>{children}</ContentBlock>
      </MainBlock>
    </PageWrapper>
  )
}

function WorkTaskLogo() {
  return (
    <div
      style={{
        color: 'rgba(98, 0, 255, 1)',
        fontSize: '35px',
        fontWeight: 200,
      }}
    >
      WorkTask
    </div>
  )
}

const PurpleButton = styled(Button)({
  backgroundColor: 'rgba(80, 48, 229, 0.73)',
  borderColor: 'rgba(80, 48, 229, 0.73)',
})

function CreateNewTaskButton() {
  return (
    <PurpleButton variant="contained" startIcon={<AddIcon />}>
      New task
    </PurpleButton>
  )
}

function ProjectName() {
  return (
    <div
      style={{
        color: 'rgba(13, 6, 45, 1)',
        fontSize: '35px',
        fontWeight: 500,
      }}
    >
      WorkTask
    </div>
  )
}

function UserProfile() {
  return (
    <Avatar sx={{ bgcolor: 'rgba(98, 0, 255, 1)' }} alt="Grigorii Veinin">
      GV
    </Avatar>
  )
}
