import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'profile',
        path: '/profile',
        component: React.lazy(() => import('views/Profile')),
        authority: [],
    },
    {
        key: 'project',
        path: '/project',
        component: React.lazy(() => import('views/Project')),
        authority: [],
    },
]
