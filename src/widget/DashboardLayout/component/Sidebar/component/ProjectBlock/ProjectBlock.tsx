import styled from '@emotion/styled'
import { mockProjects } from '../../../../constant'
import { css } from '@emotion/react'
import { Link } from '@tanstack/react-router'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'

type ProjectDTO = {
  name: string
  id: string
}

type ProjectBlockProps = {
  currentProject: ProjectDTO
}

export const ProjectBlock = ({ currentProject }: ProjectBlockProps) => {
  return (
    <ProjectBlockContainer>
      <ProjectList>
        {mockProjects.map((project) => (
          <ProjectListItem isCurrent={project.id === currentProject.id}>
            <Link to="/">{project.name}</Link>
            <ProjectMenuButton />
          </ProjectListItem>
        ))}
      </ProjectList>
    </ProjectBlockContainer>
  )
}

const ProjectMenuButton = () => {
  return (
    <StyledIconButton size="small">
      <MoreHorizIcon />
    </StyledIconButton>
  )
}

const StyledIconButton = styled(IconButton)`
  display: flex;
  flex-shrink: 0;
`

const ProjectBlockContainer = styled.div`
  padding: 16px;
`

const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
`

const ProjectListItem = styled.li<{ isCurrent?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  color: rgba(120, 116, 134, 1);
  border-radius: 10px;

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      font-weight: bold;
      color: black;
    `}

  &:hover {
    background-color: rgba(228, 223, 251, 1);
  }
`
