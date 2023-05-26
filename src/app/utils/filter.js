export function filtering(users, selectedProf, searchQuery) {
    if (selectedProf) {
        return users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        );
    } else if (searchQuery) {
        const searchResult = [];

        users.forEach((user) => {
            const string = user.name.toLowerCase();
            const isFound = string.includes(searchQuery.toLowerCase());
            if (isFound) {
                searchResult.push(user);
            }
        });
        return searchResult;
    } else {
        return users;
    }
}
