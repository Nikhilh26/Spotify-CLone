import { useEffect, useState } from 'react'
import { baseURL2, useContextProps } from '../App'
import CategoryComponent from './CategoryComponent'
// import '../css/HomeSearchComponent.css';

type categoryObject = {
    href: string,
    icons: [{
        url: string
    }],
    id: string,
    name: string
}
type categories = {
    next: string | null,
    total: number,
    items: categoryObject[]
}

type categoryResponse = {
    categories: categories
}

// styles
const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    paddingBottom: "70px"
}

export default function HomeSearchComponent() {

    const [category, setCategory] = useState<categories>({
        next: null,
        total: 0,
        items: []
    })

    const props = useContextProps();

    useEffect(() => {
        if (props?.access_token) {
            try {
                fetch(`${baseURL2}/v1/browse/categories?limit=50`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${props.access_token}`
                    }
                }).then(async (data: Response) => await data.json()).then((data: categoryResponse) => {
                    const payload: categoryObject[] = data.categories.items.map((element, idx) => {
                        const res: categoryObject = {
                            href: element.href,
                            icons: [{
                                url: element.icons[0].url
                            }],
                            id: element.id,
                            name: element.name
                        }
                        return res;
                    })
                    setCategory({ next: data.categories.next, total: data.categories.total, items: payload });
                })
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    //console.log(category);

    return (
        <div className='home-search-component' style={style}>
            {
                category
                &&
                category.items
                &&
                category.items.length > 0
                &&
                category.items.map((element, idx) => {
                    return (<CategoryComponent imgURL={element.icons[0]?.url} name={element.name}
                        id={element.id} key={element.id} />)
                })
            }

        </div>
    )
}
