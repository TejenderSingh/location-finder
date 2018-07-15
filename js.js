    //listen for submit
    document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);
    //Listen for delete
    document.querySelector('body').addEventListener('click', deleteLocation);

    function getLocationInfo(e) {
        const zip = document.querySelector('.zip').value;

        //Make request
        fetch(`http://api.zippopotam.us/NZ/${zip}`)
            .then(response => {
                if(response.status != 200) {
                    showIcon('remove');
                    document.querySelector('#output').innerHTML =
                    `<div class="notification is-danger del-msg"><button class="delete"></button>Invalid Zip code, Please try again.</div>`;
                    throw Error(response.statusText);
                } else {
                    showIcon('check');
                    return response.json();
                }
            })
            .then(data => {
                //Show location info
                let output = '';
                data.places.forEach(place => {
                    output += `
                        <article class="message del-msg is-primary">
                            <div class="message-header">
                                <p>Location</p>
                                <button class="delete"></button>
                            </div>
                            <div class="message-body">
                                <ul>
                                    <li><strong>Suburb: </strong>${place['place name']}</li>
                                    <li><strong>Longitude: </strong>${place['longitude']}</li>
                                    <li><strong>Latitude: </strong>${place['latitude']}</li>
                                </ul>
                            </div>
                        </article>
                    `;
                })
                //Insert into output div
                document.querySelector('#output').innerHTML = output;
            })
            .catch(err => console.log(err));
        e.preventDefault();
    }

    function showIcon(icon) {
        //Clear icons
        document.querySelector('.icon-remove').style.display = 'none';
        document.querySelector('.icon-check').style.display = 'none';
        //Show correct icon
        document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
    }

    //Delete location msg
    function deleteLocation(e) {
        if(e.target.className == 'delete' ) {
            document.querySelector('.del-msg').remove();
            document.querySelector('.zip').value = '';
            document.querySelector('.icon-check').style.display = 'none';
            document.querySelector('.icon-remove').style.display = 'none';
        }
    }
