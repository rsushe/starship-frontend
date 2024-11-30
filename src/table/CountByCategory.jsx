import {fetchCountByCategory} from "../utils/spaceMarinesApi";
import {useState} from "react";

const CountByCategory = ({alertWithMessage}) => {

    const [category, setCategory] = useState("SCOUT")
    const [countStat, setCountStat] = useState({})

    const onButtonClick = () => {
        fetchCountByCategory(category, setCountStat, alertWithMessage)
    }

    const onResetClick = () => {
        setCountStat([])
    }

    return <details className="dropdown">
        <summary className="m-1 btn">Count marines by category</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div>
                <div>
                    <label htmlFor="categoryArea">category</label>
                    <select className='select' onChange={(e) => setCategory(e.target.value)} value={category} required>
                        {['SCOUT', 'TACTICAL', 'TERMINATOR', 'CHAPLAIN', 'HELIX'].map((enumCategory) => {
                            return (
                                <option value={enumCategory} key={enumCategory}>{enumCategory}</option>
                            )
                        })}
                    </select><br/>
                </div>
                <button className={"btn btn-outline btn-success"} onClick={onButtonClick}>Count marines by category</button>
                <button className="btn btn-outline btn-warning" onClick={onResetClick}>Reset</button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>"Count"</th>
                    </tr>
                    </thead>
                    <tbody id="page1">
                    {
                        <tr>
                            <td>{countStat["count"]}</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </ul>
    </details>
}

export default CountByCategory
