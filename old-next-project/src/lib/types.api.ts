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
   * @example "user@gmail.com"
   */
  email: string;
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

/** Модель аутентификации пользователя */
export interface LoginRequestDTO {
  /**
   * Email пользователя
   * @example "user@gmail.com"
   */
  email?: string;
  /**
   * Пароль пользователя
   * @example "password123"
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

export interface Comment {
  id?: string;
  task?: TaskModel;
  user?: User;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  comment?: string;
  taskChangeDetector?: TaskChangeDetector;
  changes?: TaskHistoryDto[];
}

export interface ExtendedPermission {
  id?: string;
  user?: User;
  project?: Project;
}

export interface Project {
  id?: string;
  name?: string;
  owner?: User;
  /** @format date */
  creationDate?: string;
  /** @format date */
  finishDate?: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  updateDate?: string;
  description?: string;
  status?: "DRAFT" | "ACTIVE" | "FINISHED" | "DELETED";
  creator?: User;
  finisher?: User;
  code?: string;
  /** @format int32 */
  taskCounter?: number;
  statuses?: TaskStatus[];
  sprints?: Sprint[];
  users?: User[];
  projectOwner?: User;
}

export interface RoleModel {
  id?: string;
  name?: "ADMIN" | "PROJECT_OWNER" | "PROJECT_MEMBER" | "POWER_USER";
  active?: boolean;
  roleDescription?: string;
  roleName?: string;
}

export interface Sprint {
  id?: string;
  name?: string;
  goal?: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  /** @format date */
  createdAt?: string;
  /** @format date */
  finishedAt?: string;
  active?: boolean;
  defaultSprint?: boolean;
  creator?: User;
  finisher?: User;
  project?: Project;
}

export interface TaskChangeDetector {
  taskHistories?: TaskHistoryDto[];
}

export interface TaskHistoryDto {
  fieldName?: string;
  initialValue?: string;
  newValue?: string;
}

export interface TaskModel {
  id?: string;
  /**
   * @minLength 0
   * @maxLength 255
   */
  title: string;
  /**
   * @minLength 0
   * @maxLength 4096
   */
  description?: string;
  priority: string;
  creator?: User;
  assignee?: User;
  project?: Project;
  sprint?: Sprint;
  taskType: string;
  /** @format int32 */
  estimation?: number;
  status?: TaskStatus;
  /** @format date-time */
  creationDate?: string;
  /** @format date-time */
  updateDate?: string;
  code?: string;
  comments?: Comment[];
  taskChangeDetector?: TaskChangeDetector;
  changes?: TaskHistoryDto[];
}

export interface TaskStatus {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  priority?: number;
  code?: string;
  description?: string;
  viewed?: boolean;
  defaultTaskStatus?: boolean;
  project?: Project;
}

export interface User {
  id?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  /** @format date */
  birthDate?: string;
  active?: boolean;
  gender?: "MALE" | "FEMALE";
  password?: string;
  lastProjectId?: string;
  confirmationToken?: string;
  /** @format date-time */
  confirmedAt?: string;
  extendedPermissions?: ExtendedPermission[];
  projects?: Project[];
  roles?: RoleModel[];
}

