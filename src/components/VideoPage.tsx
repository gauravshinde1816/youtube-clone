import { useLocation } from "react-router-dom";
import Comments from "./Comments";
import VideoDetails from "./VideoDetails";
import VideoPlayer from "./VideoPlayer";
import mockdata ,  {getVideoFromId} from "../data/MockVideoData"

const VideoPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("v");
  const video = getVideoFromId(videoId)

  return (
    <div className="m-5">
      <VideoDetails video={video} />
      <div className="flex m-5">
        <div>
          {/* <Comments videoId={videoId} /> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
