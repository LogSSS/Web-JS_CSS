const currentPath = document.URL;
const bob = currentPath.replace("index.html", "");
var folders = [];
const bobDiv = document.getElementById("bob");
let bruh = true;
let i = 1;

function checkFolderExists() {
  const url = `${bob}Lab${i}`;
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        folders.push(`Lab${i}`);
        i++;
        return checkFolderExists();
      } else {
        return folders;
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

checkFolderExists()
  .then((folders) => {
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];
      if (folder.startsWith("Lab")) {
        const link = document.createElement("a");
        link.href = `${folder}/`;
        link.textContent = folder;

        bobDiv.appendChild(link);
      }
    }
    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch((error) => {
    console.log("Error:", error);
  });
