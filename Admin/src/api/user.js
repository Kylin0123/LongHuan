import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/login',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUserAll(params) {
  return request({
    url: '/getUserAll',
    method: 'get',
    params
  })
}

export function deleteUser(params) {
  return request({
    url: '/deleteUser',
    method: 'get',
    params
  })
}

export function queryLessonForUser(params) {
  return request({
    url: '/queryLessonForUser',
    method: 'get',
    params
  })
}