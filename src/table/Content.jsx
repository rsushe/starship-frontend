function TableTemplate(props) {
    return (
        <tbody id="page1">
        {
            props.content.map((row) => (
                <tr>
                    <td>{row["id"]}</td>
                    <td>{row["name"]}</td>
                    <td>{row["coordinates"].x}</td>
                    <td>{row["coordinates"].y}</td>
                    <td>{row["creationDate"]}</td>
                    <td>{row["health"]}</td>
                    <td>{row["category"]}</td>
                    <td>{row["weaponType"]}</td>
                    <td>{row["meleeWeapon"]}</td>
                    <td>{row["chapter"].id}</td>
                    <td>{row["chapter"].name}</td>
                    <td>{row["chapter"].world}</td>
                </tr>
            ))
        }
        </tbody>
    )
}

export default TableTemplate
