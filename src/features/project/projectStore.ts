import { devtools } from 'zustand/middleware'
import type { ProjectDto, ShortProjectDataDto } from '../../data-contracts'
import { create } from 'zustand'
import { workTechApi } from '../../shared/api/endpoint'

interface userProjectStoreState {
  userProjects: ShortProjectDataDto[]
  activeProjectId: ProjectDto['id'] | null

  getAllUserProjects: () => Promise<void>
}

// доработка вынесена в отдельную задачу
export const useUserProjectStore = create<userProjectStoreState>()(
  devtools(
    (set) => ({
      userProjects: [],
      activeProjectId: null,

      async getAllUserProjects() {
        const allProjectResponse = await Promise.all([
          workTechApi.project.getAllUserProjects(),
          workTechApi.project.getActiveProject(),
        ])
        console.log({ allProjectResponse })
      },
    }),
    {
      name: 'user-project-store',
    },
  ),
)
