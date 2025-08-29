/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorResponse {
  error?: string;
  message?: string;
}

/** Данные пользователя */
export interface UpdateUserRequest {
  /**
   * Фамилия пользователя
   * @example "Пин"
   */
  lastName: string;
  /**
   * Имя пользователя
   * @example "Ян"
   */
  firstName: string;
  /**
   * Отчество пользователя, при наличии
   * @example "Сигизмундович"
   */
  middleName?: string;
  /**
   * Email пользователя
   * @example "user@gmail.com"
   */
  email: string;
  /**
   * Номер телефона пользователя
   * @example 89999999999
   */
  phone?: string;
  /**
   * Дата рождения пользователя
   * @format date
   * @example "2020-01-01"
   */
  birthDate?: string;
  /**
   * Пароль пользователя
   * @minLength 8
   * @maxLength 2147483647
   * @example "password123"
   */
  password: string;
  /**
   * подтверждение пароля
   * @example "password123"
   */
  confirmPassword: string;
}

export interface RoleDataDto {
  /** ИД роли */
  roleId?: string;
  /** Название роли в системе */
  roleCode?: string;
  /** Описание роли */
  roleName?: string;
}

export interface UserDataDto {
  /** ИД пользователя */
  userId: string;
  /** ИД последнего проекта */
  lastProjectId?: string;
  /**
   * Фамилия пользователя
   * @example "Пин"
   */
  lastName: string;
  /**
   * Имя пользователя
   * @example "Ян"
   */
  firstName: string;
  /**
   * Отчество пользователя, при наличии
   * @example "Сигизмундович"
   */
  middleName?: string;
  /**
   * Email пользователя
   * @example "user@gmail.com"
   */
  email: string;
  /**
   * Номер телефона пользователя
   * @example 89999999999
   */
  phone?: string;
  /**
   * Дата рождения пользователя
   * @format date
   * @example "2020-01-01"
   */
  birthDate?: string;
  /**
   * Флаг активации
   * @example true
   */
  active?: boolean;
  /**
   * Пол пользователя
   * @example "MALE"
   */
  gender?: string;
  /** Роли пользователя */
  roles?: RoleDataDto[];
  /** Проекты пользователя с указанием его полномочий */
  permissionProjects?: UsersProjectsDTO[];
}

export interface UsersProjectsDTO {
  /** ИД проекта */
  projectId?: string;
  /** Название проекта */
  projectName?: string;
  /** Признак, что является владельцем */
  owner?: boolean;
  /** Признак, что имеет расширенные права */
  extendedPermission?: boolean;
}

export interface UpdateTaskModelDTO {
  /**
   * Заголовок
   * @minLength 0
   * @maxLength 255
   * @example "Создание задачи"
   */
  title: string;
  /**
   * Описание
   * @example "Создать задачу для Яна"
   */
  description?: string;
  /**
   * Приоритет
   * @example "MINOR"
   */
  priority: string;
  /**
   * Исполнитель задачи
   * @example "id пользователя"
   */
  assignee: string;
  /**
   * Спринт
   * @example "id спринта"
   */
  sprintId?: string;
  /**
   * Тип задачи
   * @example "TASK"
   */
  taskType: string;
  /**
   * ИД статуса задачи
   * @format int64
   * @example 123
   */
  status?: number;
  /**
   * Оценка задачи
   * @format int32
   * @example 3
   */
  estimation?: number;
}

export interface TaskDataDto {
  /** id задачи */
  id: string;
  /**
   * Заголовок
   * @minLength 0
   * @maxLength 255
   * @example "Создание задачи"
   */
  title: string;
  /**
   * Описание
   * @example "Создать задачу для Яна"
   */
  description?: string;
  /**
   * Приоритет
   * @example "MEDIUM"
   */
  priority: string;
  /** Исполнитель задачи */
  assignee?: UserShortDataDto;
  /** Создатель задачи */
  creator?: UserShortDataDto;
  /**
   * Проект задачи
   * @example "id проекта"
   */
  projectId: string;
  /** ИД спринта */
  sprintId?: string;
  /**
   * Тип задачи
   * @example "TASK"
   */
  taskType: string;
  /** Статус задачи */
  status?: TaskStatusShortDto;
  /**
   * Оценка задачи
   * @format int32
   * @example 3
   */
  estimation?: number;
  /**
   * Код задачи
   * @example "ТП-1"
   */
  code?: string;
}

export interface TaskStatusShortDto {
  /**
   * ИД статуса
   * @format int64
   */
  id: number;
  /** Название статуса */
  code: string;
  /** Описание статуса */
  description?: string;
}

