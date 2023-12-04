import { Badge } from 'components/ui'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedProject } from '../store/dataSlice'
const IdeaCard = ({project}) => {
    const { _id,name, description, hashtag, techStack, demo, coordinator, desiredSize, queueList, members} = project
    const dispatch = useDispatch()
    const onClickIdeaCard = () => {
        dispatch(setSelectedProject(project))
    }
    return (
        <div onClick={onClickIdeaCard} className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl border border-gray-300 mb-4">
            <div className="md:flex">
                <div className="p-8">
                    <h2
                        className="cursor-pointer block mt-1 text-xl font-bold leading-tight text-black hover:underline"
                    >
                        {name}
                    </h2>

                    <div className="flex items-center gap-4 mt-4">
                        <span className='font-bold'>Tech stack: </span>
                        <div className='flex items-center gap-2'>
                        {techStack.map((tech) => (
                            <Badge 
                                key={`${_id}-${tech}`} 
                                className="inline-block bg-green-200 text-green-800 text-xs rounded"
                                content={tech}
                            />
                                
                        ))}
                        </div>
                    </div>
                    <div className="mt-4 text-gray-500">
                        <span className='font-bold'>Description </span>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className="text-gray-400 text-xs mt-4">
                        Offre publiée il y a 4 jours
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdeaCard
