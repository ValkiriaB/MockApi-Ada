const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
  $$(".view").forEach((view) => view.classList.add("visually-hidden"));
  $(`#${view}`).classList.remove("visually-hidden");
};


// Function of navbar
$("#home").addEventListener("click", () => getJobs());
$("#show").addEventListener("click", () => ShowForm());


const ShowForm = () => {
  showView("job-create"),
  hideSelect()
}



// Hide select 
const showSelect = () => {
  $("#select").classList.remove("hidden");
}

const hideSelect = () => {
  $("#select").classList.add("hidden");
}


// Show the jobs in cards
const renderJobs= (jobs) => {
  showSelect()
    $("#list-jobs").innerHTML= "";
    if(jobs) {
        showView("list-jobs");
        for (let { image,name,description,languages,seniority,category,id} of jobs){
            $("#list-jobs").innerHTML += `

    <div class="card " style="width: 18rem;">
   <img src="${image}" class="card-img-top"  ></img>
  <div class="card-body">
 
    <h5 id="name"class="card-title">${name}</h5>
    <p class="card-text">${description}</p>
    <div class="d-flex justify-content-center grid gap-3">
    <h6><span class="badge"  id="span" style="margin-top: 10px;">${languages}</span></h6>
    <h6><span class="badge" id="span" style="margin-top: 10px;">${category}</span></h6>
    <h6><span class="badge" id="span" style="margin-top: 10px;">${seniority}</span></h6>
    </div>
    <a href="#" type="button" class="btn btn-success" id="btn-detail" onclick=seeInfoJobs(${id}) >See details</a>
  </div>
</div>
            `
  }
    }else {
    showView("");
}
};

const DetailJobs = ({
  image,
  id,
  languages,
  seniority,
  category,
    salary,
    benefits:{vacation,health_ensurance,birth_license,additional,internet_paid}
  }) => {
    hideSelect()
    showView("detail-jobs")
    $("#detail-jobs").innerHTML = `
   
      <div class="card view" id="detail" style="width:50rem; height:40rem;">
      <div class="card-body">
      <img src="${image}" id="img" class="card-img-top" style="width:30rem" >
      <ul style="margin-top:20px"> 
          
            <li >Salary: $${salary}</li>
            <h6 style="margin-top:1rem">Benefits: </h6>
            <li>vacation: ${vacation}</li>
            <li> Health ensurance: ${health_ensurance}</li>
            <li> Birth license: ${birth_license}</li>
            <li> Additional: ${additional}</li>
            <li> Internet Paid: ${internet_paid}</li>
          </ul>
          <div class="d-flex flex-row grid gap-3">
          <h6><span class="badge"  id="span" style="margin-top: 10px; ">${languages}</span></h6>
          <h6><span class="badge" id="span" style="margin-top: 10px;">${category}</span></h6>
          <h6><span class="badge" id="span" style="margin-top: 10px;">${seniority}</span></h6>
          </div>
      
          <button type="button" id="btn-edit-job" onclick=FormEdit(${id}) class="btn btn-success" style="margin-top: 2rem;"">Edit</button>
          <button type="button" id="btn-delete" onclick=jobDelete(${id}) class="btn btn-danger"style="margin-top: 2rem;">Delete</button>
      </div>
    </div>

    `
  }
    






//Filter

//Filter for Category
const CategoryFilter = (jobs, category) =>{
  return jobs.filter((job) => job.category === category);
}

//Filter for location
const LocationFilter = (jobs, location) =>{
  return jobs.filter((job) => job.location === location);
}

//Filter for Seniority
const SeniorityFilter = (jobs, seniority) =>{
  return jobs.filter((job) => job.seniority === seniority);
}


//Filters
const jobsFiltered = (jobs) =>{
  let location = $("#Location").value;
  let seniority = $("#Seniority").value;
  let category = $("#Category").value;

  if(location!='Location'){
      jobs = LocationFilter (jobs, location);
  }

  if(seniority!='Seniority'){
      jobs = SeniorityFilter (jobs, seniority);
  }

  if(category!='Category'){
      jobs = CategoryFilter(jobs, category);
  }
  return jobs
} 
// Search button
$("#search-btn").addEventListener("click", () => jobsfiltered());
 

// clean the filter
$("#clear-btn").addEventListener("click", () => {
  $("#Location").value = "Location";
  $("#Seniority").value = "Seniority";
  $("#Category").value = "Category";
  getJobs()
});


//New Job


const addjob = () => {
 
  let newjob = {
      image: $("#job-image").value,
      name: $("#Job-title").value,
      description: $("#Description").value,
      location: $("#add-location").value,
      category: $("#add-category").value,
      seniority: $("#add-seniority").value,
      benefits: {
      vacation: $("#add-vacation").value,
      health_ensurance:$("#add-health-ensurance").value,
      birth_license:$("#add_license").value,
      additional:$("#add-additional").value,
      internet_paid:$("#add-internet").value,
      },
      salary: $("#add-salary").value,
      languages: $("#add-languages").value,
      long_term: $("#add-long-term").value,
    
  };
  addingJob(newjob);
};

$("#submit-btn").addEventListener("click", () => {
  addjob()
  cleanForm()
})


// Clean Form

const cleanForm = () => {

   $("#job-image").value= "";
   $("#Job-title").value = "";
   $("#Description").value= "";
   $("#add-location").value= "";
   $("#add-category").value= "";
   $("#add-seniority").value= "";
   $("#add-vacation").value= "";
   $("#add-health-ensurance").value = "";
   $("#add_license").value= "";
   $("#add-additional").value= "";
   $("#add-internet").value= "";
   $("#add-salary").value= "";
   $("#add-languages").value= "";
   $("#add-long-term").value= "";


}



const FormEdit = ({

      image,
      name,
      description,
      location,
      category,
      seniority,
      vacation,
      health_ensurance,
      birth_license,
      additional,
      internet_paid,
      salary,
      languages,
      long_term,

  }) =>{
   showView("edit-job")
    $("#edit-imagen").value=image;
    $("#edit-name").value = name;
    $("#edit-description").value= description;
    $("#edit-location").value= location;
    $("#edit-seniority").value= seniority;
    $("#edit-category").value= category;
    $("#edit-long-term").value = long_term;
    $("#edit-salary").value= salary;
    $("#edit-vacation").value = vacation;
    $("#edit-health_ensurance").value = health_ensurance;
    $("#edit-birth-license").value = birth_license;
    $("#edit-additional").value = additional;
    $("#edit-internet").value = internet_paid;
    $("#edit-languages").value = languages;
   
    $("#submit-change").addEventListener("click", () => {
      editJob(id, {
          image:  $("#edit-imagen").value,
          name: $("#edit-title").value,
          description: $("#edit-description").value,
          location: $("#edit-location").value,
          seniority: $("#edit-seniority").value,
          category: $("#edit-category").value,
          long_term: $("#edit-long-term").value,
          salary: $("#edit-salary").value,
          vacation: $("#edit-vacation").value,
          health_ensurance:$("#edit-health_ensurance").value,
          birth_license: $("#edit-birth-license").value,
          additional:$("#edit-additional").value,
          internet_paid: $("#edit-internet").value,
          languages: $("#edit-languages").value,
      });
   
  });
  }
 $("#submit-cancel").addEventListener("click", () => getJobs());


