export interface UserShortDataDto {
  /** ИД пользователя */
  id: string;
  /** Email пользователя */
  email: string;
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName?: string;
  /** Пол пользователя */
  gender: string;
}

export interface UpdateStatusRequestDTO {
  /**
   * Проект задачи
   * @example "id проекта"
   */
  projectId: string;
  /** id задачи */
  id: string;
  /**
   * ИД статуса задачи
   * @format int64
   * @example 123
   */
  status?: number;
}

/** Модель обновления комментария */
export interface UpdateCommentDto {
  /** ID комментария */
  commentId: string;
  /** ID задачи */
  taskId: string;
  /** Проект задачи */
  projectId: string;
  /**
   * Комментарий
   * @minLength 0
   * @maxLength 4096
   */
  comment: string;
}

export interface CommentResponseDto {
  commentId?: string;
}

export interface TaskStatusRequestDto {
  /**
   * ИД статуса
   * @format int64
   */
  id?: number;
  /**
   * Приоритет расстановки на странице
   * @format int32
   */
  priority: number;
  /** Название статуса */
  code: string;
  /** Описание статуса */
  description?: string;
  /** Признак отображения */
  viewed?: boolean;
  /** Признак отображения */
  defaultTaskStatus?: boolean;
}

/** Информация по статусам */
export interface UpdateRequestStatusesDto {
  /** Список статусов */
  statuses?: TaskStatusRequestDto[];
}

export interface StatusListResponseDto {
  /** ИД проекта */
  projectId: string;
  /** Список доступных статусов */
  statuses?: TaskStatusDto[];
}

export interface TaskStatusDto {
  /**
   * ИД статуса
   * @format int64
   */
  id: number;
  /**
   * Приоритет расстановки на странице
   * @format int32
   */
  priority: number;
  /** Название статуса */
  code: string;
  /** Описание статуса */
  description?: string;
  /** Признак отображения */
  viewed: boolean;
  /** ИД проекта */
  projectId: string;
  /** Признак отображения */
  defaultTaskStatus?: boolean;
}

/** Данные спринта */
export interface SprintDtoRequest {
  /** Название спринта */
  name: string;
  /** цель спринта */
  goal?: string;
  /**
   * Дата окончания спринта
   * @format date
   */
  startDate?: string;
  /**
   * Дата завершения спринта
   * @format date
   */
  endDate?: string;
}

export interface SprintInfoDTO {
  /** Ид спринта */
  id: string;
  /** Название спринта */
  name: string;
  /** Цель спринта */
  goal?: string;
  /**
   * Дата окончания спринта
   * @format date
   */
  startDate?: string;
  /**
   * Дата завершения спринта
   * @format date
   */
  endDate?: string;
  /** Создатель спринта */
  creator: UserShortDataDto;
  /** Флаг, показывающий активен ли спринт */
  active: boolean;
  /** Флаг, показывающий дефолтный спринт */
  defaultSprint: boolean;
}

export interface ProjectDto {
  /** ИД проекта */
  id: string;
  /** Название проекта */
  name: string;
  /** Владелец проекта */
  owner: UserShortDataDto;
  /**
   * Дата создания проекта
   * @format date
   */
  creationDate: string;
  /**
   * Дата закрытия проекта
   * @format date
   */
  finishDate?: string;
  /**
   * Дата начала проекта
   * @format date
   */
  startDate: string;
  /**
   * Дата обновления проекта
   * @format date
   */
  updateDate?: string;
  /** Комментарий к проекту */
  description?: string;
  /** Статус проекта */
  projectStatus: string;
  /** Создатель проекта */
  creator: UserShortDataDto;
  /** Пользователь, закрывший проект */
  finisher?: UserShortDataDto;
  /** Код проекта */
  code: string;
  /** Статусы проекта */
  statuses?: TaskStatusDto[];
  /** Пользователи проекта */
  users?: UserShortDataDto[];
}

/** Данные проекта */
export interface EditProjectRequestDto {
  /** Название проекта */
  name: string;
  /** Комментарий к проекту */
  description?: string;
  /** Код проекта */
  code: string;
}

/** Идентификаторы пользователей */
export interface StringIdsDto {
  /** Список ИД */
  ids?: string[];
}

/** Модель создания задачи */
export interface TaskModelDTO {
  /**
   * Заголовок
   * @minLength 0
   * @maxLength 255
   * @example "Создание задачи"
   */
  title: string;
  /**
   * Описание
   * @minLength 0
   * @maxLength 4096
   * @example "Создать задачу для Яна"
   */
  description?: string;
  /**
   * Приоритет
   * @example "MEDIUM"
   */
  priority: string;
  /**
   * Исполнитель задачи
   * @example "id пользователя"
   */
  assignee: string;
  /**
   * Проект задачи
   * @example "id проекта"
   */
  projectId: string;
  /**
   * Спринт
   * @example "id спринта"
   */
  sprintId?: string;
  /**
   * Тип задачи
   * @example "TASK"
   */
  taskType: string;
  /**
   * Оценка задачи
   * @format int32
   * @min 0
   * @max 999
   * @example 3
   */
  estimation?: number;
}

