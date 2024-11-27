import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from "react-router-dom";
import { IoChevronForward } from 'react-icons/io5';

const Breadcrumbs = ({ name, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:tourId/:name", breadcrumb: name },

    ];
    const breadcrumb = useBreadcrumbs(routes)
    return (
        <>

            <div className="text-sm flex items-center gap-1">
                {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
                    <Link
                        className="flex gap-1 items-center text-inherit no-underline hover:text-[#5dbc5d]"
                        key={match.pathname}
                        to={match.pathname}
                    >
                        <span className="capitalize">{breadcrumb}</span>
                        {index !== self.length - 1 && <IoChevronForward style={{ marginLeft: '5px' }} />}
                    </Link>
                ))}
            </div>
        </>

    )
}

export default Breadcrumbs
