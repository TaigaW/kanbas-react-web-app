import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments

interface CourseNavigationProps {
  courseId?: string; // The '?' makes it an optional property
}

function CourseNavigation({ courseId }: CourseNavigationProps) {
  const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Grades", "Assignments", "Quizzes", "People", "Panopto Video", "Discussions"];
  const { pathname } = useLocation();

  const linkPath = (linkName: string) => {
    if (linkName === "Quizzes") {
      const link = `/quiz-list/${courseId}`
      return link; 
    }
    return `/${linkName.toLowerCase().replace(/ /g, "-")}/${courseId}`;
  }

  return (
    <ul className="wd-navigation">
      {links.map((link, index) => {
        const path = linkPath(link);
        return (
          <li key={index} className={pathname.includes(path) ? "wd-active" : ""}>
            <Link to={path}>{link}</Link>
          </li>
        );
      })}
    </ul>
  );
}
export default CourseNavigation;