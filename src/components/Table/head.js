const Head = ({keys, head, handleQrCode}) => {
    const tableHead = head || {}
    return(
        <thead>
            <tr>
                { handleQrCode && <th></th>}
                {keys.map((key, index)=><th key={`th-${key}-${index}`}>{tableHead[key] || key}</th>)}
            </tr>
        </thead>
    )
}
export default Head