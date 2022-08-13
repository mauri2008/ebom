
import { format, parseISO } from 'date-fns'


export function currencyFormat(num) {

    return (num > 0)? 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0;
}

export const currentViewFormat = (num) => {
    return `R$ ${num.replace('.',',')}`
}

export function emptyData (data,postion, _Default) {
    return (postion !== undefined)? data : _Default;
}

export function setDataTable (elements, keys) {

    let list = [];
    let obj ={}
    elements.forEach((element)=>{
        keys.forEach(key =>{
            obj[key.title] = element[key.key]
            return''
        })
        list.push(obj)
        obj = {}
        return ''
    })
    return list;
}

export function setDateBr (date) {
    return format(date, 'dd/MM/yyyy')
}

export function setDateTimeBr (date) {
    return format(date, 'dd/MM/yyyy hh:mm')
}

export const convertDateNotUtcInBR = (data) =>{
    return setDateBr(parseISO(data))
}

export function updateLabelDateInBr (data, element){
    const array = data;
    array.map((data, index)=>{

        array[index][element] = setDateBr(parseISO(data[element]))
        return ''
    })

    return array;
}

export function updateDataGrid(values, elements){
    let array = values

    elements.forEach(element=>{
        array.forEach((data, index)=>{

            if(element.action === 'data'){
                array[index][element.object] = setDateBr(parseISO(data[element.object]))
            }
            if(element.action === 'dateTime'){
                array[index][element.object] = setDateTimeBr(parseISO(data[element.object]))
            }
            if(element.action === 'current'){
                array[index][element.object] = `R$ ${maskValueCurrency(data[element.object])}`
            }
            if(element.action === 'maxLeght'){
                array[index][element.object] = data[element.object].substr(0,element.limite)
            }
        })
    })
    
    return array

}

export function maskCurrency(e)
{
    let value = e.target.value;
    value = value.replace(/\D/g,"");
    value = value.replace(/(\d)(\d{2})$/,"$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g,".")
    e.target.value = value;
    return e;
}

export function maskValueCurrency(e)
{
  let value = e
  value = value.replace(/\D/g,"");
  value = value.replace(/(\d)(\d{2})$/,"$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g,".")

  return value;
}

export function setMaxDataUpDataBase (e){
    let value = e
    value = value.replace(/\D/g,"");
    value = value.replace(/(\d)(\d{2})$/,"$1.$2"); 
    return value;
}

export const searchClient = async ({api, ENDPOINT, search}) =>{

    const response = await api.insert(`${ENDPOINT}/search`,search)
    return (Object.keys(response).length === 0)? false : response.data;
}

