import { ActionLink, Container, Loading } from 'components/shared'
import { Button, Tooltip } from 'components/ui'
import { CiBookmark } from "react-icons/ci";
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { apiGetProfile } from 'services/ProfileService';
const RightBox = () => {
  const [coordinator, setCoordinator] = React.useState(null)
  const project = useSelector((state) => state.projects.data.selectedProject)
  console.log(project);

  const onClickAskToJoin = () => {
    console.log('ask to join')
  }

  useEffect(() => {
    const fetchCoordinator = async () => {
      const response = await apiGetProfile({profileId : project.coordinator.profileId});
      setCoordinator(response.data.profile)
    }
    fetchCoordinator()
  }, [project])
  const AsynchronousProfileDisplay = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-green-200 text-green-800 text-xs rounded px-2 py-1">
          {coordinator.name}
        </div>
      </div>
    )
  }

  return (
    <>
      {
        project && coordinator && <Container className="border border-gray-300 rounded-xl bg-white w-full h-screen-100 sticky top-20">
          <div className="bg-white rounded-lg w-full h-full relative overflow-hidden">
            <div className='px-6 pt-6'>
              <h2 className="text-2xl font-bold mb-2 text-black">{project.name}</h2>
              <div className='flex items-center gap-4 mb-2'>
                <span className='font-semibold'>Coordinator: </span>
                  <div>
                    {coordinator.name}
                  </div>

              </div>
              <Button variant="solid" onClick={onClickAskToJoin}>Ask to join</Button>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button className="ml-4 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">
                    {/* <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">

              </svg> */}
                  </button>
                  <div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full border-t  overflow-y-auto">
              <div className='p-4'>
              <div className="mb-4">
                <h4 className="font-bold text-gray-800 mb-2">Tech stack</h4>
                <div className="flex items-center justify-between">
                  {project.techStack.map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <div className="bg-green-200 text-green-800 text-xs rounded px-2 py-1">
                        {tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                <h3 className="font-bold text-lg">Image</h3>
                </div>
                <img className="w-full" src={project.image} alt={project.name} />
              
              <div className="border-t p-4">
                <h3 className="font-bold text-lg mb-3">Description</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <h3 className="font-bold text-lg mb-3">Hashtag</h3>
                <p className="text-gray-600 mb-4">#{project.hashtag}</p>
              </div>
            </div>
          </div>
        </Container>
      }
      {
        !project && <Container className="border border-gray-300 rounded-xl bg-white w-full h-screen-100 sticky top-20">
          <div className="bg-white rounded-lg w-full h-full relative overflow-hidden">
            <div className='px-6 pt-6'>
              <h2 className="text-2xl font-bold mb-2 text-black">No project selected</h2>
              <p>Please select a project from the left box</p>
            </div>
          </div>
        </Container>
      }
      {
        !project && !coordinator && <Loading /> 
      }
    </>
  )
}

export default RightBox
