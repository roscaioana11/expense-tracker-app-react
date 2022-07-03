const userService = {
    saveUser: function (user) {
        localStorage.setItem("user", user);
    },
    hasUser: function () {
        if (localStorage.getItem("user"))
            return true;

        return false;
    },
    deleteUser: function () {
        localStorage.removeItem("user");
    }
}

export default userService;