/** Модель связывания задач */
export interface LinkDto {
  /** ID задачи */
  taskIdSource: string;
  /** ID задачи */
  taskIdTarget: string;
  /** Проект задачи */
  projectId: string;
  /**
   * LinkTypeName
   * @example "RELATED"
   */
  linkTypeName?: string;
}

export interface LinkResponseDto {
  linkId?: string;
  source?: string;
  target?: string;
  name?: string;
  description?: string;
}

/** Модель создания комментария */
export interface CommentDto {
  /** ID задачи */
  taskId: string;
  /** Проект задачи */
  projectId: string;
  /**
   * Комментарий
   * @minLength 0
   * @maxLength 4096
   */
  comment: string;
}

export interface CreateTaskStatusDto {
  /**
   * Приоритет расстановки на странице
   * @format int32
   */
  priority: number;
  /** Название статуса */
  code: string;
  /** Описание статуса */
  description?: string;
  /** Признак отображения */
  viewed?: boolean;
  /** Признак отображения */
  defaultTaskStatus?: boolean;
}

/** Модель регистрации пользователя */
export interface RegisterDTO {
  /**
   * Email пользователя
   * @example "user@mail.ru"
   */
  email: string;
  /**
   * Пароль пользователя
   * @minLength 8
   * @maxLength 2147483647
   * @example "password12345"
   */
  password: string;
  /**
   * подтверждение пароля
   * @example "password12345"
   */
  confirmPassword: string;
  /**
   * Имя пользователя
   * @example "Ян"
   */
  firstName: string;
  /**
   * Фамилия пользователя
   * @example "Пин"
   */
  lastName: string;
  /**
   * Отчество пользователя, при наличии
   * @example "Сигизмундович"
   */
  middleName?: string;
  /**
   * Номер телефона пользователя
   * @example 89999999999
   */
  phone?: string;
  /**
   * Дата рождения пользователя
   * @format date
   * @example "2020-01-01"
   */
  birthDate?: string;
  /**
   * Пол пользователя
   * @example "MALE"
   */
  gender: string;
}

/** Данные фильтра */
export interface ProjectDataFilterDto {
  userIds?: string[];
  statusIds?: number[];
}

export interface ProjectDataDto {
  users?: UserWithTasksDto[];
}

export interface UserWithTasksDto {
  /** ИД пользователя */
  id: string;
  /** Email пользователя */
  email: string;
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName?: string;
  /** Пол пользователя */
  gender: string;
  /** Список задач */
  tasks?: TaskDataDto[];
}

export interface ProjectRequestDto {
  /** Название проекта */
  name: string;
  /** Комментарий к проекту */
  description?: string;
  /** Код проекта */
  code: string;
}

export interface TokenRefreshRequestDTO {
  refreshToken?: string;
}

export interface LoginResponseDTO {
  accessToken?: string;
  refreshToken?: string;
}

/** Данные для аутентификации */
export interface LoginRequestDTO {
  /**
   * Email пользователя
   * @example "user@mail.ru"
   */
  email?: string;
  /**
   * Пароль пользователя
   * @example "password12345"
   */
  password?: string;
}

export interface EnumDto {
  /** Название перечисления */
  code?: string;
  /** Дополнительное значение */
  value?: string;
}

export interface EnumValuesResponse {
  values?: EnumDto[];
}

