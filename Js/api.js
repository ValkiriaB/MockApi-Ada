const url = "https://65209e39906e276284c494a7.mockapi.io/jobs"
// Print Jobs
const getJobs = async () => {
   
    const response = await fetch (`${url}/jobs`)
    const data = await response.json()
    
    setTimeout(() => {
       showView("spinner");
      renderJobs(data);
      }, 2000)
   
  }
  getJobs()
  
// More info about jobs
const seeInfoJobs = async(id) => {
   showView("spinner");
  const response = await fetch (`${url}/jobs/${id}`)
  const data = await response.json()

  setTimeout(() => {
  DetailJobs(data);
   }, 2000)
  
}

// submit change 
const editJob = async (id,job) => {
   fetch(`${url}/jobs/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify((job)),
  });
 
  getJobs();
};

// Filter
const jobsfiltered = () => {
  showView("spinner");
  fetch(`${url}/jobs`)
    .then((response) => response.json())
    .then((jobs) => { 
       setTimeout(() => {
        renderJobs(jobsFiltered(jobs));
       }, 2000)
      
    ;
    })
   
    ;
    
};

// Add new job
const addingJob = async (newjob) => {
         
          await fetch(`${url}/jobs`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newjob),
          });
      
        setTimeout(() => {
        showView("spinner");
       getJobs();
       }, 2000)
    
      };

// Delete Job
    const jobDelete = async (id) => {
    
      await fetch(`${url}/jobs/${id}`, {
          method: "DELETE",
      });
  
      setTimeout(() => {
        showView("spinner");
       getJobs();
       }, 2000)
    
  
  };







window.onload = getJobs();