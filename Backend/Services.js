import axios from "axios";
const dbURL = "https://windinfosys.com";

async function logIn(username, password) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/user_full_details`,
      headers: {
        username: username,
        password: password,
      },
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getGroups(groupName) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/groups?group_name=${
        groupName || ""
      }`,
      headers: {},
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getUsers(username) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/users?username=${
        username || ""
      }`,
      headers: {},
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getPages() {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/pages`,
      headers: {},
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(userObj) {
  try {
    let data = JSON.stringify(userObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function createGroup(groupOBJ) {
  try {
    let data = JSON.stringify(groupOBJ);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/groups`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function createUserGroups(groupsList, userID) {
  try {
    let data = JSON.stringify(groupsList);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/users_groups_membership?user_id=${
        userID || ""
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function createGroupPages(PagesList, groupID) {
  try {
    let data = JSON.stringify(PagesList);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${dbURL}/ords/mg_test/User_Management/groups_pages_membership?group_id=${
        groupID || ""
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
// getPages();
function print(input) {
  console.log("sssssss, ", input);
}

export {
  print,
  logIn,
  getGroups,
  createUser,
  createUserGroups,
  getPages,
  createGroup,
  createGroupPages,
  getUsers,
};
