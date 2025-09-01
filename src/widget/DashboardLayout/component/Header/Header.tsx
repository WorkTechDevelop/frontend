import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import { blockBorderWidthPx, leftSideWidthPx } from '../../constant'
import { VerticalLine } from '../../../../shared/ui/Line'

export function Header() {
  return (
    <TopBlock>
      <HeaderSideBlock>
        <WorkTaskLogo />
      </HeaderSideBlock>
      <VerticalLine size={blockBorderWidthPx} />
      <HeaderMainBlock>
        <CreateNewTaskButton />
        <ProjectName />
        <Spacer />
        <UserProfile />
      </HeaderMainBlock>
    </TopBlock>
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

const TopBlock = styled.header`
  height: 120px;
  width: 100%;
  display: flex;
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

const Spacer = styled.div`
  flex-grow: 1;
`

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

interface UserProfileProps {
  className?: string
}

function UserProfile({ className }: UserProfileProps) {
  return (
    <Avatar
      className={className}
      sx={{ bgcolor: 'rgba(98, 0, 255, 1)' }}
      alt="Grigorii Veinin"
    >
      GV
    </Avatar>
  )
}

const PurpleButton = styled(Button)({
  backgroundColor: 'rgba(80, 48, 229, 0.73)',
  borderColor: 'rgba(80, 48, 229, 0.73)',
})
