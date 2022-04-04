import React from 'react';
import {
    ContainerHeader, 
    TitleHeader,
    ElementsChildrenHeader,
} from './style'

export default function HeaderTable({title, subtitle, children}){
    return (
        <ContainerHeader>
            <TitleHeader>
                <h3>{title}</h3>
                <small>{subtitle}</small>
            </TitleHeader>
            <ElementsChildrenHeader>
                {children}
            </ElementsChildrenHeader>
        </ContainerHeader>
    )
}