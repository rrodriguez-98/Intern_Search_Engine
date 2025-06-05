
function removeSpaces(string) {
    return string.replace(' ', '%20')
}

$("#loading-spinner").hide();

$("#job-search-btn").click(function(){
    //Empty contents before starting another search
    $("#job-list-header").empty();
    $("#job-list").empty();

    let keyword = $("#search-keyword").val();
    let title_filter = removeSpaces(keyword);
    

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

    if (title_filter !== ""){
        $("#loading-spinner").show();
        $.ajax(settings).done(function (response) {
            
        if (response.length!== 0){
            $("#loading-spinner").hide();
            $("#search-keyword").val('');
            $("#job-list-header").append(`<p style="color: white">Top Results:</p>`)
            for (let i = 0; i < response.length; i++) {
                if (response[i].organization_logo === null){
                    response[i].organization_logo = './empty_logo.png';
                }
                
                $("#job-list").append(`
                    <a href="${response[i].url}" style="color: black;">
                    <div class="card" style="background-color: white; padding: 5%; border-radius: 10px">
                        <img src="${response[i].organization_logo}" alt="Company Logo">
                        <h3>${response[i].organization}</h3>
                        <h4>${response[i].title}</h4>
                    </div>
                    </a>
                `);
            }
        } else{
            $("#job-list-header").append(`<p style="color: white">No results. Try another search.</p>`)
        }
        console.log(response);
        })
    } else {
        $("#job-list-header").append(`<p style="color: white;">Please search for a position title.</p>`)
    }
    

});



