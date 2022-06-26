const Head = ({keys, head, handleQrCode}) => {
    const tableHead = head || {}
    return(
        <thead>
            <tr>
                { handleQrCode && <th></th>}
                {keys.map(key=><th key={key}>{tableHead[key] || key}</th>)}
            </tr>
        </thead>
    )
}
export default Head