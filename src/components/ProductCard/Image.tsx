export interface Image {
  imageURL: string;
  alt: string;
  className: string;
}
export default function Image({ imageURL, alt, className }: Image) {
  return (
    <>
      <div>
        <img src={imageURL} alt={alt} className={className} />
      </div>
    </>
  );
}
