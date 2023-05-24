export function filtering(users, selectedProf, searchValue) {
    if (selectedProf) {
        return users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        );
    } else if (searchValue) {
        const searchResult = [];

        users.forEach((user) => {
            const string = user.name.trim().toLowerCase();
            const isFound = string.includes(searchValue);
            if (isFound) {
                searchResult.push(user);
            }
        });
        return searchResult;
    } else {
        return users;
    }
}
