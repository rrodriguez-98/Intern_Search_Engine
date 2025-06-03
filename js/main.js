const settings = {
	async: true,
	crossDomain: true,
	url: 'https://internships-api.p.rapidapi.com/active-jb-7d',
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f473df81ccmsh788d696e77ff01bp17c473jsn1ee70510cce3',
		'x-rapidapi-host': 'internships-api.p.rapidapi.com'
	}
};

$("#job-search-btn").click(function(){
    $.ajax(settings).done(function (response) {
        $("#job-list-header").append(`<p style="color: white">Top Results:</p>`)
        for (let i = 0; i < response.length; i++) {
            
            $("#job-list").append(`
                <div class="card" style="background-color: white; padding: 5%; border-radius: 10px">
                    <img src="${response[i].organization_logo}" alt="Company Logo">
                    <h3>${response[i].organization}</h3>
                    <h4>${response[i].title}</h4>
                </div>
            `);
        }

        console.log(response);
    })
});

