import { useState } from 'react'
import AutocompleteWrapper from './AutocompleteWrapper';

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done waiting");
      resolve(ms)
    }, ms )
  })
} 

function UserForm()
{
  // states
  const  [group, setGroup] = useState(undefined)

  // handles
  const handleOnChange = (e) => {setGroup(Number.parseInt(e.target.value))}

  const getOptions = async () => {
    await wait(1000);
    return [
        { group_name: "groupe un", group_id: 1 },
        { group_name: "groupe deux", group_id: 2 },
        { group_name: "groupe trois", group_id: 3 },
    ];
  }

  return (
    <div>
      <span>Userform</span>
      <select id="group" onChange={handleOnChange} >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
        <p></p>
        <p>group id : {group}</p>
      <AutocompleteWrapper 
        selected={group}
        queryfn={getOptions}
      />
    </div>
    
  );
}
  
export default UserForm;
  