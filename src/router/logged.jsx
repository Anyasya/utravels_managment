import React from 'react';
// import CampaignInternalOther from "../pages/logged/CampaignInternalOther";
import LoggedLayout from "../layouts/LoggedLayout";
import SchemaTemplatePage from "../pages/logged/SchemaTemplatePage";

const schemas = [
    {
        id: 2,
        key: 'dashboard',
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
                // {
                //     path: `${root}/internal_campaign`,
                //     element: <CampaignInternalOther />,
                //     menu: false,
                //     // icon: <MdCampaign/>,
                //     name: 'Создание компании'
                // },
                // {
                //     path: `${root}/campaigns`,
                //     element: <Companies />,
                //     menu: true,
                //     icon: <BsCardList/>,
                //     name: 'Кампании',
                //     key: 'settings',
                // },
                // {
                //     path: `${root}/reports`,
                //     element: <Reports />,
                //     menu: true,
                //     icon: <TbReportAnalytics/>,
                //     name: 'Отчеты по рекл. камп.',
                //     key: 'reports',
                // },
                // {
                //     path: `${root}/settings`,
                //     element: <Settings />,
                //     menu: true,
                //     icon: <BiCog/>,
                //     name: 'Настройки',
                //     key: 'settings',
                //     children: [
                //         {
                //             path: `${root}/settings/account`,
                //             element: <SettingsAccount />,
                //             show: true,
                //             name: 'Аккаунт',
                //         },
                //         {
                //             path: `${root}/settings/blacklist/phones`,
                //             element: <SettingsBlackListPhones />,
                //             show: true,
                //             name: 'Черный список номеров номеров'
                //         },
                //         {
                //             path: `${root}/settings/tariff`,
                //             element: <SettingsBilling />,
                //             show: true,
                //             name: 'Тарифные планы'
                //         },
                //     ]
                // },
                //
                // {
                //     path: `${root}/settings/`,
                //     element: <Navigate {...{to: `${root}/settings/account`}} />
                // },
                // {
                //     path: `${root}/settings/*`,
                //     element: <Navigate {...{to: `${root}/settings/account`}} />
                // },
                // {
                //     path: `${root}/internal_campaign/:id`,
                //     element: <CampaignInternalOther />,
                //     menu: false,
                //     icon: <MdCampaign/>,
                //     name: 'Редактирование компании'
                // },
                // {
                //     path: `${root}/`,
                //     element: <Navigate {...{to: SCHEMAS.default_path}} />,
                // },
                // {
                //     path: `${root}/*`,
                //     element: <Navigate {...{to: SCHEMAS.default_path}} />,
                // }
            ]
        }
    ]
}
