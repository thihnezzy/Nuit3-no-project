import ApiService from './ApiService'

export async function apiGetProjects(data) {
    return ApiService.fetchData({
        url: '/projects',
        method: 'get',
        data,
    })
}

export async function apiCreateNewProject(data) {
  return ApiService.fetchData({
      url: '/projects',
      method: 'post',
      data,
  })
}

export async function apiGetProjectById(data) {
  return ApiService.fetchData({
      url: `/projects/${data.projectId}`,
      method: 'get',
      data,
  })
}

export async function apiUpdateProjectById(data) {
  return ApiService.fetchData({
      url: `/projects/${data.projectId}`,
      method: 'put',
      data,
  })
}
export async function apiDeleteProjectById(data) {
  return ApiService.fetchData({
      url: `/projects/${data.projectId}`,
      method: 'delete',
      data,
  })
}
export async function apiJoinToProject(data) {
  return ApiService.fetchData({
      url: `/projects/join/${data.projectId}`,
      method: 'post',
      data,
  })
}