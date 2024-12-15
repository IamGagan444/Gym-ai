import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "../ui/Image-comparision";
import before from "../assets/before.jpg";
import after from "../assets/after.jpg";

export default function BeforeAfter() {
  return (
    <div className="w-full px-2">
      {/* Labels */}
      <div className="flex justify-around text-white font-bold py-2">
        <p>Before</p>
        <p className="text-yellow-500">After</p>
      </div>

      {/* Image Comparison */}
      <ImageComparison
        className="w-full sm:w-[400px] h-[300px] sm:h-[400px] md:h-[450px] aspect-[16/9] mx-auto rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        enableHover
        springOptions={{
          bounce: 0.3,
        }}
      >
        <ImageComparisonImage
          src={after}
          alt="After Image"
          position="left"
          className="object-cover w-full h-full"
        />
        <ImageComparisonImage
          src={before}
          alt="Before Image"
          position="right"
          className="object-cover w-full h-full"
        />
        <ImageComparisonSlider className="w-1 bg-white/50 backdrop-blur-md" />
      </ImageComparison>
    </div>
  );
}
