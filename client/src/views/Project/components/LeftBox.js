import React, { useState, useEffect } from 'react'
import IdeaCard from './IdeaCard'
import { useDispatch, useSelector } from 'react-redux'
import reducer from '../store'
import { getProjects, getProjectById } from '../store/dataSlice'
import { injectReducer } from 'store'


injectReducer('projects', reducer);

const LeftBox = () => {
  const dispatch = useDispatch()
  const { projectList } = useSelector((state) => state.projects.data)
  console.log(projectList);
  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])
  return (
    <div className='w-full'>
      {projectList && projectList.map((project) => (
        <IdeaCard key={project._id} project={project} />
      ))}
      {
        projectList.length === 0 && <div className="flex items-center justify-center h-full">
          <span className="text-gray-400">No project found</span>
        </div>
      }
    </div>
  )
}

export default LeftBox
