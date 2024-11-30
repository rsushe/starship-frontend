import {fetchGroupByCreationDate} from "../utils/spaceMarinesApi";
import {useState} from "react";

const GroupByCreationDate = ({alertWithMessage}) => {

    const [page, setPage] = useState("1")
    const [size, setSize] = useState("1")
    const [creationDateStat, setCreationDateStat] = useState([{}])

    const onButtonClick = () => {
        fetchGroupByCreationDate(page, size, setCreationDateStat, alertWithMessage)
    }

    const onResetClick = () => {
        setCreationDateStat([])
    }

    return <details className="dropdown">
        <summary className="m-1 btn">Group marines by creation date</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div>
                <div>
                    <label htmlFor="page">page</label>
                    <input type="number" id={"page"} value={page} onChange={e => setPage(e.target.value)} placeholder={"page"}/>

                    <label htmlFor="size">size</label>
                    <input type="number" id={"size"} value={size} onChange={e => setSize(e.target.value)} placeholder={"size"}/>
                </div>
                <button className={"btn btn-outline btn-success"} onClick={onButtonClick}>Group marines by creation date</button>
                <button className="btn btn-outline btn-warning" onClick={onResetClick}>Reset</button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>"key"</th>
                        <th>"value"</th>
                    </tr>
                    </thead>
                    <tbody id="page1">
                    {
                        creationDateStat.map((row) => (
                            <tr>
                                <td>{row["key"]}</td>
                                <td>{row["value"]}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </ul>
    </details>
}

export default GroupByCreationDate
