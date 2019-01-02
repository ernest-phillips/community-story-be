let cDate = moment().format("dddd, MMMM Do");
// localStorage.setItem(date, cDate);

function getWorkouts() {
    CACHE.getAuthenticatedUserFromCache()
    $.ajax({
        type: 'GET',
        url: '/api/home',
        contentType: 'application/json',
        dataType: 'json',
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${CACHE.jwtToken}`);
        },
        success: console.log("Success"),
        error: err => {
            console.error(err);
            // if (onError) {
            //     onError(err);
            // }
        }
    });

}

function welcomeUser() {
    let user = CACHE.getAuthenticatedUserFromCache();
    $('.welcome').html(`<h4>Welcome <a href="#">${user.username}</a></h4>`)
}

function retrieveSets(d) {
    console.log("retrieving sets")
    let user = window.CACHE_MODULE.getAuthenticatedUserFromCache();
    console.log(d)

    $('.ex-container').html(`<div class="this-date" date="${d}">`);
    axios.get(`/api/home/${user.userid}/${d}`)
        .then(function(res) {
            formatWorkout(res.data)
        })
        .catch(function(error) {
            console.log(error);
        });
}

function formatWorkout(data) {

    data.map((item, index) => displayWorkout(item, index))
}

function displayWorkout(item, index) {
    let exercise = item.sets.exercise;
    let weight = item.sets.weight;
    let reps = item.sets.reps
    let setID = item._id

    $('.js-exList').append(`<div class="log-header" data-setID="${setID}">
    <h3 class="ex-name js-exName ">${exercise}</h3>
    
    <div class="stat-labels">
        <p class="log-stat js-exerLbl">${index +1}</p>
        <p class="log-stat js-repsLbl">${reps}</p>
        <p class="log-stat js-weightsLbl">${weight}</p>
    </div>
    <!--end stat-label-->
    <div class="delete js-delete">
    <i class="fas fa-minus-circle"></i>
    </div>
</div>
<!--end log-header-->`)
}

function currentDate() {
    let d = moment().format("dddd, MMMM Do");
    $(".js-dateSel").html(cDate);

}

function changeDate() {
    let count = 0;
    let cDate = moment(new Date()).subtract(count, 'day');
    $('.js-caretLFT').on('click', function() {

        cDate = cDate.subtract(1, 'day');
        count++
        $(".js-dateSel").html(cDate.format("dddd, MMMM Do"));
        let isoDate = cDate.startOf('day');
        $('.js-exList').html('');
        retrieveSets(isoDate.format("MM-DD-YYYY"));

    });

    $('.js-caretRT').on('click', () => {

        cDate = cDate.add(1, 'day');

        $(".js-dateSel").html(cDate.format("dddd, MMMM Do"));
        let isoDate = cDate.startOf('day');
        $('.js-exList').html('');
        retrieveSets(isoDate.format("MM-DD-YYYY"));
    });
}

function dateSelectTemplate() {

}

function deleteSet() {
    let userInfo = CACHE.getAuthenticatedUserFromCache()
    $('body').on('click', '.delete', function() {
        let workoutId = $(this).parent('.log-header').attr('data-setID');
        HTTP.deleteWorkout({
            jwtToken: userInfo.jwtToken,
            workoutId
        });
        console.log(workoutId);

    });
}

function onPageLoad() {
    welcomeUser();
    currentDate();
    changeDate();
    getWorkouts();
    deleteSet();


}


$(onPageLoad);