import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import SearchLine from "../../ui/searchLine";
import { filtering } from "../../../utils/filter";

const UsersListPage = () => {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchValue, setSearchValue] = useState("");

    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchValue]);

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = (substring) => {
        setSelectedProf();
        setSearchValue(substring);
    };

    if (users) {
        const filteredUsers = filtering(users, selectedProf, searchValue);

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchLine value={searchValue} onSearch={handleSearch} />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading ...";
};

UsersListPage.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            profession: PropTypes.objectOf(PropTypes.string),
            qualities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
            completeMeetings: PropTypes.number,
            rate: PropTypes.number,
            bookmark: PropTypes.bool.isRequired
        })
    )
};

export default UsersListPage;
