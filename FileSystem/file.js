function Filelist() {
    let htmlString = "";

    (async () => {
        const response = await fetch("https://api.github.com/repos/CFdefense/SD330/contents/");
        const data = await response.json();

        // Loop through the list of files, creating links
        for (let file of data) {
            const fname = file.name;           
            const fpath = "https://CFdefense.github.io/SD330/" + fname;  
            
            // Add each file as a list item with a link
            htmlString += `
                <li>
                    <a href="${fpath}" target="_blank">${fname}</a>
                </li>
            `;
        }

        document.getElementById("files").innerHTML = htmlString;
    })();
}
