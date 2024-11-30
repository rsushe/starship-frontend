const Pagination = ({limit, page, setPage}) => {

    const onNextBackButtonClick = (isNext) => {
        if (isNext) {
            setPage(page + 1)
        }
        if (!isNext && page > 1) {
            setPage(page - 1)
        }
    }

    return <div>
        <div className="join">
            <button className="join-item btn" onClick={() => onNextBackButtonClick(false)}>«</button>
            <button className="join-item btn">Page {page}</button>
            <button className="join-item btn" onClick={() => onNextBackButtonClick(true)}>»</button>
        </div>
    </div>
}

export default Pagination
