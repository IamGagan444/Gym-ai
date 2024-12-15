import { InfiniteSlider } from "../ui/InfniteSlider";

const images = Array.from({ length: 8 }, (_, index) =>
  new URL(`../img/${index + 9}.jpg`, import.meta.url).href
);

export default function Features2() {
  return (
    <InfiniteSlider durationOnHover={75} gap={24}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Additional Image ${index + 9}`}
          className="aspect-square w-[120px] rounded-[4px]"
        />
      ))}
    </InfiniteSlider>
  );
}
