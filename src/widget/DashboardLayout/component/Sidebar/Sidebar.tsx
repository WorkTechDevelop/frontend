import SettingsIcon from '@mui/icons-material/Settings'
import styled from '@emotion/styled'
import ChecklistIcon from '@mui/icons-material/Checklist'
import { Link } from '@tanstack/react-router'
import {
  blockBorderWidthPx,
  leftSideWidthPx,
  mockProjects,
} from '../../constant'
import { ProjectBlock } from './component/ProjectBlock'
import { HorizontalLine } from '../../../../shared/ui/Line'

interface SideBarProps {
  className?: string
}

export function Sidebar({ className }: SideBarProps) {
  return (
    <SidebarContainer className={className}>
      <CommonLinks>
        <CommonLinksItem>
          <GrayLink to="/">
            <ChecklistIcon /> Задачи
          </GrayLink>
        </CommonLinksItem>
        <CommonLinksItem>
          <GrayLink to="/">
            <SettingsIcon /> Настройки
          </GrayLink>
        </CommonLinksItem>
      </CommonLinks>
      <HorizontalLine size={blockBorderWidthPx} />
      <ProjectBlock currentProject={mockProjects[0]} />
    </SidebarContainer>
  )
}

const SidebarContainer = styled.aside`
  width: ${leftSideWidthPx};

  flex-shrink: 0;
  background-color: rgba(224, 228, 234, 1);

  display: flex;
  flex-direction: column;
`

const CommonLinks = styled.ul`
  display: flex;
  flex-direction: column;
  height: 210px;
  width: 100%;
  gap: 16px;
  padding: 20px;
`

const CommonLinksItem = styled.li`
  display: flex;
`

const GrayLink = styled(Link)`
  display: flex;
  color: rgba(120, 116, 134, 1);
  gap: 10px;
  font-size: 16px;
  text-decoration: none;
`
