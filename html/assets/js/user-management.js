function showEditUserModal(user) {
  document.querySelector("#id").value = user.dataset.id;

  document.querySelector("#firstNameEdit").value = user.dataset.firstName;
  document.querySelector("#lastNameEdit").value = user.dataset.lastName;
  document.querySelector("#usernameEdit").value = user.dataset.username;
  document.querySelector("#mobileEdit").value = user.dataset.mobile;
  document.querySelector("#isAdminEdit").checked = user.dataset.isAdmin === "true" ? true : false;
}

async function editUser(e) {
  e.preventDefault();

  const formData = new FormData(document.querySelector("#editUserForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      location.reload();
    } else {    
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText = "Can not update user!";
    console.error(error);
  }
}

document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;

    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("id");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

async function deleteUser(id) {
  try {
    let res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    let toastBody = document.querySelector(".toast .toast-body");
    toastBody.innerHTML = "Can not delete user!";
    toastBody.classList.add("text-danger");
    toast.show();
    console.log(error);
  }
}
