import React from 'react';
import LoggedLayout from "../layouts/LoggedLayout";
import SchemaTemplatePage from "../pages/logged/SchemaTemplatePage";
import {OrderPage} from "../pages/logged/OrderPage";

const schemas = [
    {
        id: 2,
        key: '',
        menu: true,
        // icon: <BiDockTop/>,
        name: 'Сделки'
    },
]

const schemasPagesConstructor = (root, values) => {
    if(values) {
        let array = []
        values.map(schema => {
            array.push(
                {
                    path: `${root}/${schema.key}`,
                    element: <SchemaTemplatePage {...{schema_id: schema.id, create_path: `${root}/${schema.key}/new`}}/>,
                    menu: schema.menu,
                    icon: schema.icon,
                    name: schema.name
                }
            )
        })
        return {
            items: array,
            default_path: `${root}/${values[0].key}`
        }
    } else return {items: [], default_path: `${root}/settings`}

}

export const logged = (root) => {

    const SCHEMAS = schemasPagesConstructor(root, schemas)

    return [
        {
            path: `${root}/`,
            element: <LoggedLayout />,
            children: [
                ...SCHEMAS.items,
                {
                    path: `${root}/order`,
                    element: <OrderPage />,
                    menu: false,
                    name: 'Заказ'
                },
                {
                    path: `${root}/order/:id`,
                    element: <OrderPage />,
                    menu: false,
                    name: 'Редактирование заказа'
                }
            ]
        }
    ]
}