export interface UsersTasksInProjectDTO {
  userName?: string;
  tasks?: TaskModel[];
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://91.211.249.37/test";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API ВоркТех
 * @version 1.0.0
 * @baseUrl http://91.211.249.37/test
 *
 * REST API сервиса "WorkTech"
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  workTask = {
    /**
     * No description
     *
     * @tags User
     * @name UpdateUser
     * @summary Редактирование пользователя
     * @request PUT:/work-task/api/v1/users/update
     * @secure
     */
    updateUser: (data: UpdateUserRequest, params: RequestParams = {}) =>
      this.request<UserDataDto, ErrorResponse>({
        path: `/work-task/api/v1/users/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name UpdateTask
     * @summary Обновить задачу
     * @request PUT:/work-task/api/v1/tasks/{projectId}/{taskId}/update
     * @secure
     */
    updateTask: (
      taskId: string,
      projectId: string,
      data: UpdateTaskModelDTO,
      params: RequestParams = {},
    ) =>
      this.request<TaskDataDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/${projectId}/${taskId}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name UpdateTaskStatus
     * @summary Обновить статус задачи
     * @request PUT:/work-task/api/v1/tasks/update-status
     * @secure
     */
    updateTaskStatus: (
      data: UpdateStatusRequestDTO,
      params: RequestParams = {},
    ) =>
      this.request<TaskDataDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/update-status`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name UpdateComment
     * @summary Обновить комментарий
     * @request PUT:/work-task/api/v1/tasks/update-comment
     * @secure
     */
    updateComment: (data: UpdateCommentDto, params: RequestParams = {}) =>
      this.request<CommentResponseDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/update-comment`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Status
     * @name UpdateStatuses
     * @summary Обновление данных статусов
     * @request PUT:/work-task/api/v1/statuses/project/{projectId}/update
     * @secure
     */
    updateStatuses: (
      projectId: string,
      data: UpdateRequestStatusesDto,
      params: RequestParams = {},
    ) =>
      this.request<StatusListResponseDto, ErrorResponse>({
        path: `/work-task/api/v1/statuses/project/${projectId}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprint
     * @name UpdateSprint
     * @summary Изменение спринта
     * @request PUT:/work-task/api/v1/sprints/project/{projectId}/{sprintId}/update
     * @secure
     */
    updateSprint: (
      projectId: string,
      sprintId: string,
      data: SprintDtoRequest,
      params: RequestParams = {},
    ) =>
      this.request<SprintInfoDTO, ErrorResponse>({
        path: `/work-task/api/v1/sprints/project/${projectId}/${sprintId}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprint
     * @name FinishSprint
     * @summary Завершение спринта
     * @request PUT:/work-task/api/v1/sprints/project/{projectId}/{sprintId}/finish
     * @secure
     */
    finishSprint: (
      projectId: string,
      sprintId: string,
      params: RequestParams = {},
    ) =>
      this.request<SprintInfoDTO, ErrorResponse>({
        path: `/work-task/api/v1/sprints/project/${projectId}/${sprintId}/finish`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprint
     * @name ActivateSprint
     * @summary Запуск спринта спринта
     * @request PUT:/work-task/api/v1/sprints/project/{projectId}/{sprintId}/activate
     * @secure
     */
    activateSprint: (
      projectId: string,
      sprintId: string,
      params: RequestParams = {},
    ) =>
      this.request<SprintInfoDTO, ErrorResponse>({
        path: `/work-task/api/v1/sprints/project/${projectId}/${sprintId}/activate`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name StartProject
     * @summary Запуск проекта по ИД
     * @request PUT:/work-task/api/v1/projects/{projectId}/start
     * @secure
     */
    startProject: (projectId: string, params: RequestParams = {}) =>
      this.request<ProjectDto, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}/start`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name FinishProject
     * @summary Завершение проекта по ИД
     * @request PUT:/work-task/api/v1/projects/{projectId}/finish
     * @secure
     */
    finishProject: (projectId: string, params: RequestParams = {}) =>
      this.request<ProjectDto, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}/finish`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name AddProjectForUsers
     * @summary Добавление проекта пользователям
     * @request PUT:/work-task/api/v1/projects/{projectId}/add-users
     * @secure
     */
    addProjectForUsers: (
      projectId: string,
      data: StringIdsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}/add-users`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UpdateUserRoles
     * @summary Обновление ролей пользователя
     * @request PUT:/work-task/api/v1/admin/{userId}/update-roles
     * @secure
     */
    updateUserRoles: (
      userId: string,
      data: StringIdsDto,
      params: RequestParams = {},
    ) =>
      this.request<UserDataDto, ErrorResponse>({
        path: `/work-task/api/v1/admin/${userId}/update-roles`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name UpdateProjectOwner
     * @summary Добавление руководителя проекта
     * @request PUT:/work-task/api/v1/admin/{projectId}/{userId}/update-owner
     * @secure
     */
    updateProjectOwner: (
      projectId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/admin/${projectId}/${userId}/update-owner`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name DeleteExtendedPermissionsForUserProject
     * @summary Удаление расширенных прав
     * @request PUT:/work-task/api/v1/admin/{projectId}/{userId}/delete-extended-permission
     * @secure
     */
    deleteExtendedPermissionsForUserProject: (
      projectId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/admin/${projectId}/${userId}/delete-extended-permission`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AddExtendedPermissionsForUserProject
     * @summary Добавление расширенных прав
     * @request PUT:/work-task/api/v1/admin/{projectId}/{userId}/add-extended-permission
     * @secure
     */
    addExtendedPermissionsForUserProject: (
      projectId: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/admin/${projectId}/${userId}/add-extended-permission`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name BlockUsers
     * @summary Заблокировать пользователей по существующим ИД
     * @request PUT:/work-task/api/v1/admin/block
     * @secure
     */
    blockUsers: (data: StringIdsDto, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/admin/block`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name ActivateUsers
     * @summary Активировать пользователей по существующим ИД
     * @request PUT:/work-task/api/v1/admin/activate
     * @secure
     */
    activateUsers: (data: StringIdsDto, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/admin/activate`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name CreateTask
     * @summary Создать задачу
     * @request POST:/work-task/api/v1/tasks/create
     * @secure
     */
    createTask: (data: TaskModelDTO, params: RequestParams = {}) =>
      this.request<TaskDataDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name LinkTask
     * @summary Создать связь между задачами
     * @request POST:/work-task/api/v1/tasks/create-link
     * @secure
     */
    linkTask: (data: LinkDto, params: RequestParams = {}) =>
      this.request<LinkResponseDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/create-link`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name CreateComment
     * @summary Создать комментарий
     * @request POST:/work-task/api/v1/tasks/create-comment
     * @secure
     */
    createComment: (data: CommentDto, params: RequestParams = {}) =>
      this.request<CommentResponseDto, ErrorResponse>({
        path: `/work-task/api/v1/tasks/create-comment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Status
     * @name CreateStatus
     * @summary Создание статуса
     * @request POST:/work-task/api/v1/statuses/project/{projectId}/create
     * @secure
     */
    createStatus: (
      projectId: string,
      data: CreateTaskStatusDto,
      params: RequestParams = {},
    ) =>
      this.request<TaskStatusDto, ErrorResponse>({
        path: `/work-task/api/v1/statuses/project/${projectId}/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprint
     * @name CreateSprint
     * @summary Создание спринта
     * @request POST:/work-task/api/v1/sprints/project/{projectId}/create
     * @secure
     */
    createSprint: (
      projectId: string,
      data: SprintDtoRequest,
      params: RequestParams = {},
    ) =>
      this.request<SprintInfoDTO, ErrorResponse>({
        path: `/work-task/api/v1/sprints/project/${projectId}/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Registration
     * @name RegisterUser
     * @summary Зарегистрироваться
     * @request POST:/work-task/api/v1/registration/registry
     * @secure
     */
    registerUser: (data: RegisterDTO, params: RequestParams = {}) =>
      this.request<string, ErrorResponse>({
        path: `/work-task/api/v1/registration/registry`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name GetProjectDataByFilter
     * @summary Получение данных проекта по ИД и фильтру
     * @request POST:/work-task/api/v1/projects/{projectId}/filtered
     * @secure
     */
    getProjectDataByFilter: (
      projectId: string,
      data: ProjectDataFilterDto,
      params: RequestParams = {},
    ) =>
      this.request<ProjectDataDto, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}/filtered`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name CreateProject
     * @summary Создание проекта
     * @request POST:/work-task/api/v1/projects/create
     * @secure
     */
    createProject: (data: ProjectRequestDto, params: RequestParams = {}) =>
      this.request<ProjectDto, ErrorResponse>({
        path: `/work-task/api/v1/projects/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name RefreshToken
     * @request POST:/work-task/api/v1/auth/refresh
     * @secure
     */
    refreshToken: (data: TokenRefreshRequestDTO, params: RequestParams = {}) =>
      this.request<LoginResponseDTO, ErrorResponse>({
        path: `/work-task/api/v1/auth/refresh`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name Logout
     * @summary Выход из системы
     * @request POST:/work-task/api/v1/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateUser
     * @summary Войти в учетную запись
     * @request POST:/work-task/api/v1/auth/login
     * @secure
     */
    authenticateUser: (data: LoginRequestDTO, params: RequestParams = {}) =>
      this.request<LoginResponseDTO, ErrorResponse>({
        path: `/work-task/api/v1/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetAllUsers
     * @summary Список всех пользователей
     * @request GET:/work-task/api/v1/users
     * @secure
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<UserShortDataDto[], ErrorResponse>({
        path: `/work-task/api/v1/users`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetUser
     * @summary Полные данные пользователя(текущего)
     * @request GET:/work-task/api/v1/users/profile
     * @secure
     */
    getUser: (params: RequestParams = {}) =>
      this.request<UserDataDto, ErrorResponse>({
        path: `/work-task/api/v1/users/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetGenderValues
     * @summary Список возможных значений при выборе пола
     * @request GET:/work-task/api/v1/users/gender-values
     * @secure
     */
    getGenderValues: (params: RequestParams = {}) =>
      this.request<EnumValuesResponse, ErrorResponse>({
        path: `/work-task/api/v1/users/gender-values`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name AllTasksLinks
     * @request GET:/work-task/api/v1/tasks/{taskId}/{projectId}/links
     * @secure
     */
    allTasksLinks: (
      taskId: string,
      projectId: string,
      params: RequestParams = {},
    ) =>
      this.request<LinkResponseDto[], ErrorResponse>({
        path: `/work-task/api/v1/tasks/${taskId}/${projectId}/links`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name AllTasksComments
     * @summary Получить все комментарии к задаче
     * @request GET:/work-task/api/v1/tasks/{taskId}/{projectId}/comments
     * @secure
     */
    allTasksComments: (
      taskId: string,
      projectId: string,
      params: RequestParams = {},
    ) =>
      this.request<AllTasksCommentsResponseDto[], ErrorResponse>({
        path: `/work-task/api/v1/tasks/${taskId}/${projectId}/comments`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name GetTaskHistory
     * @summary Получить историю изменения задачи по id {taskId}
     * @request GET:/work-task/api/v1/tasks/{projectId}/{taskId}/history
     * @secure
     */
    getTaskHistory: (
      taskId: string,
      projectId: string,
      params: RequestParams = {},
    ) =>
      this.request<TaskHistoryResponseDto[], ErrorResponse>({
        path: `/work-task/api/v1/tasks/${projectId}/${taskId}/history`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name GetTasksInProject
     * @summary Получить все задачи активного проекта отсортированные по пользователям
     * @request GET:/work-task/api/v1/tasks/tasks-in-project
     * @secure
     */
    getTasksInProject: (params: RequestParams = {}) =>
      this.request<UsersTasksInProjectDTO[], ErrorResponse>({
        path: `/work-task/api/v1/tasks/tasks-in-project`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Status
     * @name GetStatuses
     * @summary Список статусов проекта
     * @request GET:/work-task/api/v1/statuses/project/{projectId}
     * @secure
     */
    getStatuses: (projectId: string, params: RequestParams = {}) =>
      this.request<StatusListResponseDto, ErrorResponse>({
        path: `/work-task/api/v1/statuses/project/${projectId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprint
     * @name GetSprintInfo
     * @summary Вывести информацию об активном спринте
     * @request GET:/work-task/api/v1/sprints/project/{projectId}/sprint-info
     * @secure
     */
    getSprintInfo: (projectId: string, params: RequestParams = {}) =>
      this.request<SprintInfoDTO, ErrorResponse>({
        path: `/work-task/api/v1/sprints/project/${projectId}/sprint-info`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name GetRoles
     * @summary Список ролей системы
     * @request GET:/work-task/api/v1/roles
     * @secure
     */
    getRoles: (params: RequestParams = {}) =>
      this.request<RoleDataResponse, ErrorResponse>({
        path: `/work-task/api/v1/roles`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name GetProjectData
     * @summary Получение данных проекта по ИД
     * @request GET:/work-task/api/v1/projects/{projectId}
     * @secure
     */
    getProjectData: (projectId: string, params: RequestParams = {}) =>
      this.request<ProjectDto, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name GetActiveProject
     * @summary Получить ID основного проекта пользователя
     * @request GET:/work-task/api/v1/projects/last
     * @secure
     */
    getActiveProject: (params: RequestParams = {}) =>
      this.request<string, ErrorResponse>({
        path: `/work-task/api/v1/projects/last`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name GetAllUserProjects
     * @summary Вывести список проектов пользователя
     * @request GET:/work-task/api/v1/projects/for-user
     * @secure
     */
    getAllUserProjects: (params: RequestParams = {}) =>
      this.request<ShortProjectDataDto[], ErrorResponse>({
        path: `/work-task/api/v1/projects/for-user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name ConfirmEmail
     * @summary Подтверждение почты пользователем
     * @request GET:/work-task/api/v1/auth/confirm-email
     * @secure
     */
    confirmEmail: (
      query: {
        /**
         * Токен подтверждения
         * @example "656c989e-ceb1-4a9f-a6a9-9ab40cc11540"
         */
        token: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, ErrorResponse>({
        path: `/work-task/api/v1/auth/confirm-email`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name GetUser1
     * @summary Полные данные пользователя
     * @request GET:/work-task/api/v1/admin/{userId}/profile
     * @secure
     */
    getUser1: (userId: string, params: RequestParams = {}) =>
      this.request<UserDataDto, ErrorResponse>({
        path: `/work-task/api/v1/admin/${userId}/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name DeleteComment
     * @summary Удаление комментария
     * @request DELETE:/work-task/api/v1/tasks/{commentId}/{taskId}/{projectId}/delete-comment
     * @secure
     */
    deleteComment: (
      commentId: string,
      taskId: string,
      projectId: string,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, ErrorResponse>({
        path: `/work-task/api/v1/tasks/${commentId}/${taskId}/${projectId}/delete-comment`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Project
     * @name DeleteProjectForUsers
     * @summary Удаление пользователей из проекта
     * @request DELETE:/work-task/api/v1/projects/{projectId}/delete-users
     * @secure
     */
    deleteProjectForUsers: (
      projectId: string,
      data: StringIdsDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/work-task/api/v1/projects/${projectId}/delete-users`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
