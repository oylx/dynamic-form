import layout from '@/views/layout'
export const routes = [
  {
    path: '/',
    component: layout,
    name: '首页',
    redirect: '/VisualDrag',
    children: [
      { path: '', component: () => import('@/views/VisualDragIndex'), },
    ]
  },
  {
    path: '/DynamicForm',
    component: layout,
    name: '动态表单',
    children: [
      { path: '', component: () => import('@/views/DynamicForm'), },
    ]
  },
  {
    path: '/customDrag',
    component: layout,
    name: '定制菜单',
    children: [
      { path: '', component: () => import('@/views/CustomDrag'), },
    ]
  },
  {
    path: '/dragEcharts',
    component: layout,
    name: 'echarts拖拽',
    children: [
      { path: '', component: () => import('@/views/DragEcharts'), },
    ]
  },
]
