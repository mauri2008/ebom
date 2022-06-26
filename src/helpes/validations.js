import * as Yup from 'yup';
import { labels } from  './constantsLabel'

export const recipeSchema = Yup.object().shape({
     valuerecive: Yup.string().required(labels.obrigatorio),
    description: Yup.string().required(labels.obrigatorio)
                    .min(3, labels.minimo)
                    .max(256, labels.maximo)
})