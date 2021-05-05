import { useState } from "react";
import { postData } from "../../lib/utils";
import Grid from "../Grid/Grid";

import "./Dashboard.css";

function Dashboard() {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
  });

  async function fetchData() {
    const res = await postData(
      "http://localhost:5000/api/sonic/measure-room/rectangle"
    );

    //@TODO: proper error handling
    setState({ isLoading: false, data: res });
  }

  const handleStartClick = () => {
    setState({ isLoading: true, data: null });
    fetchData();
  };

  return (
    <div>
      {state.data && state.data.width && state.data.length ? (
        <Grid width={state.data.width} length={state.data.length} />
      ) : state.isLoading ? (
        <div className="Message">Scanning room ...</div>
      ) : (
        <button onClick={handleStartClick} className="MainButton">
          Let's use Sonic to scan the room!
        </button>
      )}
    </div>
  );
}

export default Dashboard;
