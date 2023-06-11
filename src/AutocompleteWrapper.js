import { useEffect, useState } from "react"
import { Autocomplete, TextField} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

function AutocompleteWrapper(props = {selected: undefined /* laisser undefined selectionne la premiere option par défault */, queryfn: () => {}})
{
    // states
    const [options, setOptions] = useState(undefined)
    const [selectedOption, setSelectedOption] = useState(undefined)

    // queries
    const queryOptions = useQuery({ queryKey: ['options'], queryFn: props.queryfn })

    // handles
    const handleClickRefetch = () => {console.log("refetch"); queryOptions.refetch()}

    // effects
    useEffect(() => {
        
        if (!queryOptions.data)
            return
        
        const options_ = queryOptions.data

        console.log(options_)
        const filteredOptions = options_.filter((option) => option['group_id'] === props.selected)
        setOptions(options_)
        setSelectedOption(filteredOptions.length > 0 ? filteredOptions[0] : options_[0]);


    }, [queryOptions.data, props.selected])

    // display logic
    if (queryOptions.isLoading) return <span>Loading...</span>
    if (queryOptions.isError) return <span>Error loading data !</span>
    if (selectedOption === undefined)
        return <span>Loading !...</span>
    // if (!queryOptions.isFetched) return <span>Error loading data !</span>


    return (
        <>
            <span>Autocomplete : selected {props.selected ? props.selected : "undefined"}</span>
            <Autocomplete 
                id="combo-box-demo" 
                options={options}
                getOptionLabel={(option) => option["group_name"]}
                sx={{ width: 300 }} 
                renderInput={(params) => <TextField {...params} label="Groupe" />}
                value={selectedOption}
                onChange={(_, newOption) => {
                    setSelectedOption(newOption);
                }}
                isOptionEqualToValue={(option, value) => option['group_id'] === value['group_id']}
                />
            <button onClick={handleClickRefetch}>refetch</button>
        </>
    );
  }
  
  export default AutocompleteWrapper;
  