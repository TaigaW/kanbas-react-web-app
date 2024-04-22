import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import * as client from "../Courses/Modules/client"


interface Course { 
  _id: string, 
  name: string, 
  number: string, 
  startDate: string,
  endDate: string, 
  image: string  
}

function Dashboard(
  )
   {
    console.log("fdsafdsa")
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState({
      _id: "1234", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
    });
    

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("fdsafdsafdsafdasfa")
        const fetchedCourses = await client.findCourses();
        console.log(fetchedCourses) 
        setCourses(fetchedCourses);
        
        console.log(fetchCourses)
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourses();
  }, []);


  const deleteCourse = (id: any) => {
    const newCourses = courses.filter((_, i) => i !== id);
    setCourses(newCourses);
};

  const addNewCourse = (course: any) => {
    setCourses([...courses, course]);
  };



  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
      <button 
      // onClick={updateCourse} 
      >
        Update
      </button>
      <button onClick={addNewCourse} >
        Add
      </button>

      <h2>Published Courses (12)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                     style={{ height: 150 }}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name}
                    <button onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}>
                    Edit
                    </button>
                    <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}>
                      Delete
              </button>
</Link>
                  <p className="card-text">{course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                    Go </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;




