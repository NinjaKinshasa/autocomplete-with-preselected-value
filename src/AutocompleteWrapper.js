import { useEffect, useState } from "react"
import { Autocomplete, TextField} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

function AutocompleteWrapper({
    selected = undefined /* laisser undefined selectionne la premiere option par défault */,
    queryfn = () => {},
    keyname = "name",
    primary = "id",
    label = "label",
    onChange = () => {}
}
) {

    // states
    const [options, setOptions] = useState(undefined);
    const [selectedOption, setSelectedOption] = useState(null);

    // queries
    const queryOptions = useQuery({ queryKey: ["options"], queryFn: queryfn });

    // handles
    const handleClickRefetch = () => {
        console.log("refetch");
        queryOptions.refetch();
    };
    const handleOnChange = (_, newOption) => {
        setSelectedOption(newOption);
        // call onChange ..
    }

    // effects
    useEffect(() => {
        if (queryOptions.data !== undefined) setOptions(queryOptions.data);
    }, [queryOptions.data]);

    useEffect(() => {
        if (options !== undefined) {
            const filteredOptions = options.filter((option) => option[primary] === selected);
            setSelectedOption(filteredOptions.length > 0 ? filteredOptions[0] : options[0]);
        }
    }, [options, selected, primary]);

    // display logic
    if (queryOptions.isLoading || options === undefined || selectedOption === undefined) return <span>Loading ...</span>;

    return (
        <>
            <span>Autocomplete : selected {selected ? selected : "undefined"}</span>
            <Autocomplete
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option[keyname]}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={label} />}
                value={selectedOption}
                onChange={handleOnChange}
                isOptionEqualToValue={(option, value) => option[primary] === value[primary]}
            />
            <button onClick={handleClickRefetch}>refetch</button>
        </>
    );
}
  
  export default AutocompleteWrapper;
  