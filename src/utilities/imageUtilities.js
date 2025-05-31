const carImages = import.meta.glob('../assets/*.png', { eager: true });

export function getCarImage(make, model) {
  const fileName = `../assets/${make.toLowerCase()}-${model.toLowerCase()}.png`;
  return carImages[fileName]?.default || carImages['../assets/car-placeholder.png'].default;
}
