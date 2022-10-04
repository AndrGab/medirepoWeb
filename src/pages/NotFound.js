import image from "../assets/404.jpg";

export default function NotFound() {
  return (
    <div style={"display: flex; justify-content: center; align-items: center;"}>
      <img src={image} width={"70%"} height={"70%"} />
    </div>
  );
}
