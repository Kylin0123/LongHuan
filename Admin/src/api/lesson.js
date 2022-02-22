import request from '@/utils/request'

export function getLessonAll(params) {
  return request({
    url: '/getLessonAll',
    method: 'get',
    params
  })
}

export function saveOrUpdateLesson(params) {
  return request({
    url: '/saveOrUpdateLesson',
    method: 'post',
    header:{
      'Content-Type':'application/json;charset=UTF-8'  //如果写成contentType会报错
    },
    data: params
  })
}

export function deleteLesson(params) {
  return request({
    url: '/deleteLesson?id=' + params.id,
    method: 'get',
    params
  })
}