// import {useState, useEffect, useMemo} from 'react'
// import styles from './productList.module.scss'

// import {Card} from '../../shardes/Card/Card'
// import CardSelect from '../../shardes/Select/CardSelect'
// import ItemsSearch from '../../shardes/Search/ItemsSearch'
// interface Data {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     currency: string;
//     isPremium: boolean;
//     stock: number;
//     rating: number;
//     description: string;
//     image: string;
// }


// export const ProductList = () => {

//     const [items, setItems] = useState<Data[]>([]);
//     const [sort, setSort] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(()=>{
//     const fetchData = async () => {
//        const response = await fetch('/data/items.json');

//        const data = await response.json();
//        setItems(data.products);
//     }
//         fetchData()
//     },[])

// const sortedItems = useMemo(() => {

//     let filtered = [...items];

//     if(sort === 'isPremium'){
//         filtered = filtered.filter(item => item.isPremium)
//     }

//     if(sort === '!isPremium'){
//         filtered = filtered.filter(item => !item.isPremium)
//     }

//     if(searchQuery){
//         filtered = filtered.filter(item =>
//             item.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//     }

//     return filtered;

// }, [sort, items, searchQuery])

//     return(
//         <div className={styles.list}>
//             <h3>Поиск</h3>

//             <ItemsSearch 
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//             placeholder="Поиск"
//             />

//             <CardSelect
//             value={sort}
//             onChange={setSort}
//             defaultValue='Все товары'
//             options={[
//                 {value: 'isPremium', name: 'Премиум сегмент'},
//                 {value: '!isPremium', name: 'Обычный сегмент'},
//             ]}
//             />

//             <h3>Товары</h3>
//             {
//                 sortedItems.map(item => (
//                     <Card key = {item.id} {...item}/>
//                 ))
//             }
//         </div>
//     )
// }


import { useState, useEffect, useMemo } from 'react'
import styles from './productList.module.scss'

import { Card } from '../../shardes/Card/Card'
import CardSelect from '../../shardes/Select/CardSelect'
import ItemsSearch from '../../shardes/Search/ItemsSearch'
import { useMarketItemsStore } from '../../store/store'

interface Data {
    id: number;
    name: string;
    category: string;
    price: number;
    currency: string;
    isPremium: boolean;
    stock: number;
    rating: number;
    description: string;
    image?: string;
}

export const ProductList = () => {

    const [items, setItems] = useState<Data[]>([])
    const [sort, setSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const createdItems = useMarketItemsStore(state => state.items)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data/items.json')
            const data = await response.json()
            setItems(data.products)
        }

        fetchData()
        
    }, [])

    const sortedItems = useMemo(() => {

        const allItems = [...items, ...createdItems]

        let filtered = [...allItems]

        if (sort === 'isPremium') {
            filtered = filtered.filter(item => item.isPremium)
        }

        if (sort === '!isPremium') {
            filtered = filtered.filter(item => !item.isPremium)
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered

    }, [sort, items, createdItems, searchQuery])

    return (
        <div className={styles.list}>

            <h3>Поиск</h3>

            <ItemsSearch
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск"
            />

            <CardSelect
                value={sort}
                onChange={setSort}
                defaultValue='Все товары'
                options={[
                    { value: 'isPremium', name: 'Премиум сегмент' },
                    { value: '!isPremium', name: 'Обычный сегмент' },
                ]}
            />

            <h3>Товары</h3>

            {
                sortedItems.map(item => (
                    <Card
                        key={item.id}
                        {...item}
                    />
                ))
            }

        </div>
    )
}