//-----------------Autopopulate Search Keywords with Buttons------------------//
$("#try_swe").click(function(string){
    document.getElementById("search-keyword").value = 'software engineering';
})

$("#try_market").click(function(string){
    document.getElementById("search-keyword").value = 'marketing';
})

$("#try_danalyst").click(function(string){
    document.getElementById("search-keyword").value = 'data analyst';
})
//-----------------Function: Remove Spaces From Keyword-------------------------//
function removeSpaces(string) {
    return string.replace(' ', '%20')
}
//-------------------Initially Hide Loading Spinner------------------------------//
$("#loading-spinner").hide();

//------------Function: List Job Results Upon Button Click-----------------------//
$("#job-search-btn").click(function(){
    //Empty contents before starting another search
    $("#job-list-header").empty();
    $("#job-list").empty();
    $("#topResult").remove();
    $("#errorNoSearch").remove();
    $("#errorEmptySearch").remove();
    
    //Obtain user input
    let keyword = $("#search-keyword").val();
    let title_filter = removeSpaces(keyword);
    //API Settings
    const settings = {
	async: true,
	crossDomain: true,
	url: `https://internships-api.p.rapidapi.com/active-jb-7d?title_filter=${title_filter}`,
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd841a1a720msh7cb44568d78112bp19a669jsnc6fe04075993',
		'x-rapidapi-host': 'internships-api.p.rapidapi.com'
	}
    };

    const title = document.getElementById("job-list-header");

    //Check if user input is empty
    if (title_filter !== ""){
        $("#loading-spinner").show();
        
        $.ajax(settings).done(function (response) { 
            if (response.length!== 0){
                $("#loading-spinner").hide();
                $("#search-keyword").val('');

                const title = document.getElementById("job-list-header");
                const newPara = document.createElement("p");
                newPara.id = 'topResult';
                newPara.innerHTML = `Top Results:`;
                title.after(newPara);

                for (let i = 0; i < response.length; i++) {
                    if (response[i].organization_logo === null){
                        response[i].organization_logo = './empty_logo.png';
                    }
                    //Render job listings
                    $("#job-list").append(`
                        <a href="${response[i].url}" style="color: black;">
                        <div class="card" style="background-color: white; padding: 5%; border-radius: 10px">
                            <img src="${response[i].organization_logo}" alt="Company Logo" class="mb-3"></img>
                            <h3>${response[i].organization}</h3>
                            <h4>${response[i].title}</h4>
                        </div>
                        </a>
                    `);
                }
                console.log(response);
        } else{
            $("#loading-spinner").hide();
            const newPara2 = document.createElement("p");
            newPara2.innerHTML = `No results. Try another search.`;
            newPara2.style.color = "white";
            newPara2.style.fontWeight = "bold"; 
            newPara2.id = "errorNoSearch"; 
            title.after(newPara2);
        }
        })
    } else {
        const newPara3 = document.createElement("p");
        newPara3.innerHTML = `Please search for a position title.`;
        newPara3.style.color = "white";
        newPara3.style.fontWeight = "bold"; 
        newPara3.classList.add("center-p");
        newPara3.id = "errorEmptySearch"; 
        title.after(newPara3);    
    }

});



