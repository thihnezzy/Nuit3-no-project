import ApiService from './ApiService'

export async function apiGetProfile(data) {
    return ApiService.fetchData({
        url: `/profile/get/${data.profileId}`,
        method: 'get',
        data,
    })
}

export async function apiUpdateProfile(data) {
  return ApiService.fetchData({
      url: '/profile',
      method: 'put',
      data,
  })
}
