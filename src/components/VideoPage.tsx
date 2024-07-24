import {useEffect , useState} from "react"
import { useLocation } from "react-router-dom"
import VideoDetails from "./VideoDetails";
import {getVideoFromId} from "../api/video"
import { Video } from "./VideoCard";

const VideoPage: React.FC = () => {

  const [videoDetails , setVideoDetails] = useState<Video|null>(null)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("v");
  

  const fetchVideoDetails = async()=>{
    const res =  await getVideoFromId(videoId);
     console.log(res?.data)
    if(res?.status == 200){
      setVideoDetails(res.data.video)
    }
  }

  useEffect(()=>{
    fetchVideoDetails()
  }, [])


  return (
    <div className="m-5">
      <VideoDetails video={videoDetails}  fetchVideoDetails={fetchVideoDetails}/>
      <div className="flex m-5">
        <div>
          {/* Related Videos component */}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
