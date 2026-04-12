import {ProductList} from '../../widgets/productList/productList'
import Headerlist from '../../widgets/header/headerList'
import {NewProductsSlider} from '../../widgets/NewProductsSlider/NewProductsSlider'

export const HomePage = () => {
    return(
        <>
            <Headerlist/>
            <NewProductsSlider/>
            <ProductList/>
        </>
    )
}