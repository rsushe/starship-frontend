import './css/Template.css'
import {useEffect, useState} from "react";
import TableContent from "./Content";
import Pagination from "./Pagination";
import FindById from "./FindById";
import {fetchGetMarines} from "../utils/spaceMarinesApi"
import AddMarine from "./AddMarine";
import UpdateMarine from "./UpdateMarine";
import DeleteMarine from "./DeleteMarine";
import AddStarship from "./AddStarship";
import SortBy from "./SortBy";
import OrderBy from "./OrderBy";
import Filters from "./Filters"
import SearchByName from "./SearchByName";
import GroupByCreationDate from "./GroupByCreationDate"
import CountByCategory from "./CountByCategory";

const Template = () => {

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState("ASC")
    const [sortBy, setSortBy] = useState(["ID"])
    const [filters, setFilters] = useState([''])
    const [marines, setMarines] = useState([])

    const updateContent = () => {
        console.log("Filters: " + filters.toString())
        fetchGetMarines(setMarines, setPage, sortBy, order, limit, page, filters, alertWithMessage);
        console.log("Marines" + marines.toString())
    }

    const [hiddenAlert, setHiddenAlert] = useState(true)
    const [message, setAlertMessage] = useState("")

    const changeOrder = () => {
        if (order === "ASC") {
            setOrder("DESC")
        } else {
            setOrder("ASC")
        }
        updateContent()
    }

    const alertWithMessage = (text) => {
        setAlertMessage(text)
        setHiddenAlert(false)
    }

    useEffect(() => {
        updateContent()
    }, [limit, page, sortBy, filters]);

    const sortBys = ["id", "name", "creationDate", "health", "height", "category"]

    const onSortClick = (field) => {
        if (sortBys.includes(field)) {
            setSortBy(field.replace(/([a-z])([A-Z])/, '$1_$2').toUpperCase())
            updateContent()
            console.log("Sort by", sortBy)
        }
    }

    return (
        <div>
            <div className="buttons-container">
                <AddMarine updateContent={updateContent} alertWithMessage={alertWithMessage}/>
                <UpdateMarine updateContent={updateContent} alertWithMessage={alertWithMessage}/>
                <FindById marines={marines} setMarines={setMarines} updateContent={updateContent} alertWithMessage={alertWithMessage}/>
                <SearchByName marines={marines} setMarines={setMarines} updateContent={updateContent} alertWithMessage={alertWithMessage}/>
                <GroupByCreationDate alertWithMessage={alertWithMessage}/>
                <CountByCategory alertWithMessage={alertWithMessage}/>
                <DeleteMarine updateContent={updateContent} alertWithMessage={alertWithMessage}/>
                <AddStarship alertWithMessage={alertWithMessage}/>
                <SortBy setSortBy={setSortBy} updateContent={updateContent}/>
                <OrderBy setUpperOrder={changeOrder}/>
                <Filters setFilters={setFilters} updateContent={updateContent}/>
                <Pagination limit={limit} page={page} setPage={setPage}/>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        {
                            [
                                "id",
                                "name",
                                "coordinates.x",
                                "coordinates.y",
                                "creationDate",
                                "health",
                                "category",
                                "weaponType",
                                "meleeWeapon",
                                "chapter.id",
                                "chapter.name",
                                "chapter.world",
                            ].map(it => (
                                <th onClick={() => onSortClick(it)}>{it}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <TableContent content={marines}/>
                </table>
            </div>
            <div className="underTableContainer">
                <div className="alertContainer" hidden={hiddenAlert}>
                    <div className="alert">
                        <div>
                            <div>
                                {message}
                            </div>
                        </div>
                        <button className="okButton" onClick={ _ => setHiddenAlert(true)}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template;
