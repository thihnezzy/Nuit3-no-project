import { Container } from 'components/shared'
import { Button, Tooltip } from 'components/ui'
import LeftBox from './components/LeftBox'
import RightBox from './components/RightBox'
import React, { useState } from 'react'
import AsyncOnSearch from './components/AsyncOnSearch'
import { IoIosAddCircleOutline } from 'react-icons/io'
import NewIdeaModal from './components/NewIdeaDialog'

const Project = () => {
    const [opened, setOpened] = useState(false);
    const onClickAddNewProject = () => {
        setOpened(true)
    }
    return (
        <Container>
            <div className="max-w-[600px] mx-auto flex items-center gap-10">
                <AsyncOnSearch />
                <Tooltip title="Create new idea" placement="bottom">
                    <Button
                        className=""
                        variant="solid"
                        icon={<IoIosAddCircleOutline />}
                        onClick={onClickAddNewProject}
                    ></Button>
                </Tooltip>
            </div>
            <div className="w-full my-4 border-t border-gray-300"></div>

            <div className="grid grid-cols-6 my-10 px-10">
                <div className={'col-span-6 lg:col-span-3 gap-4'}>
                    <LeftBox />
                </div>
                <div className="hidden col-start-4 col-span-3 lg:flex relative h-full mx-2">
                    <RightBox />
                </div>
            </div>
            <NewIdeaModal opened={opened} onClose={() => setOpened(false)} />
        </Container>
    )
}

export default Project
