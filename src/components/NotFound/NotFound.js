import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
export default function NotFound({status,title,subTitle, to}) {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link className="primary-fill" to="/">Back Home</Link>}
        />
    )
}
