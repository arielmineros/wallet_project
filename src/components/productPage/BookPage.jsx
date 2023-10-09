//import {useAuth} from '../../context/AuthContext';
import { useBook } from '../../context/BookContext';
import { useEffect } from 'react';


function BookPage(){
    const {user, getUserBooks,getBooks} = useBook();
    
    useEffect(()=>{
        getUserBooks();
    },[])

    return(
        <div>Books page</div>
    )
}
export default BookPage