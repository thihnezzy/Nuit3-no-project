import React, { useState } from 'react'
import { Select } from 'components/ui'
import AsyncSelect from 'react-select/async'
import { HiSearch } from 'react-icons/hi'
const colourOptions = [
    { value: 'it', label: 'IT' },
    { value: 'web', label: 'Web' },
    { value: 'ctf', label: 'CTF', },
]
const filterColors = (inputValue) => {
    return colourOptions.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
}

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterColors(inputValue))
    }, 1000)
}

const AsyncOnSearch = () => {
    const [_, setValue] = useState('')

    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '')
        setValue(inputValue)
        return inputValue
    }

    return (
        <div className='flex-1'>
            <Select
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onInputChange={handleInputChange}
                componentAs={AsyncSelect}
                placeholder="Search..."
            />
        </div>
    )
}

export default AsyncOnSearch
