import { useEffect, useState } from "react";
import ListItem from "./ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";
import { useParams, useSearchParams } from "react-router-dom";
const Products = () => {

    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(true);
    const params = useParams()
    const [searchParam,] = useSearchParams()
    const queryParam = searchParam.get('search')

    useEffect(() => {
        async function fetchItems() {
            try {
                let slug = `items.json`
                if (params.category) {
                    slug = `items-${params.category}.json`
                }
                if(queryParam){
                    slug+= `?search=${queryParam}`
                }
                const response = await axios.get(`https://shopping-app-b9c1a-default-rtdb.firebaseio.com/${slug}`)
                const data = response.data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    }
                })
                setItems(data)
                setLoader(false)
            } catch (error) {
                console.log(error)
                setLoader(false)
                // navigate('404')
            } finally {
                setLoader(false)
            }

        }
        fetchItems();

        return () => {
            setItems([]);
            setLoader(true);
        }

    }, [params.category, queryParam])

    return (
        <>
            <div className={"product-list"}>
                <div className={"product-list--wrapper"}>
                    {items.map((item) => {
                        return <ListItem key={item.id} data={item} />
                    })}

                </div>
            </div>
            {loader && <Loader />}
        </>
    )

}
export default Products;