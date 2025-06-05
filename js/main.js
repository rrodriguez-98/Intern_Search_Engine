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
    // $("#topResult").remove();
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
            'x-rapidapi-key': 'f473df81ccmsh788d696e77ff01bp17c473jsn1ee70510cce3',
            'x-rapidapi-host': 'internships-api.p.rapidapi.com'
        }
    };
    //Check if user input is empty
    if (title_filter !== ""){
        $("#loading-spinner").show();
        $.ajax(settings).done(function (response) { 
            if (response.length!== 0){
                $("#loading-spinner").hide();
                $("#search-keyword").val('');
                $("#job-list-header").append(`<p id="topResult" style="color: white;">Top Results:</p>`)

                // const title = document.getElementById("job-list-header");
                // const newPara = document.createElement("p");
                // newPara.innerHTML = `<p id="topResult" style="color: white; font-size: 1.5rem; font-weight:bold; ">Top Results:</p>`;
                // title.parentNode.insertBefore(newPara, title.nextSibling);

                for (let i = 0; i < response.length; i++) {
                    if (response[i].organization_logo === null){
                        response[i].organization_logo = './empty_logo.png';
                    }
                    //Render job listings
                    $("#job-list").append(`
                        <a href="${response[i].url}" style="color: black;">
                        <div class="card" style="background-color: white; padding: 5%; border-radius: 10px">
                            <img src="${response[i].organization_logo}" alt="Company Logo"></img>
                            <h3>${response[i].organization}</h3>
                            <h4>${response[i].title}</h4>
                        </div>
                        </a>
                    `);
                }
        } else{
            $("#loading-spinner").hide();
            $("#job-list-header").append(`<p style="color: white">No results. Try another search.</p>`)
        }
        console.log(response);
        })
    } else {
        $("#job-list-header").append(`<p style="color: white;">Please search for a position title.</p>`)
    }

});



