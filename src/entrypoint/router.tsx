import {Route, Routes} from 'react-router-dom';
import {HomePage} from '../pages/HomePage/HomePage';
import {CreatePage} from '../pages/CreatePage/CreatePage';

const Router = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/createItems' element={<CreatePage/>}/>
        </Routes>
    )
}

export default Router;