export interface AllTasksCommentsResponseDto {
  user?: UserShortDataDto;
  commentId?: string;
  comment?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface TaskHistoryResponseDto {
  user?: UserShortDataDto;
  fieldName?: string;
  initialValue?: string;
  initialUser?: UserShortDataDto;
  newValue?: string;
  newUser?: UserShortDataDto;
  /** @format date-time */
  createdAt?: string;
}

export interface UsersTasksInProjectDTO {
  userName?: string;
  tasks?: TaskDataDto[];
}

export interface RoleDataResponse {
  /** Список ролей */
  roles?: RoleDataDto[];
}

export interface ShortProjectDataDto {
  /** ИД проекта */
  id: string;
  /** Название проекта */
  name: string;
}

export interface ApiResponse {
  message?: string;
}

export type UpdateUserData = UserDataDto;

export type UpdateUserError = ErrorResponse;

export type UpdateTaskData = TaskDataDto;

export type UpdateTaskError = ErrorResponse;

export type UpdateTaskStatusData = TaskDataDto;

export type UpdateTaskStatusError = ErrorResponse;

export type UpdateCommentData = CommentResponseDto;

export type UpdateCommentError = ErrorResponse;

export type UpdateStatusesData = StatusListResponseDto;

export type UpdateStatusesError = ErrorResponse;

export type UpdateSprintData = SprintInfoDTO;

export type UpdateSprintError = ErrorResponse;

export type FinishSprintData = SprintInfoDTO;

export type FinishSprintError = ErrorResponse;

export type ActivateSprintData = SprintInfoDTO;

export type ActivateSprintError = ErrorResponse;

export type StartProjectData = ProjectDto;

export type StartProjectError = ErrorResponse;

export type FinishProjectData = ProjectDto;

export type FinishProjectError = ErrorResponse;

export type UpdateProjectData = ProjectDto;

export type UpdateProjectError = ErrorResponse;

export type AddProjectForUsersData = any;

export type AddProjectForUsersError = ErrorResponse;

export type UpdateUserRolesData = UserDataDto;

export type UpdateUserRolesError = ErrorResponse;

export type UpdateProjectOwnerData = any;

export type UpdateProjectOwnerError = ErrorResponse;

export type DeleteExtendedPermissionsForUserProjectData = any;

export type DeleteExtendedPermissionsForUserProjectError = ErrorResponse;

export type AddExtendedPermissionsForUserProjectData = any;

export type AddExtendedPermissionsForUserProjectError = ErrorResponse;

export type BlockUsersData = any;

export type BlockUsersError = ErrorResponse;

export type ActivateUsersData = any;

export type ActivateUsersError = ErrorResponse;

export type CreateTaskData = TaskDataDto;

export type CreateTaskError = ErrorResponse;

export type LinkTaskData = LinkResponseDto;

export type LinkTaskError = ErrorResponse;

export type CreateCommentData = CommentResponseDto;

export type CreateCommentError = ErrorResponse;

export type CreateStatusData = TaskStatusDto;

export type CreateStatusError = ErrorResponse;

export type CreateSprintData = SprintInfoDTO;

export type CreateSprintError = ErrorResponse;

export type RegisterUserData = string;

export type RegisterUserError = ErrorResponse;

export type GetProjectDataByFilterData = ProjectDataDto;

export type GetProjectDataByFilterError = ErrorResponse;

export type CreateProjectData = ProjectDto;

export type CreateProjectError = ErrorResponse;

export type RefreshTokenData = LoginResponseDTO;

export type RefreshTokenError = ErrorResponse;

export type LogoutData = any;

export type LogoutError = ErrorResponse;

export type AuthenticateUserData = LoginResponseDTO;

export type AuthenticateUserError = ErrorResponse;

export type GetAllUsersData = UserShortDataDto[];

export type GetAllUsersError = ErrorResponse;

export type GetUserData = UserDataDto;

export type GetUserError = ErrorResponse;

export type GetGenderValuesData = EnumValuesResponse;

export type GetGenderValuesError = ErrorResponse;

export type AllTasksLinksData = LinkResponseDto[];

export type AllTasksLinksError = ErrorResponse;

export type AllTasksCommentsData = AllTasksCommentsResponseDto[];

export type AllTasksCommentsError = ErrorResponse;

export type GetTaskHistoryData = TaskHistoryResponseDto[];

export type GetTaskHistoryError = ErrorResponse;

export type GetTasksInProjectData = UsersTasksInProjectDTO[];

export type GetTasksInProjectError = ErrorResponse;

export type GetStatusesData = StatusListResponseDto;

export type GetStatusesError = ErrorResponse;

export type GetSprintInfoData = SprintInfoDTO;

export type GetSprintInfoError = ErrorResponse;

export type GetRolesData = RoleDataResponse;

export type GetRolesError = ErrorResponse;

export type GetProjectDataData = ProjectDto;

export type GetProjectDataError = ErrorResponse;

export type GetActiveProjectData = string;

export type GetActiveProjectError = ErrorResponse;

export type GetAllUserProjectsData = ShortProjectDataDto[];

export type GetAllUserProjectsError = ErrorResponse;

export interface ConfirmEmailParams {
  /**
   * Токен подтверждения
   * @example "656c989e-ceb1-4a9f-a6a9-9ab40cc11540"
   */
  token: string;
}

export type ConfirmEmailData = boolean;

export type ConfirmEmailError = ErrorResponse;

export type GetUser1Data = UserDataDto;

export type GetUser1Error = ErrorResponse;

export type DeleteCommentData = ApiResponse;

export type DeleteCommentError = ErrorResponse;

export type DeleteProjectForUsersData = any;

export type DeleteProjectForUsersError = ErrorResponse;
