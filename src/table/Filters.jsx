import {useState} from "react";

const Filters = ({setFilters, updateContent}) => {
    const [inputFields, setInputFields] = useState([''])

    const onFilterClick = () => {
        setFilters(inputFields)
    }

    const onResetClick = () => {
        setInputFields([''])
    }

    const handleInputChange = (index, event) => {
        let data = [...inputFields];
        console.log('21: ', event.target)
        data[index] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newField = ''

        setInputFields([...inputFields, newField])
    }

    return <details className="dropdown">
        <summary className="m-1 btn">Filters</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div>
                <div>
                    {inputFields.map((input, index) => {
                        return (
                            <input name='filter' placeholder='Filter' value={input.filter} onChange={event => handleInputChange(index, event)}/>
                        )
                    })}
                </div>
                <button className={"btn btn-outline btn-success"} onClick={addFields}>Add More..</button>
                <button className={"btn btn-outline btn-success"} onClick={onFilterClick}>Filter</button>
                <button className="btn btn-outline btn-warning" onClick={onResetClick}>Reset</button>
            </div>
        </ul>
    </details>
}

export default Filters
