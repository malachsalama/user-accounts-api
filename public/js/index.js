$("#create_user").submit(function (event) {
  alert("Data submitted successfully!");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  let data = {};

  $.map(unindexed_array, function (n, index) {
    data[n["name"]] = n["value"];
  });

  $.ajax({
    type: "PATCH",
    url: `http://localhost:5000/api/users/${data.id}`,
    data: data,
    success: function (response) {
      alert("User updated successfully!");
    },
  });
});

const buttonDelete = document.getElementById("delete_user");
buttonDelete.onclick = async function () {
  const id = $(this).attr("data-id");

  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      alert("User deleted successfully!");
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  }
};
