const baseURL = "http://localhost:3000";

async function logIn(usernam, password) {
  var settings = {
    url: `${baseURL}/login`,
    method: "GET",
    timeout: 0,
    headers: {
      username: usernam,
      password: password,
    },
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function getGroups(groupName) {
  var settings = {
    url: `${baseURL}/groups?group_name=${groupName || ""}`,
    method: "GET",
    timeout: 0,
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function getPages() {
  var settings = {
    url: `${baseURL}/pages`,
    method: "GET",
    timeout: 0,
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function createUser(userOBJ) {
  var settings = {
    url: `${baseURL}/createUser`,
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(userOBJ),
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function createGroup(GroupOBJ) {
  var settings = {
    url: `${baseURL}/createGroup`,
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(GroupOBJ),
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function createUserGroups(groupsList, userID) {
  var settings = {
    url: `${baseURL}/createUserGroups?user_id=${userID || ""}`,
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(groupsList),
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
async function createGroupPages(pagesList, groupID) {
  var settings = {
    url: `${baseURL}/createGroupPages?group_id=${groupID || ""}`,
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(pagesList),
  };

  let res = await $.ajax(settings);
  //   console.log(res);
  return res;
}
