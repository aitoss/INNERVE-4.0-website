

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const originalViews = db.collection('views').doc('original');
const showViews = db.collection('views').doc('show');

var getViews;

showViews.get().then(function (doc) {
    if (doc.exists) {
        getViews = doc.data();
        console.log(getViews,getViews.views);
        originalViews.update({ views: increment });
        showViews.update({ views: increment });
        document.getElementById("view_show").innerHTML = getViews.views;
    } else {
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

document.getElementById('register').addEventListener('submit', register_data);
document.getElementById('sponsor_btn').addEventListener('submit', save);
document.getElementById('contact_form').addEventListener('submit', query);

function register_data(){
    const store_name = document.getElementById('1').value;
    const store_email = document.getElementById('sub').value;
    const store_phno = document.getElementById('2').value;
    const college = document.getElementById('college').value;
    var through = document.getElementById("through").value;
    const timestamp=new Date();

    document.getElementById("id01").style.display = 'none';
    console.log(store_name,store_email,store_phno);
    db.collection("Register_Data").add({
        name : store_name,
        email : store_email,
        phone_no : store_phno,
        college : college,
        through: through,
        time: timestamp
    }).then(function () {
        swal("Good job!", "Email regarding the event has been sent to you", "success")
        console.log("status saved");
    }).catch(function (error){
        swal("Oops...", "Something went wrong!", "error")
        console.log("Got an error : ",error);
    });
}

function save(e) {
    e.preventDefault();
    document.getElementById("id02").style.display = 'none';
    const Sponsor_Email = document.getElementById("sponsoremail").value;
    console.log(Sponsor_Email);
    const timestamp = new Date();
    
    db.collection("Sponsor_Email").add({
        sponsor_email : Sponsor_Email,
        time: timestamp
    }).then(function() {

        swal("Thankyou!", "We have recieved your contact email", "success");
        console.log("status saved");
    }).catch(function (error) {
        swal("Oops...", "Something went wrong!", "error")
        console.log("Got an error : ",error);
    })
}  

function query(e) {
    e.preventDefault();
    const Contact_Email = document.getElementById("contact_email").value;
    const Contact_Message = document.getElementById("contact_message").value;
    console.log(Contact_Email,Contact_Message);
    const timestamp=new Date.toLocaleString();
    
    db.collection("Query_data").add({
        Contact_Email : Contact_Email,
        Contact_Message : Contact_Message,
        time: timestamp
    }).then(function () {
        swal("We have recieved your Query! Will reply shortly.");
        console.log("status saved");
    }).catch(function (error) {
        swal("Oops...", "Something went wrong!", "error")
        console.log("Got an error : ", error);
    })
}
