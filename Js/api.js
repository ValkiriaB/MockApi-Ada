const url = "https://65209e39906e276284c494a7.mockapi.io/jobs"
// Print Jobs
const getJobs = async () => {
 
    const response = await fetch (`${url}/jobs`)
    const data = await response.json()
    renderJobs(data)
  

  }
  getJobs()
  
// More info about jobs
const seeInfoJobs = async(id) => {
  const response = await fetch (`${url}/jobs/${id}`)
  const data = await response.json()
  DetailJobs(data)
 
}

// submit change 
const editJob = async (id,job) => {

 console.log("hola")
   fetch(`${url}/jobs/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify((job)),
  });
 
  getJobs();
};

// Filter
const getJobsFiltered = () => {
  
  fetch(`${url}/jobs`)
    .then((response) => response.json())
    .then((jobs) => { 
    renderJobs(jobsFiltered(jobs));
    })
  
    ;
    
};

// Add new job
const addingJob = async (newJob) => {
      
          await fetch(`${url}/jobs`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newJob),
          });
      
          getJobs();      
      };

// Delete Job
    const jobDelete = async (id) => {
  //     showView("spinner");
      await fetch(`${url}/jobs/${id}`, {
          method: "DELETE",
      });
  
      getJobs();
  
  };







window.onload = getJobs();