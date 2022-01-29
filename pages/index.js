import { userService } from "services";
import { Link } from "component";

export default Home;

function Home() {
  return (
    <div className="p-4">
      <div className="container">
        <h1>Hi {userService.userValue?.firstName}!</h1>
        <p>You&apos;re logged in to Med Express Admin Console </p>
      </div>
    </div>
  );
}
