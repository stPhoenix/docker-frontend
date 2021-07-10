import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

export const CustomPagination = (props) => {
    return (
        <Pagination className="align-self-center">
            <Pagination.Prev disabled={props.previous == null} onClick={()=>(props.paginate(props.previous))}>Previous</Pagination.Prev>
            <Pagination.Next disabled={props.next == null} onClick={()=>(props.paginate(props.next))}>Next</Pagination.Next>
        </Pagination>
    )
}

