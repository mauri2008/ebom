import * as Yup from 'yup';
import { labels } from  './constantsLabel'

export const recipeSchema = Yup.object().shape({
     valuerecive: Yup.string().required(labels.obrigatorio),
     description: Yup.string().required(labels.obrigatorio)
                    .min(3, labels.minimo)
                    .max(256, labels.maximo)
})

export const registerClient = Yup.object().shape({
     name_client: Yup.string().required('Informe um nome válido').min(3,'campo nome deve possuir mais de 3 caracteres').max(256),
     id_church: Yup.string().required('Selecione uma igreja'),
     email: Yup.string().nullable(),
     phone: Yup.string().nullable(),  
})

